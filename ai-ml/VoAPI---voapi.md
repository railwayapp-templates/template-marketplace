# Deploy VoAPI on Railway

Advanced AI API proxy and gateway for model access distribution.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/voapi)

## About

VoAPI is a high-performance AI model interface management and distribution system. Based on NewAPI, it offers an enhanced user interface, advanced rate limiting, custom payment channels, and comprehensive monitoring. It is designed for developers and teams to manage, distribute, and track usage of various AI models seamlessly.

Hosting VoAPI on Railway involves deploying a resilient, multi-tier architecture consisting of the core VoAPI application container, a MySQL database for persistent records, and a Redis instance for caching and rate limiting. Railway streamlines this setup by allowing you to provision all three services within a single project environment.

Persistent data such as user accounts, API keys, channel configurations, and logs are securely stored within Railway's managed MySQL database, while Redis handles transient state like global rate limits, user daily quotas, and IP tracking. Railway automatically manages internal networking, allowing the VoAPI container to securely communicate with the databases without exposing them to the public internet. Furthermore, Railway provides instant, auto-renewing HTTPS through a generated public domain, making your AI API proxy endpoints instantly secure and ready for production use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| voapi | `voapi/voapi:v1.2.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | voapi | Asia/Shanghai | - |
| `SESSION_SECRET` | voapi | (secret) | - |
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

## Configuration

- **Start command:** `sh -c 'printf "app:\n  port: 6800\nmysql:\n  dsn: ${SQL_DSN}\n  log-dsn: ${SQL_DSN}\n  log-body-dsn: ${SQL_DSN}\n  log-sharding:\n    enable: false\n    mode: y\nredis:\n  dsn: ${REDIS_CONN_STRING}\n  pool-size: 0\n" > /config.yml && /voapi'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/voapi)
