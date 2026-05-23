# Deploy INCUBATEURIA - BOT on Railway

Deploy and Host INCUBATEURIA - IMG DOCKER with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/incubateuria-img-docker)

## About

Imagine ton agence entière qui tourne depuis un seul serveur Discord. INCUBATEURIA rend ça réel, en un clic. Invite le bot sur un serveur vierge : un assistant guidé construit automatiquement toute ta structure (catégories, salons, rôles, permissions), puis prend les commandes du recrutement, de l'onboarding et de la génération de contenu par IA. Recruter tes talents et produire ton contenu, enfin au même endroit.

Une usine à contenu IA, branchée sur ton serveur

Des carrousels d'images générés par IA, calés sur la personnalité de chacun de tes modèles, pas du contenu générique, le sien.

Des vidéos dans le même esprit, fidèles à l'identité de chaque modèle, prêtes à publier.

Des customs à la demande (photo, vidéo ou audio sur mesure) livrés en quelques secondes, en automatique ou sur validation d'un manager. Le client demande, le bot produit.
Un recruteur IA qui ne dort jamais

Un chatbot qui incarne un vrai client et met chaque candidat en situation réelle, à toute heure.
Une IA qui analyse la conversation et trie les profils toute seule tu ne vois plus que les meilleurs.
Le contrôle absolu

Des permissions complètes et granulaires : chaque rôle voit et fait exactement ce que tu décides.

Un seul cockpit pour générer ton contenu et piloter tes équipes. Fini les dix outils éparpillés.

Zéro prise de tête : le bot tourne en continu à partir d'une image Docker prête à l'emploi, aucun code à modifier, aucune étape de build. Au premier lancement, il crée un salon privé #setup et te guide pas à pas, directement dans Discord (clé de licence, branding, équipes, clés API IA). 

En quelques minutes, tu passes d'un serveur vide à une agence pleinement opérationnelle, sans jamais quitter Discord.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| INCUBATEURIA - DISOCRD | `ghcr.io/estebane57/incubateur-ia-bot:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_ENV` | production |
| `CONFIG_DIR` | /data |
| `DISCORD_TOKEN	` | (secret) |
| `DISCORD_CLIENT_ID` | colle-ici-ton-application-id |
| `LICENSE_SERVER_URL	` | https://server.incubateuria.fr |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/incubateuria-img-docker)
