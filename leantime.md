# Deploy Leantime [Updated Mar ’26] on Railway

Leantime [Mar ’26] (PM | Jira, Trello & Asana alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/leantime)

## About

Leantime is a free, **open-source project management tool** available on GitHub. Designed for startups, small businesses, and enterprises, it offers a modern mix of project planning, time tracking, collaboration, and **Kanban boards**. With Leantime, teams can move beyond simple to-do lists and enjoy structured workflows, strategic roadmaps, and lightweight project tracking.

Being open-source, Leantime gives you full flexibility and transparency. You can review its source code on the official **Leantime GitHub** repository, customize it for your needs, and even contribute to its growing ecosystem.

You can **self host Leantime** to keep your entire project management environment under your control, with zero reliance on third parties. With Leantime open source software, you benefit from complete data ownership, a powerful **Kanban system**, and flexible integrations that fit your unique workflow.

Thanks to **Railway**, you can deploy Leantime instantly in managed Docker containers. This eliminates the complexity of setting up servers manually. Railway automates updates, scaling, and environment management, making **hosting Leantime Docker** deployments seamless and secure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| docker-leantime | [Shinyduo/docker-leantime](https://github.com/Shinyduo/docker-leantime) | Web service |
| MySQL | `mysql:9` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | docker-leantime | production | - |
| `APP_DEBUG` | docker-leantime | false | - |
| `LEAN_PORT` | docker-leantime | 8080 | - |
| `LEAN_DB_USER` | docker-leantime | (secret) | - |
| `LEAN_STORAGE` | docker-leantime | local | - |
| `LEAN_VERSION` | docker-leantime | v3.5.12 | - |
| `LEAN_DB_PASSWORD` | docker-leantime | (secret) | - |
| `LEAN_REDIS_ENABLED` | docker-leantime | true | - |
| `LEAN_REDIS_PASSWORD` | docker-leantime | (secret) | - |
| `LEAN_SESSION_PASSWORD` | docker-leantime | (secret) | - |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | railway | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/leantime)
