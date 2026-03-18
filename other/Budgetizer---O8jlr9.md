# Deploy Budgetizer on Railway

Application web de gestion de finances personnelles et suivi de dépenses.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/O8jlr9)

## About

# Budget App

Une application web moderne de gestion de finances personnelles construite avec Next.js 15. 

## Fonctionnalités Principales
- Tableau de bord avec visualisation des dépenses et revenus
- Suivi des dépenses par catégories
- Gestion des dépenses récurrentes
- Interface responsive adaptée mobile et desktop
- Authentification sécurisée
- Thème clair/sombre

## Stack Technique
- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui
- **Backend**: API Routes Next.js, Prisma ORM
- **Base de données**: PostgreSQL
- **Authentification**: NextAuth.js

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| budgetapp | [McSon2/budgetapp](https://github.com/McSon2/budgetapp) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXTAUTH_URL` | budgetapp | - | URL ex : https://RAILWAY_PUBLIC_DOMAIN |
| `NEXTAUTH_SECRET` | budgetapp | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/O8jlr9)
