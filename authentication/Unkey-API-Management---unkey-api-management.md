# Deploy Unkey API Management on Railway

One-click deploy for Unkey API, including MySQL and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unkey-api-management)

## About

Unkey is an open-source API management platform built for scale. It handles API key creation, validation, and rate-limiting with sub-millisecond latency. Whether you are building a public API or securing internal services, Unkey gives you analytics, root key management, and instant key verification without bogging down your application.

Hosting Unkey yourself means you fully control your own API key data and infrastructure. Since Unkey recently moved away from a serverless-only architecture, deploying it requires setting up a few moving parts. 

You need the main Unkey application running alongside a MySQL database, which acts as the primary storage for your keys, workspaces, and configurations. You also need a Redis instance, which Unkey relies on heavily to process incredibly fast rate-limiting and distributed counters. Wiring these together manually can be a headache, but this Railway template links the database connections and caching layers automatically through environment variables so it works right out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| unkey | `ghcr.io/unkeyed/unkey:latest` | Worker |
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/unkey-api-management)
