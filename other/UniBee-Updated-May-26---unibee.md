# Deploy UniBee [Updated May '26] on Railway

UniBee [May '26] (Subscription, Invoicing & Payment Management) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unibee)

## About

UniBee is an open-source, gateway-agnostic subscription billing platform built for SaaS businesses. It handles recurring payments, subscription lifecycle management, automated invoicing, dunning recovery, usage-based billing, and global tax automation — all without locking you into a single payment provider. UniBee is a self-hosted alternative to Recurly, Chargebee, and Paddle.

Self hosting UniBee means your billing data, subscription records, invoices, and payment configurations stay entirely on infrastructure you control. There is no dependency on third-party SaaS billing providers that may impose transaction fees or data residency restrictions. With Railway, all infrastructure complexity is handled automatically — service provisioning, private networking, persistent volumes, and database initialization run on each deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| user-portal | `unibee/user-portal:v1.9.0` | Web service |
| admin-portal | `unibee/admin-portal:v1.9.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| api-v2 | [Shinyduo/unibee-api-railway](https://github.com/Shinyduo/unibee-api-railway) | Web service |
| license-api-v2 | [Shinyduo/unibee-license-api-railway](https://github.com/Shinyduo/unibee-license-api-railway) | Web service |
| db-init | [Shinyduo/unibee-db-init-railway](https://github.com/Shinyduo/unibee-db-init-railway) | Worker |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | user-portal | 80 | - |
| `PORT` | admin-portal | 80 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `MODE` | api-v2 | cloud | - |
| `PORT` | api-v2 | 8083 | - |
| `DB_USER` | api-v2 | (secret) | - |
| `DB_PASSWORD` | api-v2 | (secret) | - |
| `REDIS_PASSWORD` | api-v2 | (secret) | - |
| `PORT` | license-api-v2 | 8083 | - |
| `DB_USER` | license-api-v2 | (secret) | - |
| `DB_PASSWORD` | license-api-v2 | (secret) | - |
| `REDIS_PASSWORD` | license-api-v2 | (secret) | - |
| `DB_USER` | db-init | (secret) | - |
| `DB_PASSWORD` | db-init | (secret) | - |
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

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/unibee)
