# Deploy Langflow | Visual AI Agent & RAG Builder with Postgres on Railway

Build AI agents, RAG and MCP servers visually. Login on, pinned, Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-production?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=langflow)

[Langflow](https://www.langflow.org) is a visual builder for AI agents, RAG pipelines and MCP servers. You drag components onto a canvas (models from any provider, prompts, vector stores, tools, other agents), connect them, test them in the playground, and every flow becomes an API endpoint and an MCP tool. It is open source (MIT) and written in Python, so you can drop into code for any component.

This template runs Langflow 1.12.6 with PostgreSQL on Railway, set up the way you'd run it for a team rather than on a laptop.

- **The login is on.** Langflow's own default is auto-login, which means no password: anyone who finds the URL is admin. Here auto-login is off, an `admin` account with a generated password is created on first boot, and public sign-up is closed.
- **Encryption that works.** The API keys and global variables you store in Langflow are encrypted with `LANGFLOW_SECRET_KEY`, generated in the 43-character format Langflow's encryption needs. Get that format wrong and storing a key fails with "Fernet key must be 32 url-safe base64-encoded bytes".
- **Pinned version.** The image is `langflowai/langflow:1.12.6`, not `latest`, so a redeploy never upgrades you by surprise. Upgrade by changing the tag (see below).
- **Nothing lost on redeploy.** Flows, users, messages and run history are in Postgres. Uploaded files and knowledge bases are on a Railway volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langflow | `langflowai/langflow:1.12.6` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Langflow | 7860 | Port Langflow listens on - leave as is. |
| `LANGFLOW_LOG_LEVEL` | Langflow | info | Log verbosity (debug, info, warning, error). |
| `LANGFLOW_SUPERUSER` | Langflow | admin | Admin username for the login page. |
| `LANGFLOW_AUTO_LOGIN` | Langflow | (secret) | Keep false. True turns off the login page, so anyone with the URL would get admin access. |
| `LANGFLOW_CONFIG_DIR` | Langflow | /app/langflow | Uploaded files, knowledge bases and logs, on the volume. |
| `LANGFLOW_SECRET_KEY` | Langflow | (secret) | Signs logins and encrypts the API keys and global variables you store in Langflow. 43 url-safe characters (32 bytes base64), as Langflow requires. Never change or lose it: stored keys can't be decrypted without it. |
| `LANGFLOW_DATABASE_URL` | Langflow | - | Flows, users, messages and run history live in Postgres. |
| `LANGFLOW_ACCESS_SECURE` | Langflow | true | Login cookies are HTTPS-only (Railway serves HTTPS). |
| `LANGFLOW_ENABLE_SIGNUP` | Langflow | false | Public sign-up on the login page. Leave false; turn it on briefly to let teammates register (see the template README). |
| `LANGFLOW_REFRESH_SECURE` | Langflow | true | Login cookies are HTTPS-only (Railway serves HTTPS). |
| `LANGFLOW_SUPERUSER_PASSWORD` | Langflow | (secret) | Admin password, generated at deploy. Find it here, under Variables. |
| `LANGFLOW_RATE_LIMIT_PER_MINUTE` | Langflow | 20 | Login attempts per minute. Railway's proxy makes every visitor look like one IP, so this is shared by everyone. |
| `POSTGRES_DB` | Postgres | langflow | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langflow-production)
