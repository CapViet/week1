"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8080;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
// --------------------
// Middleware
// --------------------
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://week1-nu.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Preflight
app.options("*", (0, cors_1.default)());
// --------------------
// Auth middleware
// --------------------
function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Missing token" });
    }
    const token = header.replace("Bearer ", "");
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid token" });
    }
}
// --------------------
// Routes
// --------------------
app.get("/", (_req, res) => {
    res.send("Week1 API running 🚀");
});
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
// 🔐 Fake login (temporary)
app.post("/auth/login", (_req, res) => {
    const token = jsonwebtoken_1.default.sign({ id: "demo-user", name: "Demo User" }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});
// 🔐 Placeholder OpenID callback
app.get("/auth/callback", (_req, res) => {
    res.json({
        message: "OpenID callback endpoint (not wired yet)",
    });
});
// 🔒 Protected route
app.get("/protected", requireAuth, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user,
    });
});
// --------------------
app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on port ${PORT}`);
});
