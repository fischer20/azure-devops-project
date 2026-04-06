const express = require("express");
const path = require("path");

const app = express();

/**
 * Application Insights (optionnel et sécurisé)
 * -> Ne doit jamais faire planter l'application si la clé n'est pas définie
 */
try {
  const appInsights = require("applicationinsights");

  if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
    appInsights
      .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true, true)
      .start();

    console.log("Application Insights initialisé.");
  } else {
    console.log("Application Insights non configuré (pas de connection string).");
  }
} catch (error) {
  console.error("Erreur Application Insights :", error.message);
}

// Middleware de log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Route principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    app: "devops-azure-app"
  });
});

// Route de test d'erreur
app.get("/error-test", (req, res, next) => {
  next(new Error("Erreur volontaire pour test monitoring"));
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

// Démarrage serveur
app.listen(port, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${port}`);
});