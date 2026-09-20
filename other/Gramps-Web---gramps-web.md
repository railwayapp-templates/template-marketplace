# Deploy Gramps Web on Railway

Family history with persistent trees, media and background jobs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gramps-web)

## About

Family history with persistent trees, media and background jobs.

| Service | Access | Persistent storage |
| --- | --- | --- |
| gramps-web | Public HTTPS | /data |
| redis | Private | /data |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gramps-web | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| redis | `redis:7.4@sha256:c6eabf748fc7a61dbb5a705c78bcf3d6377b1127a97d0ce965c11c44ba46896f` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gramps-web | 5000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `GRAMPSHOME` | gramps-web | /data/home | Persistent Gramps data location inside the single /data volume. |
| `OWNER_EMAIL` | gramps-web | - | Email for the initial Gramps Web owner. |
| `GRAMPSWEB_TREE` | gramps-web | Family Tree | Grampsweb tree for gramps-web. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_PASSWORD` | gramps-web | (secret) | Generated owner password. Keep private and preserve with backups. |
| `GRAMPSWEB_BASE_URL` | gramps-web | - | Grampsweb base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `GRAMPSWEB_EXPORT_DIR` | gramps-web | /data/cache/export | Persistent Gramps data location inside the single /data volume. |
| `GRAMPSWEB_REPORT_DIR` | gramps-web | /data/cache/reports | Persistent Gramps data location inside the single /data volume. |
| `GRAMPSWEB_SECRET_KEY` | gramps-web | (secret) | Generated grampsweb secret key. Keep private and preserve with backups. |
| `GRAMPS_DATABASE_PATH` | gramps-web | /data/grampsdb | Persistent Gramps data location inside the single /data volume. |
| `GUNICORN_NUM_WORKERS` | gramps-web | 2 | Gunicorn num workers for gramps-web. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GRAMPSWEB_USER_DB_URI` | gramps-web | sqlite:////data/users/users.sqlite | Persistent Gramps data location inside the single /data volume. |
| `GRAMPSWEB_MEDIA_BASE_DIR` | gramps-web | /data/media | Persistent Gramps data location inside the single /data volume. |
| `GRAMPSWEB_DISABLE_TELEMETRY` | gramps-web | true | Grampsweb disable telemetry for gramps-web. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GRAMPSWEB_SEARCH_INDEX_DB_URI` | gramps-web | sqlite:////data/index/search_index.db | Persistent Gramps data location inside the single /data volume. |
| `GRAMPSWEB_RATELIMIT_STORAGE_URI` | gramps-web | - | Grampsweb ratelimit storage uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `GRAMPSWEB_REGISTRATION_DISABLED` | gramps-web | true | Grampsweb registration disabled for gramps-web. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GRAMPSWEB_CELERY_CONFIG__broker_url` | gramps-web | - | Grampsweb celery config  broker url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `GRAMPSWEB_CELERY_CONFIG__result_backend` | gramps-web | - | Grampsweb celery config  result backend resolved automatically from the linked service. Keep this reference when using the included topology. |
| `GRAMPSWEB_REQUEST_CACHE_CONFIG__CACHE_DIR` | gramps-web | /data/cache/request_cache | Persistent Gramps data location inside the single /data volume. |
| `GRAMPSWEB_THUMBNAIL_CACHE_CONFIG__CACHE_DIR` | gramps-web | /data/thumbnail_cache | Persistent Gramps data location inside the single /data volume. |
| `GRAMPSWEB_PERSISTENT_CACHE_CONFIG__CACHE_DIR` | gramps-web | /data/cache/persistent_cache | Persistent Gramps data location inside the single /data volume. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/gramps-web)
