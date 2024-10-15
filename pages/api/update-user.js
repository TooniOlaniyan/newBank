import { MongoClient } from 'mongodb';

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient("mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/");
  await client.connect();
  const db = client.db("Users"); // Use your actual database name
  return { db, client };
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Get the user data and ID from the request body
    const { userId, info } = req.body;

    // Validate that userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    try {
      // Connect to the MongoDB database
      const { db, client } = await connectToDatabase();

      // Find the user by ID and update their info in the 'userdetails' collection
      const result = await db.collection('userdetails').findOneAndUpdate(
        { id: userId }, // Filter by user ID
        { $set: { info } }, // Update the 'info' field
        { returnOriginal: true } // Return the updated document
      );

      console.log(result);
      

      // Close the MongoDB connection
      client.close();

      // Check if the user was found and updated
      if (!result) {
        return res.status(404).json({ message: "User not found." });
      }

      // Respond with the updated user data
      return res.status(200).json({ message: "User updated successfully", result });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Failed to update user", error: error.message });
    }
  } else {
    // Handle any other HTTP method
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
