"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRedirect = loginRedirect;
exports.callback = callback;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ISSUER = process.env.OIDC_ISSUER;
const CLIENT_ID = process.env.OIDC_CLIENT_ID;
const CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET;
const REDIRECT_URI = process.env.OIDC_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;
// 🔐 Step 1: Redirect user to MindX OpenID
function loginRedirect(req, res) {
    const url = `${ISSUER}/oauth2/authorize` +
        `?client_id=${CLIENT_ID}` +
        `&response_type=code` +
        `&scope=openid profile email` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    res.redirect(url);
}
// 🔐 Step 2: OpenID callback
async function callback(req, res) {
    try {
        const code = req.query.code;
        if (!code) {
            return res.status(400).json({ error: "Missing auth code" });
        }
        const tokenRes = await axios_1.default.post(`${ISSUER}/oauth2/token`, new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }), { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
        const idToken = tokenRes.data.id_token;
        const payload = jsonwebtoken_1.default.decode(idToken);
        const appToken = jsonwebtoken_1.default.sign({ user: payload }, JWT_SECRET, { expiresIn: "1h" });
        // send user back to frontend
        res.redirect(`http://20.239.116.30/?token=${appToken}`);
    }
    catch (err) {
        console.error("OpenID callback failed:", err);
        res.status(500).json({ error: "Authentication failed" });
    }
}
