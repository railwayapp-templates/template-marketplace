# Deploy unkey on Railway

Unkey - The Developer Platform for Modern APIs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/unkey)

## About

Unkey is an open-source API management platform that allows developers to secure their services with **low-latency API key authentication**. It provides out-of-the-box features such as **rate limiting**, **usage tracking**, and **temporary keys**, enabling you to build and scale your API infrastructure without creating a custom authentication layer from scratch.

---

Hosting Unkey involves deploying a **high-performance Go-based backend** alongside supporting data services.

Unkey is designed for speed (targeting **&lt;40ms key verification**), and its architecture relies on:

- **MySQL** for persistent data (API configs, key metadata, encrypted hashes)
- **Redis** for real-time state management and rate-limiting counters

Earlier versions depended on third-party providers like PlanetScale. The modern Unkey stack is now **fully self-hostable**, meaning you can run the **API and Dashboard** entirely using open-source databases.

**Railway** simplifies this process by:

- Provisioning databases automatically
- Injecting environment variables securely
- Connecting services via a private internal network

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:9.4` | Database |
| unkeyed/unkey:v2.0.49 | `ghcr.io/unkeyed/unkey:v2.0.49` | Web service |

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
| `UNKEY_CTRL_URL` | unkeyed/unkey:v2.0.49 | - | CTRL service connection URL for deployment management |
| `UNKEY_ROOT_KEY` | unkeyed/unkey:v2.0.49 | - | Tests the key verification endpoints. |
| `UNKEY_REDIS_URL` | unkeyed/unkey:v2.0.49 | - | Redis connection string for rate-limiting and distributed counters. Example: redis://localhost:6379 |
| `UNKEY_DATABASE_PRIMARY` | unkeyed/unkey:v2.0.49 | - | MySQL connection string for primary database. Required for all deployments. Example: user:pass@host:3306/unkey?parseTime=true |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `unkey run api`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/unkey)
