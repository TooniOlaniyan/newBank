import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken"; // Import JWT

const authFilePath = path.join(process.cwd(), "data", "auth.json");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  try {
    // Check if username and password match in auth.json
    const user = await checkCredentials(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Use a hardcoded secret key for JWT (not recommended for production)
    const secretKey = "my_secret_key"; // Hardcoded secret

    // Generate JWT token
    const token = jwt.sign({ username, userId: user.userId }, secretKey, { expiresIn: "1h" });

    // Instead of setting a cookie, return the token in the response
    return res.status(200).json({ message: "Login successful!", token, userId: user.userId });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Failed to login",
      error: error.message,
    });
  }
}

// Function to check if username and password are in auth.json
async function checkCredentials(username, password) {
  return new Promise((resolve, reject) => {
    fs.readFile(authFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading auth file:", err);
        return reject(err);
      }

      const authData = JSON.parse(data);

      // Find the user with matching credentials
      const user = authData.find(
        (user) => user.username === username && user.password === password
      );

      resolve(user); // Return the user object or undefined if not found
    });
  });
}
