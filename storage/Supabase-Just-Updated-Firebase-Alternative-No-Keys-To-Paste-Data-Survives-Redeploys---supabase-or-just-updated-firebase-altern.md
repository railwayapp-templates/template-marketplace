# Deploy Supabase | (Just Updated) Firebase Alternative, No Keys To Paste, Data Survives Redeploys on Railway

Postgres, auth, storage, realtime and Studio. No keys to paste.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase-or-just-updated-firebase-altern)

## About

Supabase is the open-source Firebase alternative: a Postgres database with a REST API, user
authentication, file storage, realtime subscriptions and a dashboard (Studio) on top of it.

This template runs the self-hosted stack as eight services in one Railway project: Postgres, Auth
(GoTrue), PostgREST, Realtime, Storage, Postgres Meta, Studio and a gateway that puts all of them
behind one public domain. There is nothing to fill in at deploy time.

Supabase is not one program but a set of services that share a Postgres database and one JWT secret.
The gateway routes `/auth/v1`, `/rest/v1`, `/realtime/v1` and `/storage/v1` to their services and
serves Studio, behind a login, at the root of the domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meta | `ghcr.io/bon5co/supabase-railway-meta:0.99.0` | Database |
| storage | `ghcr.io/bon5co/supabase-railway-storage:1.74.0` | Database |
| rest | `ghcr.io/bon5co/supabase-railway-rest:14.17` | Database |
| studio | `ghcr.io/bon5co/supabase-railway-studio:2026.09.07` | Database |
| auth | `ghcr.io/bon5co/supabase-railway-auth:2.196.0` | Database |
| realtime | `ghcr.io/bon5co/supabase-railway-realtime:2.134.10` | Database |
| db | `ghcr.io/bon5co/supabase-railway-db:17.6.1.136` | Database |
| gateway | `ghcr.io/bon5co/supabase-railway-gateway:caddy2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PG_META_DB_PASSWORD` | meta | (secret) |
| `AUTH_JWT_SECRET` | storage | (secret) |
| `S3_PROTOCOL_ACCESS_KEY_SECRET` | storage | (secret) |
| `PGRST_JWT_SECRET` | rest | (secret) |
| `AUTH_JWT_SECRET` | studio | (secret) |
| `POSTGRES_PASSWORD` | studio | (secret) |
| `GOTRUE_JWT_SECRET` | auth | (secret) |
| `DB_PASSWORD` | realtime | (secret) |
| `API_JWT_SECRET` | realtime | (secret) |
| `SECRET_KEY_BASE` | realtime | (secret) |
| `METRICS_JWT_SECRET` | realtime | (secret) |
| `POSTGRES_PASSWORD` | db | (secret) |
| `DASHBOARD_PASSWORD` | gateway | (secret) |

## Configuration

- **Volume:** `/var/lib/storage`
- **Volume:** `/app/snippets`
- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/supabase-or-just-updated-firebase-altern)
