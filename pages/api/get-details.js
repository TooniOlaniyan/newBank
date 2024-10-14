
import fs from "fs";
import path from "path";

const readDataFromFile = () => {
  const dataFilePath = path.join(process.cwd(), "data", "details.json");
  const jsonData = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(jsonData || "[]");
};

export default function handler(req, res) {
  const { userId } = req.query;
  
  if (req.method === "GET") {
    const users = readDataFromFile();
    const user = users.find(user => user.id === userId);
    console.log(user);
    

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
