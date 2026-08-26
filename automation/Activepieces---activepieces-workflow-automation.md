# Deploy Activepieces on Railway

Zapier Alternative. Build automations that connect your apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/activepieces-workflow-automation)

## About

Activepieces is an open-source workflow automation platform — a self-hosted Zapier alternative where you build flows visually, connect them to hundreds of SaaS apps, and run them on infrastructure you control. Its MIT-licensed core is one of the few you can embed in a commercial product, and its builder is deliberately approachable: a trigger, a chain of steps, branches, loops, and a JavaScript code step when no connector exists. Teams reach for it when Zapier's per-task billing stops making sense, or when data cannot leave their network.

Deploy Activepieces on Railway with the production topology upstream documents, not a single all-in-one container. It runs the API and web UI as one service and flow execution as a separate worker tier, with a Redis queue between them, PostgreSQL for flows, runs and encrypted connections, and object storage for run logs. Webhooks hit the public app service, the app enqueues jobs to Redis, and the worker executes each step in its own sandbox — the split that lets a long flow finish without blocking the UI.

![Activepieces app and worker services with Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787612942/activepieces-architecture.png)

Activepieces turns "when X happens, do Y" into something a whole team can maintain. A flow starts from a trigger — a webhook, a schedule, or a connector polling a mailbox — and moves through steps that call APIs, branch, loop or run code. Connectors are called *pieces*: ordinary npm packages, installed by the worker on first use.

- Visual builder with branching, loops, retries and run history
- Hundreds of pieces: Slack, Gmail, HubSpot, Notion, Airtable, Stripe, Postgres, HTTP
- A sandboxed JavaScript code step for anything without a connector
- Tables, encrypted credentials, project isolation and a REST API

Four services back it here. The **app** serves the UI and API, owns the schedule, receives webhooks, and runs migrations behind a Redis lock so overlapping deployments cannot collide. The **worker** executes flows and keeps a volume for its piece cache, so redeploys do not re-download every connector. **PostgreSQL** stores flows, runs, tables and encrypted connections; **Redis** is the queue and the lock; a managed **bucket** holds run logs and large step payloads, keeping the database small as volume grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| activepieces-worker | `ghcr.io/activepieces/activepieces:0.88.3` | Database |
| Redis | `redis:8.2` | Database |
| activepieces | `ghcr.io/activepieces/activepieces:0.88.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | activepieces-worker | 3000 | Railway health-check target port |
| `AP_PORT` | activepieces-worker | 3000 | Worker health server port |
| `AP_JWT_SECRET` | activepieces-worker | (secret) | Shared secret minting the worker token |
| `AP_ENVIRONMENT` | activepieces-worker | prod | Production runtime mode |
| `AP_FRONTEND_URL` | activepieces-worker | - | Private app API address |
| `AP_CONTAINER_TYPE` | activepieces-worker | WORKER | Run flow execution only |
| `AP_EXECUTION_MODE` | activepieces-worker | UNSANDBOXED | Must match the app service |
| `AP_WORKER_CONCURRENCY` | activepieces-worker | 5 | Concurrent jobs per worker |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | activepieces | 8080 | Railway health-check target port |
| `AP_PORT` | activepieces | 8080 | Application listening port |
| `AP_REDIS_URL` | activepieces | - | Private Redis connection string |
| `AP_S3_BUCKET` | activepieces | - | Bucket name |
| `AP_S3_REGION` | activepieces | - | Bucket region |
| `AP_JWT_SECRET` | activepieces | (secret) | Signs sessions and worker token |
| `AP_REDIS_TYPE` | activepieces | STANDALONE | Single Redis instance |
| `AP_ENVIRONMENT` | activepieces | prod | Production runtime mode |
| `AP_S3_ENDPOINT` | activepieces | - | Bucket API endpoint |
| `AP_FRONTEND_URL` | activepieces | - | Public base URL for webhooks |
| `AP_POSTGRES_HOST` | activepieces | - | Private Postgres hostname |
| `AP_POSTGRES_PORT` | activepieces | - | Postgres port |
| `AP_CONTAINER_TYPE` | activepieces | APP | Run API, UI, scheduler and webhooks |
| `AP_ENCRYPTION_KEY` | activepieces | - | AES key for stored connections |
| `AP_EXECUTION_MODE` | activepieces | UNSANDBOXED | Only mode available without privileged Docker |
| `AP_POSTGRES_USE_SSL` | activepieces | false | Private network, no TLS needed |
| `AP_QUEUE_UI_ENABLED` | activepieces | true | Expose queue dashboard at /api/ui |
| `AP_S3_ACCESS_KEY_ID` | activepieces | - | Bucket access key |
| `AP_POSTGRES_DATABASE` | activepieces | - | Database name |
| `AP_POSTGRES_PASSWORD` | activepieces | (secret) | Database password |
| `AP_POSTGRES_USERNAME` | activepieces | (secret) | Database user |
| `AP_QUEUE_UI_PASSWORD` | activepieces | (secret) | Queue dashboard password |
| `AP_QUEUE_UI_USERNAME` | activepieces | (secret) | Queue dashboard username |
| `AP_S3_USE_SIGNED_URLS` | activepieces | false | Stream files through the app |
| `AP_S3_SECRET_ACCESS_KEY` | activepieces | (secret) | Bucket secret key |
| `AP_FILE_STORAGE_LOCATION` | activepieces | S3 | Run logs go to object storage |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'case "$AP_FRONTEND_URL" in ""|http://:*|https://:*) AP_FRONTEND_URL="http://activepieces.railway.internal:8080";; esac; export AP_FRONTEND_URL; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$M" in ""|max|*[!0-9]*) M=4294967296;; esac; H=$((M/2097152)); if [ "$H" -lt 256 ]; then H=256; fi; export NODE_OPTIONS="--max-old-space-size=$H"; echo "[railway] api $AP_FRONTEND_URL, node heap cap ${H}MB"; i=0; while [ "$i" -lt 60 ]; do if curl -fsS -o /dev/null "$AP_FRONTEND_URL/api/v1/health"; then break; fi; echo "[railway] waiting for app api ($i)"; i=$((i+1)); sleep 5; done; exec /usr/src/app/docker-entrypoint.sh'`
- **Healthcheck:** `/api/v1/health`
- **Volume:** `/usr/src/app/cache`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$M" in ""|max|*[!0-9]*) M=4294967296;; esac; H=$((M/2097152)); if [ "$H" -lt 256 ]; then H=256; fi; export NODE_OPTIONS="--max-old-space-size=$H"; echo "[railway] node heap cap ${H}MB"; exec /usr/src/app/docker-entrypoint.sh'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/activepieces-workflow-automation)
