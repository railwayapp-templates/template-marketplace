# Deploy Play Games on Railway

Self Host custom html5,threejs game,admin dashbord added

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/playgames)

## About

PlayGames is a full-stack browser gaming platform built with Next.js 14, TypeScript, Three.js, Prisma ORM, and Tailwind CSS. It provides native 3D WebGL games, multi-screen gaming, an AI Gaming Buddy, dynamic themes, player authentication, developer game submissions, game moderation, analytics, and a Super Admin dashboard.

Hosting PlayGames on Railway requires a Next.js application service and PostgreSQL database. The included multi-stage Dockerfile packages the application for production, while Railway manages deployment, infrastructure, environment variables, public networking, and HTTPS. PostgreSQL stores persistent application data including users, games, categories, ratings, favorites, moderation data, and site configuration through Prisma ORM. The application listens on port `3000` and can be exposed through a Railway-generated HTTPS domain. Configure the required database and authentication variables before the first production deployment, then initialize the Prisma schema and seed the default application data. No persistent Railway Volume is documented as required because application data is stored in PostgreSQL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PlayGames | [bilalnawaz072/PlayGames](https://github.com/bilalnawaz072/PlayGames) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | PlayGames | 3000 | - |
| `HOSTNAME` | PlayGames | 0.0.0.0 | - |
| `ENODE_ENV` | PlayGames | production | - |
| `ADMIN_NAME` | PlayGames | Super Admin | - |
| `JWT_SECRET` | PlayGames | (secret) | - |
| `ADMIN_EMAIL` | PlayGames | admin@gamevault.com | - |
| `ADMIN_PASSWORD` | PlayGames | (secret) | - |
| `NEXT_TELEMETRY_DISABLED` | PlayGames | 1 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/playgames)
