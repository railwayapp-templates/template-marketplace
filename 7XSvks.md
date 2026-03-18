# Deploy Mixpost Lite on Railway

For individuals needing essential social media management tool.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/7XSvks)

## About

Mixpost Lite is a streamlined social media management tool designed specifically for individuals who need a simple yet effective way to manage their social media presence. The template provides a user-friendly interface, enabling users to schedule posts, track engagement, and manage multiple social media accounts.

Easy Content Scheduling: A calendar view that allows users to schedule posts across multiple platforms. Users can drag and drop posts to reschedule, view upcoming posts, and adjust timings.

Platform-Specific Customization: Ability to tailor posts for each social media platform.

Content Library: A repository for storing frequently used images, hashtags, and post templates for quick access.
Engagement Tracking:

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql` | Database |
| Mixpost | `inovector/mixpost` | Web service |
| KeyDB | `eqalpha/keydb:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `DB_PASSWORD` | Mixpost | (secret) |
| `DB_USERNAME` | Mixpost | (secret) |
| `REDIS_PASSWORD` | Mixpost | (secret) |
| `KEYDB_USER` | KeyDB | (secret) |
| `KEYDB_PASSWORD` | KeyDB | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/bash -c "exec /bin/bash /usr/local/bin/start.sh 2>&1"`
- **Healthcheck:** `manifest.json`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/app`
- **Start command:** `/bin/sh -c "exec keydb-server /etc/keydb/keydb.conf --server-threads 16 --always-show-logo no --appendonly yes --requirepass ${KEYDB_PASSWORD} --port ${KEYDB_PRIVATE_PORT}"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/7XSvks)
