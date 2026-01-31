"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOIDC = initOIDC;
exports.getOIDCClient = getOIDCClient;
const openid_client_1 = require("openid-client");
let oidcClient;
async function initOIDC() {
    const issuer = await openid_client_1.Issuer.discover(process.env.OIDC_ISSUER);
    oidcClient = new issuer.Client({
        client_id: process.env.OIDC_CLIENT_ID,
        client_secret: process.env.OIDC_CLIENT_SECRET,
        redirect_uris: [process.env.OIDC_REDIRECT_URI],
        response_types: ["code"],
    });
}
function getOIDCClient() {
    if (!oidcClient) {
        throw new Error("OIDC not initialized yet");
    }
    return oidcClient;
}
