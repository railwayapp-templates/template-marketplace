# Deploy Arkenos on Railway

Composable orchestration layer for conversational AI infrastructure.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arkenos)

## About

Arkenos is an open-source composable orchestration layer for enterprise-grade conversational AI infrastructure. Build, deploy, and manage production voice agents with runtime compute, persistent memory, and full infrastructure control.

This template provides a **zero-configuration** deployment of the complete Arkenos stack. It automatically provisions and links 4 services:
- **Frontend Dashboard** (Next.js 16, React 19, Tailwind)
- **Backend API** (FastAPI, SQLAlchemy)
- **Agent Worker Worker** (Python, LiveKit Agents SDK)
- **PostgreSQL Database** (Auto-provisioned and wired)

Once all 4 services show as "Online", open your deployed **Frontend** URL and sign up to access the dashboard. Navigate to **Settings** to add your provider API keys (LiveKit, Resemble AI, Twilio, Google). The agent automatically detects the keys securely.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| arkenos-minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| arkenos-backend | [Arkenos-World/Arkenos](https://github.com/Arkenos-World/Arkenos) (root: /backend) | Web service |
| arkenos-agent | [Arkenos-World/Arkenos](https://github.com/Arkenos-World/Arkenos) (root: /agent) | Worker |
| arkenos-frontend | [Arkenos-World/Arkenos](https://github.com/Arkenos-World/Arkenos) (root: /frontend) | Web service |
| arkenos-db | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | arkenos-minio | 9000 |
| `MINIO_ROOT_USER` | arkenos-minio | (secret) |
| `MINIO_ROOT_PASSWORD` | arkenos-minio | (secret) |
| `PORT` | arkenos-backend | 8000 |
| `DEBUG` | arkenos-backend | false |
| `MINIO_BUCKET` | arkenos-backend | arkenos |
| `MINIO_USE_SSL` | arkenos-backend | false |
| `MINIO_ACCESS_KEY` | arkenos-backend | minioadmin |
| `MINIO_SECRET_KEY` | arkenos-backend | (secret) |
| `POSTGRES_PASSWORD` | arkenos-agent | (secret) |
| `NODE_VERSION` | arkenos-frontend | 20 |
| `POSTGRES_DB` | arkenos-db | railway |
| `POSTGRES_USER` | arkenos-db | (secret) |
| `POSTGRES_PASSWORD` | arkenos-db | (secret) |

## Configuration

- **Start command:** `minio server /data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `npm start`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, Python, CSS, Shell, Dockerfile, Batchfile, Mako, JavaScript

[View on Railway →](https://railway.com/deploy/arkenos)
