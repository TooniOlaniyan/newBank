import NextCors from "nextjs-cors";
import { MongoClient } from "mongodb";

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient("mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/");
  await client.connect();
  const db = client.db("Users"); // Connect to the "Users" database
  return { db, client };
};

export default async function handler(req, res) {
  await NextCors(req, res, async () => {
    if (req.method === "POST") {
      // Get the user data from the request body
      const newUser = req.body;
      console.log(newUser);

      // Validate that userId is provided
      if (!newUser.id) {
        return res.status(400).json({ message: "User ID is required." });
      }

      try {
        // Connect to the MongoDB database
        const { db, client } = await connectToDatabase();

        // Access the "users" collection
        const usersCollection = db.collection("userdetails");

        // Check if the user ID already exists
        const existingUser = await usersCollection.findOne({ id: newUser.id });
        if (existingUser) {
          client.close(); // Close the connection
          return res.status(400).json({ message: "User ID already exists." });
        }

        // Insert the new user into the "users" collection
        await usersCollection.insertOne(newUser);

        // Close the MongoDB connection
        client.close();

        // Respond with the new user data
        return res.status(201).json({ message: "User saved successfully", user: newUser });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
      }
    } else {
      // Handle any other HTTP method
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
