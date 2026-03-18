# Deploy Karakeep on Railway

A self-hostable bookmark-everything app with AI and full text search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/karakeep)

## About

Karakeep is a self-hostable “bookmark-everything” application for saving links, notes, images, PDFs, and more, enriched with AI-based automatic tagging and full‑text search—ideal for building a personal, organized archive of digital content under your own control

Hosting Karakeep involves setting up the application’s backend, frontend, and worker services (for tasks like crawling, archiving, and AI tagging), along with a search engine like Meilisearch and persistent data storage. You can deploy either a single all‑in‑one Docker container or separate containers for web, worker, crawling, and search components. Railway handles infrastructure provisioning, scaling, and configuration, letting you focus on environment variables, Docker registry access, and optional integrations like OpenAI or Ollama models.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.13.3` | Database |
| browserless | [railwayapp-templates/browserless-v2](https://github.com/railwayapp-templates/browserless-v2) | Worker |
| karakeep | `ghcr.io/karakeep-app/karakeep:release` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | meilisearch | 3331 |
| `MEILI_ENV` | meilisearch | production |
| `MEILI_DB_PATH` | meilisearch | /meili_data/data.ms |
| `MEILI_HTTP_ADDR` | meilisearch | :::3331 |
| `NEXTAUTH_SECRET` | meilisearch | (secret) |
| `MEILI_NO_ANALYTICS` | meilisearch | true |
| `CORS` | browserless | true |
| `TOKEN` | browserless | (secret) |
| `QUEUED` | browserless | 10 |
| `TIMEOUT` | browserless | 300000 |
| `CONCURRENT` | browserless | 10 |
| `BROWSER_TOKEN` | browserless | (secret) |
| `BROWSER_PORT_PRIVATE` | browserless | 3001 |
| `DATA_DIR` | karakeep | /data |
| `OPENAI_API_KEY` | karakeep | (secret) |
| `DISABLE_SIGNUPS` | karakeep | false |
| `NEXTAUTH_SECRET` | karakeep | (secret) |

## Configuration

- **Volume:** `/meili_data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/karakeep)
