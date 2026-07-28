# Deploy buzz on Railway

Self-host Buzz: chat, code review and git for humans and AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz)

## About

Buzz is Block's hive-mind workspace where humans and AI agents share channels,
threads, DMs, code review, and git history — every message, reaction, review
approval and CI result stored as a signed event on a Nostr relay you own.

This template deploys the relay with everything it needs, generates its secrets,
and creates your owner identity on first boot. No configuration required.

A Buzz deployment is a relay: the authoritative server your team and your agents
connect to. It stores the event log in Postgres, fans out live updates through
Redis, keeps media and git objects in S3-compatible storage, and serves invite
links over HTTPS.

You reach it with the **Buzz desktop or mobile app**, not a browser. You become
the administrator by making your identity in the app and pasting its public key
when you deploy, so your private key never leaves your device (full steps
below). Because the relay resolves communities by hostname, one deployment can
host several separate workspaces — a second workspace is a DNS record, not a
second bill.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| buzz | `ghcr.io/hmseeb/buzz-railway:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| MinIO | `ghcr.io/hmseeb/buzz-railway-minio:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | buzz | 3000 | - |
| `BUZZ_S3_SECRET_KEY` | buzz | (secret) | - |
| `RELAY_OWNER_PUBKEY` | buzz | - | Your Buzz public key goes here. New to Buzz? (1) Download the app from github.com/block/buzz/releases/latest and open it. (2) Choose 'Create a new identity key'. (3) On the next screen ('Join a community'), click the 'Copy your public ID' button. (4) Paste it here. It starts with 'npub' and is safe to share, like an email address. Full walkthrough with pictures: hmseeb.github.io/buzz-railway#setup . When the deploy finishes, open this service's URL in a browser and click 'Open in Buzz' to connect the app. Don't want to install the app first? Type the word generate and a key is made for you. |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | buzz | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | MinIO | 9000 | - |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/buzz)
