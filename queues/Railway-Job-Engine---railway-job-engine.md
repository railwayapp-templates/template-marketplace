# Deploy Railway Job Engine on Railway

Background jobs with BullMQ, Redis, Bull Board admin UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-job-engine)

## About

Railway Job Engine is a production-ready background job processing stack built on BullMQ and Bun. It provides reliable async job queues for email, webhooks, and scheduled tasks — with a full admin UI and Postgres audit logging included out of the box.

Hosting a job processing system requires Redis for the queue backend, a persistent worker process, and a database for job history. Railway Job Engine runs all three as a coordinated multi-service deployment: a Bun server handles job submission and serves the Bull Board admin UI, BullMQ workers process jobs with configurable retries and backoff, and Postgres stores an audit log of every completed or failed job. Railway manages uptime, restarts on failure, and private networking between services automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-job-engine | [furelid/railway-job-engine](https://github.com/furelid/railway-job-engine) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | railway-job-engine | 3000 | Server Port |
| `REDIS_URL` | railway-job-engine | - | Redis connectio nstring |
| `ADMIN_PASS` | railway-job-engine | - | Basic Auth Password |
| `DATABASE_URL` | railway-job-engine | - | Database connection string |
| `ADMIN_USERNAME` | railway-job-engine | (secret) | Basic Auth Username |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Queues · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/railway-job-engine)
