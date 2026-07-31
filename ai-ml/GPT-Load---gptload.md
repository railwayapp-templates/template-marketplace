# Deploy GPT Load on Railway

Distribute requests and load balance multiple GPT API keys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gptload)

## About

GPT-Load is a high-performance proxy and API management tool designed to distribute traffic across multiple OpenAI-compatible and LLM service providers. It offers request load balancing, detailed token usage tracking, and persistent configuration management. It is built for developers, teams, and service providers who need reliable API access management and failover support.

Hosting GPT-Load on Railway provides an isolated and scalable environment to manage and route your AI traffic. Railway automatically builds and deploys the container using the official prebuilt Docker image or repository configuration. The deployment requires internal listening on port 3001 with HTTP public networking exposed via a generated Railway domain.

Persistent storage is essential to retain SQLite configuration data and log files across service restarts. For enhanced multi-node or high-availability setups, GPT-Load can optionally integrate with Railway PostgreSQL and Redis services. Railway manages automatic SSL certificate generation, domain routing, and environment variable injection to streamline the infrastructure setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| GPT Load | `ghcr.io/tbphp/gpt-load:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `TZ` | GPT Load | Asia/Shanghai | - |
| `HOST` | GPT Load | 0.0.0.0 | - |
| `PORT` | GPT Load | 3001 | - |
| `AUTH_KEY` | GPT Load | (secret) | Any sample to login i.e sk_123 |
| `IS_SLAVE` | GPT Load | false | - |
| `LOG_LEVEL` | GPT Load | info | - |
| `LOG_FORMAT` | GPT Load | text | - |
| `ENABLE_CORS` | GPT Load | true | - |
| `LOG_FILE_PATH` | GPT Load | ./data/logs/app.log | - |
| `ALLOWED_HEADERS` | GPT Load | * | - |
| `ALLOWED_METHODS` | GPT Load | GET,POST,PUT,DELETE,OPTIONS | - |
| `ALLOWED_ORIGINS` | GPT Load | * | - |
| `LOG_ENABLE_FILE` | GPT Load | true | - |
| `ALLOW_CREDENTIALS` | GPT Load | (secret) | - |
| `SERVER_IDLE_TIMEOUT` | GPT Load | 120 | - |
| `SERVER_READ_TIMEOUT` | GPT Load | 60 | - |
| `SERVER_WRITE_TIMEOUT` | GPT Load | 600 | - |
| `MAX_CONCURRENT_REQUESTS` | GPT Load | 100 | - |
| `SERVER_GRACEFUL_SHUTDOWN_TIMEOUT` | GPT Load | 10 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/gptload)
