import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";

const app = express();

const PORT = Number(process.env.PORT) || 8080;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// --------------------
// Global types
// --------------------
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

// --------------------
// Middleware
// --------------------
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://week1-nu.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight
app.options("*", cors());

// --------------------
// Auth middleware
// --------------------
function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = header.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// --------------------
// Routes
// --------------------
app.get("/", (_req: Request, res: Response) => {
  res.send("Week1 API running 🚀");
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// 🔐 Fake login (temporary)
app.post("/auth/login", (_req: Request, res: Response) => {
  const token = jwt.sign(
    { id: "demo-user", name: "Demo User" },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// 🔐 Placeholder OpenID callback
app.get("/auth/callback", (_req: Request, res: Response) => {
  res.json({
    message: "OpenID callback endpoint (not wired yet)",
  });
});

// 🔒 Protected route
app.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user,
  });
});

// --------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});