import fs from 'fs';
import path from 'path';

const otpFilePath = path.join(process.cwd(), 'data', 'otps.json');

export default async function handler(req, res) {
  console.log(req);
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data = await fs.promises.readFile(otpFilePath, 'utf8');
    const otps = data ? JSON.parse(data) : []; // Parse existing OTPs or return an empty array

    return res.status(200).json(otps); // Send the OTPs as a response
  } catch (error) {
    console.error('Error reading OTP file:', error);
    return res.status(500).json({ message: 'Failed to read OTPs', error: error.message });
  }
}
