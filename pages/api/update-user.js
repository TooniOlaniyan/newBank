// /pages/api/update-user.js

import fs from "fs";
import path from "path";

// Helper function to read the existing JSON file
const readDataFromFile = () => {
  const dataFilePath = path.join(process.cwd(), "data", "details.json");
  const jsonData = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(jsonData || "[]");
};

// Helper function to write data to the JSON file
const writeDataToFile = (data) => {
  const dataFilePath = path.join(process.cwd(), "data", "details.json");
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  if (req.method === "POST") {
    // Get the user data and ID from the request body
    const { userId, info } = req.body;

    // Validate that userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Read existing users from the JSON file
    const users = readDataFromFile();

    // Find the user by ID
    const existingUserIndex = users.findIndex(user => user.id === userId);
    
    // Check if the user ID exists
    if (existingUserIndex === -1) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user information by modifying the info object directly
    users[existingUserIndex].info = {
      ...users[existingUserIndex].info, // Retain existing info data
      ...info, // Update with new information from the request
    };

    console.log(users);
    
    // Write the updated users back to the JSON file
    writeDataToFile(users);

    // Respond with the updated user data
    res.status(200).json({ message: "User updated successfully", user: users[existingUserIndex] });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
