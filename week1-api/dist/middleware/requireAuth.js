"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not set in .env");
}
// 👇 Narrow type for TypeScript
const SECRET = JWT_SECRET;
function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing token" });
    }
    const token = header.replace("Bearer ", "");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(403).json({ error: "Invalid token" });
    }
}
