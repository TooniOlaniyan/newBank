// /pages/api/save-user.js

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
    // Get the user data from the request body
    const newUser = req.body;

    // Validate that userId is provided
    if (!newUser.id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Read existing users from the JSON file
    const users = readDataFromFile();

    // Check if the user ID already exists
    const existingUser = users.find(user => user.id === newUser.id);
    if (existingUser) {
      return res.status(400).json({ message: "User ID already exists." });
    }

    // Add the new user to the users array
    users.push(newUser);

    // Write the updated users back to the JSON file
    writeDataToFile(users);

    // Respond with the new user data
    res
      .status(201)
      .json({ message: "User saved successfully", user: newUser });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
