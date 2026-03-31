const express = require("express");
const app = express();

// Middleware de log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route principale
app.get("/", (req, res) => {
  res.send("Mon serveur Node.js fonctionne !");
});

// Route health
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});


