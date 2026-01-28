"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8080;
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on port ${PORT}`);
});
