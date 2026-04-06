const express = require("express");
const path = require("path");

const app = express();

// Middleware de log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString()
  });
});

// Route de test d'erreur
app.get("/error-test", (req, res) => {
  throw new Error("Erreur volontaire pour test monitoring");
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur capturée :", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

// Port Azure / local
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});