# Deploy Meilisearch on Railway

Fast search engine that indexes your data and handles typos

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch-engine)

## About

Meilisearch is an open-source search engine written in Rust that returns ranked, typo-tolerant results in a couple of milliseconds — what teams reach for when they want Algolia's search-as-you-type experience without handing their data to a third party. You point it at JSON documents — products, articles, tickets, customer records — and it builds an index handling misspellings, filters, facets, sorting, synonyms and geographic queries through one REST API.

This template lets you self-host Meilisearch on Railway with a working admin dashboard attached, so you can create an index and run your first query minutes after deploying. It runs two services: `meilisearch`, the engine, backed by a persistent volume holding every index, snapshot and dump; and `meilisearch-ui`, a browser dashboard for creating indexes, uploading documents and testing queries. The engine is protected by a master key from the first boot, serves a REST API on its public domain, and is reachable privately at `meilisearch.railway.internal:7700`.

![Diagram of the Meilisearch engine and dashboard services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787292595/meilisearch-architecture.png)

Meilisearch is a single Rust binary with an embedded LMDB store, which is what makes it practical to self-host: no cluster to babysit, no JVM to tune, no coordination layer. It accepts documents over HTTP, indexes them through an internal task queue, and serves queries from memory-mapped files on disk. Teams self-host it when search data is sensitive, or when per-record SaaS pricing stops making sense.

Key features:

- **Typo tolerance and search-as-you-type**, under 50 ms on typical datasets
- **Filtering, faceting and sorting** on any attribute marked filterable or sortable
- **Hybrid search** combining full-text matching with vector embeddings
- **Scoped API keys and tenant tokens**, so each client sees only their own data
- **Official SDKs** for JavaScript, Python, PHP, Ruby, Go, Rust, Java and .NET

The architecture is deliberately small. The `meilisearch` service owns the volume at `/meili_data`, holding the index at `data.ms` alongside snapshots and dumps. The `meilisearch-ui` service is a static single-page app served by nginx: it holds no data and keeps your connection details in browser local storage, so it needs no volume, database or secrets.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch-ui | `eyeix/meilisearch-ui:lite` | Web service |
| meilisearch | `getmeili/meilisearch:v1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | meilisearch-ui | 24900 | Port served by nginx and probed by the health check |
| `PORT` | meilisearch | 7700 | Port probed by the health check |
| `TMPDIR` | meilisearch | /meili_data/tmp | Indexing scratch space on the volume |
| `MEILI_ENV` | meilisearch | production | Enforces master key authentication |
| `MEILI_DB_PATH` | meilisearch | /meili_data/data.ms | Index location on the volume |
| `MEILI_DUMP_DIR` | meilisearch | /meili_data/dumps | Portable dump directory |
| `MEILI_HTTP_ADDR` | meilisearch | [::]:7700 | Dual-stack bind for private networking |
| `MEILI_MASTER_KEY` | meilisearch | - | Root API credential |
| `MEILI_UPGRADE_DB` | meilisearch | true | Migrate database in place on upgrade |
| `MEILI_NO_ANALYTICS` | meilisearch | true | Disable usage telemetry |
| `MEILI_SNAPSHOT_DIR` | meilisearch | /meili_data/snapshots | Scheduled snapshot directory |
| `MEILI_SCHEDULE_SNAPSHOT` | meilisearch | 86400 | One snapshot every 24 hours |
| `MEILI_EXPERIMENTAL_ENABLE_METRICS` | meilisearch | true | Authenticated Prometheus endpoint |

## Configuration

- **Start command:** `/bin/sh -c 'C=""; if [ -r /sys/fs/cgroup/cpu.max ]; then CM=$(cat /sys/fs/cgroup/cpu.max); Q=${CM%% *}; P=${CM##* }; if [ "$Q" != "max" ] && [ -n "$P" ]; then C=$(( (Q + P - 1) / P )); fi; fi; [ -n "$C" ] || C=2; [ "$C" -le 4 ] || C=4; sed -i "s/^worker_processes .*/worker_processes ${C};/" /etc/nginx/nginx.conf; echo "railway: nginx worker_processes=${C}"; exec /docker-entrypoint.sh nginx -g "daemon off;"'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'mkdir -p /meili_data/snapshots /meili_data/dumps /meili_data/tmp; C=""; if [ -r /sys/fs/cgroup/cpu.max ]; then CM=$(cat /sys/fs/cgroup/cpu.max); Q=${CM%% *}; P=${CM##* }; if [ "$Q" != "max" ] && [ -n "$P" ]; then C=$(( (Q + P - 1) / P )); fi; fi; [ -n "$C" ] || C=4; T=$(( C / 2 )); [ "$T" -ge 1 ] || T=1; M=""; if [ -r /sys/fs/cgroup/memory.max ]; then MM=$(cat /sys/fs/cgroup/memory.max); if [ "$MM" != "max" ]; then M=$MM; fi; fi; [ -n "$M" ] || M=2147483648; [ -n "$MEILI_MAX_INDEXING_THREADS" ] || export MEILI_MAX_INDEXING_THREADS=$T; [ -n "$MEILI_MAX_INDEXING_MEMORY" ] || export MEILI_MAX_INDEXING_MEMORY=$(( M / 2 )); echo "railway: cgroup cpus=$C mem=$M -> MEILI_MAX_INDEXING_THREADS=$MEILI_MAX_INDEXING_THREADS MEILI_MAX_INDEXING_MEMORY=$MEILI_MAX_INDEXING_MEMORY"; exec tini -s -- /bin/meilisearch'`
- **Healthcheck:** `/health`
- **Volume:** `/meili_data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/meilisearch-engine)
