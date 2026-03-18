# Deploy Drizzle Studio (Gateway) on Railway

Drizzle Studio (Gateway) (w/Password + persistent storage) with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/drizzle-studio-gateway-1)

## About

**What is Drizzle Studio (Gateway)?**  
Drizzle Studio (Gateway) is a self-hosted, browser-based interface for exploring and managing your database schema using the Drizzle ORM ecosystem. It acts as a gateway between your database and Drizzle Studio’s frontend, enabling secure connections, schema introspection, and query execution directly from your own infrastructure instead of relying on a public service.

---

Hosting Drizzle Studio (Gateway) means deploying a small React.js/Node.js service that exposes the Drizzle Studio UI connected to your database. This service communicates securely with your database, making it accessible only via your Railway environment (or with controlled public access). You’ll need to configure environment variables such as database credentials and Drizzle schema paths.

With this Railway deployment template, you get:
- An **admin (master) password** for full unrestricted access.
- Ability to **set separate user passwords** with limited access.
- **Multiple database connections** in a single instance.
- **Persistent storage** for configurations and session data.

Once deployed, you can use Drizzle Studio in your browser to explore, query, and modify your database, all within a private, self-controlled environment. Railway’s hosting takes care of deployment, scaling, and uptime so you can focus on database management without local setups.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Drizzle Studio | `ghcr.io/drizzle-team/gateway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4983 |
| `MASTERPASS` | M@sterPassw0rd |
| `STORE_PATH` | /app |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Other

[View on Railway →](https://railway.com/template/drizzle-studio-gateway-1)
