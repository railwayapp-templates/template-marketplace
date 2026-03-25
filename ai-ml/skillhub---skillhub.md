# Deploy skillhub on Railway

SkillHub is an enterprise-ready, self-hosted agent skill registry

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/skillhub)

## About

[SkillHub](https://github.com/iflytek/skillhub) is an enterprise-grade, open-source skill registry for AI agent ecosystems. Teams can publish, version, discover, and govern skill packages in private namespaces with RBAC, auditability, and API token workflows.

This Railway template deploys SkillHub as a **multi-service architecture** aligned with upstream runtime expectations:

- `skillhub-web` (Nginx-based frontend, public)
- `skillhub-server` (Spring Boot backend, private)
- `Postgres` (managed database, private)
- `Redis` (managed cache/session store, private)

Images are pinned to upstream release tag `v0.1.0` for deterministic deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| skillhub-web | `ghcr.io/iflytek/skillhub-web:v0.1.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| skillhub-server | `ghcr.io/iflytek/skillhub-server:v0.1.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | skillhub-web | 80 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | skillhub-server | 8080 |
| `REDIS_PASSWORD` | skillhub-server | (secret) |
| `STORAGE_BASE_PATH` | skillhub-server | /var/lib/skillhub/storage |
| `SESSION_COOKIE_SECURE` | skillhub-server | true |
| `SPRING_PROFILES_ACTIVE` | skillhub-server | docker |
| `BOOTSTRAP_ADMIN_ENABLED` | skillhub-server | true |
| `BOOTSTRAP_ADMIN_USER_ID` | skillhub-server | bootstrap-admin |
| `BOOTSTRAP_ADMIN_PASSWORD` | skillhub-server | (secret) |
| `BOOTSTRAP_ADMIN_USERNAME` | skillhub-server | (secret) |
| `SKILLHUB_STORAGE_PROVIDER` | skillhub-server | local |
| `SKILLHUB_STORAGE_S3_REGION` | skillhub-server | us-east-1 |
| `SPRING_DATASOURCE_PASSWORD` | skillhub-server | (secret) |
| `SPRING_DATASOURCE_USERNAME` | skillhub-server | (secret) |
| `OAUTH2_GITHUB_CLIENT_SECRET` | skillhub-server | (secret) |
| `BOOTSTRAP_ADMIN_DISPLAY_NAME` | skillhub-server | Platform Admin |
| `SKILLHUB_STORAGE_S3_SECRET_KEY` | skillhub-server | (secret) |
| `SKILLHUB_STORAGE_S3_PRESIGN_EXPIRY` | skillhub-server | PT10M |
| `SKILLHUB_STORAGE_S3_FORCE_PATH_STYLE` | skillhub-server | false |
| `SKILLHUB_STORAGE_S3_AUTO_CREATE_BUCKET` | skillhub-server | false |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/skillhub/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/skillhub)
