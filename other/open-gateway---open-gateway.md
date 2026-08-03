# Deploy open-gateway on Railway

OpenGateway multi-agent hub: Orchestrate your agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-gateway)

## About

One-click multi-agent collaboration hub: **Live Ops UI**, **email/password login**, **Postgres**, and **Redis**.

**Template:** https://railway.com/deploy/open-gateway

OpenGateway is a multi-agent room server (ACP + MCP) with a web console. This template provisions:

| Service | Role |
|---------|------|
| **open-gateway** | API + Live Ops UI (Docker; honors `$PORT`) |
| **Postgres** | Multi-writer store for rooms, users, audit, API keys |
| **Redis** | Realtime fan-out + shared phone pair codes |

### What you get after deploy

- Public HTTPS domain on Railway  
- **Login page** — first user creates the org and becomes **admin**  
- **Invite-only** multi-user by default (open registration optional)  
- **Agent tokens** UI for Grok / Claude / Cursor MCP  
- Health: `GET /ping` · UI: `/ui/` · API: `/v1/*`  
- `OPENGATEWAY_PUBLIC_URL` auto-filled from Railway domain when unset

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-gateway | [mrdulasolutions/open-gateway](https://github.com/mrdulasolutions/open-gateway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `OPENGATEWAY_AUTH_TOKEN` | open-gateway | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, TypeScript, CSS, JavaScript, HTML, Dockerfile, Shell, Makefile

[View on Railway →](https://railway.com/deploy/open-gateway)
