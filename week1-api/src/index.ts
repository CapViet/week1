import express from "express";

const app = express();
const port = 3000;

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
