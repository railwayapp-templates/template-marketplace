# Deploy unkey railway template on Railway

Deploy and Host unkey railway template with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unkey-railway-template)

## About

Unkey is an open-source API management platform that allows developers to secure their services with low-latency API key authentication. It provides out-of-the-box features such as rate limiting, usage tracking, and temporary keys, enabling you to build and scale your API infrastructure without creating a custom authentication layer from scratch.

Hosting Unkey involves deploying a high-performance Go-based backend alongside supporting data services. Unkey is designed for speed (targeting &lt;40ms key verification), and its architecture relies on MySQL for persistent data such as API configs, key metadata, and encrypted hashes, and Redis for real-time state management and rate-limiting counters. The modern Unkey stack is fully self-hostable, meaning you can run the API entirely using open-source databases with no PlanetScale or Clerk dependencies required. Railway simplifies this process by provisioning databases automatically, injecting environment variables securely, and connecting services via a private internal network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Redis | `redis:8.2.1` | Database |
| unkey-railway-template | [EKF0/unkey-railway-template](https://github.com/EKF0/unkey-railway-template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQL_USER` | MySQL | (secret) |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | unkey |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | unkey-railway-template | 7070 |
| `UNKEY_ROOT_KEY` | unkey-railway-template | unkey-root-key-set-me |
| `UNKEY_REDIS_URL` | unkey-railway-template | redis://default:GQJltRLgPvhKxrsCdIPLWRPRUxdpRhVW@redis.railway.internal:6379 |
| `UNKEY_DATABASE_PRIMARY` | unkey-railway-template | root:oSvGYFOnGitJhCNdqFPeElAJMjfVtfyd@tcp(mysql.railway.internal:3306)/unkey?parseTime=true |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/unkey-railway-template)
