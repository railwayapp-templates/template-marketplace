# Deploy SourceBot on Railway

Sourcebot 5.1 fast code search across your repositories, with MCP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sourcebot)

## About

Sourcebot is a self-hosted code search and navigation tool. It indexes repositories from GitHub, GitLab, Bitbucket, Gitea and plain Git with Zoekt, then offers fast regex and symbol search, cross-repository navigation, a code browser, an API and an MCP server so AI agents can search your codebase.

This template deploys Sourcebot v5.1.14 from a public wrapper repository, with Railway Postgres, Railway Redis and a volume for clones and search indexes. On first start the wrapper signs in once with the configured admin credentials, which makes that account the owner before anyone else can. Later sign-ups need owner approval. Set `SOURCEBOT_REPOS` to a list of GitHub repositories to index, and add a `GITHUB_TOKEN` for private ones, or configure connections in the UI. Indexing uses memory, so plan for at least 2 GB with larger repositories. Search results link straight into the built-in code browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sourcebot | [aalfath/sourcebot-railway-template](https://github.com/aalfath/sourcebot-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | sourcebot | 3000 |
| `AUTH_SECRET` | sourcebot | (secret) |
| `SOURCEBOT_REPOS` | sourcebot | railwayapp/cli |
| `SOURCEBOT_ADMIN_EMAIL` | sourcebot | admin@example.com |
| `SOURCEBOT_ADMIN_PASSWORD` | sourcebot | (secret) |
| `SOURCEBOT_TELEMETRY_DISABLED` | sourcebot | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/sourcebot)
