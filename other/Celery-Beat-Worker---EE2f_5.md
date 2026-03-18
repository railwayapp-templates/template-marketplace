# Deploy Celery Beat Worker on Railway

Celery Worker and Beat pre configured to just fork and deploy!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/EE2f_5)

## About

## Celery Beat and Worker

### Celery is used to do long or period tasks in the background, this service provides preconfigured Worker and beat in a different service.


#### Configurable by variable "celery_broker" to point to a database as  a broker and change concurrency from start command to use multiple workers.

Beware! choosing higher concurrency can lead to higher credit usage. It's good for me though :)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Beat | [AshweenMankash/Celery-Worker-Beat](https://github.com/AshweenMankash/Celery-Worker-Beat) | Worker |
| Redis | `bitnami/redis` | Database |
| worker | [AshweenMankash/Celery-Worker-Beat](https://github.com/AshweenMankash/Celery-Worker-Beat) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `celery_broker` | worker | - | Redis as broker |

## Configuration

- **Start command:** `celery -A main.app beat -l INFO`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `celery -A main.app worker --concurrency=1 -l INFO`

**Category:** Other · **Languages:** Python

[View on Railway →](https://railway.com/template/EE2f_5)
