import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { requireAuth } from "./middleware/requireAuth";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

// Load and validate secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not set in environment");
}
const SECRET: string = JWT_SECRET;

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://week1-nu.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// --------------------
// HEALTH
// --------------------
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// --------------------
// LOGIN
// --------------------
app.post("/auth/login", (_req, res) => {
  const token = jwt.sign(
    { id: "demo-user", name: "Demo User" },
    SECRET,
    { expiresIn: "5s" }
  );

  res.json({ token });
});

// --------------------
// PROTECTED
// --------------------
app.get("/protected", requireAuth, (req, res) => {
  res.json({
    message: "Protected",
    user: (req as any).user,
  });
});

// --------------------
// CURRENT USER
// --------------------
app.get("/api/me", requireAuth, (req, res) => {
  res.json((req as any).user);
});

// --------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});
