import fs from 'fs';
import path from 'path';

const detailsFilePath = path.join(process.cwd(), 'data', 'details.json');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId } = req.query; // Get userId from query parameters

  try {
    // Read the details from the JSON file
    const data = await fs.promises.readFile(detailsFilePath, 'utf8');
    const users = JSON.parse(data);

    // Find the user by userId
    const user = users.find(user => user.id === userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error reading users:', error);
    return res.status(500).json({ message: 'Failed to load user data' });
  }
}
