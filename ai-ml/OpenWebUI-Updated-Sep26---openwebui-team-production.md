# Deploy OpenWebUI [Updated Sep'26] on Railway

Self-host Open WebUI for teams — durable Postgres, scalable sessions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openwebui-team-production)

## About

Open WebUI is the most popular self-hosted AI chat interface — a private, ChatGPT-style UI for OpenAI, Anthropic, and other models, with multi-user accounts, roles, and built-in RAG. This template deploys it production-grade: PostgreSQL for durable data that survives every redeploy, and Redis for shared session and WebSocket state so it scales cleanly across multiple instances. It's the setup for a team that depends on Open WebUI daily — where the default single-container SQLite build isn't enough — with authentication and persistence wired from the first deploy.

---

This is Open WebUI built for teams and production, and the Postgres and Redis wiring is exactly what the default deploy lacks — both handled here.

**PostgreSQL for durable data — not fragile SQLite.** By default Open WebUI stores everything in a single SQLite file, which is fine for one user but a liability for a team: it's a single point of failure, harder to back up, and strained by concurrent writes. This template wires `DATABASE_URL` to a managed PostgreSQL, so all chats, users, settings, and documents live in a real database that survives redeploys, backs up cleanly, and handles many users writing at once. This is the difference between a personal instance and one a team relies on.

**Redis scales sessions and WebSockets across instances.** A single Open WebUI container keeps session and live-chat (WebSocket) state in memory, so you can't run more than one — a second instance wouldn't share logins or streams. This template wires Redis for shared session, cache, and WebSocket state, so Open WebUI can run multiple replicas behind Railway's load balancing without users being logged out or losing streaming responses. It's what makes the deployment horizontally scalable.

**Authenticated and private from boot.** Set `WEBUI_SECRET_KEY` to a stable value, create the first admin account, and set `ENABLE_SIGNUP=false` so the workspace stays behind a login. Every conversation and document stays on your infrastructure, with role-based access for team members — no per-seat fees and no data sent to a vendor.

**Bring your own models, with built-in RAG.** Add `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or point at any OpenAI-compatible endpoint, and those models appear in the interface, selectable per chat, with inference running on your provider. Open WebUI also includes document upload with retrieval-augmented generation, a tool runner, and model management, so your team queries internal documents from the same private UI — all backed by the durable Postgres store.

Typical cost: **~$10–15/month** on Railway for Open WebUI, PostgreSQL, and Redis — more than a single-container deploy, but the reliability and scaling are the point for team use. Open WebUI is free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Open WebUI | `ghcr.io/open-webui/open-webui` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Open WebUI | 8080 | HTTP server listening port |
| `REDIS_URL` | Open WebUI | - | REDIS_URL |
| `WEBUI_URL` | Open WebUI | - | Public URL for OpenWebUI |
| `WEBUI_AUTH` | Open WebUI | true | Enable authentication for web interface |
| `DATABASE_URL` | Open WebUI | - | Postgres connection string for OpenWebUI |
| `DO_NOT_TRACK` | Open WebUI | true | Disable tracking signals |
| `OPENAI_API_KEY` | Open WebUI | (secret) | Optional OpenAI API key |
| `WEBUI_SECRET_KEY` | Open WebUI | (secret) | Secret key for session security |
| `WEBSOCKET_MANAGER` | Open WebUI | redis | Use Redis for websocket scaling |
| `DATABASE_POOL_SIZE` | Open WebUI | 10 | Base database connection pool size |
| `SCARF_NO_ANALYTICS` | Open WebUI | true | Disable Scarf package analytics |
| `OPENAI_API_BASE_URL` | Open WebUI | https://api.openai.com/v1 | Base endpoint for OpenAI API. Modify if using Gemini. Note: OpenWebUI doesnt support Anthropic's format. Need to proxy that if you want to use it |
| `WEBSOCKET_REDIS_URL` | Open WebUI | - | Redis backend for websocket manager |
| `ANONYMIZED_TELEMETRY` | Open WebUI | false | Disable anonymous usage telemetry |
| `DATABASE_POOL_RECYCLE` | Open WebUI | 1800 | Seconds before recycling connections |
| `DATABASE_POOL_TIMEOUT` | Open WebUI | 30 | Seconds to wait for connection |
| `ENABLE_WEBSOCKET_SUPPORT` | Open WebUI | true | Enable real-time websocket communication |
| `DATABASE_POOL_MAX_OVERFLOW` | Open WebUI | 5 | Extra connections beyond pool size |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openwebui-team-production)
