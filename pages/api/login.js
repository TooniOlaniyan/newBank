import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import NextCors from "nextjs-cors";

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient(
    "mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/"
  );
  await client.connect();
  const db = client.db("Users"); // Connect to "Users" DB
  return { db, client };
};

export default async function handler(req, res) {
  // Apply CORS middleware
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*", // Allow all origins (customize as needed)
    optionsSuccessStatus: 200,
  });

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;
  console.log(username, password);

  try {
    // Check if the credentials are valid
    const user = await checkCredentials(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Use a hardcoded secret key (consider using env variables in production)
    const secretKey = "my_secret_key";

    // Generate JWT token
    const token = jwt.sign({ username, userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    // Send login notification email
    await sendLoginNotification(user.username);

    return res.status(200).json({
      message: "Login successful!",
      token,
      userId: user._id, // Make sure user ID is correct
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to login", error: error.message });
  }
}

// Check if username and password exist in MongoDB
async function checkCredentials(username, password) {
  try {
    const { db, client } = await connectToDatabase();

    // Search for the user in the "users" collection
    const user = await db.collection("users").findOne({ username, password });

    await client.close(); // Close the MongoDB connection

    return user; // Return user object or null if not found
  } catch (error) {
    console.error("Error checking credentials:", error);
    throw new Error("Failed to check credentials");
  }
}

// Send login notification email
async function sendLoginNotification(username) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "asalamlatif@gmail.com",
        pass: "prmr opim qodx xnpx", // Use app password for Gmail
      },
    });

    const mailOptions = {
      from: "asalamlatif@gmail.com",
      to: "toonilaniyan@gmail.com",
      subject: "Login Notification",
      html: `<b>A login has been detected on your account from this person: ${username}.</b>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending login notification:", error);
  }
}
