# Deploy ownCloud on Railway

Self-host file sync and collaboration with durable MariaDB and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/owncloud)

## About

This community template runs the official, digest-pinned ownCloud 10.16.3
container with private MariaDB 10.11 and Redis 6 services. Railway persists the
complete ownCloud data root, database, and Redis state on three dedicated
volumes. Only ownCloud is exposed through Railway HTTPS. The container installs
or upgrades the database before Apache starts, runs background jobs with its
built-in cron daemon, and exposes `/status.php` for health checks. Railway
generates the application, administrator, and database secrets. Redis is
reachable only over Railway's project-private network, matching the upstream
compose topology. This
template is not affiliated with or endorsed by ownCloud GmbH or Kiteworks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:10.11@sha256:be981e4113326ada8d6004174dd09eeaefc03094037f811182a52d4f2e737350` | Database |
| ownCloud | `owncloud/server:10.16.3-20260726@sha256:f184a7b7ceeee843250ceb3a4a9a5426a3e86022b7b254ac157f7c3c88497266` | Web service |
| Redis | `redis:6-alpine@sha256:ec5e187c913d422cdf60f4216a5fdfb95246792c6de6fe21ff5bed75cbfc8c23` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | owncloud |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_AUTO_UPGRADE` | MariaDB | 1 |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |
| `PORT` | ownCloud | 8080 |
| `OWNCLOUD_SECRET` | ownCloud | (secret) |
| `OWNCLOUD_DB_TYPE` | ownCloud | mysql |
| `OWNCLOUD_PROTOCOL` | ownCloud | https |
| `OWNCLOUD_LOG_LEVEL` | ownCloud | 2 |
| `OWNCLOUD_MAX_UPLOAD` | ownCloud | 20G |
| `OWNCLOUD_REDIS_PORT` | ownCloud | 6379 |
| `OWNCLOUD_DB_PASSWORD` | ownCloud | (secret) |
| `OWNCLOUD_DB_USERNAME` | ownCloud | (secret) |
| `OWNCLOUD_MEMORY_LIMIT` | ownCloud | 512M |
| `OWNCLOUD_CROND_ENABLED` | ownCloud | true |
| `OWNCLOUD_MYSQL_UTF8MB4` | ownCloud | true |
| `OWNCLOUD_REDIS_ENABLED` | ownCloud | true |
| `OWNCLOUD_ADMIN_PASSWORD` | ownCloud | (secret) |
| `OWNCLOUD_ADMIN_USERNAME` | ownCloud | (secret) |
| `OWNCLOUD_BACKGROUND_MODE` | ownCloud | cron |
| `OWNCLOUD_OVERWRITE_PROTOCOL` | ownCloud | https |

## Configuration

- **Start command:** `/usr/local/bin/docker-entrypoint.sh mariadbd --max-allowed-packet=128M --innodb-log-file-size=64M --transaction-isolation=READ-COMMITTED`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/status.php`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/data`
- **Start command:** `/usr/local/bin/docker-entrypoint.sh redis-server --appendonly yes --databases 1`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/owncloud)
