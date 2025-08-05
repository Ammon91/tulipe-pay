import express from "express";
import dotenv from "dotenv";
import webhook from "./webhook.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.post("/webhook", webhook); // M-Pesa will send callbacks here
app.get("/", (req, res) => res.send("✅ Tulipe API is running"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
