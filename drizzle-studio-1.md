# Deploy Drizzle Studio on Railway

Deploy Drizzle Studio with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/drizzle-studio-1)

## About

Drizzle Studio on Railway is a self-hosted, browser-based interface for exploring and managing your database schema using the Drizzle ORM ecosystem.
It acts as a gateway between your database and Drizzle Studio’s frontend, enabling secure connections, schema introspection, and query execution directly from your own infrastructure instead of relying on a public service.

Hosting Drizzle Studio means deploying a small React.js/Node.js service that exposes the Drizzle Studio UI connected to your database.
This service communicates securely with your database, making it accessible only via your Railway environment (or with controlled public access).

Once deployed, you can use Drizzle Studio in your browser to explore, query, and modify your database, all within a private, self-controlled environment.
Railway’s hosting takes care of deployment, scaling, and uptime so you can focus on database management without local setups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Drizzle Studio | `ghcr.io/drizzle-team/railway-studio:latest` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `PASSCODE` | The password for secure access |
| `DATABASE_URL` | Database connection string |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/drizzle-studio-1)
