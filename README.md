# 🚀 DevOps Azure Project with Full Monitoring

## 📌 Description

Ce projet met en place une chaîne DevOps professionnelle complète avec :

- Application Node.js / Express
- Conteneurisation Docker
- Déploiement Azure App Service
- CI/CD avec GitHub Actions
- Infrastructure as Code avec Terraform
- Monitoring complet avec :
  - Application Insights
  - Log Analytics Workspace
  - Alertes Azure Monitor
  - Health checks
  - Logs applicatifs

---

## 🏗️ Architecture

![Azur Architecture](docs/images/architecture.png)

## Technologies utilisées

- Node.js
- Express
- Docker
- GitHub Actions
- Azure App Service
- Terraform
- Azure Application Insights
- Azure Log Analytics
- Azure Monitor

1. Prérequis

Avant de commencer, il faut avoir :

- un compte Azure
- Azure CLI installé
- Terraform installé
- Docker installé
- Node.js installé
- un dépôt GitHub

2. Lancer l’application en local

- cd app
- npm install
- node app.js

Tester :

- http://localhost:3000
- http://localhost:3000/health

3. Docker

Construire l’image
- docker build -t devops-app -f docker/Dockerfile .
- Lancer le conteneur
- docker run -p 3000:3000 devops-app

4. Déployer l’infrastructure Azure avec Terraform

Initialiser Terraform

- cd terraform
- terraform init
- terraform plan
- terraform apply

Terraform crée :

- Resource Group
- App Service Plan
- Linux Web App
- Log Analytics Workspace
- Application Insights
- Azure Monitor Action Group
- Alertes CPU / temps de réponse / disponibilité

5. Configurer GitHub Actions

Dans GitHub :

ouvrir le dépôt

- aller dans Settings > Secrets and variables > Actions
- ajouter le secret :
- AZURE_WEBAPP_PUBLISH_PROFILE

Ce secret contient le Publish Profile de l’application Azure.

6. CI/CD

À chaque push sur la branche main, le pipeline exécute :

- checkout du code
- installation des dépendances
- lancement des tests
- build Docker
- déploiement Azure

7. Monitoring complet

7.1 Application Insights

Permet de suivre :

- requêtes HTTP
- temps de réponse
- erreurs
- exceptions
- événements personnalisés
- traces applicatives

7.2 Log Analytics Workspace

Centralise les logs et métriques Azure.

7.3 Azure Monitor Alerts

Des alertes sont configurées sur :

- CPU élevée
- temps de réponse trop long
- disponibilité faible

7.4 Healthcheck

L’endpoint /health permet à Azure de vérifier que l’application répond correctement.

Exemple :

curl http://localhost:3000/health

Réponse attendue :

{
  "status": "UP",
  "timestamp": "2026-03-30T10:00:00.000Z"
}

7.5 Logs applicatifs

Chaque requête est loguée dans la console et envoyée à Application Insights.

8. Tester les erreurs

Pour tester la remontée d’erreurs dans Application Insights :

- GET /error-test

Cela génère volontairement une exception.

9. Vérifications après déploiement

Dans Azure Portal, vérifier :

- Web App disponible
- Health check actif
- Application Insights connecté
- Logs visibles
- alertes créées
- métriques collectées

10. Améliorations possibles

- tests unitaires réels avec Jest
- déploiement multi-environnements (dev / prod)
- slots de déploiement Azure
- dashboards Azure Monitor
- disponibilité avec tests synthétiques
- gestion des secrets via Azure Key Vault
- conteneurisation dans Azure Container Registry
- Kubernetes avec AKS

11. Valeur professionnelle du projet

Ce projet démontre :

- CI/CD moderne
- déploiement cloud sur Azure
- Infrastructure as Code
- observabilité applicative
- supervision et alerting
- bonnes pratiques DevOps

👨‍💻 Auteur

Fischer KOUEBENA BANKAZI
- Ingénieure cloud AZUR
