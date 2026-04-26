# Deploy axonhub on Railway

Unified AI gateway with web UI, routing, and provider compatibility

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/axonhub)

## About

AxonHub runs as a single Dockerized web service on Railway using the official upstream image. Railway provides managed networking, fast deploys, and simple environment configuration for immediate browser access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| axonhub | `looplj/axonhub:v0.9.36` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8090 |
| `AXONHUB_DB_DSN` | file:axonhub.db?cache=shared&_fk=1&_pragma=journal_mode(WAL) |
| `AXONHUB_DB_DIALECT` | sqlite3 |
| `AXONHUB_SERVER_PORT` | 8090 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/axonhub)
