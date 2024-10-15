import { MongoClient } from "mongodb";

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient("mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/");
  await client.connect();
  const db = client.db("Users"); // Replace with your actual database name
  return { db, client };
};

export default async function handler(req, res) {
  const { userId } = req.query; // Get userId from query parameters

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Connect to the MongoDB database
    const { db, client } = await connectToDatabase();

    // Query the userdetails collection for the user by ID
    const user = await db.collection("userdetails").findOne({ id: userId });

    // Close the MongoDB connection
    client.close();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error reading users:", error);
    return res.status(500).json({ message: "Failed to load user data" });
  }
}
