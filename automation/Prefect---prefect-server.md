# Deploy Prefect on Railway

Schedules and monitors Python data pipelines from a web dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prefect-server)

## About

Prefect is an open source workflow orchestration framework for Python. Decorate ordinary functions with `@flow` and `@task`, and Prefect handles scheduling, retries, caching, concurrency limits and observability — turning a script that "usually works" into a pipeline you can see, replay and trust. Teams use it for ETL and ELT jobs, ML training pipelines and any recurring Python work that has to run reliably.

Deploy Prefect on Railway and you get the full production topology, not a single container on SQLite. This template wires the API server, a dedicated background-services process and a process worker to managed Postgres and Redis, so the API stays stateless, the scheduler runs in its own container, and flow runs execute on a worker you scale independently. Self-host Prefect from the official `prefecthq/prefect:3-latest` image ([github.com/PrefectHQ/prefect](https://github.com/PrefectHQ/prefect)), with basic authentication on and a generated password so the UI is never open on first boot.

![Prefect server, services, worker, Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787670102/prefect-architecture.png)

Prefect separates orchestration from your code. Flows stay in your repository and run on your infrastructure; the server records state, schedules work and hands it to workers, so your data never leaves your account.

- Python-native API — no DSL, no YAML DAG files, just decorators
- Automatic retries, timeouts, caching and result persistence per task
- Cron, interval and RRule schedules plus event-driven automations
- Concurrency limits, run history, structured logs, timings and artifacts

`prefect-server` serves the REST API and UI on port 4200, started with `--no-services` so it stays stateless. `prefect-services` runs the scheduler, cancellation monitors, event triggers and automation actions. `prefect-worker` polls a work pool and launches each flow run as a subprocess. Postgres holds all orchestration state; Redis carries the event bus, concurrency leases and the docket lock that stops background services duplicating scheduled work.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| prefect-worker | `prefecthq/prefect:3-latest` | Database |
| prefect-server | `prefecthq/prefect:3-latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| prefect-services | `prefecthq/prefect:3-latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | prefect-worker | 8080 | Port Railway health-checks |
| `PREFECT_HOME` | prefect-worker | /data/prefect | Prefect home on the attached volume |
| `PREFECT_UI_URL` | prefect-worker | - | Public URL used in run links |
| `PREFECT_API_URL` | prefect-worker | - | Prefect API endpoint |
| `PREFECT_LOGGING_LEVEL` | prefect-worker | INFO | Worker log verbosity |
| `PREFECT_WORK_POOL_NAME` | prefect-worker | default-process-pool | Work pool created and polled |
| `PREFECT_API_AUTH_STRING` | prefect-worker | - | Client basic auth credentials |
| `PREFECT_WORKER_WEBSERVER_HOST` | prefect-worker | 0.0.0.0 | Health server bind address |
| `PREFECT_WORKER_WEBSERVER_PORT` | prefect-worker | 8080 | Health server port |
| `PORT` | prefect-server | 4200 | Port Railway health-checks |
| `PREFECT_UI_URL` | prefect-server | - | Public URL used in run links |
| `PREFECT_UI_API_URL` | prefect-server | - | API URL the browser calls |
| `PREFECT_SERVER_API_HOST` | prefect-server | 0.0.0.0 | Bind address, keep as is |
| `PREFECT_SERVER_API_PORT` | prefect-server | 4200 | API listening port |
| `PREFECT_SERVER_DOCKET_URL` | prefect-server | - | Redis database for service coordination |
| `PREFECT_REDIS_MESSAGING_URL` | prefect-server | - | Redis database for messaging |
| `PREFECT_SERVER_DATABASE_HOST` | prefect-server | - | Private Postgres hostname |
| `PREFECT_SERVER_DATABASE_NAME` | prefect-server | - | Postgres database name |
| `PREFECT_SERVER_DATABASE_PORT` | prefect-server | - | Postgres port |
| `PREFECT_SERVER_DATABASE_USER` | prefect-server | (secret) | Postgres user |
| `PREFECT_SERVER_LOGGING_LEVEL` | prefect-server | INFO | Server log verbosity |
| `PREFECT_SERVER_API_AUTH_STRING` | prefect-server | - | UI and API basic auth credentials |
| `PREFECT_SERVER_DATABASE_DRIVER` | prefect-server | postgresql+asyncpg | Async Postgres driver |
| `PREFECT_SERVER_ANALYTICS_ENABLED` | prefect-server | false | Disable usage analytics |
| `PREFECT_SERVER_DATABASE_PASSWORD` | prefect-server | (secret) | Postgres password |
| `PREFECT_SERVER_EVENTS_CAUSAL_ORDERING` | prefect-server | prefect_redis.ordering | Redis-backed event ordering |
| `PREFECT_SERVER_EVENTS_MESSAGING_CACHE` | prefect-server | prefect_redis.messaging | Redis-backed event cache |
| `PREFECT_SERVER_EVENTS_MESSAGING_BROKER` | prefect-server | prefect_redis.messaging | Redis-backed event bus |
| `PREFECT_SERVER_CONCURRENCY_LEASE_STORAGE` | prefect-server | prefect_redis.lease_storage | Redis concurrency leases |
| `PREFECT_SERVER_DATABASE_MIGRATE_ON_START` | prefect-server | false | Migrations run in pre-deploy |
| `PREFECT_SERVER_UI_SHOW_PROMOTIONAL_CONTENT` | prefect-server | false | Hide Prefect Cloud banner |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PREFECT_UI_URL` | prefect-services | - | Public URL used in run links |
| `PREFECT_API_URL` | prefect-services | - | Prefect API endpoint |
| `PREFECT_API_AUTH_STRING` | prefect-services | - | Client basic auth credentials |
| `PREFECT_SERVER_DOCKET_URL` | prefect-services | - | Redis database for service coordination |
| `PREFECT_REDIS_MESSAGING_URL` | prefect-services | - | Redis database for messaging |
| `PREFECT_SERVER_DATABASE_HOST` | prefect-services | - | Private Postgres hostname |
| `PREFECT_SERVER_DATABASE_NAME` | prefect-services | - | Postgres database name |
| `PREFECT_SERVER_DATABASE_PORT` | prefect-services | - | Postgres port |
| `PREFECT_SERVER_DATABASE_USER` | prefect-services | (secret) | Postgres user |
| `PREFECT_SERVER_LOGGING_LEVEL` | prefect-services | INFO | Service log verbosity |
| `PREFECT_SERVER_DATABASE_DRIVER` | prefect-services | postgresql+asyncpg | Async Postgres driver |
| `PREFECT_SERVER_ANALYTICS_ENABLED` | prefect-services | false | Disable usage analytics |
| `PREFECT_SERVER_DATABASE_PASSWORD` | prefect-services | (secret) | Postgres password |
| `PREFECT_SERVER_EVENTS_CAUSAL_ORDERING` | prefect-services | prefect_redis.ordering | Redis-backed event ordering |
| `PREFECT_SERVER_EVENTS_MESSAGING_CACHE` | prefect-services | prefect_redis.messaging | Redis-backed event cache |
| `PREFECT_SERVER_EVENTS_MESSAGING_BROKER` | prefect-services | prefect_redis.messaging | Redis-backed event bus |
| `PREFECT_SERVER_CONCURRENCY_LEASE_STORAGE` | prefect-services | prefect_redis.lease_storage | Redis concurrency leases |
| `PREFECT_SERVER_DATABASE_MIGRATE_ON_START` | prefect-services | false | Migrations run in pre-deploy |

## Configuration

- **Start command:** `/bin/sh -c 'exec /usr/bin/tini -s -g -- /opt/prefect/entrypoint.sh prefect worker start --pool "$PREFECT_WORK_POOL_NAME" --type process --with-healthcheck'`
- **Healthcheck:** `/health`
- **Volume:** `/data`
- **Start command:** `/usr/bin/tini -s -g -- /opt/prefect/entrypoint.sh prefect server start --no-services`
- **Healthcheck:** `/api/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Start command:** `/usr/bin/tini -s -g -- /opt/prefect/entrypoint.sh prefect server services start`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/prefect-server)
