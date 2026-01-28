import express from "express";
import cors from "cors";

const app = express();

const PORT = Number(process.env.PORT) || 8080;

// 🔐 CORS — THIS IS THE FIX
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://week1-nu.vercel.app" // keep if using Vercel
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// 🔁 Handle preflight explicitly
app.options("*", cors());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// (keep your protected route if you have one)
// app.get("/protected", authMiddleware, ...)

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});
