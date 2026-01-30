import express from "express";
import cors from "cors";

const app = express();

const PORT = Number(process.env.PORT) || 8080;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://week1-nu.vercel.app" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/protected", (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: "Missing token" });
  }

  res.json({ message: "Protected" });
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});


