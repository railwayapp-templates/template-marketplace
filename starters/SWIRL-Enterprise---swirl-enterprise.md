# Deploy SWIRL Enterprise on Railway

Private federated search + AI answers with any LLM, in your own workspace.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swirl-enterprise)

## About

SWIRL Enterprise is private AI search for your organization. It searches your
sources where they live - Microsoft 365, Google Workspace, databases, web and
enterprise search engines - and answers questions with AI, grounded in your
results with citations. No data pipeline, no copying content into a vector
store: your data stays in place.

This template deploys the complete SWIRL Enterprise stack into your own
Railway workspace: the SWIRL application (search, AI answers, admin),
PostgreSQL for configuration, Redis for task queues, Qdrant for semantic
caching with version clustering, Apache Tika for document text extraction and
OCR, SeaweedFS for private object storage, and Ollama for supporting local
model tasks. All services communicate over Railway's private network; only
the SWIRL application is exposed publicly over HTTPS. Configuration and
cached documents persist to Railway volumes and survive redeploys. You
control the workspace, the license, and the AI provider keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| swirl | `swirlai/swirl-search-internal:v5_0_0_1` | Web service |
| postgres | `postgres:16-alpine` | Database |
| seaweedfs | `chrislusf/seaweedfs:4.36` | Database |
| qdrant | `qdrant/qdrant:v1.18.2` | Database |
| ollama | `swirlai/release-ollama-enterprise:0.30.10` | Worker |
| tika | `swirlai/release-tika-enterprise:latest` | Worker |
| redis | `redis:7.4-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | swirl | 8000 | - |
| `PROTOCOL` | swirl | https | - |
| `SQL_HOST` | swirl | postgres.railway.internal | - |
| `SQL_PORT` | swirl | 5432 | - |
| `SQL_USER` | swirl | (secret) | - |
| `SQL_ENGINE` | swirl | django.db.backends.postgresql | - |
| `SWIRL_PORT` | swirl | 443 | - |
| `ADMIN_EMAIL` | swirl | - | Email address for the SWIRL admin account. |
| `SQL_DATABASE` | swirl | swirl | - |
| `SQL_PASSWORD` | swirl | (secret) | - |
| `IN_PRODUCTION` | swirl | true | - |
| `SWIRL_LICENSE` | swirl | - | Paste the SWIRL license JSON received from SWIRL - contact SWIRL for a license! |
| `ADMIN_PASSWORD` | swirl | (secret) | - |
| `CACHE_REDIS_URL` | swirl | redis://redis.railway.internal:6379/3 | - |
| `PYTHONUNBUFFERED` | swirl | 1 | - |
| `SWIRL_OLLAMA_URL` | swirl | http://ollama.railway.internal:11434 | - |
| `SWIRL_QDRANT_URL` | swirl | http://qdrant.railway.internal:6333 | - |
| `TIKA_CLIENT_ONLY` | swirl | True | - |
| `ANTHROPIC_API_KEY` | swirl | (secret) | Recommended: Anthropic API key - enables fast AI answers via Claude. Leave blank to configure an AI provider later. |
| `CELERY_BROKER_URL` | swirl | redis://redis.railway.internal:6379/0 | - |
| `SWIRL_QDRANT_MODE` | swirl | external | - |
| `SWIRL_STORAGE_MODE` | swirl | external | - |
| `SWIRL_STORAGE_BUCKET` | swirl | swirl-cache-bodies | - |
| `SWIRL_STORAGE_REGION` | swirl | us-east-1 | - |
| `TIKA_SERVER_ENDPOINT` | swirl | http://tika.railway.internal:9998 | - |
| `CELERY_RESULT_BACKEND` | swirl | redis://redis.railway.internal:6379/1 | - |
| `SWIRL_LITELLM_TIMEOUT` | swirl | 240 | - |
| `SWIRL_STORAGE_BACKEND` | swirl | s3 | - |
| `SWIRL_STORAGE_ENDPOINT` | swirl | http://seaweedfs.railway.internal:8333 | - |
| `POSTGRES_SUPER_PASSWORD` | swirl | (secret) | - |
| `SWIRL_TIKA_OCR_STRATEGY` | swirl | auto | - |
| `SWIRL_STORAGE_SECRET_KEY` | swirl | (secret) | - |
| `SWIRL_TIKA_OCR_TIMEOUT_MS` | swirl | 20000 | - |
| `SEARCH_RESULT_STORE_REDIS_URL` | swirl | redis://redis.railway.internal:6379/2 | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |
| `QDRANT__SERVICE__HOST` | qdrant | :: | - |
| `OLLAMA_HOST` | ollama | [::]:11434 | - |
| `OLLAMA_KEEP_ALIVE` | ollama | 30m | - |

## Configuration

- **Start command:** `sh -c 'rm -f /app/.swirl && mkdir -p /app/static/api/config /app/logs && python manage.py collectstatic --noinput && python swirl.py load_data && python manage.py reconcile_ollama_url && echo ZnJvbSBzd2lybC5tb2RlbHMgaW1wb3J0IEFJUHJvdmlkZXIKaW1wb3J0IG9zCgpwID0gQUlQcm92aWRlci5vYmplY3RzLmZpbHRlcihuYW1lX19zdGFydHN3aXRoPSdPbGxhbWEgKCcpLmZpcnN0KCkKaWYgcDoKICAgIGNoYW5nZWQgPSBGYWxzZQogICAgaWYgbm90IHAuYWN0aXZlOgogICAgICAgIHAuYWN0aXZlID0gVHJ1ZQogICAgICAgIHAuYXBpX2tleSA9IHAuYXBpX2tleSBvciAnb2xsYW1hJwogICAgICAgIGNoYW5nZWQgPSBUcnVlCiAgICBpZiBub3QgcC5tb2RlbC5zdGFydHN3aXRoKCdvbGxhbWEvJyk6CiAgICAgICAgcC5tb2RlbCA9ICdvbGxhbWEvJyArIHAubW9kZWwKICAgICAgICBjaGFuZ2VkID0gVHJ1ZQogICAgaWYgY2hhbmdlZDoKICAgICAgICBwLnNhdmUoKQpwcmludCgnb2xsYW1hIGNoYXQgcHJvdmlkZXIgYWN0aXZlOicsIHAubmFtZSBpZiBwIGVsc2UgTm9uZSwgcC5tb2RlbCBpZiBwIGVsc2UgJycpCgprZXkgPSBvcy5lbnZpcm9uLmdldCgnQU5USFJPUElDX0FQSV9LRVknLCAnJykuc3RyaXAoKQppZiBrZXk6CiAgICBhID0gQUlQcm92aWRlci5vYmplY3RzLmZpbHRlcihuYW1lX19zdGFydHN3aXRoPSdBbnRocm9waWMgQ2xhdWRlJykuZmlyc3QoKQogICAgaWYgYToKICAgICAgICBhLm1vZGVsID0gJ2NsYXVkZS1oYWlrdS00LTUnCiAgICAgICAgYS5hcGlfa2V5ID0ga2V5CiAgICAgICAgYS5hY3RpdmUgPSBUcnVlCiAgICAgICAgYS5kZWZhdWx0cyA9IFsncmFnJywgJ2NoYXQnXQogICAgICAgIGEuc2F2ZSgpCiAgICAgICAgcHJpbnQoJ2FudGhyb3BpYyBwcm92aWRlciBhY3RpdmU6JywgYS5uYW1lLCAnbW9kZWw6JywgYS5tb2RlbCkKZWxzZToKICAgIHByaW50KCdubyBBTlRIUk9QSUNfQVBJX0tFWSBzZXQ7IHNraXBwaW5nIGFudGhyb3BpYyBwcm92aWRlcicpCg== | base64 -d | python manage.py shell && python swirl.py config_default_api_settings && python manage.py init_qdrant && python manage.py init_storage && python swirl.py start celery-beats celery-search-worker celery-pagefetch-worker celery-interactive-worker celery-maintenance-worker celery-healthcheck-worker celery-corpus-worker && exec daphne -b :: -p 8000 swirl_server.asgi:application'`
- **Healthcheck:** `/swirl/health/celery/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `weed server -dir=/data -s3 -volume.max=0 -master.volumeSizeLimitMB=1024 -ip.bind=::`
- **Volume:** `/data`
- **Volume:** `/qdrant/storage`
- **Start command:** `sh -c 'exec java -cp "/tika-server-standard-${TIKA_VERSION}.jar:/tika-extras/*" org.apache.tika.server.core.TikaServerCli -h "[::]"'`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/swirl-enterprise)
