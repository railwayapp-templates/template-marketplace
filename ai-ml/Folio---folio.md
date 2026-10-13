# Deploy Folio on Railway

Open-source team wiki in Git: real-time editing, AI agents over MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/folio)

## About

Folio is an open-source (MIT) team wiki whose pages are plain Markdown files in a Git repository. People edit together in the browser in real time, engineers can edit the same files in their IDE, and AI agents read and update the same pages over MCP. It replaces Confluence or Notion for teams that want to own their knowledge.

This template runs three services: the Folio app from the public image ghcr.io/evergreen-it-dev/folio, PostgreSQL for accounts, rights and history, and Redis for real-time collaboration and rate limits. The page repositories and uploaded files live on a volume mounted at /app/data, so back it up together with Postgres. Folio gets a public Railway domain on port 4870; PUBLIC_URL follows it automatically, and you change PUBLIC_URL if you attach your own domain. FOLIO_SECRET is generated once and encrypts stored Git tokens and AI keys, so do not change it later. Open the domain after the first deploy: the first account you create becomes the administrator. A Hobby plan or higher is recommended.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| folio | `ghcr.io/evergreen-it-dev/folio:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | folio | 4870 | Port Folio listens on. Keep 4870 unless you also change the public proxy port. |
| `NODE_ENV` | folio | production | Runtime mode. Keep production. |
| `REDIS_URL` | folio | - | Redis connection from the Redis service. family=0 enables IPv6 private networking. |
| `PUBLIC_URL` | folio | - | Public address of the wiki. Uses the Railway domain; change it if you add your own domain. |
| `DATABASE_URL` | folio | - | PostgreSQL connection from the Postgres service. Leave as is. |
| `FOLIO_SECRET` | folio | (secret) | Generated secret that encrypts stored Git tokens and AI keys. Do not change after the first start. |
| `ASSET_BACKEND` | folio | local | Where uploaded files are stored. local keeps them on the /app/data volume. |
| `CURSOR_AGENT_STATE_DIR` | folio | /app/data/assistant/state | AI assistant state folder on the /app/data volume. Leave as is. |
| `CURSOR_AGENT_WORKSPACE_ROOT` | folio | /app/data/assistant/workspaces | AI assistant working folders on the /app/data volume. Leave as is. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/folio)
