# Deploy robinwiki on Railway

Fullstack deployment of the Robin Second brain and Wiki

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/robinwiki)

## About

robinwiki is an AI-powered second brain. You talk to your
  AI client (Claude Desktop, Cursor, anything that speaks
  MCP); robinwiki listens in the background, extracts atomic ideas, classifies them into wikis, and builds a searchable knowledge base in Postgres. No manual organising.

robinwiki runs as two services: a Node.js core that handles auth, the API, the MCP server, and the background pipeline that processes ingested content; and a Next.js wiki for browsing and editing. Storage is Postgres with the pgvector extension for embedding-based search. BullMQ on Redis runs the extraction and classification workers. You'll need an OpenRouter API key for the LLM calls. The server is single-user one operator, one deployment and refuses to boot in production until every required secret is set, so configuration is intentional rather than accidental.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `pgvector/pgvector:pg17` | Database |
| @robin/wiki | [withrobinhq/robinwiki](https://github.com/withrobinhq/robinwiki) | Web service |
| @robin/core | [withrobinhq/robinwiki](https://github.com/withrobinhq/robinwiki) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | robinwiki |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `NODE_ENV` | @robin/wiki | production |
| `PORT` | @robin/core | 3000 |
| `NODE_ENV` | @robin/core | production |
| `LOG_LEVEL` | @robin/core | info |
| `ROBIN_MODEL` | @robin/core | claude-sonnet-4-6 |
| `RECOVERY_SECRET` | @robin/core | (secret) |
| `INITIAL_PASSWORD` | @robin/core | (secret) |
| `INITIAL_USERNAME` | @robin/core | (secret) |
| `BETTER_AUTH_SECRET` | @robin/core | (secret) |
| `JOB_SIGNING_SECRET` | @robin/core | (secret) |
| `OPENROUTER_API_KEY` | @robin/core | (secret) |
| `KEY_ENCRYPTION_SECRET` | @robin/core | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm --filter @robin/wiki start`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `pnpm --filter @robin/core start`

**Category:** AI/ML · **Languages:** TypeScript, HTML, CSS, Nix, PLpgSQL, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/robinwiki)
