export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
    // Handle OPTIONS preflight request
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    const { title = "" } = req.query; 
    let allParts = []; // Array to hold all the parts
  
    console.log(req.query);
    
  
    // Function to fetch parts from a specific page
    async function fetchParts(page = 1) {
      const url = `https://www.britpart.com/api/v1/part/getall?page=${page}`;
  
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Token: "383f78c8-0e4e-49ef-bd54-81075f631f5a", // Your API token
            "User-Agent": "PostmanRuntime/7.29.2",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          return data; // Return the fetched data
        } else {
          throw new Error(`Error fetching page ${page}: ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  
    try {
      let page = 1;
      let totalPages = 80;
  
      // Fetch data from all pages
      while (page <= totalPages) {
        const data = await fetchParts(page);
  
        if (!data) {
          return res
            .status(500)
            .json({ error: `Error fetching parts at page ${page}` });
        }
  
        allParts = [...allParts, ...data.parts]; // Collect all parts
        totalPages = data.totalPages; // Set the total number of pages from API response
        page += 1; // Increment page number
      }
  
      // If a title query parameter is provided, filter the parts by title
      let filteredParts = allParts;
  
      if (title) {
        const lowerCaseTitle = title.toLowerCase();
        filteredParts = allParts.filter((part) =>
          part.title.toLowerCase().includes(lowerCaseTitle)
        );
      }
  
      // Send the filtered parts in the response
      res.status(200).json({
        total: filteredParts.length,
        parts: filteredParts,
      });
    } catch (error) {
      console.error("Error fetching parts:", error);
      res.status(500).json({ error: `Error fetching parts: ${error.message}` });
    }
  }
  