# Deploy Apache Superset + Postgres/Redis on Railway

Apache Superset BI with Postgres, Redis, and persistent volumes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-superset-postgresredis)

## About

Self-hosted Apache Superset with private Postgres, Redis, and persistent home storage.

- `superset`: public BI UI
- `postgres`: private Postgres
- `Redis`: private cache and Celery broker

Login is `admin@example.com`. The password is `SUPERSET_ADMIN_PASSWORD` on the superset service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| superset | `apache/superset:5.0.0-dev` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `DATABASE_USER` | superset | (secret) |
| `REDIS_PASSWORD` | superset | (secret) |
| `DATABASE_PASSWORD` | superset | (secret) |
| `SUPERSET_SECRET_KEY` | superset | (secret) |
| `SUPERSET_ADMIN_PASSWORD` | superset | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -lc '
set -eu
mkdir -p /app/superset_home
export DATABASE_USER="${DATABASE_USER:-superset}"
export DATABASE_DB="${DATABASE_DB:-superset}"
export DATABASE_PORT="${DATABASE_PORT:-5432}"
export DATABASE_DIALECT="${DATABASE_DIALECT:-postgresql+psycopg2}"
export REDIS_PORT="${REDIS_PORT:-6379}"
export REDIS_CACHE_DB="${REDIS_CACHE_DB:-2}"
export REDIS_CELERY_DB="${REDIS_CELERY_DB:-0}"
export REDIS_RESULTS_DB="${REDIS_RESULTS_DB:-1}"
export SUPERSET_ADMIN_USERNAME="${SUPERSET_ADMIN_USERNAME:-admin}"
export SUPERSET_ADMIN_FIRSTNAME="${SUPERSET_ADMIN_FIRSTNAME:-Superset}"
export SUPERSET_ADMIN_LASTNAME="${SUPERSET_ADMIN_LASTNAME:-Admin}"
export SUPERSET_ADMIN_EMAIL="${SUPERSET_ADMIN_EMAIL:-admin@example.com}"
export SUPERSET_SECRET_KEY="${SUPERSET_SECRET_KEY:-$DATABASE_PASSWORD}"
export SUPERSET_ADMIN_PASSWORD="${SUPERSET_ADMIN_PASSWORD:-$DATABASE_PASSWORD}"
export SUPERSET_WEBSERVER_WORKERS="${SUPERSET_WEBSERVER_WORKERS:-2}"
export SUPERSET_WEBSERVER_TIMEOUT="${SUPERSET_WEBSERVER_TIMEOUT:-120}"
cat >/app/superset_home/superset_config.py <<PY
import os
database_dialect = os.environ.get("DATABASE_DIALECT", "postgresql+psycopg2")
database_user = os.environ.get("DATABASE_USER", "superset")
database_password = os.environ["DATABASE_PASSWORD"]
database_host = os.environ["DATABASE_HOST"]
database_port = os.environ.get("DATABASE_PORT", "5432")
database_db = os.environ.get("DATABASE_DB", "superset")
SQLALCHEMY_DATABASE_URI = f"{database_dialect}://{database_user}:{database_password}@{database_host}:{database_port}/{database_db}"
SECRET_KEY = os.environ["SUPERSET_SECRET_KEY"]
ENABLE_PROXY_FIX = True
PREFERRED_URL_SCHEME = "https"
redis_host = os.environ["REDIS_HOST"]
redis_port = os.environ.get("REDIS_PORT", "6379")
redis_password = os.environ["REDIS_PASSWORD"]
redis_cache_db = int(os.environ.get("REDIS_CACHE_DB", "2"))
redis_celery_db = os.environ.get("REDIS_CELERY_DB", "0")
redis_results_db = os.environ.get("REDIS_RESULTS_DB", "1")
CACHE_CONFIG = {"CACHE_TYPE": "RedisCache", "CACHE_DEFAULT_TIMEOUT": 300, "CACHE_KEY_PREFIX": "superset_", "CACHE_REDIS_HOST": redis_host, "CACHE_REDIS_PORT": int(redis_port), "CACHE_REDIS_PASSWORD": redis_password, "CACHE_REDIS_DB": redis_cache_db}
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
/app/.venv/bin/superset fab create-admin --username "$SUPERSET_ADMIN_USERNAME" --firstname "$SUPERSET_ADMIN_FIRSTNAME" --lastname "$SUPERSET_ADMIN_LASTNAME" --email "$SUPERSET_ADMIN_EMAIL" --password "$SUPERSET_ADMIN_PASSWORD" || true
/app/.venv/bin/superset init
exec /app/.venv/bin/gunicorn --bind "0.0.0.0:${PORT:-8088}" --workers "$SUPERSET_WEBSERVER_WORKERS" --timeout "$SUPERSET_WEBSERVER_TIMEOUT" "superset.app:create_app()"
'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/superset_home`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/apache-superset-postgresredis)
