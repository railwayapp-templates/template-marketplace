# Deploy world-of-claudecraft on Railway

WoW-style micro-MMO with browser client and persistent multiplayer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/world-of-claudecraft)

## About

World of Claudecraft runs on Railway as a two-service Docker deployment: a single game server container serves the built browser client, REST API, and WebSocket world loop, while Railway Postgres stores accounts, characters, chat logs, social data, and world state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| app | `xiaosong233/world-of-claudecraft-railway:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | app | 8787 |
| `REALM_NAME` | app | Claudemoon |
| `REALM_TYPE` | app | Normal |
| `USERNAME_BANLIST` | app | (secret) |
| `USERNAME_BANLIST_FILE` | app | (secret) |
| `CHAT_LOG_RETENTION_DAYS` | app | 90 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/world-of-claudecraft)
