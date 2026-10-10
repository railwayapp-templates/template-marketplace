# Deploy Tealbrick Knowledge — source v0.5.0 on Railway

Private agent memory and research, built from source on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tealbrick-knowledge-source-v050)

## About

Deploy private agent memory and research in your own Railway project. Knowledge builds directly from public source at protected branch release-knowledge-v0.5.0, exact revision e5286628f66578b4d8ff0e0d27da710e6ed1115a. No Tealbrick GHCR credentials are required. Public source does not replace the repository license or your workspace entitlement.

The template creates three services and three persistent volumes: Knowledge with bundled GBrain (/data), OpenNotebook 1.14.0 (/app/data), and SurrealDB 2.6.5 (/mydata). OpenNotebook and SurrealDB use digest-pinned public images and private Railway networking. Only Knowledge exposes an HTTPS endpoint. Source builds use deploy/container/Dockerfile. Preserve generated credentials and the OpenNotebook encryption key during upgrades; back up all volumes and protect recovery keys separately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenNotebook | `lfnovo/open_notebook:1.14.0@sha256:6c5fb35b6c60549e4c2dc7617d1f07aaf0a67c4954564a73498d536b8186e879` | Database |
| SurrealDB | `surrealdb/surrealdb:v2.6.5@sha256:7db835aab6355b66e2b5779a3cddae811f201c417adadb4413310ae7f925110e` | Database |
| Knowledge | [Tealbrick/knowledge](https://github.com/Tealbrick/knowledge) (branch: release-knowledge-v0.5.0) (root: /) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | OpenNotebook | 5055 |
| `SURREAL_USER` | OpenNotebook | (secret) |
| `SURREAL_PASSWORD` | OpenNotebook | (secret) |
| `OPEN_NOTEBOOK_PASSWORD` | OpenNotebook | (secret) |
| `OPEN_NOTEBOOK_ENABLE_DOCLING` | OpenNotebook | false |
| `OPEN_NOTEBOOK_ENABLE_CRAWL4AI` | OpenNotebook | false |
| `OPEN_NOTEBOOK_WORKER_MAX_TASKS` | OpenNotebook | 1 |
| `PORT` | SurrealDB | 8000 |
| `SURREAL_USER` | SurrealDB | (secret) |
| `SURREAL_DATABASE` | SurrealDB | knowledge |
| `SURREAL_NAMESPACE` | SurrealDB | knowledge |
| `HOST` | Knowledge | 0.0.0.0 |
| `PORT` | Knowledge | 5310 |
| `NODE_ENV` | Knowledge | production |
| `KNOWLEDGE_DATA_DIR` | Knowledge | /data |
| `KNOWLEDGE_GBRAIN_HOME` | Knowledge | /data/gbrain-home |
| `KNOWLEDGE_INSTANCE_TOKEN` | Knowledge | (secret) |
| `KNOWLEDGE_GBRAIN_AUTOSTART` | Knowledge | true |
| `KNOWLEDGE_SERVICE_PRINCIPALS` | Knowledge | [] |
| `KNOWLEDGE_OPEN_NOTEBOOK_TOKEN` | Knowledge | (secret) |
| `KNOWLEDGE_OPEN_NOTEBOOK_BINDINGS` | Knowledge | [] |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/app/data`
- **Start command:** `/surreal start --log info --bind 0.0.0.0:8000 rocksdb:/mydata/knowledge.db`
- **Volume:** `/mydata`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, JavaScript, Shell, PLpgSQL, CSS, HTML, Dockerfile, C, Python, Procfile

[View on Railway →](https://railway.com/deploy/tealbrick-knowledge-source-v050)
