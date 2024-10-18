// Helper function to limit the number of concurrent fetches (batching)
async function fetchInBatches(promises, batchSize = 5) {
    const results = [];
    for (let i = 0; i < promises.length; i += batchSize) {
      const batch = promises.slice(i, i + batchSize);  // Slice the promises into smaller batches
      const batchResults = await Promise.all(batch);   // Wait for all promises in the batch
      results.push(...batchResults);                   // Push the results of the batch to the main array
    }
    return results;
  }
  
  // Function to fetch a single page of parts from the external API
  async function fetchParts(page) {
    const url = `https://www.britpart.com/api/v1/part/getall?page=${page}`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Token: '383f78c8-0e4e-49ef-bd54-81075f631f5a',  // Include your token in the headers
        'User-Agent': 'PostmanRuntime/7.29.2',           // Optional: mimic Postman's user-agent
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.parts;  // Return only the parts for each page
  }
  
  export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    // Extract query parameters (search by title if provided)
    const { title = '' } = req.query;
  
    const totalPages = 62;  // We know the total number of pages is 62
    const promises = [];
  
    // Add a promise for fetching each page
    for (let page = 1; page <= totalPages; page++) {
      promises.push(fetchParts(page));  // Push the promise to the array
    }
  
    try {
      // Fetch all pages in batches of 5
      const results = await fetchInBatches(promises, 5);
  
      // Flatten the results into a single array of parts
      const allParts = results.flat();
  
      // If a title is provided, filter the parts by title (case-insensitive)
      let filteredParts = allParts;
      if (title) {
        const lowerCaseTitle = title.toLowerCase();
        filteredParts = allParts.filter((part) =>
          part.title.toLowerCase().includes(lowerCaseTitle)
        );
      }
  
      // Return the filtered parts and the total count
      res.status(200).json({ total: filteredParts.length, parts: filteredParts });
    } catch (error) {
      console.error('Error fetching parts:', error);
      res.status(500).json({ error: `Error fetching parts: ${error.message}` });
    }
  }
  