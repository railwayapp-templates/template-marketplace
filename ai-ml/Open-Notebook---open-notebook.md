# Deploy Open Notebook on Railway

Private AI research workspace with chat and podcast generation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-notebook)

## About

Open Notebook is a privacy-focused, open-source research workspace for organizing sources, chatting with AI over your content, and generating multi-speaker podcasts.

This template deploys Open Notebook `1.14.0`, SurrealDB `2.6.5`, and a Caddy `2.11.4` proxy. The proxy is the only public application entry point and routes the web interface and API through one HTTPS origin. Open Notebook connects to SurrealDB over Railway private networking.

The application volume persists local Open Notebook data at `/app/data`, while SurrealDB stores its database on a separate volume at `/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | [monotykamary/railway-open-notebook-caddy-proxy](https://github.com/monotykamary/railway-open-notebook-caddy-proxy) | Web service |
| open-notebook | `lfnovo/open_notebook:1.14.0` | Database |
| surrealdb | `surrealdb/surrealdb:v2.6.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | proxy | 80 | Default exposed port |
| `API_ENDPOINT` | proxy | - | Private API endpoint |
| `WEB_ENDPOINT` | proxy | - | Private web endpoint |
| `API_URL` | open-notebook | - | Public API URL for the open_notebook service |
| `SURREAL_URL` | open-notebook | - | WebSocket URL to connect to SurrealDB (references surrealdb service) |
| `CORS_ORIGINS` | open-notebook | - | Allow browser API requests only from the public proxy origin. |
| `SURREAL_USER` | open-notebook | (secret) | Database username (references surrealdb service) |
| `OPENAI_API_KEY` | open-notebook | (secret) | Your OpenAI API key |
| `SURREAL_DATABASE` | open-notebook | open_notebook | SurrealDB database name |
| `SURREAL_PASSWORD` | open-notebook | (secret) | Database password (references surrealdb service) |
| `SURREAL_NAMESPACE` | open-notebook | open_notebook | SurrealDB namespace |
| `OPEN_NOTEBOOK_ENCRYPTION_KEY` | open-notebook | - | Generated key used to encrypt provider credentials at rest. |
| `PORT` | surrealdb | - | The internal port railway will route external traffic to |
| `SURREAL_LOG` | surrealdb | info | The logging level for the database server |
| `SURREAL_BIND` | surrealdb | - | The hostname or ip address to listen for connections on |
| `SURREAL_PASS` | surrealdb | - | The password for the initial database user |
| `SURREAL_PATH` | surrealdb | - | Database path used for storing data |
| `SURREAL_USER` | surrealdb | (secret) | The username for the initial database user |
| `SURREAL_PRIVATE_URL` | surrealdb | - | Private database URL |
| `SURREAL_PRIVATE_HOST` | surrealdb | - | Private database hostname |
| `SURREAL_PRIVATE_PORT` | surrealdb | 8000 | The Private port that Surreal runs on |
| `SURREAL_CAPS_ALLOW_ALL` | surrealdb | true | Allow all capabilities |
| `SURREAL_HTTP_PRIVATE_URL` | surrealdb | - | Private Railway URL |

## Configuration

- **Healthcheck:** `/api/config`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Start command:** `/surreal start --deny-guests --no-banner`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/open-notebook)
