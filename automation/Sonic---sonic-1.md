# Deploy Sonic on Railway

Indexes search text and object identifiers, Elasticsearch alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sonic-1)

## About

Deploy this repository as a Sonic search backend on Railway. Sonic indexes search text and object identifiers over the Sonic Channel protocol (TCP port 1491). Your application pushes data with `PUSH` and queries with `QUERY` — Sonic returns IDs that you resolve in your own database.

This template runs the official [Sonic](https://github.com/valeriansaliou/sonic) Docker image with a Railway-ready configuration: listens on `0.0.0.0:1491`, stores the index on a persistent volume, and requires an authentication password for all channel connections.

Sonic is **not** an HTTP API. Connect via **TCP** (Railway TCP Proxy or private networking). Use client libraries such as [node-sonic-channel](https://www.npmjs.com/package/sonic-channel) or [pysonic](https://github.com/AlongWY/pysonic).

Each TCP connection uses **one channel mode** — you cannot switch modes mid-session:

| Mode | Commands |
|------|----------|
| `ingest` | `PUSH`, `POP`, `COUNT`, `FLUSHO`, `FLUSHB`, `FLUSHC` |
| `search` | `QUERY`, `SUGGEST`, `LIST`, `PING`, `HELP` |
| `control` | `TRIGGER consolidate`, `INFO`, `PING` |

**Networking:** services inside Railway connect to `${{sonic.RAILWAY_PRIVATE_DOMAIN}}:1491`. External clients use the **TCP Proxy** host and port from Railway settings — the public proxy port is often **not** 1491 (Railway maps it to the internal 1491).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sonic | [feliperosenek/sonic-railway](https://github.com/feliperosenek/sonic-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SONIC_AUTH_PASSWORD` | (secret) | Auth Pass |

## Configuration

- **Volume:** `/var/lib/sonic/store`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/sonic-1)
