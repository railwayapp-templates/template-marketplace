# Deploy Flowise | Build AI Agents [Postgres Included] on Railway

[Mar '26] Low-code developer tool for building LLM Applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/flowise-or-build-ai-agents-w-db)

## About

Flowise is your visual playground for building AI agents and workflows without writing code—just drag, drop, and connect your LLMs. Build chatbots that pull from your documents, chain AI calls together, or create custom workflows that talk to APIs. This template packages all that directly on Railway's infrastructure in one click.

Railway handles all the operational complexity—containerization, networking, SSL, scaling, uptime—so you can focus on building. No Docker knowledge needed. Click deploy and you're live in minutes with a working URL ready to go—plus your data stays safe with built-in PostgreSQL persistence.

---

Hosting Flowise on Railway is genuinely straightforward—probably the simplest way to get Flowise running in production. There are really only two variables you need to care about: your username and password. And here's the best part—they're already pre-configured for you. if you want to change them later, it takes literally 30 seconds. Your data is automatically saved to the integrated PostgreSQL database, so nothing is lost even if your instance restarts. Just hop into the Variables section of your Flowise node in the Railway dashboard, update whatever you want, and you're done.

This is truly one-click setup territory. You're not managing servers, databases, or complicated configurations. Railway handles all the operational heavy lifting while you focus on actually building your AI workflows. Deploy once, access it anywhere, modify settings whenever you need to. That's the whole philosophy here—get out of your own way and start creating.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FlowiseAI | `flowiseai/flowise` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | FlowiseAI | 8080 | Port where the Flowise web app listens for connections. |
| `LOG_PATH` | FlowiseAI | - | Path to save Flowise log files. |
| `API_KEY_PATH` | FlowiseAI | (secret) | Location to store API keys securely. |
| `DATABASE_HOST` | FlowiseAI | - | Hostname of the PostgreSQL database. |
| `DATABASE_NAME` | FlowiseAI | - | Name of the database Flowise uses. |
| `DATABASE_PORT` | FlowiseAI | - | Port to connect to PostgreSQL. |
| `DATABASE_TYPE` | FlowiseAI | postgres | Type of database Flowise is connecting to. |
| `DATABASE_USER` | FlowiseAI | (secret) | Username for PostgreSQL authentication. |
| `SECRETKEY_PATH` | FlowiseAI | (secret) | Path to store encryption keys for Flowise securely. |
| `FLOWISE_PASSWORD` | FlowiseAI | (secret) | Default passwordfor Flowise login. Can be changed in variables. |
| `FLOWISE_USERNAME` | FlowiseAI | (secret) | Default username for Flowise login. Can be changed in variables. |
| `BLOB_STORAGE_PATH` | FlowiseAI | - | Path to store uploaded files, models, and binary data. |
| `DATABASE_PASSWORD` | FlowiseAI | (secret) | Password for PostgreSQL authentication. |
| `POSTGRES_DB` | Postgres | railway | The main PostgreSQL database name. |
| `DATABASE_URL` | Postgres | - | Connection URL for internal access. |
| `POSTGRES_USER` | Postgres | (secret) | Default user created for database access (postgres) |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for PostgreSQL user. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public-facing URL for the PostgreSQL database. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/flowise-or-build-ai-agents-w-db)
