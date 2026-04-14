import express from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.js";
import cors from "cors";
import https from "https";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", adminRoutes);

// ✅ Health Check Route (important)
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Server is alive 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Admin Service is running on port ${PORT}`);
});


// ✅ SELF PING (Render Sleep Fix)
const URL = process.env.RENDER_URL || "https://adminjanuary.onrender.com"; // your render url

if (URL) {
  setInterval(() => {
    https.get(`${URL}/ping`, (res) => {
      console.log("Self ping success:", res.statusCode);
    }).on("error", (err) => {
      console.log("Self ping error:", err.message);
    });
  }, 14 * 60 * 1000); // every 14 minutes
}