import axios from 'axios';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); 
  }

  // Extract query parameters from request
  const { page = 1, code = '' } = req.query;
  
  try {
    // Configure the request with headers
    const config = {
      method: 'get',
      url: `https://www.britpart.com/api/v1/part/getall?page=${page}&code=${code}`,
      headers: {
        'Token': '383f78c8-0e4e-49ef-bd54-81075f631f5a', 
        'User-Agent': 'PostmanRuntime/7.29.2',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    // Make the API request
    const response = await axios(config);
    
    // Log and return the API response data
    console.log(`Response data: ${JSON.stringify(response.data)}`);
    res.status(200).json(response.data); // Send data to client
  } catch (error) {
    // Handle and log any errors
    console.error('Error fetching parts:', error);
    res.status(500).json({ error: `Error fetching parts: ${error.message}` });
  }
}
