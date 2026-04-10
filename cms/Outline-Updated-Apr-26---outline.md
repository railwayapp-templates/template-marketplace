# Deploy Outline [Updated Apr ’26] on Railway

Outline [Apr ’26] (Team Wiki, Notion & Confluence alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outline)

## About

Outline is a free, open-source knowledge base and wiki platform available on GitHub, designed for teams who want to organize documents, collaborate, and share notes efficiently. With Outline, users gain full control over their knowledge base and notes setup, supported by an active open-source community around the Outline GitHub repository.

You can self host Outline to keep all your documents, team notes, and knowledge base entirely under your control, with zero third-party involvement. With the Outline tool, you benefit from advanced collaboration, easy navigation, and a powerful editor tailored to team documentation. The Outline deploy process is streamlined on modern cloud platforms such as Railway, making it easy to set up, scale, and manage your team knowledge base while preserving privacy and security at every step.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Outline | `outlinewiki/outline` | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Outline | 3000 |
| `NODE_ENV` | Outline | production |
| `LOG_LEVEL` | Outline | info |
| `PGSSLMODE` | Outline | disable |
| `SECRET_KEY` | Outline | (secret) |
| `FORCE_HTTPS` | Outline | true |
| `FILE_STORAGE` | Outline | local |
| `UTILS_SECRET` | Outline | (secret) |
| `ENABLE_UPDATES` | Outline | true |
| `WEB_CONCURRENCY` | Outline | 1 |
| `DEFAULT_LANGUAGE` | Outline | en_US |
| `RATE_LIMITER_ENABLED` | Outline | true |
| `RATE_LIMITER_REQUESTS` | Outline | 1000 |
| `SLACK_MESSAGE_ACTIONS` | Outline | true |
| `FILE_STORAGE_IMPORT_MAX_SIZE` | Outline | 5120000 |
| `FILE_STORAGE_UPLOAD_MAX_SIZE` | Outline | 26214400 |
| `RATE_LIMITER_DURATION_WINDOW` | Outline | 60 |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Outline | true |
| `AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE` | Outline | 1 |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/outline/data`
- **Volume:** `/bitnami`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/outline)
