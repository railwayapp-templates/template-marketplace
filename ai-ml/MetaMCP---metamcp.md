# Deploy MetaMCP on Railway

Self-hosted MCP gateway — aggregate all your MCP servers in one place.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metamcp)

## About

MetaMCP is a self-hosted MCP aggregator, orchestrator, middleware, and gateway in one Docker container. It manages multiple MCP servers through a single GUI, aggregating tools, prompts, and resources into unified endpoints that any MCP client can connect to — Claude Desktop, Cursor, Windsurf, or anything that speaks MCP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eG1rpS?referralCode=4pD7Sc&amp;utm_medium=integration&amp;utm_source=template&amp;utm_campaign=generic)

Deploying MetaMCP requires two services: the MetaMCP application container (`ghcr.io/metatool-ai/metamcp:latest`) and a PostgreSQL database for persistent storage. The application runs both the web GUI (Next.js) and the MCP proxy engine (Express) in a single container. Seven environment variables configure the MetaMCP service — three are auto-generated secrets, two reference the public domain, one points to Postgres, and one sets the Node environment. Postgres needs a persistent volume at `/var/lib/postgresql/data`. Once deployed, you register the first account through the web UI (there is no default admin), generate an API key, and point your MCP clients at the Railway URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Metamcp | `ghcr.io/metatool-ai/metamcp:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot. |
| `DATABASE_URL` | Postgres | - | Internal connection string. Do not edit. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser name created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated password. Do not change after first deploy. |
| `DATABASE_PUBLIC_URL` | Postgres | - | External connection string via TCP proxy. Do not edit. |
| `APP_URL` | Metamcp | - |  Public URL of the app. CORS enforced — only this URL can access it. |
| `NODE_ENV` | Metamcp | production |  Leave as production. |
| `LOG_LEVEL` | Metamcp | warn |  Console verbosity: error, warn, info, or debug. |
| `DATABASE_URL` | Metamcp | - |  Auto-configured Postgres connection. Do not edit. |
| `ENCRYPTION_KEY` | Metamcp | - |  Encrypts API keys and credentials. Do not change after first deploy. |
| `BETTER_AUTH_URL` | Metamcp | - |  Must match APP_URL. Used for session cookies and redirects. |
| `BETTER_AUTH_SECRET` | Metamcp | (secret) |  Signs auth tokens. Do not change after first deploy. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/metamcp)
