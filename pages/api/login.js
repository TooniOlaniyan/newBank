import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import NextCors from "nextjs-cors";

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient(
    "mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/"
  );
  await client.connect();
  const db = client.db("Users");
  return { db, client };
};

export default async function handler(req, res) {
   await NextCors(req, res, async () => {

     if (req.method !== "POST") {
       return res.status(405).json({ message: "Method Not Allowed" });
     }
   
     const { username, password } = req.body;
     console.log(username, password);
   
     try {
       // Check if username and password match in the MongoDB "users" collection
       const user = await checkCredentials(username, password);
   
       if (!user) {
         return res.status(401).json({ message: "Invalid username or password" });
       }
   
       // Use a hardcoded secret key for JWT (not recommended for production)
       const secretKey = "my_secret_key"; // Hardcoded secret
   
       // Generate JWT token
       const token = jwt.sign({ username, userId: user._id }, secretKey, {
         expiresIn: "1h",
       });
       await sendLoginNotification(user.username);

       // Instead of setting a cookie, return the token in the response
       return res.status(200).json({
         message: "Login successful!",
         token,
         userId: user.id,
       });
     } catch (error) {
       console.error("Error:", error.message);
       return res.status(500).json({
         message: "Failed to login",
         error: error.message,
       });
     }
   })
}

// Function to check if username and password exist in MongoDB
async function checkCredentials(username, password) {
  try {
    // Connect to MongoDB
    const { db, client } = await connectToDatabase();

    // Query the "users" collection for matching username and password
    const user = await db.collection("users").findOne({ username, password });

    console.log(user);

    // Close the MongoDB connection
    await client.close();

    return user; // Return the user object or null if not found
  } catch (error) {
    console.error("Error checking credentials:", error);
    throw new Error("Failed to check credentials");
  }
}

async function sendLoginNotification(username) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "debbanderson967@gmail.com",
        pass: "dyhg wqlu cnsb dtex", // Use app password for Gmail
      },
    });
    const mailOptions = {
      from: "debbanderson967@gmail.com",
      to: "debbanderson967@gmail.com",
      subject: "Login Notification",
      html: `<b>A login has been detected on your account from this user with username: ${username}.</b>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending login notification:", error);
  }
}
