# Deploy Ghostlight Basic on Railway

Deploy and Host Ghostlight AI testing with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghostlight-ai-testing)

## About

Ghostlight AI testing is a self-hosted AI companion starter stack for testing personalized companion deployments. It includes the main Ghostlight app, PostgreSQL for structured data, Qdrant for vector memory, and persistent file storage for uploads, media, exports, and generated assets.

Hosting Ghostlight AI testing on Railway gives you a ready-to-run environment for testing AI companion deployments without manually wiring the full backend stack yourself. The template includes the app service, database, vector memory service, and persistent storage volume. Users can deploy the stack, add their own API keys and Discord settings, then customize companion identity, memory, models, media, and behavior through the app. This setup is intended for testing, development, and preparing customer-ready Ghostlight companion builds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ghostlight-Test | [jcsnowfox/Ghostlight-Test](https://github.com/jcsnowfox/Ghostlight-Test) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Qdrant | `qdrant/qdrant` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `IMAGE_DIR` | Ghostlight-Test | /data/images | - |
| `LOG_LEVEL` | Ghostlight-Test | info | - |
| `MEDIA_DIR` | Ghostlight-Test | /data/media | - |
| `VOICE_DIR` | Ghostlight-Test | /data/voice | - |
| `BACKUP_DIR` | Ghostlight-Test | /data/backups | - |
| `EXPORT_DIR` | Ghostlight-Test | /data/exports | - |
| `UPLOAD_DIR` | Ghostlight-Test | /data/uploads | - |
| `STORAGE_DIR` | Ghostlight-Test | /data | - |
| `DISCORD_TOKEN` | Ghostlight-Test | (secret) | - |
| `GIPHY_API_KEY` | Ghostlight-Test | (secret) | - |
| `ADMIN_PASSWORD` | Ghostlight-Test | (secret) | - |
| `ADMIN_USERNAME` | Ghostlight-Test | (secret) | - |
| `GETIMG_API_KEY` | Ghostlight-Test | (secret) | - |
| `QDRANT_API_KEY` | Ghostlight-Test | (secret) | - |
| `MEMORY_USER_SCOPE` | Ghostlight-Test | user | - |
| `SECRET_ACCESS_KEY` | Ghostlight-Test | (secret) | - |
| `ELEVENLABS_API_KEY` | Ghostlight-Test | (secret) | - |
| `OPENROUTER_API_KEY` | Ghostlight-Test | (secret) | - |
| `QDRANT_COLLECTION_PREFIX` | Ghostlight-Test | ghostlight | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Qdrant | 6333 | - |
| `QDRANT__SERVICE__API_KEY` | Qdrant | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/qdrant/storage`

**Category:** Other · **Languages:** JavaScript, TypeScript, CSS, HTML, Shell

[View on Railway →](https://railway.com/deploy/ghostlight-ai-testing)
