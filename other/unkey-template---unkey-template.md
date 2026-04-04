# Deploy unkey-template on Railway

Template for a self-hosted Unkey instance.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unkey-template)

## About

Unkey is an open-source API key management platform that allows you to issue, verify, and monitor API keys with low latency. This template provides a fully self-hosted environment, giving you total control over your security infrastructure and analytics data without the overhead of third-party SaaS management.

This template deploys a robust, production-ready stack on Railway. It includes the core Unkey API for key lifecycle management, a dedicated Vault service for high-security encryption, and a ClickHouse instance for high-performance usage analytics. The stack is rounded out with MySQL for relational data and Redis for sub-millisecond caching, ensuring your API remains fast and scalable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| unkey-vault | [toxzak-svg/railway-unkey](https://github.com/toxzak-svg/railway-unkey) (root: /vault) | Worker |
| Redis | `redis:8.2.1` | Database |
| unkey-api | [toxzak-svg/railway-unkey](https://github.com/toxzak-svg/railway-unkey) (root: /api) | Worker |
| clickhouse | [toxzak-svg/railway-unkey](https://github.com/toxzak-svg/railway-unkey) (root: /clickhouse) | Database |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | unkey-vault | 8060 | - |
| `VAULT_TOKEN` | unkey-vault | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | unkey-api | 7070 | - |
| `VAULT_TOKEN` | unkey-api | (secret) | - |
| `CLICKHOUSE_USER` | unkey-api | (secret) | - |
| `DATABASE_PASSWORD` | unkey-api | (secret) | - |
| `DATABASE_USERNAME` | unkey-api | (secret) | - |
| `CLICKHOUSE_PASSWORD` | unkey-api | (secret) | - |
| `CLICKHOUSE_USER` | clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Generate once. Same value as vault. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 | - |
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

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/unkey-template)
