"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth_1 = require("./middleware/requireAuth");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8080;
// Load and validate secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment");
}
const SECRET = JWT_SECRET;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://week1-nu.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", (0, cors_1.default)());
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
    const token = jsonwebtoken_1.default.sign({ id: "demo-user", name: "Demo User" }, SECRET, { expiresIn: "5s" });
    res.json({ token });
});
// --------------------
// PROTECTED
// --------------------
app.get("/protected", requireAuth_1.requireAuth, (req, res) => {
    res.json({
        message: "Protected",
        user: req.user,
    });
});
// --------------------
// CURRENT USER
// --------------------
app.get("/api/me", requireAuth_1.requireAuth, (req, res) => {
    res.json(req.user);
});
// --------------------
app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on port ${PORT}`);
});
