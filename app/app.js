const express = require("express");
const app = express();

// Middleware de log simple
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route principale
app.get("/", (req, res) => {
  res.send("Mon serveur Node.js fonctionne sur Azure 🚀");
});

// Route health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString()
  });
});

// Route de test d'erreur (utile pour Application Insights / logs)
app.get("/error-test", (req, res) => {
  throw new Error("Erreur volontaire pour test monitoring");
});

// Gestion simple des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur capturée :", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

// Très important pour Azure App Service
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});


