# Deploy TubeArchivist | Your Own YouTube Archive on Railway

Self-hosted YouTube archive: subscribe, download, search, stream ad-free.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tubearchivist)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/tubearchivist?utm_medium=integration&utm_source=button&utm_campaign=tubearchivist)

[TubeArchivist](https://www.tubearchivist.com/) is a self-hosted YouTube media server — subscribe to channels, download videos with yt-dlp, index everything with full-text search, and watch ad-free in a clean web player with continue-watching progress. Your archive survives deleted videos, terminated channels, and region blocks.

This template deploys the full three-service stack: the TubeArchivist app, an Elasticsearch 8 index, and Redis, wired together over Railway's private network. Media and cache live on a volume mounted at `/data` in the app service; the Elasticsearch index persists on its own volume. Initial admin credentials come from the `TA_USERNAME` / `TA_PASSWORD` variables.

**Important — YouTube and datacenter IPs:** YouTube aggressively rate-limits and blocks requests from cloud provider IPs. A fresh deploy will browse and index fine, but downloads will likely fail until you authenticate: in TubeArchivist go to Settings → Application and add your YouTube cookies (exported with a browser extension like "Get cookies.txt LOCALLY" from a logged-in session), and consider enabling PO tokens per the [TubeArchivist docs](https://docs.tubearchivist.com/settings/application/). Use a throwaway Google account — automation can get accounts flagged.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tubearchivist | [nomideusz/tubearchivist-railway](https://github.com/nomideusz/tubearchivist-railway) (root: ta) | Web service |
| archivist-redis | `redis:7` | Database |
| archivist-es | [nomideusz/tubearchivist-railway](https://github.com/nomideusz/tubearchivist-railway) (root: es) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | tubearchivist | UTC | Time zone for download schedules. |
| `PORT` | tubearchivist | 8000 | Port for Railway healthcheck probing. Do not change. |
| `ES_URL` | tubearchivist | - | Elasticsearch connection. Do not change. |
| `TA_HOST` | tubearchivist | - | Public URL of this instance. Do not change. |
| `REDIS_CON` | tubearchivist | - | Redis connection. Do not change. |
| `TA_PASSWORD` | tubearchivist | (secret) | Initial admin password. |
| `TA_USERNAME` | tubearchivist | (secret) | Initial admin username. |
| `ELASTIC_PASSWORD` | tubearchivist | (secret) | Elasticsearch password, shared with the archivist-es service. Do not change. |
| `ELASTIC_PASSWORD` | archivist-es | (secret) | Elasticsearch password, shared with the tubearchivist service. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/usr/share/elasticsearch/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/tubearchivist)
