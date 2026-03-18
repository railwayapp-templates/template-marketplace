# Deploy Open Notebook on Railway

Deploy and Host Open Notebook with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-notebook)

## About

> When you finish deploying and testing, feel free to set your password  in the `open-notebook` service with the `OPEN_NOTEBOOK_PASSWORD` environment variable and redeploy.

Open Notebook is a privacy-focused, open-source alternative to Google's Notebook LM. It lets you organize research, chat with AI using your content as context, and generate professional multi-speaker podcasts—all while supporting 16+ AI providers and keeping your data under your control.

![Open Notebook Interface](https://raw.githubusercontent.com/lfnovo/open-notebook/refs/heads/main/docs/assets/asset_list.png)

Deploying Open Notebook involves running a Docker container that bundles the Next.js/React frontend, FastAPI backend, and SurrealDB database. The application exposes two ports: 8502 for the web interface and 5055 for the REST API. You'll need to configure environment variables for your preferred AI provider (OpenAI, Anthropic, Ollama, etc.) and database credentials. Railway simplifies this by managing the container orchestration, persistent storage for your notebooks and database, and networking configuration automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | [monotykamary/railway-open-notebook-caddy-proxy](https://github.com/monotykamary/railway-open-notebook-caddy-proxy) | Web service |
| open-notebook | `lfnovo/open_notebook:v1-latest` | Database |
| surrealdb | `surrealdb/surrealdb` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | proxy | 80 | Default exposed port |
| `API_ENDPOINT` | proxy | - | Private API endpoint |
| `WEB_ENDPOINT` | proxy | - | Private web endpoint |
| `API_URL` | open-notebook | - | Public API URL for the open_notebook service |
| `SURREAL_URL` | open-notebook | - | WebSocket URL to connect to SurrealDB (references surrealdb service) |
| `SURREAL_USER` | open-notebook | (secret) | Database username (references surrealdb service) |
| `OPENAI_API_KEY` | open-notebook | (secret) | Your OpenAI API key |
| `SURREAL_DATABASE` | open-notebook | open_notebook | SurrealDB database name |
| `SURREAL_PASSWORD` | open-notebook | (secret) | Database password (references surrealdb service) |
| `SURREAL_NAMESPACE` | open-notebook | open_notebook | SurrealDB namespace |
| `PORT` | surrealdb | - | The internal port railway will route external traffic to |
| `SURREAL_LOG` | surrealdb | trace | The logging level for the database server |
| `SURREAL_URL` | surrealdb | - | Public database URL |
| `SURREAL_BIND` | surrealdb | - | The hostname or ip address to listen for connections on |
| `SURREAL_HOST` | surrealdb | - | Public database hostname |
| `SURREAL_PASS` | surrealdb | - | The password for the initial database user |
| `SURREAL_PATH` | surrealdb | - | Database path used for storing data |
| `SURREAL_PORT` | surrealdb | 443 | Public database port |
| `SURREAL_USER` | surrealdb | (secret) | The username for the initial database user |
| `SURREAL_HTTP_URL` | surrealdb | - | (no description provided) |
| `SURREAL_PRIVATE_URL` | surrealdb | - | Private database URL |
| `SURREAL_PRIVATE_HOST` | surrealdb | - | Private database hostname |
| `SURREAL_PRIVATE_PORT` | surrealdb | 8000 | The Private port that Surreal runs on |
| `SURREAL_CAPS_ALLOW_ALL` | surrealdb | true | Allow all capabilities |
| `SURREAL_HTTP_PRIVATE_URL` | surrealdb | - | Private Railway URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Start command:** `/surreal start --deny-guests --no-banner`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/open-notebook)
