# Deploy Budibase on Railway

Low-code platform for building internal business apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/budibase-platform)

## About

Budibase is an open-source operations platform for building internal tools — admin panels, CRUD apps, approval flows and scheduled automations — on the databases and APIs a team already runs. Rather than writing a frontend and backend for every internal request, you connect PostgreSQL, MySQL, MongoDB, S3 or a REST API, drag components onto a screen, and ship the same day. It is the self-hosted answer to Retool.

Self-host Budibase on Railway with this template and you get the topology Budibase's own Helm chart runs, not one all-in-one container. An nginx edge service is the only thing published: it routes builder and app traffic to the apps service, identity traffic to the worker, and file requests to object storage. A dedicated automation worker consumes automation jobs, so long-running workflows never block API requests. CouchDB stores workspaces and internal tables, MinIO holds attachments and app bundles, Redis carries sessions and queues.

![Budibase proxy, app, worker, CouchDB, MinIO and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787673194/budibase-architecture.png)

Budibase splits into cooperating services, and self-hosting it well means running each one rather than collapsing them into one process. The **apps service** serves the builder, the published apps and the data API. The **worker service** owns identity: users, roles, SMTP, SSO and settings. The **automation worker** runs the apps image with `APP_FEATURES=automations`, so a slow webhook cannot starve the API. The **proxy** is the only public entry point.

Storage splits three ways. CouchDB is the system of record for workspaces, screens, automations and internal tables, and ships with Clouseau and a SQLite search service that back grid queries. MinIO holds attachments, app bundles and plugins across six buckets. Redis carries sessions, caches and the automation queues — which is what makes the separate tier possible.

Key features:

- Visual app builder with a component library, bindings and JavaScript expressions
- Built-in database with a spreadsheet-style grid, views and relationships
- Connectors for PostgreSQL, MySQL, MSSQL, Oracle, Snowflake, MongoDB, S3, Google Sheets and any REST API
- Automations with triggers, conditions, loops, webhooks and schedules
- Access control down to the screen and the row, plus self-hosted SSO

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| budibase-proxy | [gridalpha/budibase-railway](https://github.com/gridalpha/budibase-railway) (root: proxy) | Web service |
| budibase-worker | `budibase/worker:v3.43.0` | Worker |
| budibase-apps | `budibase/apps:v3.43.0` | Worker |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| couchdb | `budibase/database:2.1.0` | Database |
| budibase-automation-worker | `budibase/apps:v3.43.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | budibase-proxy | 10000 | Port nginx listens on |
| `APPS_UPSTREAM_URL` | budibase-proxy | - | Apps service upstream |
| `MINIO_UPSTREAM_URL` | budibase-proxy | - | Object storage upstream |
| `WORKER_UPSTREAM_URL` | budibase-proxy | - | Worker service upstream |
| `COUCHDB_UPSTREAM_URL` | budibase-proxy | - | CouchDB upstream |
| `PROXY_TIMEOUT_SECONDS` | budibase-proxy | 120 | Upstream read, connect and send timeout |
| `PROXY_RATE_LIMIT_API_PER_SECOND` | budibase-proxy | 50 | API requests per second per IP |
| `PROXY_RATE_LIMIT_WEBHOOKS_PER_SECOND` | budibase-proxy | 10 | Webhook requests per second per IP |
| `PORT` | budibase-worker | 4003 | HTTP server listening port |
| `APPS_URL` | budibase-worker | - | Apps service base URL |
| `LOG_LEVEL` | budibase-worker | info | Application log verbosity |
| `MINIO_URL` | budibase-worker | - | Private object storage endpoint |
| `REDIS_URL` | budibase-worker | - | Redis connection string |
| `JWT_SECRET` | budibase-worker | (secret) | Must match the apps service |
| `SELF_HOSTED` | budibase-worker | 1 | Enables self-hosted mode |
| `CLUSTER_PORT` | budibase-worker | 443 | Public port the platform is reached on |
| `COUCH_DB_URL` | budibase-worker | - | CouchDB connection string |
| `PLATFORM_URL` | budibase-worker | - | Public URL used in generated links |
| `COUCH_DB_USER` | budibase-worker | (secret) | CouchDB admin username |
| `COUCH_DB_SQL_URL` | budibase-worker | - | SQLite search service endpoint |
| `ENABLE_ANALYTICS` | budibase-worker | false | Product telemetry, off by default |
| `INTERNAL_API_KEY` | budibase-worker | (secret) | Must match the apps service |
| `MINIO_ACCESS_KEY` | budibase-worker | - | Object storage access key |
| `MINIO_SECRET_KEY` | budibase-worker | (secret) | Object storage secret key |
| `COUCH_DB_PASSWORD` | budibase-worker | (secret) | CouchDB admin password |
| `COUCH_DB_USERNAME` | budibase-worker | (secret) | Alias the worker also reads |
| `API_ENCRYPTION_KEY` | budibase-worker | - | Must match the apps service |
| `BUDIBASE_ENVIRONMENT` | budibase-worker | PRODUCTION | Runtime environment label |
| `PORT` | budibase-apps | 4002 | HTTP server listening port |
| `LOG_LEVEL` | budibase-apps | info | Application log verbosity |
| `MINIO_URL` | budibase-apps | - | Private object storage endpoint |
| `REDIS_URL` | budibase-apps | - | Redis connection string |
| `JWT_SECRET` | budibase-apps | (secret) | Signs session tokens |
| `WORKER_URL` | budibase-apps | - | Worker service base URL |
| `SELF_HOSTED` | budibase-apps | 1 | Enables self-hosted mode |
| `APP_FEATURES` | budibase-apps | api | Serve API only; automations run elsewhere |
| `COUCH_DB_URL` | budibase-apps | - | CouchDB connection string |
| `PLATFORM_URL` | budibase-apps | - | Public URL used in generated links |
| `COUCH_DB_USER` | budibase-apps | (secret) | CouchDB admin username |
| `COUCH_DB_SQL_URL` | budibase-apps | - | SQLite search service endpoint |
| `ENABLE_ANALYTICS` | budibase-apps | false | Product telemetry, off by default |
| `INTERNAL_API_KEY` | budibase-apps | (secret) | Authenticates service-to-service calls |
| `MINIO_ACCESS_KEY` | budibase-apps | - | Object storage access key |
| `MINIO_SECRET_KEY` | budibase-apps | (secret) | Object storage secret key |
| `COUCH_DB_PASSWORD` | budibase-apps | (secret) | CouchDB admin password |
| `API_ENCRYPTION_KEY` | budibase-apps | - | Encrypts stored datasource credentials |
| `BB_ADMIN_USER_EMAIL` | budibase-apps | admin@example.dev | First admin account email |
| `BUDIBASE_ENVIRONMENT` | budibase-apps | PRODUCTION | Runtime environment label |
| `BB_ADMIN_USER_PASSWORD` | budibase-apps | (secret) | First admin account password |
| `PORT` | minio | 9000 | S3 API port used for the health check |
| `MINIO_BROWSER` | minio | off | Disables the MinIO web console |
| `MINIO_ROOT_USER` | minio | (secret) | Root access key, read by the server |
| `MINIO_ACCESS_KEY` | minio | - | Legacy alias Budibase clients use |
| `MINIO_SECRET_KEY` | minio | (secret) | Legacy alias Budibase clients use |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Root secret key, read by the server |
| `PORT` | couchdb | 5984 | HTTP port used for the health check |
| `DATA_DIR` | couchdb | /data | Volume path for databases and search indexes |
| `TARGETBUILD` | couchdb | docker-compose | Selects the multi-container data layout |
| `COUCHDB_USER` | couchdb | (secret) | CouchDB admin username, read by the entrypoint |
| `COUCHDB_PASSWORD` | couchdb | (secret) | CouchDB admin password, read by the entrypoint |
| `PORT` | budibase-automation-worker | 4002 | HTTP server listening port |
| `LOG_LEVEL` | budibase-automation-worker | info | Application log verbosity |
| `MINIO_URL` | budibase-automation-worker | - | Private object storage endpoint |
| `REDIS_URL` | budibase-automation-worker | - | Redis connection string |
| `JWT_SECRET` | budibase-automation-worker | (secret) | Must match the apps service |
| `WORKER_URL` | budibase-automation-worker | - | Worker service base URL |
| `SELF_HOSTED` | budibase-automation-worker | 1 | Enables self-hosted mode |
| `APP_FEATURES` | budibase-automation-worker | automations | Run automation jobs only |
| `COUCH_DB_URL` | budibase-automation-worker | - | CouchDB connection string |
| `PLATFORM_URL` | budibase-automation-worker | - | Public URL used in generated links |
| `COUCH_DB_USER` | budibase-automation-worker | (secret) | CouchDB admin username |
| `COUCH_DB_SQL_URL` | budibase-automation-worker | - | SQLite search service endpoint |
| `ENABLE_ANALYTICS` | budibase-automation-worker | false | Product telemetry, off by default |
| `INTERNAL_API_KEY` | budibase-automation-worker | (secret) | Must match the apps service |
| `MINIO_ACCESS_KEY` | budibase-automation-worker | - | Object storage access key |
| `MINIO_SECRET_KEY` | budibase-automation-worker | (secret) | Object storage secret key |
| `COUCH_DB_PASSWORD` | budibase-automation-worker | (secret) | CouchDB admin password |
| `API_ENCRYPTION_KEY` | budibase-automation-worker | - | Must match the apps service |
| `BUDIBASE_ENVIRONMENT` | budibase-automation-worker | PRODUCTION | Runtime environment label |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/usr/bin/docker-entrypoint.sh minio server /data --address :9000`
- **Healthcheck:** `/minio/health/live`
- **Start command:** `/bin/bash -c 'set -e; printf "[chttpd]\nbind_address = ::\n" > /opt/couchdb/etc/local.d/zz-railway.ini; sed -i "s/--bind-address=0.0.0.0/--bind-address=::/" /bbcouch-runner.sh; grep -q -- "--bind-address=::" /bbcouch-runner.sh || { echo "FATAL: sqs bind patch missed"; exit 1; }; exec tini -s -- /docker-entrypoint.sh /bbcouch-runner.sh'`
- **Healthcheck:** `/_up`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/budibase-platform)
