# Deploy Nakama on Railway

Nakama 3.41 game server with Postgres, client API and admin console.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nakama-1)

## About

Nakama is an open-source game server for multiplayer and social features. It provides user accounts and device authentication, realtime multiplayer, matchmaking, chat, leaderboards, tournaments, storage and in-app purchase validation, with client SDKs for Unity, Unreal, Godot, Defold, JavaScript, Swift and Kotlin. The server is written in Go.

This template deploys Nakama 3.41.0 with a Railway Postgres database. Migrations run before every start. The service has two public domains: the client API and realtime socket on port 7350, and the admin console on 7351. The server key, session keys, runtime HTTP key, console password and console signing key are all generated at deploy time, replacing Nakama's well-known development defaults. Custom Lua, TypeScript or Go modules need your own image built from the official one. The Hobby plan fits development and small games. Back up Postgres regularly, since it holds all player data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nakama | `heroiclabs/nakama:3.41.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | nakama | 7350 |
| `NAKAMA_CONSOLE_PASSWORD` | nakama | (secret) |
| `NAKAMA_CONSOLE_USERNAME` | nakama | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c '/nakama/nakama migrate up --database.address "$NAKAMA_DATABASE_ADDRESS" && exec /nakama/nakama --name nakama1 --database.address "$NAKAMA_DATABASE_ADDRESS" --logger.level INFO --socket.server_key "$NAKAMA_SERVER_KEY" --session.encryption_key "$NAKAMA_SESSION_ENCRYPTION_KEY" --session.refresh_encryption_key "$NAKAMA_SESSION_REFRESH_KEY" --runtime.http_key "$NAKAMA_RUNTIME_HTTP_KEY" --console.username "$NAKAMA_CONSOLE_USERNAME" --console.password "$NAKAMA_CONSOLE_PASSWORD" --console.signing_key "$NAKAMA_CONSOLE_SIGNING_KEY"'`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/nakama-1)
