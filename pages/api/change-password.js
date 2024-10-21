import { MongoClient } from "mongodb";
import NextCors from "nextjs-cors";

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient(
    "mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/"
  );
  await client.connect();
  const db = client.db("Users"); // Replace with your DB name if needed
  return { db, client };
};

export default async function handler(req, res) {
  // Apply CORS middleware to allow cross-origin requests
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*", // Allow all origins (or specify specific origins)
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  });

  if (req.method === "POST") {
    const { id, currentPassword, newPassword } = req.body;

    if (!id || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      const { db, client } = await connectToDatabase();

      // Find the user by the `id` field (e.g., "user4")
      const user = await db.collection("users").findOne({ id });

      if (!user) {
        await client.close();
        return res.status(404).json({ message: "User not found." });
      }

      // Check if the current password matches the one in the database
      if (user.password !== currentPassword) {
        await client.close();
        return res.status(401).json({ message: "Incorrect current password." });
      }

      // Update the password to the new one
      await db
        .collection("users")
        .updateOne({ id }, { $set: { password: newPassword } });

      await client.close();
      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to update password." });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
