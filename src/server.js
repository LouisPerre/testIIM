import express from "express";

const app = express();

app.get("/success", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.get("/health", (req, res) => {
  res.sendStatus(204);
});

app.get("/not-found", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.get("/forbidden", (req, res) => {
  res.status(403).json({ message: "Forbidden" });
});

// Middleware pour les endpoints inconnus
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
