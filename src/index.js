import dotenv from "dotenv/config";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

//test api
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 