# Deploy OneHub - Updated One API on Railway

Access all LLMs through the standard OpenAI API format,Analytics & billing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onehub)

## About

One Hub is an AI gateway built on top of One API that provides a unified OpenAI-compatible interface for dozens of AI providers. It enables centralized API key management, user authentication, usage tracking, model routing, billing, monitoring, and support for multiple LLM providers through a single endpoint.

Railway provides an easy way to deploy One Hub together with its required infrastructure. This template deploys the official Docker image and connects it to Railway-managed MySQL and Redis services for persistent data storage and caching. Railway automatically handles networking, HTTPS, deployments, and environment variables, allowing you to focus on configuring AI providers and managing API access. Once deployed, administrators can access the web dashboard to create users, manage API keys, configure model providers, monitor usage, and expose a single OpenAI-compatible API endpoint for applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:9.4` | Database |
| OneHub | `ghcr.io/martialbe/one-api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | OneHub | 3000 | - |
| `SESSION_SECRET` | OneHub | (secret) | - |
| `USER_TOKEN_SECRET` | OneHub | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/onehub)
