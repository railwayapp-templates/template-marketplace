# Deploy Apache Superset + Postgres/Redis on Railway

Apache Superset BI with Postgres, Redis, and persistent volumes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-superset-postgresredis)

## About

Self-host Apache Superset, an open-source Tableau alternative, with Postgres metadata storage, Redis cache, persistent volumes, and generated admin credentials.

- `superset`: public Superset web service with Gunicorn on port `8088`
- `postgres`: private metadata database
- `redis`: private cache service
- Generated secret key, admin password, database password, and Redis password
- `/health` healthcheck
- No example-data bloat by default

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17-alpine` | Database |
| redis | `redis:7-alpine` | Database |
| superset | `apache/superset:5.0.0-dev` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `DATABASE_USER` | superset | (secret) |
| `REDIS_PASSWORD` | superset | (secret) |
| `DATABASE_PASSWORD` | superset | (secret) |
| `SUPERSET_SECRET_KEY` | superset | (secret) |
| `SUPERSET_ADMIN_PASSWORD` | superset | (secret) |
| `SUPERSET_ADMIN_USERNAME` | superset | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'exec redis-server --appendonly yes --dir /data --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Start command:** `/bin/sh -lc '
set -eu

mkdir -p /app/superset_home
cat >/app/superset_home/superset_config.py <<PY
import os

database_dialect = os.environ.get("DATABASE_DIALECT", "postgresql+psycopg2")
database_user = os.environ["DATABASE_USER"]
database_password = os.environ["DATABASE_PASSWORD"]
database_host = os.environ.get("DATABASE_HOST", "postgres.railway.internal")
database_port = os.environ.get("DATABASE_PORT", "5432")
database_db = os.environ.get("DATABASE_DB", "superset")

SQLALCHEMY_DATABASE_URI = f"{database_dialect}://{database_user}:{database_password}@{database_host}:{database_port}/{database_db}"
SECRET_KEY = os.environ["SUPERSET_SECRET_KEY"]
ENABLE_PROXY_FIX = True
PREFERRED_URL_SCHEME = "https"

redis_host = os.environ.get("REDIS_HOST", "redis.railway.internal")
redis_port = os.environ.get("REDIS_PORT", "6379")
redis_password = os.environ["REDIS_PASSWORD"]
redis_cache_db = int(os.environ.get("REDIS_CACHE_DB", "2"))
redis_celery_db = os.environ.get("REDIS_CELERY_DB", "0")
redis_results_db = os.environ.get("REDIS_RESULTS_DB", "1")

CACHE_CONFIG = {
    "CACHE_TYPE": "RedisCache",
    "CACHE_DEFAULT_TIMEOUT": 300,
    "CACHE_KEY_PREFIX": "superset_",
    "CACHE_REDIS_HOST": redis_host,
    "CACHE_REDIS_PORT": int(redis_port),
    "CACHE_REDIS_PASSWORD": redis_password,
    "CACHE_REDIS_DB": redis_cache_db,
}
DATA_CACHE_CONFIG = CACHE_CONFIG
FILTER_STATE_CACHE_CONFIG = CACHE_CONFIG
EXPLORE_FORM_DATA_CACHE_CONFIG = CACHE_CONFIG

class CeleryConfig:
    broker_url = f"redis://:{redis_password}@{redis_host}:{redis_port}/{redis_celery_db}"
    result_backend = f"redis://:{redis_password}@{redis_host}:{redis_port}/{redis_results_db}"

CELERY_CONFIG = CeleryConfig
PY

export SUPERSET_CONFIG_PATH=/app/superset_home/superset_config.py
/app/.venv/bin/superset db upgrade
/app/.venv/bin/superset fab create-admin \
  --username "$SUPERSET_ADMIN_USERNAME" \
  --firstname "$SUPERSET_ADMIN_FIRSTNAME" \
  --lastname "$SUPERSET_ADMIN_LASTNAME" \
  --email "$SUPERSET_ADMIN_EMAIL" \
  --password "$SUPERSET_ADMIN_PASSWORD" || true
/app/.venv/bin/superset init

exec /app/.venv/bin/gunicorn \
  --bind "0.0.0.0:${PORT:-8088}" \
  --workers "${SUPERSET_WEBSERVER_WORKERS:-2}" \
  --timeout "${SUPERSET_WEBSERVER_TIMEOUT:-120}" \
  "superset.app:create_app()"
'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/superset_home`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/apache-superset-postgresredis)
