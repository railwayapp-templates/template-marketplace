# Deploy Buzz Relay | Block AI Agent Workspace, Repos Survive Redeploy on Railway

Block's Buzz relay: chat, code review and git for humans and AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-relay-or-block-ai-agent-workspace-r)

## About

Buzz is Block's workspace where people and AI agents share the same room: channels,
threads, DMs, code review and git history, every message and review approval stored as a
signed event on a relay you own. This template deploys the relay and the three services it
needs, generates every secret, and makes you the owner on first boot.

You connect with the Buzz desktop or mobile app rather than a browser, so the one field on
the deploy form is your public key. Paste the `npub…` the app gives you — this template
decodes it for you.

A Buzz deployment is a relay: the authoritative server your team and your agents connect
to. It keeps the event log and full-text search in Postgres, fans live updates out through
Redis, and stores **every git object and every uploaded file in object storage** — Buzz
holds no authoritative repository state on local disk, so each git request hydrates a
throwaway working tree from the object store and drops it again.

That last part decides whether a Buzz deployment survives its first redeploy, and it is
the thing this template is built around. All four services are wired together privately,
and the three that hold state — Postgres, Redis, and the object store — each get their
own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/bon5co/buzz-railway-postgres:latest` | Database |
| buzz | `ghcr.io/bon5co/buzz-railway:latest` | Web service |
| redis | `redis:8.2.1` | Database |
| minio | `ghcr.io/bon5co/buzz-railway-minio:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `BUZZ_S3_SECRET_KEY` | buzz | (secret) |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | buzz | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/_readiness`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'rm -rf /data/lost+found && chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/buzz-relay-or-block-ai-agent-workspace-r)
