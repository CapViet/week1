"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const requireAuth_1 = require("./middleware/requireAuth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
const { OIDC_ISSUER, OIDC_CLIENT_ID, OIDC_CLIENT_SECRET, OIDC_REDIRECT_URI, FRONTEND_URL, JWT_SECRET, } = process.env;
if (!OIDC_ISSUER ||
    !OIDC_CLIENT_ID ||
    !OIDC_CLIENT_SECRET ||
    !OIDC_REDIRECT_URI ||
    !FRONTEND_URL ||
    !JWT_SECRET) {
    throw new Error("Missing required env variables");
}
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        FRONTEND_URL,
        "http://localhost:5173",
        "https://week1-nu.vercel.app",
    ],
    credentials: true,
}));
// --------------------
// HEALTH
// --------------------
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
// --------------------
// 1) REDIRECT TO MINDX LOGIN
// --------------------
app.get("/auth/login", (_req, res) => {
    const params = qs_1.default.stringify({
        client_id: OIDC_CLIENT_ID,
        response_type: "code",
        scope: "openid profile email",
        redirect_uri: OIDC_REDIRECT_URI,
    });
    res.redirect(`${OIDC_ISSUER}/auth?${params}`);
});
// --------------------
// 2) CALLBACK FROM MINDX
// --------------------
app.get("/auth/callback", async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send("Missing code");
    }
    try {
        const tokenRes = await axios_1.default.post(`${OIDC_ISSUER}/token`, qs_1.default.stringify({
            grant_type: "authorization_code",
            code,
            redirect_uri: OIDC_REDIRECT_URI,
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
                username: OIDC_CLIENT_ID,
                password: OIDC_CLIENT_SECRET,
            },
        });
        const idToken = tokenRes.data.id_token;
        const decoded = jsonwebtoken_1.default.decode(idToken);
        const appToken = jsonwebtoken_1.default.sign({
            id: decoded.sub,
            email: decoded.email || "",
            name: decoded.name || "MindX User",
        }, JWT_SECRET, { expiresIn: "1h" });
        res.redirect(`${FRONTEND_URL}/login-success?token=${appToken}`);
    }
    catch (err) {
        console.error("OIDC TOKEN ERROR:", err.response?.data || err.message);
        res.status(500).send("OIDC login failed");
    }
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
app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on port ${PORT}`);
});
