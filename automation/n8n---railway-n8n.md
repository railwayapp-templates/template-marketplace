# Deploy n8n on Railway

n8n — Workflow Automation Platform. 400+ integrations, visual editor.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-n8n)

## About

The n8n Docker image runs on port 5678. The volume at `/home/node/.n8n` persists workflows, credentials, and the SQLite database across deployments.

Key considerations:
- **Encryption key**: `N8N_ENCRYPTION_KEY` encrypts stored credentials. Set once and never change it.
- **Port**: Use `N8N_PORT` to configure the listen port.
- **Scaling**: For production workloads, add a PostgreSQL database via service bindings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-n8n | [INAPP-Mobile/railway-n8n](https://github.com/INAPP-Mobile/railway-n8n) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `N8N_PORT` | 5678 | Port n8n listens on (default: 5678, Railway auto-assigns) |
| `NODE_ENV` | production | Node.js environment (production for deploy) |
| `GENERIC_TIMEZONE` | UTC | Timezone for schedule-triggered nodes, e.g. America/New_York |
| `N8N_ENCRYPTION_KEY` | - | Encrypts credentials stored in workflows. Set once and never change. |
| `N8N_BASIC_AUTH_ACTIVE` | false | Enable HTTP basic auth on the n8n UI |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/railway-n8n)
