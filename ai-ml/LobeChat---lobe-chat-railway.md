# Deploy LobeChat on Railway

AI chat and agent workspace that uses your own model API keys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobe-chat-railway)

## About

LobeHub — the project formerly published as LobeChat — is an open-source AI workspace where you build and run agents against whichever model providers you already pay for. Instead of one chat window per vendor you get a shared agent library, a knowledge base you upload files into, and a private web-search backend. Self-host LobeHub when you want a team-wide AI front end whose conversations, documents and API keys stay in infrastructure you control.

Deploy LobeHub on Railway and the whole topology comes up configured. The `lobehub` service runs the Next.js application and is the only one with a public URL. `postgres` runs ParadeDB — PostgreSQL 17 with `pg_search` — because LobeHub builds BM25 indexes over agents, topics, messages and files, which plain PostgreSQL cannot create. `Redis` is the cache. `searxng` gives agents web results without an external search key. A Railway bucket holds uploads, signed on both write and read, so nothing is reachable by object key alone.

![LobeHub, SearXNG, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788728792/lobehub-architecture.png)

LobeHub is a bring-your-own-key AI front end. It ships no model and bills nothing per token — you supply provider credentials and it stores them encrypted with `KEY_VAULTS_SECRET`. Teams self-host it to keep conversation history, documents and keys inside their own boundary.

Key features:

- An agent library where each agent has its own prompt, model, tools and files
- A knowledge base that chunks and embeds uploaded documents for retrieval
- Web search through the bundled SearXNG instance, with no third-party search key
- Image generation, plugins and Model Context Protocol tool support
- Telegram, Slack and Discord bots that expose an agent through official bot APIs
- Email-and-password accounts, or SSO through Google, GitHub, Microsoft, Keycloak, Authentik, Logto, Zitadel and other OIDC providers

The architecture is deliberately small: the application serves both the browser UI and its own API, so there is no worker tier to keep in version lockstep. ParadeDB stores relational data and serves search, Redis caches, SearXNG answers web queries privately, and the bucket holds binaries.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lobehub | [gridalpha/lobehub-railway](https://github.com/gridalpha/lobehub-railway) | Web service |
| postgres | `paradedb/paradedb:latest-pg17` | Database |
| Redis | `redis:8.2` | Database |
| searxng | [gridalpha/lobehub-railway](https://github.com/gridalpha/lobehub-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | lobehub | 3210 | HTTP port Railway probes |
| `APP_URL` | lobehub | - | Public base URL |
| `REDIS_TLS` | lobehub | 0 | Private network, no TLS |
| `REDIS_URL` | lobehub | - | Cache connection string |
| `S3_BUCKET` | lobehub | - | Bucket name |
| `S3_REGION` | lobehub | - | Bucket region |
| `S3_SET_ACL` | lobehub | 0 | Bucket rejects public-read ACLs |
| `AUTH_SECRET` | lobehub | (secret) | Better Auth session signing secret |
| `S3_ENDPOINT` | lobehub | - | Object storage endpoint |
| `SEARXNG_URL` | lobehub | - | Private web-search backend |
| `DATABASE_URL` | lobehub | - | ParadeDB connection string |
| `NODE_OPTIONS` | lobehub | --dns-result-order=ipv4first --use-openssl-ca --max-old-space-size=3072 | DNS order and heap cap |
| `REDIS_PREFIX` | lobehub | lobehub | Key prefix in Redis |
| `DATABASE_DRIVER` | lobehub | node | Enables the server database mode |
| `INTERNAL_APP_URL` | lobehub | http://localhost:3210 | Self-directed calls stay on loopback |
| `S3_ACCESS_KEY_ID` | lobehub | - | Bucket access key |
| `KEY_VAULTS_SECRET` | lobehub | (secret) | AES key encrypting stored provider keys |
| `AUTH_ALLOWED_EMAILS` | lobehub | change-me@example.com | Emails or domains allowed to register |
| `AUTH_TRUSTED_ORIGINS` | lobehub | - | Allowed auth origins |
| `S3_ENABLE_PATH_STYLE` | lobehub | 1 | Required; bucket CORS is path-style only |
| `S3_SECRET_ACCESS_KEY` | lobehub | (secret) | Bucket secret key |
| `AUTH_EMAIL_VERIFICATION` | lobehub | 0 | Set 1 only after configuring SMTP |
| `LLM_VISION_IMAGE_USE_BASE64` | lobehub | 1 | Inline images instead of public URLs |
| `POSTGRES_DB` | postgres | lobehub | Database created on first boot |
| `DATABASE_URL` | postgres | - | Private connection string |
| `POSTGRES_USER` | postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `SEARXNG_SECRET` | searxng | (secret) | Session signing key for SearXNG |
| `SEARXNG_BASE_URL` | searxng | http://searxng.railway.internal:8080/ | Base URL for generated links |
| `SEARXNG_PRIVATE_URL` | searxng | http://searxng.railway.internal:8080 | Address LobeHub calls |

## Configuration

- **Healthcheck:** `/api/auth/ok`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh postgres -c shared_preload_libraries=pg_search,pg_cron -c data_directory=/var/lib/postgresql/data/pgdata -c listen_addresses=* -c dynamic_shared_memory_type=mmap -c shared_buffers=512MB -c effective_cache_size=2GB -c work_mem=16MB -c maintenance_work_mem=256MB`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/lobe-chat-railway)
