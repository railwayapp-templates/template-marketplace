# Deploy Rove on Railway

Early-release AI agent with web chat, MCP tools, and GitHub AIPs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rove)

## About

Rove is an open-source, self-hosted AI agent framework for companies that want to manage their own assistant. Start with its web interface, connect an OpenAI-compatible Chat Completions provider, and configure your company's instructions and integrations. Optional Slack integration is included. This early release focuses on the core; a ready-made company plugin catalog is not included.

This template provisions Rove 1.0.1, PostgreSQL 18 with pgvector, and authenticated Redis 8.2. PostgreSQL and Redis use persistent volumes and private networking. Only Rove receives a public web address.

After deployment, open Rove's public URL and use the generated ROVE_SETUP_SECRET from its Railway variables to create the first administrator. Save the recovery key. Configure your model provider in the web interface to begin chatting; model API usage is billed separately by your provider.

Keep BETTER_AUTH_SECRET private and stable across updates. After setup, stop Rove before removing ROVE_SETUP_SECRET and starting it again. Run one Rove replica. For later updates, stop the existing Rove deployment before starting its replacement; rolling updates are not supported in this release.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| rove | `wgtechlabs/rove:1.0.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | rove | 3000 | HTTP port used by Rove. Keep at 3000 to match the template HTTP proxy. |
| `ROVE_URL` | rove | - | Public HTTPS URL of Rove. Update this if you use a custom domain. |
| `REDIS_URL` | rove | - | Authenticated private Redis connection supplied by the Redis service. |
| `DATABASE_URL` | rove | - | Private PostgreSQL connection supplied by the Postgres service. |
| `ROVE_SETUP_SECRET` | rove | (secret) | Generated first-admin setup secret. Use it in web setup and save the recovery key. Stop Rove before removing this variable and restarting. |
| `BETTER_AUTH_SECRET` | rove | (secret) | Generated authentication and encryption secret. Keep private, stable across redeploys, and backed up with PostgreSQL. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --appendonly yes --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/rove)
