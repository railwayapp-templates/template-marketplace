# Deploy Sure Finance | (Just Updated) Maybe Successor, Imports Actually Run on Railway

Maybe successor: net worth, budgets, imports that actually run

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sure-finance-self-hosted)

## About

Sure is the maintained community fork of Maybe Finance — a self-hosted personal finance app that tracks accounts, net worth, budgets, transactions and investments in one place, with your data staying on infrastructure you control. This template runs the maintained `we-promise/sure` build, pinned to a specific image digest so a deploy today boots the same code as the deploy that was tested.

Sure is a Rails 8 application that needs Postgres for its data, Redis for its background job queue, and a Sidekiq worker to actually run those jobs — account syncs, CSV imports, scheduled valuations and data cleanup. Splitting the web process and the worker into two separate containers is the obvious layout, and it is also where self-hosted Sure quietly breaks: uploaded import files land on the web container's disk, and the worker in a different container cannot read them.

This template runs Puma and Sidekiq side by side in a single service with a persistent volume mounted at `/rails/storage`, so the worker sees every file the web app writes and those files survive a redeploy. That is three services instead of four, which is also one less service on your bill. Database migrations run at start, the service exposes Rails' own `/up` health endpoint so Railway holds traffic until the app is genuinely ready, and Active Record encryption keys are provisioned as their own generated secrets rather than being derived from `SECRET_KEY_BASE` — so bank tokens, API keys and MFA secrets are encrypted at rest and stay readable if you ever rotate the app secret.

Memory use measured on this build is roughly 630 MB for the Sure service with the web process and worker together, so it fits Railway's Trial and Hobby plans. It does not fit the 0.5 GB Free plan cap.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sure | `ghcr.io/we-promise/sure@sha256:12361b7b309f867002b8a1f54200607ca1a321e1b57cf21890caaf83602c3cd0` | Web service |
| redis | `redis:8.2.1` | Database |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_USER` | sure | (secret) | - |
| `SECRET_KEY_BASE` | sure | (secret) | - |
| `POSTGRES_PASSWORD` | sure | (secret) | - |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | sure | - | Encrypts bank tokens, API keys and MFA secrets at rest. Keep it — losing it makes existing encrypted data unreadable. |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | sure | - | Encrypts bank tokens, API keys and MFA secrets at rest. Keep it — losing it makes existing encrypted data unreadable. |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | sure | - | Encrypts bank tokens, API keys and MFA secrets at rest. Keep it — losing it makes existing encrypted data unreadable. |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |

## Configuration

- **Start command:** `/bin/bash -lc 'bundle exec rails db:prepare && (bundle exec sidekiq &) && exec bundle exec rails server -b 0.0.0.0 -p 3000'`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`
- **Start command:** `/bin/sh -c 'rm -rf /data/lost+found && chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/sure-finance-self-hosted)
