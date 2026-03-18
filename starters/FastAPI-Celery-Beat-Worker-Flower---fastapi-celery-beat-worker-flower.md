# Deploy FastAPI + Celery (Beat, Worker, Flower) on Railway

FastAPI template integrated with celery

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-celery-beat-worker-flower)

## About

FastAPI combined with Celery provides a complete async task processing system. This template deploys a production-ready API with background workers, periodic schedulers, and real-time monitoring via Flower with authentication.

This deployment consists of 5 interconnected services running on Railway's platform. The FastAPI service exposes REST endpoints and triggers Celery tasks. Celery Workers process tasks from the Redis queue, while Celery Beat handles periodic scheduling. Flower monitors all Celery activity in real-time via a web dashboard. caddy-zero-trust sits in front of Flower as the public entry point, requiring authentication before proxying requests. Railway handles TLS termination and provides private networking between services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| caddy-auth-proxy | [rubenszinho/caddy-auth-proxy](https://github.com/rubenszinho/caddy-auth-proxy) | Web service |
| celery-worker | [rubenszinho/celery-worker](https://github.com/rubenszinho/celery-worker) | Worker |
| celery-beat | [rubenszinho/celery-beat](https://github.com/rubenszinho/celery-beat) | Worker |
| fastapi | [rubenszinho/fastapi](https://github.com/rubenszinho/fastapi) | Web service |
| celery-flower-monitor | [rubenszinho/celery-flower-monitor](https://github.com/rubenszinho/celery-flower-monitor) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `AUTH_USER` | caddy-auth-proxy | (secret) | - |
| `TASK_ACKS_LATE` | celery-worker | true | - |
| `TASK_MAX_RETRIES` | celery-worker | 3 | - |
| `WORKER_CONCURRENCY` | celery-worker | 4 | - |
| `TASK_REJECT_ON_WORKER_LOST` | celery-worker | true | - |
| `WORKER_MAX_TASKS_PER_CHILD` | celery-worker | 1000 | - |
| `WORKER_PREFETCH_MULTIPLIER` | celery-worker | 1 | - |
| `BEAT_SCHEDULE_CRON` | celery-beat | 0 0,12 * * * | Cron format: minute hour day_of_month month day_of_week. Default: Run at 00:00 and 12:00 daily |
| `PORT` | celery-flower-monitor | 5555 | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** CSS, HTML, Dockerfile, Shell, Python

[View on Railway →](https://railway.com/deploy/fastapi-celery-beat-worker-flower)
