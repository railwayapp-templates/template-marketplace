# Deploy atproto-tap-example on Railway

Template for backfilling on atproto

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/atproto-tap-example)

## About

Backfill atproto records made easy

Set configs and deploy your atproto-tap-example backfiller on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tap | `ghcr.io/bluesky-social/indigo/tap:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TAP_LOG_LEVEL` | tap | error | Log level, may want info for debugging |
| `TAP_ADMIN_PASSWORD` | tap | (secret) | The admin password for the service. You want this if it's open to the public |
| `TAP_SIGNAL_COLLECTION` | tap | - | The lexicon collection you want to find repos(users) by. You want one your users on the  atproto app mostly have. like sh.tangled.actor.profile |
| `TAP_COLLECTION_FILTERS` | tap | - | Comma sepperated list of collections you want to be added while backfilling and listening to on the firehose |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/atproto-tap-example)
