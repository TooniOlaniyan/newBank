export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Extract query parameters from request
  const { page = 1, code = "" } = req.query;

  try {
    // Construct the URL for the request
    const url = `https://www.britpart.com/api/v1/part/getall?page=${page}&code=${code}`;

    // Perform the fetch request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Token: "383f78c8-0e4e-49ef-bd54-81075f631f5a", // Include token in the headers
        "User-Agent": "PostmanRuntime/7.29.2", // Optional: mimic Postman's user-agent
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    // Check if the response is ok (status 200-299)
    if (response.ok) {
      const data = await response.json(); // Parse the JSON response
      res.status(200).json(data); // Send the data back to the client
    } else {
      console.error("Error fetching parts:", response.statusText);
      res
        .status(500)
        .json({ error: `Error fetching parts: ${response.statusText}` });
    }
  } catch (error) {
    // Handle and log any errors
    console.error("Error fetching parts:", error);
    res.status(500).json({ error: `Error fetching parts: ${error.message}` });
  }
}
