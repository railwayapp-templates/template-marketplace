# Deploy Meilisearch on Railway

Instant typo-tolerant search engine - single 50MB Rust binary

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch-4)

## About

Meilisearch runs as a single container on Railway. Index data persists on a Railway volume at `/meili_data` (database in `/meili_data/data.ms`, snapshots and dumps created alongside). The engine listens on port 7700 and exposes a REST API. A start command derives indexer thread and memory limits from the container's cgroup so the engine stays stable on small plans, and Railway healthchecks `/health` before routing traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch-lite | `getmeili/meilisearch:v1.12` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7700 | Railway port target for the public domain and the internal healthcheck. |
| `MEILI_ENV` | production | Runtime environment. Keep 'production' so the HTTP API is protected by the master key. |
| `MEILI_DB_PATH` | /meili_data/data.ms | Database location inside the volume. Use a subdirectory of the mount, not the mount root, for reliable LMDB persistence on Railway. |
| `MEILI_HTTP_ADDR` | 0.0.0.0:7700 | Address and port Meilisearch listens on. Must match the Railway port mapping (7700). |
| `MEILI_MASTER_KEY` | - | Master key protecting all API routes. Auto-generated 32-character secret per deployment. Clients send it as 'Authorization: Bearer <key>'. |
| `MEILI_NO_ANALYTICS` | true | Disable anonymous telemetry. |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /meili_data/snapshots /meili_data/dumps /meili_data/tmp; C=""; if [ -r /sys/fs/cgroup/cpu.max ]; then CM=$(cat /sys/fs/cgroup/cpu.max); Q=${CM%% *}; P=${CM##* }; if [ "$Q" != "max" ] && [ -n "$P" ]; then C=$(( (Q + P - 1) / P )); fi; fi; [ -n "$C" ] || C=2; [ "$C" -le 4 ] || C=4; T=$(( C / 2 )); [ "$T" -ge 1 ] || T=1; M=""; if [ -r /sys/fs/cgroup/memory.max ]; then MM=$(cat /sys/fs/cgroup/memory.max); if [ "$MM" != "max" ]; then M=$MM; fi; fi; [ -n "$M" ] || M=2147483648; [ -n "$MEILI_MAX_INDEXING_THREADS" ] || export MEILI_MAX_INDEXING_THREADS=$T; [ -n "$MEILI_MAX_INDEXING_MEMORY" ] || export MEILI_MAX_INDEXING_MEMORY=$(( M / 2 )); echo "railway: cgroup cpus=$C mem=$M -> indexing_threads=$MEILI_MAX_INDEXING_THREADS indexing_mem=$MEILI_MAX_INDEXING_MEMORY"; exec tini -s -- /bin/meilisearch'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/meilisearch-4)
