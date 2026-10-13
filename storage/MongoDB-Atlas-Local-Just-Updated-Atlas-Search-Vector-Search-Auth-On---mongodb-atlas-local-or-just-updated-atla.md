# Deploy MongoDB Atlas Local | (Just Updated) Atlas Search + Vector Search, Auth On on Railway

Atlas Search + Vector Search on MongoDB 8, auth on, data kept

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-atlas-local-or-just-updated-atla)

## About

MongoDB Atlas Local is the official MongoDB image that bundles the database with the Atlas Search engine (mongot). It gives you `$search` full-text queries and `$vectorSearch` similarity queries on your own Railway project, the same aggregation stages you would use on MongoDB Atlas. This template runs it as a single digest-pinned service, with the database port on a Railway TCP proxy and a Railway volume holding the data.

- **Atlas Search and Vector Search work out of the box.** Create a search index with `createSearchIndex` and query it with `$search` or `$vectorSearch`. Verified on a live deploy: a text index and a cosine vector index both reached READY and returned the expected documents.
- **Authentication is on from the first connection.** A root user named `admin` is created at first boot with a password generated per deploy. Connections with a wrong password are refused.
- **Your data survives redeploys.** The data, config and search directories live on a Railway volume mounted at `/data`. The server runs as root so the root-owned volume is writable, and the deploy log prints the user id and mount owner.
- **Two ways in.** Services in the same project use the private URL; clients elsewhere use the TCP proxy URL. Both include `directConnection=true`, which this single-node replica set requires.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongodb-atlas-local | `mongodb/mongodb-atlas-local:8.0@sha256:1985314b0ded756ba965e0f400d17406b7a89bec659d4763a490f42f006e4fbd` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MONGO_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; mkdir -p /data/db /data/configdb /data/mongot; export MONGODB_INITDB_ROOT_USERNAME=admin MONGODB_INITDB_ROOT_PASSWORD="$MONGO_PASSWORD"; echo "[railway] uid=$(id -u) owner=$(stat -c %u:%g /data)"; exec /usr/local/bin/runner server'`
- **TCP Proxies:** 27017
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mongodb-atlas-local-or-just-updated-atla)
