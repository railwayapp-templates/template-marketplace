# Deploy New API: AI gateway, OpenRouter alternative on Railway

Self-hosted LLM gateway: one OpenAI-compatible API for Claude, Gemini, more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/new-api-ai-gateway-openrouter-alternativ)

## About

New API is an open-source, self-hosted AI gateway. It gives you one OpenAI-compatible endpoint in front of OpenAI, Claude, Gemini, DeepSeek, Qwen and dozens more providers, with API keys, per-key quotas, usage logs and cost accounting for every call. It is a self-hosted alternative to OpenRouter and LiteLLM, so your provider keys and request logs stay on your own infrastructure. This template deploys it with PostgreSQL and Redis already wired up and your administrator account created, so nobody else can claim a fresh instance before you sign in.

The gateway runs as a single container. PostgreSQL holds users, channels (your connections to upstream providers), keys and logs; Redis handles caching and rate limits. Every connection string, session secret and password is generated at deploy time, and your administrator login is ready the moment the deploy goes green. Logins stay valid across redeploys, logs and rate limits see each caller's real IP address, and session cookies are HTTPS-only on the domain Railway issues you. There is nothing to fill in before you deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| New API | `calciumion/new-api:v1.0.0-rc.45` | Web service |
| Redis | `redis:8.2.10` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18.6` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | New API | 3000 | [Do not change] Port the gateway listens on. |
| `SQL_DSN` | New API | - | [Do not change] Connection string to the bundled Postgres. |
| `CRYPTO_SECRET` | New API | (secret) | [Do not change] Encrypts stored data such as channel keys. |
| `SESSION_SECRET` | New API | (secret) | Signs login sessions. |
| `TRUSTED_PROXIES` | New API | 100.64.0.0/10 | [Do not change] Railway's proxy range, so logs and rate limits see each client's real IP. |
| `ERROR_LOG_ENABLED` | New API | true | Records failed requests in the usage logs. |
| `REDIS_CONN_STRING` | New API | - | [Do not change] Connection string to the bundled Redis. |
| `NEW_API_SETUP_JSON` | New API | - | [Do not change] Creates the administrator account on first boot. |
| `BATCH_UPDATE_ENABLED` | New API | true | Writes usage and quota updates in batches. |
| `SESSION_COOKIE_SECURE` | New API | true | [Do not change] Marks login cookies HTTPS-only. |
| `NEW_API_ADMIN_PASSWORD` | New API | (secret) | Password of the administrator account. Used on first boot only; change it later under Profile. |
| `NEW_API_ADMIN_USERNAME` | New API | (secret) | Username of the administrator account. |
| `SESSION_COOKIE_TRUSTED_URL` | New API | - | Web addresses allowed to refresh a login. Add your custom domain here, comma-separated. |
| `REDISHOST` | Redis | - | [Do not change] Private hostname of Redis. |
| `REDISPORT` | Redis | 6379 | [Do not change] Port Redis listens on. |
| `REDISUSER` | Redis | default | [Do not change] Redis user. |
| `REDIS_URL` | Redis | - | [Do not change] Private connection string, used by New API. |
| `REDISPASSWORD` | Redis | (secret) | [Do not change] Redis password, for clients. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password. |
| `POSTGRES_DB` | Postgres | railway | [Do not change] Name of the database. |
| `DATABASE_URL` | Postgres | - | [Do not change] Private connection string, used by New API. |
| `POSTGRES_USER` | Postgres | (secret) | [Do not change] Database user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string, for backups and outside clients. |

## Configuration

- **Start command:** `sh -c '/new-api & p=$!; trap "kill -TERM $p" TERM INT; until wget -q -O /dev/null http://127.0.0.1:$PORT/api/status; do sleep 1; done; wget -q -O /dev/null --header=Content-Type:application/json --post-data="$NEW_API_SETUP_JSON" http://127.0.0.1:$PORT/api/setup; wait $p; wait $p'`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/new-api-ai-gateway-openrouter-alternativ)
