import { MongoClient } from "mongodb";

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient("mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/");
  await client.connect();
  const db = client.db("Users"); // Use your actual database name
  return { db, client };
};

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      // Connect to the MongoDB database
      const { db, client } = await connectToDatabase();

      // Query the userdetails collection for the user by ID
      const user = await db.collection('userdetails').findOne({ id: userId });

      // Close the MongoDB connection
      client.close();

      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ message: "Failed to retrieve user", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
