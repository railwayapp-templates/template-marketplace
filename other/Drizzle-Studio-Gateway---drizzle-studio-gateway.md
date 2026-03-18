# Deploy Drizzle Studio Gateway on Railway

Deploy Drizzle Studio Gateway with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/drizzle-studio-gateway)

## About

Drizzle Gateway is a self-hosted, browser-based interface for exploring and managing your database schema using the Drizzle ORM ecosystem.
It acts as a gateway between your database and Drizzle Studio’s frontend, enabling secure connections, schema introspection, and query execution directly from your own infrastructure instead of relying on a public service.

Hosting Drizzle Gateway means deploying a small React.js/Node.js service that exposes the Drizzle Studio UI connected to your database.
This service communicates securely with your database, making it accessible only via your Railway environment (or with controlled public access).

With this Railway deployment template, you get:

- An **admin (master) password** for full unrestricted access.
- Ability to **set separate user password** with limited access.
- **Multiple database connections** in a single instance.
- **Persistent storage** for configurations and session data.

Once deployed, you can use Drizzle Studio in your browser to explore, query, and modify your database, all within a private, self-controlled environment.
Railway’s hosting takes care of deployment, scaling, and uptime so you can focus on database management without local setups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Drizzle Gateway | `ghcr.io/drizzle-team/gateway:latest` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `MASTERPASS` | The admin password for secure access |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Other

[View on Railway →](https://railway.com/template/drizzle-studio-gateway)
