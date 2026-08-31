# Deploy hll-crcon-cloud on Railway

Cloud hosting for CRCON, the community RCON tool for Hell Let Loose.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hll-crcon-cloud)

## About

hll-crcon-cloud packages CRCON, the community-built admin tool for Hell
Let Loose game servers, as a one-click Railway template. You get the
full web admin UI: live game view, player management, bans, VIPs,
automod, Discord webhooks, and a public scoreboard site, without
renting a VPS or touching Docker.

Upstream CRCON ships as a 7-container Docker Compose stack meant for a
self-managed VPS. This template maps that stack onto seven Railway
services: Postgres and Redis for state, the Django API backend, a
supervisor running roughly 15 background workers (stats, automod, log
ingestion), a maintenance service that runs database migrations, a
Discord webhook worker, and an nginx frontend serving the admin UI and
public scoreboard. Deploying takes three inputs: your game server's IP,
RCON port, and RCON password. Everything else, including secrets,
database credentials, private networking, TLS, and startup ordering, is
wired up automatically. First boot takes around five minutes, then you
log in and change the default admin password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| maintenance | [sledro/crcon.cloud](https://github.com/sledro/crcon.cloud) (branch: release) (root: template/upstream) | Worker |
| webhooks | [sledro/crcon.cloud](https://github.com/sledro/crcon.cloud) (branch: release) (root: template/upstream) | Worker |
| frontend | [sledro/crcon.cloud](https://github.com/sledro/crcon.cloud) (branch: release) (root: template/frontend) | Web service |
| redis | `redis:alpine` | Database |
| postgres | `postgres:12-alpine` | Database |
| backend | [sledro/crcon.cloud](https://github.com/sledro/crcon.cloud) (branch: release) (root: template/backend) | Worker |
| supervisor | [sledro/crcon.cloud](https://github.com/sledro/crcon.cloud) (branch: release) (root: template/supervisor) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HLL_GAME` | maintenance | - | Game type; needed by database migrations |
| `HLL_DB_URL` | maintenance | - | Full Postgres connection URL used by alembic |
| `HLL_DB_HOST` | maintenance | - | Postgres private hostname |
| `HLL_DB_NAME` | maintenance | - | Postgres database name |
| `HLL_DB_USER` | maintenance | (secret) | Postgres user, referenced from the postgres service |
| `HLL_REDIS_DB` | maintenance | 1 | Redis logical database for server 1 |
| `HLL_REDIS_URL` | maintenance | - | Full Redis connection URL used by cache migrations |
| `SERVER_NUMBER` | maintenance | 1 | Server number; needed by database migrations |
| `HLL_REDIS_HOST` | maintenance | - | Redis private hostname |
| `HLL_DB_PASSWORD` | maintenance | (secret) | Postgres password, referenced from the postgres service |
| `HLL_DB_HOST_PORT` | maintenance | 5432 | Postgres port |
| `HLL_REDIS_HOST_PORT` | maintenance | 6379 | Redis port |
| `HLL_MAINTENANCE_CONTAINER` | maintenance | true | Marks this container as the migration runner |
| `HLL_DB_URL` | webhooks | - | Full Postgres connection URL |
| `HLL_DB_HOST` | webhooks | - | Postgres private hostname |
| `HLL_DB_NAME` | webhooks | - | Postgres database name |
| `HLL_DB_USER` | webhooks | (secret) | Postgres user, referenced from the postgres service |
| `LOGGING_PATH` | webhooks | /logs/ | Directory CRCON writes log files to |
| `LOGGING_LEVEL` | webhooks | INFO | Log verbosity |
| `HLL_REDIS_HOST` | webhooks | - | Redis private hostname |
| `HLL_REDIS_PORT` | webhooks | 6379 | Redis port |
| `HLL_DB_PASSWORD` | webhooks | (secret) | Postgres password, referenced from the postgres service |
| `HLL_DB_HOST_PORT` | webhooks | 5432 | Postgres port |
| `HLL_WH_LOOP_SLEEP_TIME` | webhooks | 0.006 | Event loop sleep between webhook sends |
| `HLL_WH_MAX_QUEUE_LENGTH` | webhooks | 150 | Maximum queued webhook messages |
| `HLL_WH_SERVICE_CONTAINER` | webhooks | true | Marks this container as the webhook dispatcher |
| `HLL_WH_SERVICE_RL_RESET_SECS` | webhooks | 3 | Webhook rate limit window in seconds |
| `HLL_WH_SERVICE_RL_TIME_WINDOW` | webhooks | 600 | Seconds to track external rate limit hits |
| `HLL_WH_SERVICE_RL_REQUESTS_PER` | webhooks | 5 | Requests allowed per rate limit window |
| `PORT` | frontend | 80 | Tells Railway which port to healthcheck; nginx serves the admin UI on 80 |
| `HLL_GAME` | frontend | - | Game type; selects which game assets nginx serves |
| `CRCON_API_HOST` | frontend | - | Backend private hostname nginx proxies API and websocket traffic to |
| `RCONWEB_EXTERNAL_ADDRESS` | frontend | - | This service's own public domain |
| `POSTGRES_DB` | postgres | rcon | Database name created on first boot |
| `POSTGRES_USER` | postgres | (secret) | Database superuser name |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated database password; alphanumeric because CRCON forbids special characters |
| `PORT` | backend | 8000 | Tells Railway which port to healthcheck; unused by CRCON |
| `DOMAINS` | backend | - | Django ALLOWED_HOSTS and CSRF origins, including Railway's healthcheck host |
| `HLL_GAME` | backend | hll | Game type: hll, or hllv for Hell Let Loose Vietnam |
| `HLL_HOST` | backend | - | IP address of your Hell Let Loose game server (no port) |
| `HLL_PORT` | backend | - | RCON port of your game server (not the game or query port) |
| `CONFIG_DIR` | backend | /config/ | Config directory expected by CRCON |
| `HLL_DB_URL` | backend | - | Full Postgres connection URL |
| `HLL_DB_HOST` | backend | - | Postgres private hostname |
| `HLL_DB_NAME` | backend | - | Postgres database name |
| `HLL_DB_USER` | backend | (secret) | Postgres user, referenced from the postgres service |
| `HLL_PASSWORD` | backend | (secret) | RCON password of your game server |
| `HLL_REDIS_DB` | backend | 1 | Redis logical database for this game server |
| `LOGGING_PATH` | backend | /logs/ | Directory CRCON writes log files to |
| `RCONWEB_PORT` | backend | 443 | Display-only admin UI port shown in the interface |
| `HLL_REDIS_URL` | backend | - | Full Redis connection URL |
| `LOGGING_LEVEL` | backend | INFO | Log verbosity for CRCON |
| `SERVER_NUMBER` | backend | 1 | CRCON server number; namespaces this server's data |
| `HLL_REDIS_HOST` | backend | - | Redis private hostname |
| `HLL_REDIS_PORT` | backend | 6379 | Redis port |
| `NB_API_THREADS` | backend | 8 | Threads per gunicorn worker |
| `NB_API_WORKERS` | backend | 1 | Gunicorn worker count |
| `HLL_DB_PASSWORD` | backend | (secret) | Postgres password, referenced from the postgres service |
| `HLL_DB_HOST_PORT` | backend | 5432 | Postgres port |
| `PUBLIC_STATS_PORT` | backend | 80 | Display-only public stats port |
| `RCONWEB_API_SECRET` | backend | (secret) | Django secret key encrypting sessions; never change after first deploy |
| `SUPERVISOR_RPC_URL` | backend | - | Supervisord RPC endpoint used by the UI Services page |
| `CRCON_FRONTEND_HOST` | backend | - | Frontend private hostname, aliased for the multi-server registry |
| `PUBLIC_STATS_PORT_HTTPS` | backend | 443 | Display-only public stats HTTPS port |
| `RCONWEB_EXTERNAL_ADDRESS` | backend | - | Public address of the admin UI |
| `HLL_GAME` | supervisor | - | Game type, referenced from the backend service |
| `HLL_HOST` | supervisor | - | Game server IP, referenced from the backend service |
| `HLL_PORT` | supervisor | - | Game server RCON port, referenced from the backend service |
| `HLL_DB_URL` | supervisor | - | Full Postgres connection URL |
| `HLL_DB_HOST` | supervisor | - | Postgres private hostname |
| `HLL_DB_NAME` | supervisor | - | Postgres database name |
| `HLL_DB_USER` | supervisor | (secret) | Postgres user, referenced from the postgres service |
| `HLL_PASSWORD` | supervisor | (secret) | Game server RCON password, referenced from the backend service |
| `HLL_REDIS_DB` | supervisor | 1 | Redis logical database for this game server |
| `LOGGING_PATH` | supervisor | /logs/ | Directory CRCON writes log files to |
| `HLL_REDIS_URL` | supervisor | - | Full Redis connection URL used by the rq workers |
| `LOGGING_LEVEL` | supervisor | INFO | Log verbosity |
| `SERVER_NUMBER` | supervisor | 1 | CRCON server number |
| `HLL_REDIS_HOST` | supervisor | - | Redis private hostname |
| `HLL_REDIS_PORT` | supervisor | 6379 | Redis port |
| `HLL_DB_PASSWORD` | supervisor | (secret) | Postgres password, referenced from the postgres service |
| `HLL_DB_HOST_PORT` | supervisor | 5432 | Postgres port |
| `RCONWEB_API_SECRET` | supervisor | (secret) | Shared Django secret, referenced from the backend service |
| `RCONWEB_EXTERNAL_ADDRESS` | supervisor | - | Public address of the admin UI |

## Configuration

- **Start command:** `sh -c "mkdir -p /logs && exec /code/entrypoint.sh maintenance"`
- **Start command:** `sh -c "mkdir -p /logs && exec /code/entrypoint.sh webhook_service"`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `redis-server --save 60 1 --maxclients 100000`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh postgres -c max_connections=300`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "mkdir -p /logs && exec /code/entrypoint.sh supervisor"`
- **Volume:** `/scoreboard_db`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hll-crcon-cloud)
