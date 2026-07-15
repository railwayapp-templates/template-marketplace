# Deploy Chirp Hookbox on Railway

Private live webhook inbox powered by Chirp and PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-hookbox)

## About

Chirp Hookbox is a private, self-hosted webhook inbox for capturing, inspecting, searching, and replaying HTTP requests. It combines a Chirp web service with Railway-managed PostgreSQL in one deployable template.

Hosting Chirp Hookbox on Railway gives you a durable request bin with a generated private ingress path, a token-protected administrator inbox, live request arrivals over server-sent events, and PostgreSQL persistence. Credential-shaped headers are irreversibly masked before storage, and request bodies are bounded to protect the service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [lbliii/chirp-hookbox](https://github.com/lbliii/chirp-hookbox) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `CHIRP_SECRET_KEY` | web | (secret) |
| `HOOKBOX_ADMIN_TOKEN` | web | (secret) |
| `CHIRP_SKIP_MIGRATIONS` | web | 1 |
| `HOOKBOX_INGRESS_TOKEN` | web | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Python, CSS, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/chirp-hookbox)
