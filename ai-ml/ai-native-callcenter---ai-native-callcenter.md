# Deploy ai-native-callcenter on Railway

AI-native call center with embedded UI, PostgreSQL, and FreeSWITCH.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-native-callcenter)

## About

AI Native Call Center is an open-source, AI-first contact-center platform with an embedded browser UI, REST API, live events, PostgreSQL-backed history, and FreeSWITCH telephony integration. The template provides a ready-to-use demo workspace with seeded users, queues, flows, and call records, while keeping provider credentials and persistent database state configurable.

Railway runs the application, PostgreSQL, and FreeSWITCH as separate Docker-image services connected over Railway private networking. The app exposes the browser UI and API on HTTPS; PostgreSQL state is persisted on a Railway volume. The default demo login is `admin`; its password is generated from `AICC_SEED_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| freeswitch | `rasonyang/freeswitch-aicc:v0.5.0` | Worker |
| postgres | `postgres:18` | Database |
| app | `rasonyang/ai-native-callcenter:v0.5.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `FS_ESL_PASSWORD` | freeswitch | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `AICC_ESL_PASSWORD` | app | (secret) |
| `AICC_SEED_PASSWORD` | app | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ai-native-callcenter)
