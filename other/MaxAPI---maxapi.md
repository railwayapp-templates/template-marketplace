# Deploy MaxAPI on Railway

API Distribution System (New API Customized Version)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/maxapi)

## About

MaxAPI is a self-hosted AI API gateway built with Go that provides a unified, OpenAI-compatible interface for routing requests to multiple AI providers. Based on the New API project with an enhanced user interface, it includes user management, API key management, quota tracking, model routing, Redis caching, MySQL support, Midjourney integration, Suno integration, payment gateway support, Telegram authentication, and an administrative dashboard. MaxAPI allows you to centrally manage multiple AI services while exposing a single API endpoint for your applications.

Deploying MaxAPI on Railway provides a production-ready AI gateway without the complexity of managing virtual machines or Docker hosts. Railway automatically provisions your application, managed MySQL database, and managed Redis instance while connecting them through secure private networking. The application can be deployed directly from the official Docker image and exposed through Railway's generated public domain or a custom domain.

During deployment, you'll configure a small number of environment variables, including the database connection, Redis connection, session secret, and timezone. Railway automatically manages networking, persistent database storage, service restarts, and infrastructure scaling, allowing you to focus on configuring AI providers rather than maintaining servers.

After deployment, you can log into the administrative dashboard, change the default administrator password, configure upstream AI providers such as OpenAI, Anthropic, Gemini, Ollama, Midjourney, or Suno, create API keys, manage users, configure pricing and quotas, and begin serving OpenAI-compatible API requests through a single endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Max API | `pochacco/max-api:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `TZ` | Max API | Asia/Shanghai | - |
| `SESSION_SECRET` | Max API | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/maxapi)
