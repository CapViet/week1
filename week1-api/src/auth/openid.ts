import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const ISSUER = process.env.OIDC_ISSUER as string;
const CLIENT_ID = process.env.OIDC_CLIENT_ID as string;
const CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.OIDC_REDIRECT_URI as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

// 🔐 Step 1: Redirect user to MindX OpenID
export function loginRedirect(req: Request, res: Response) {
  const url =
    `${ISSUER}/oauth2/authorize` +
    `?client_id=${CLIENT_ID}` +
    `&response_type=code` +
    `&scope=openid profile email` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  res.redirect(url);
}

// 🔐 Step 2: OpenID callback
export async function callback(req: Request, res: Response) {
  try {
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({ error: "Missing auth code" });
    }

    const tokenRes = await axios.post(
      `${ISSUER}/oauth2/token`,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const idToken = tokenRes.data.id_token;
    const payload = jwt.decode(idToken);

    const appToken = jwt.sign(
      { user: payload },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // send user back to frontend
    res.redirect(`http://20.239.116.30/?token=${appToken}`);
  } catch (err) {
    console.error("OpenID callback failed:", err);
    res.status(500).json({ error: "Authentication failed" });
  }
}