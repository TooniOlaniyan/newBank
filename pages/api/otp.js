import { MongoClient } from 'mongodb';

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient("mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/");
  await client.connect();
  const db = client.db("Users"); // Replace with your actual database name
  return { db, client };
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Connect to the MongoDB database
    const { db, client } = await connectToDatabase();

    // Retrieve all OTPs from the 'code' collection
    const otps = await db.collection('code').find({}).toArray();
    console.log(otps);
    
    // Close the MongoDB connection
    await client.close();

    // Send the retrieved OTPs as the response
    return res.status(200).json(otps);
  } catch (error) {
    console.error('Error retrieving OTPs from MongoDB:', error);
    return res.status(500).json({ message: 'Failed to retrieve OTPs', error: error.message });
  }
}
