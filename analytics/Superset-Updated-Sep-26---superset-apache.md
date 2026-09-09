# Deploy Superset [Updated Sep '26] on Railway

Superset [Sep '26] (Self-Hosted Tableau/Looker Alternative)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/superset-apache)

## About

Apache Superset is the open-source answer to Tableau: a real production-grade business intelligence platform with SQL-based exploration, dashboards, and scheduled reports, run at genuine scale by companies like Airbnb, its original creator. This template deploys its full 5-service architecture, verified live end-to-end, not a stripped-down web-app-only setup.

Tableau Cloud's Standard edition runs $75/user/month for Creator seats, $42 for Explorer, $15 for Viewer, billed annually. A 10-person analytics team on Creator seats alone pays $750/month before adding any Explorer or Viewer licenses. Looker is worse for smaller teams: no public pricing, but real deployments start around $36,000-48,000/year. Superset self-hosted on Railway flips that entirely: a flat infrastructure cost regardless of how many people view or build dashboards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| superset-beat | `apache/superset:latest` | Worker |
| redis | `redis:8.2.1` | Database |
| superset | `apache/superset:latest` | Web service |
| superset-worker | `apache/superset:latest` | Worker |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEV_MODE` | superset-beat | false | Disables the dev-mode editable install. |
| `REDIS_URL` | superset-beat | - | Celery broker + result backend + cache URL, referenced inside the decoded config. |
| `PYTHONPATH` | superset-beat | /app/pythonpath | Where the decoded superset_config.py gets placed and picked up. |
| `DATABASE_URL` | superset-beat | - | Metadata DB connection string. |
| `SUPERSET_ENV` | superset-beat | production | Production mode flag. |
| `SUPERSET_PORT` | superset-beat | 8088 | Not used by the worker process — no HTTP server here — kept consistent with web/beat. |
| `ADMIN_PASSWORD` | superset-beat | (secret) | Matches the web service's admin password — not independently generated. |
| `DATABASE_DIALECT` | superset-beat | postgresql | Triggers the psycopg2* install path — see §3 for why worker/beat needed an additional explicit fix beyond what this variable alone triggers. |
| `SUPERSET_CONFIG_B64` | superset-beat | - | Same base64-encoded config as web — referenced, not duplicated, so one edit to the web service propagates everywhere. |
| `SUPERSET_SECRET_KEY` | superset-beat | (secret) | Matches the web service's Flask session key. |
| `SUPERSET_LOAD_EXAMPLES` | superset-beat | no | Skip loading example dashboards on init (not used by worker itself, kept consistent with web/beat). |
| `REDISHOST` | redis | - | Internal Redis service hostname. |
| `REDISPORT` | redis | 6379 | Redis server listening port. |
| `REDISUSER` | redis | default | Redis default authentication user (plain --requirepass, not ACLs). |
| `REDIS_URL` | redis | - | Internal Redis connection string — used as the Celery broker/result backend AND the Superset cache backend (4 separate logical DB indices, see §3's decoded config). |
| `REDISPASSWORD` | redis | (secret) | Same password under Railway's conventional Redis variable naming. |
| `REDIS_PASSWORD` | redis | (secret) | Auth password Redis is started with (--requirepass). Auto-generated. |
| `DEV_MODE` | superset | false | Metadata DB connection string. |
| `REDIS_URL` | superset | - | Redis broker + cache URL, referenced inside the decoded config. |
| `PYTHONPATH` | superset | /app/pythonpath | Where the decoded superset_config.py gets placed and picked up. |
| `DATABASE_URL` | superset | - | Metadata DB connection string. |
| `SUPERSET_ENV` | superset | production | Production mode flag. |
| `SUPERSET_PORT` | superset | 8088 | Internal gunicorn port — also what the service's public domain should target. |
| `ADMIN_PASSWORD` | superset | (secret) | Bootstrap admin password. Username is always admin. Save it — it's how you log in after deploying. |
| `DATABASE_DIALECT` | superset | postgresql | Triggers psycopg2 install for the web process specifically (see §3 for why worker/beat needed a separate fix). |
| `SUPERSET_CONFIG_B64` | superset | superset | Base64-encoded superset_config.py — wires DATABASE_URL/REDIS_URL into Superset's actual config format, sets Celery, cache, feature flags, and cookie security settings. |
| `SUPERSET_SECRET_KEY` | superset | (secret) | Flask session signing key. Auto-generate — do not reuse across deployments. |
| `SUPERSET_LOAD_EXAMPLES` | superset | no | Skip loading example dashboards on init. |
| `DEV_MODE` | superset-worker | false | Disables the dev-mode editable install. |
| `REDIS_URL` | superset-worker | - | Celery broker + result backend + cache URL, referenced inside the decoded config. |
| `PYTHONPATH` | superset-worker | /app/pythonpath | Where the decoded superset_config.py gets placed and picked up. |
| `DATABASE_URL` | superset-worker | - | Metadata DB connection string. |
| `SUPERSET_ENV` | superset-worker | production | Production mode flag. |
| `SUPERSET_PORT` | superset-worker | 8088 | Not used by the worker process — no HTTP server here — kept consistent with web/beat. |
| `ADMIN_PASSWORD` | superset-worker | (secret) | Matches the web service's admin password — not independently generated. |
| `DATABASE_DIALECT` | superset-worker | postgresql | Triggers the psycopg2* install path — see §3 for why worker/beat needed an additional explicit fix beyond what this variable alone triggers. |
| `SUPERSET_CONFIG_B64` | superset-worker | - | Same base64-encoded config as web — referenced, not duplicated, so one edit to the web service propagates everywhere. |
| `SUPERSET_SECRET_KEY` | superset-worker | (secret) | Matches the web service's Flask session key. |
| `SUPERSET_LOAD_EXAMPLES` | superset-worker | no | Skip loading example dashboards on init (not used by worker itself, kept consistent with web/beat). |
| `POSTGRES_DB` | postgres | railway | Initial database created on startup. |
| `DATABASE_URL` | postgres | - | Internal Postgres connection string — this is what all 3 Superset services reference for their metadata DB. |
| `POSTGRES_USER` | postgres | (secret) | Default Postgres superuser name. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres database user password. Auto-generated. |

## Configuration

- **Start command:** `/bin/sh -c "mkdir -p /app/pythonpath && echo \"$SUPERSET_CONFIG_B64\" | base64 -d > /app/pythonpath/superset_config.py && (command -v uv >/dev/null 2>&1 && uv pip install --no-cache-dir psycopg2-binary || pip install --no-cache-dir psycopg2-binary) && rm -f /tmp/celerybeat.pid && /app/docker/docker-bootstrap.sh beat"`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "mkdir -p /app/pythonpath && echo \"$SUPERSET_CONFIG_B64\" | base64 -d > /app/pythonpath/superset_config.py && /app/docker/docker-init.sh && /app/docker/docker-bootstrap.sh app-gunicorn"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "mkdir -p /app/pythonpath && echo \"$SUPERSET_CONFIG_B64\" | base64 -d > /app/pythonpath/superset_config.py && (command -v uv >/dev/null 2>&1 && uv pip install --no-cache-dir psycopg2-binary || pip install --no-cache-dir psycopg2-binary) && /app/docker/docker-bootstrap.sh worker"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/superset-apache)
