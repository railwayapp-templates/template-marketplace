# Deploy WeKnora on Railway

Tencent's open-source RAG knowledge base and agent platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/weknora)

## About

WeKnora is Tencent's open-source knowledge base and agent platform. Upload PDFs, Office documents, web pages and images; WeKnora parses them (including images and tables), chunks and embeds them, and lets you chat with the knowledge, build agents with tools and skills, share workspaces with a team, and reach everything through a REST API, a CLI and IM integrations. This template deploys the upstream core stack at release v0.8.0: web UI, Go backend, document parser, ParadeDB (Postgres 17 with pgvector and pg_search) and Redis.

Hosting WeKnora on Railway means five services wired over the private network with a single public domain on the web UI. The backend runs upstream's image and applies its database migrations on every start, the parser runs as a private gRPC service and streams extracted images back inline, and the UI proxies the API while resolving the backend's address through Railway DNS so redeploys never break the link. Secrets and database credentials are generated at deploy time. Models, chunking, retrieval, agents and single sign-on are configured in WeKnora's own settings after the first login.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `paradedb/paradedb:v0.22.2-pg17` | Database |
| Redis | `redis:8.2` | Database |
| frontend | [RockinPaul/weknora_railway_template](https://github.com/RockinPaul/weknora_railway_template) | Web service |
| app | [RockinPaul/weknora_railway_template](https://github.com/RockinPaul/weknora_railway_template) | Database |
| docreader | [RockinPaul/weknora_railway_template](https://github.com/RockinPaul/weknora_railway_template) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | weknora | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | frontend | 80 | - |
| `APP_PORT` | frontend | 8080 | - |
| `APP_SCHEME` | frontend | http | - |
| `DEFAULT_LOCALE` | frontend | en-US | - |
| `TZ` | app | UTC | - |
| `PORT` | app | 8080 | - |
| `DB_PORT` | app | 5432 | - |
| `DB_USER` | app | (secret) | - |
| `LOG_LEVEL` | app | info | - |
| `JWT_SECRET` | app | (secret) | Signs login tokens. Generated; changing it logs everyone out. |
| `DB_PASSWORD` | app | (secret) | - |
| `REDIS_PASSWORD` | app | (secret) | - |
| `SYSTEM_AES_KEY` | app | - | Encrypts stored credentials such as model API keys. Exactly 32 characters. |
| `MAX_FILE_SIZE_MB` | app | 50 | Upload limit, shared by the UI and the parser. |
| `DISABLE_REGISTRATION` | app | false | true makes registration invite-only after you have your accounts. |
| `WEKNORA_BOOTSTRAP_SYSTEM_ADMIN_EMAIL` | app | - | Register with this email, then redeploy app once to become system administrator. |
| `TZ` | docreader | UTC | - |
| `LOG_LEVEL` | docreader | info | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rmdir /data/lost+found 2>/dev/null; exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes --save 60 1 --dir /data"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/data/files`

**Category:** AI/ML · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/weknora)
