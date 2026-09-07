# Deploy Tubearchivist on Railway

Self-hosted YouTube archive: download, organize, and search your collection

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tubearchivist-2)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/tubearchivist-2)

Self-hosted YouTube media archive server — save, organize, and search your
YouTube collection. TubeArchivist downloads videos with metadata, subtitles,
and comments, then indexes everything in Elasticsearch for fast full-text
search, all behind a clean responsive web UI.

This Railway template deploys the full TubeArchivist stack: the Django +
Celery + nginx main app, Elasticsearch 8.19 for search and metadata indexing,
Redis 7.4 for the task queue, and a POT-token provider companion that keeps
yt-dlp downloads working from datacenter IPs where YouTube's bot checks would
otherwise stall them. All services talk over Railway private networking, and
media persists on the main service's 50GB volume. First start takes a few
minutes while Elasticsearch initializes its index; after that, log in with
the generated credentials and add channels or video URLs to start archiving.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tubearchivist-redis | [INAPP-Mobile/tubearchivist-redis](https://github.com/INAPP-Mobile/tubearchivist-redis) | Database |
| tubearchivist-pot | `brainicism/bgutil-ytdlp-pot-provider:1.3.2` | Worker |
| tubearchivist | [INAPP-Mobile/tubearchivist](https://github.com/INAPP-Mobile/tubearchivist) | Web service |
| tubearchivist-es | [INAPP-Mobile/tubearchivist-es](https://github.com/INAPP-Mobile/tubearchivist-es) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | tubearchivist-pot | 4416 | HTTP port for the bgutil-ytdlp-pot-provider server. |
| `TZ` | tubearchivist | UTC | Container timezone (IANA name). |
| `PORT` | tubearchivist | 8000 | HTTP port (nginx reverse-proxies to backend on 8080). |
| `ES_URL` | tubearchivist | - | Elasticsearch connection URL — auto-derived from ES companion. |
| `TA_HOST` | tubearchivist | - | Public URL of this service — auto-derived from Railway domain. |
| `HOST_GID` | tubearchivist | 1000 | Group ID for volume file ownership. |
| `HOST_UID` | tubearchivist | 1000 | User ID for volume file ownership. |
| `REDIS_CON` | tubearchivist | - | Redis connection URL — auto-derived from Redis companion. |
| `TA_PASSWORD` | tubearchivist | (secret) | Initial admin password — auto-generated. Save after deploy. |
| `TA_USERNAME` | tubearchivist | (secret) | Initial admin username. Change after first login. |
| `ELASTIC_PASSWORD` | tubearchivist | (secret) | Elasticsearch password — auto-generated. Must match ES service password. |
| `POT_PROVIDER_URL` | tubearchivist | - | POT-token provider URL for yt-dlp — auto-derived from POT companion. |
| `TA_AUTO_UPDATE_YTDLP` | tubearchivist | release | Auto-update yt-dlp (release|nightly|disabled). |
| `ES_JAVA_OPTS` | tubearchivist-es | -Xms512m -Xmx512m | Java heap limits for Elasticsearch. |
| `ELASTIC_PASSWORD` | tubearchivist-es | (secret) | Elasticsearch password — shared from main service. |

## Configuration

- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cache`
- **Volume:** `/usr/share/elasticsearch/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/tubearchivist-2)
