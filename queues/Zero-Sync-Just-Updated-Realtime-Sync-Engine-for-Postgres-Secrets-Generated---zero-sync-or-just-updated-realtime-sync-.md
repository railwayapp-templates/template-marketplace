# Deploy Zero Sync | (Just Updated) Realtime Sync Engine for Postgres, Secrets Generated on Railway

Zero sync engine plus Postgres, logical replication and secrets generated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zero-sync-or-just-updated-realtime-sync-)

## About

Zero is the open-source sync engine from Rocicorp. It sits in front of Postgres, replicates the tables you choose into a SQLite replica, and streams query results to web and mobile clients over WebSocket, so apps read and write instantly and stay in sync. This template deploys zero-cache 1.11 together with a Postgres 18 database that is already configured for logical replication. Passwords are generated for you, so nothing needs filling in.

The template runs two services. `postgres` is the official Postgres 18 image started with `wal_level=logical` (Zero requires it) and seeded with a small `public.todos` table. `zero-cache` is the official `rocicorp/zero` image pinned by digest; it connects to Postgres over the private network, creates its publication and replication slot on first boot, and keeps its replica on a volume at `/data`. Health is `GET /keepalive`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:18.6@sha256:74935e72241653ca55e0414067e6d8763aceb8a810eb51b452253ec3dcfc4336` | Database |
| zero-cache | `rocicorp/zero@sha256:893c4a78a1a84f1ab8d7e76263b4bab3c8aee61101b00b365756c47e328935a2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `ZERO_ADMIN_PASSWORD` | zero-cache | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'printf "CREATE TABLE IF NOT EXISTS public.todos (id serial PRIMARY KEY, task text NOT NULL, done boolean NOT NULL DEFAULT false);\nINSERT INTO public.todos (task) SELECT chr(104)||chr(101)||chr(108)||chr(108)||chr(111);\n" > /docker-entrypoint-initdb.d/00-zero.sql; exec docker-entrypoint.sh postgres -c wal_level=logical -c max_wal_senders=20 -c max_replication_slots=20'`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'export ZERO_PORT=$PORT ZERO_REPLICA_FILE=/data/replica.db ZERO_ENABLE_CRUD_MUTATIONS=true ZERO_ALLOW_LEGACY_QUERIES=true; exec zero-cache'`
- **Healthcheck:** `/keepalive`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/zero-sync-or-just-updated-realtime-sync-)
