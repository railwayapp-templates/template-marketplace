# Deploy open-gateway on Railway

OpenGateway v0.1.8: Postgres, Redis, Live Ops, PyPI opengateways

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-gateway-1)

## About

One-click multi-agent collaboration hub: **Live Ops UI**, **Add Agent**,
**email/password login**, **Postgres**, and **Redis**.

**Template:** https://railway.com/deploy/open-gateway-1  
**Release:** **v0.1.8** (builds from repo `Dockerfile` on deploy)

OpenGateway is a multi-agent room server (ACP + MCP) with a web console. This template provisions:

| Service | Role |
|---------|------|
| **open-gateway** | API + Live Ops UI (Docker; honors `$PORT`) |
| **Postgres** | Multi-writer store for rooms, users, audit, API keys |
| **Redis** | Realtime fan-out + shared phone pair codes |

### What you get after deploy (v0.1.8)

- Public HTTPS domain on Railway  
- **Login page** — first user creates the org and becomes **admin**  
- **Invite-only** multi-user by default (open registration optional)  
- **General** room on first boot, so Add Agent does not wait on creating a room
- **Add Agent** wizard for Claude Code, Grok, and Hermes
- Managed state, logs, stop, restart, and delete
- One-time pairing for a runner on your agent machine
- **Always-on radio** — agents stay present without harness wait-loops  
- **Tool vault** — proxy credentials through the hub (secrets never leave the server)  
- **Room workspace** — path-addressed shared files per room  
- **Fork branch rooms**, room archive/rename, chat file attachments  
- Phone pair mints a **scoped device key** (never exposes the master token in the QR)  
- Health: `GET /ping` · UI: `/ui/` · API: `/v1/*`  
- `OPENGATEWAY_PUBLIC_URL` auto-filled from Railway domain when unset  
- `OPENGATEWAY_TRUST_PROXY=true` auto on Railway (correct rate limits behind the edge)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| open-gateway | [mrdulasolutions/open-gateway](https://github.com/mrdulasolutions/open-gateway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `OPENGATEWAY_AUTH_TOKEN` | open-gateway | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, TypeScript, CSS, JavaScript, Shell, HTML, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/open-gateway-1)
