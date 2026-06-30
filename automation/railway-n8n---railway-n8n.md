# Deploy railway-n8n on Railway

Deploy n8n workflow automation on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-n8n)

## About

The n8n Docker image runs a Node.js application that listens on port `5678`. The persistent storage path is `/home/node/.local/share/n8n`, which stores workflows, credentials, and the SQLite database. On Railway, volumes persist across deployments unless explicitly removed — your data stays safe through redeployments and environment changes.

Key considerations:
- **Encryption key**: `N8N_ENCRYPTION_KEY` encrypts all stored credentials in your workflows. Set this once on first deploy and never change it — losing it means every encrypted credential becomes unreadable.
- **Port configuration**: Railway may inject a different `PORT` variable; always explicitly configure n8n to listen on port `5678` via the `N8N_PORT` environment variable or Docker build config.
- **Scaling**: For production workloads beyond single-instance capacity, connect a PostgreSQL database via `DB_TYPE=postgresdb` and use service bindings for secure database access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-n8n | [INAPP-Mobile/railway-n8n](https://github.com/INAPP-Mobile/railway-n8n) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `N8N_BASIC_AUTH_USER` | (secret) |
| `N8N_BASIC_AUTH_PASSWORD` | (secret) |

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/railway-n8n)
