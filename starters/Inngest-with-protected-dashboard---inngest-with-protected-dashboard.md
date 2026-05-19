# Deploy Inngest (with protected dashboard) on Railway

Inngest self-hosted with nginx proxy to password-protect the dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/inngest-with-protected-dashboard)

## About

[Inngest](https://www.inngest.com) is a durable execution platform that lets you write reliable background jobs, scheduled functions, and event-driven workflows in your existing codebase — with zero infrastructure to manage.

Self-hosting Inngest gives you full control over your execution environment and data. This template deploys Inngest alongside an nginx proxy that password-protects the Inngest dashboard, which would otherwise be not protected if public networking is used. All API traffic (event ingestion, function registration, run management) bypasses the password and is secured by Inngest's own event keys and signing keys, so your apps and SDKs continue to work normally.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| InngestPostgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| InngestRedis | `redis:8.2.1` | Database |
| inngest | `inngest/inngest` | Worker |
| inngest-nginx-basic-auth | [shaezzy/inngest-nginx-basic-auth](https://github.com/shaezzy/inngest-nginx-basic-auth) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | InngestPostgres | railway | Default database created when image is started. |
| `DATABASE_URL` | InngestPostgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | InngestPostgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | InngestPostgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | InngestPostgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | InngestRedis | 6379 | - |
| `REDISUSER` | InngestRedis | default | - |
| `REDIS_URL` | InngestRedis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | InngestRedis | (secret) | - |
| `REDIS_PASSWORD` | InngestRedis | (secret) | - |
| `REDIS_PUBLIC_URL` | InngestRedis | - | Connection string for connecting to redis externally |
| `INNGEST_DEV` | inngest | 0 | Set to 1 to run Inngest in development mode. In dev mode the signing key and event key are not required, and all functions are visible in the local dashboard |
| `INNGEST_PORT` | inngest | 8288 | The port the Inngest server listens on. Defaults to 8288. |
| `INNGEST_EVENT_KEY` | inngest | - | Secret key used to authenticate inbound events sent to /e/{key}. Any app that sends events to your Inngest instance must include this key in the URL. |
| `INNGEST_REDIS_URI` | inngest | - | Redis connection string used for the queue and run state. Required for production deployments. |
| `INNGEST_SIGNING_KEY` | inngest | - | Secret key used to sign and verify requests between Inngest and your functions. Inngest uses this to prove that a function invocation came from your server, and your SDK uses it to verify the request before executing. |
| `INNGEST_POSTGRES_URI` | inngest | - | PostgreSQL connection string used to store function run history and event data |
| `INNGEST_SERVE_ORIGIN` | inngest | - | **`INNGEST_SERVE_ORIGIN`** The base URL of your app's Inngest serve endpoint. Inngest uses this to reach your functions when triggering a run. On Railway this can be the private network URL to keep traffic internal. Example: `http://my-app.railway.internal:3000` |
| `PORT` | inngest-nginx-basic-auth | 80 | The port nginx listens on. Railway uses this to route public traffic to the proxy |
| `DASHBOARD_PASSWORD` | inngest-nginx-basic-auth | (secret) | Password for the Inngest dashboard login prompt. |
| `DASHBOARD_USERNAME` | inngest-nginx-basic-auth | (secret) | Username for the Inngest dashboard login prompt. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | inngest-nginx-basic-auth | true | Required for Alpine-based Docker images to resolve Railway's internal private network hostnames. Set to true. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "inngest start --port $INNGEST_PORT --event-key $INNGEST_EVENT_KEY --signing-key $INNGEST_SIGNING_KEY --postgres-uri $INNGEST_POSTGRES_URI --redis-uri $INNGEST_REDIS_URI ${INNGEST_SERVE_ORIGIN:+-u $INNGEST_SERVE_ORIGIN}"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/inngest-with-protected-dashboard)
