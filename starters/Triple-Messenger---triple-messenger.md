# Deploy Triple Messenger on Railway

Commencer ta journée ici !

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/triple-messenger)

## About

# 𝕏 Clone - Projet Chef-d'œuvre Kadea

> **🚀 Lien de l'application en ligne :** [https://ton-projet.up.railway.app](https://ton-projet.up.railway.app)

## # Deploy and Host 𝕏 Clone on Railway
Ce dépôt contient le code source d'un clone fonctionnel de la plateforme 𝕏 (Twitter). L'application est optimisée pour un déploiement rapide sur Railway, offrant une expérience utilisateur fluide avec une gestion complète des tweets, des profils et des interactions sociales.

## ## About Hosting 𝕏 Clone
L'hébergement de cette application repose sur une architecture robuste et moderne. Le serveur d'application tourne sur **Railway**, ce qui permet une intégration continue (CI/CD) : chaque modification sur GitHub est automatiquement déployée. Pour la persistance des données, l'application est connectée à une base de données **PostgreSQL hébergée sur Render**. Cette séparation permet de bénéficier du meilleur des deux plateformes : la rapidité de déploiement de Railway et la fiabilité du stockage de Render.

## ## Why Deploy 𝕏 Clone on Railway?
Railway est la plateforme idéale pour ce projet car elle simplifie la gestion des variables d'environnement et du cycle de vie de l'application Node.js. En déployant ce clone sur Railway, on s'affranchit des configurations complexes de serveur (Nginx, SSL, etc.) tout en garantissant que l'application reste évolutive (scaling) et sécurisée par défaut.

## ## Common Use Cases
- **Démonstration Académique :** Présentation du projet final (Chef-d'œuvre) à la Kadea Academy.
- **Portfolio Professionnel :** Showcase de compétences en développement Full-Stack (AdonisJS, Lucid ORM, PostgreSQL).
- **Base d'apprentissage :** Modèle pour comprendre l'implémentation de relations complexes (Follows, Likes, Reposts) dans un réseau social.

## ## Dependencies for 𝕏 Clone Hosting
- **Node.js v20+** : Environnement d'exécution pour le framework AdonisJS.
- **PostgreSQL** : Système de gestion de base de données relationnelle (hébergé sur Render).
- **Redis (Optionnel)** : Pour la gestion avancée du cache ou des files d'attente.

### ### Deployment Dependencies
- **[Railway Account](https://railway.app/)** : Pour l'hébergement du serveur web.
- **[Render Account](https://render.com/)** : Pour l'hébergement de la base de données PostgreSQL.
- **[GitHub Repository](https://github.com/)** : Pour le stockage du code et le déclenchement du déploiement.

---

## 🛠 Détails d'implémentation
L'application utilise **AdonisJS v6/v7** avec le moteur de template **EdgeJS**. La sécurité est assurée par le middleware **Shield** (protection CSRF, XSS) et l'authentification est gérée via le système de session natif.

## 🔑 Identifiants de test pour le Jury
- **Email :** `test@kadea.cd`
- **Mot de passe :** `password123`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Triple Messenger | [kadea-academy-learners/capstone-x-clone-adonis-MrAlphan](https://github.com/kadea-academy-learners/capstone-x-clone-adonis-MrAlphan) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `HOST` | 127.0.0.1 |
| `PORT` | 3333 |
| `APP_KEY` | d3CleJg3PPJokowwzhBMKSWRtDf4Ydl1 |
| `APP_URL` | http://127.0.0.1:3333 |
| `DB_HOST` | localhost |
| `DB_PORT` | 5432 |
| `DB_USER` | (secret) |
| `NODE_ENV` | development |
| `LOG_LEVEL` | info |
| `DB_DATABASE` | capstone_x_alphan |
| `DB_PASSWORD` | (secret) |
| `SESSION_DRIVER` | cookie |

## Configuration

- **Start command:** `node build/bin/server.js`

**Category:** Starters · **Languages:** Edge, TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/triple-messenger)
