# Deploy Ghost | Publishing Platform with MySQL and a Real Volume on Railway

Self-host Ghost on Railway: pinned release, MySQL, content that persists

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-or-publishing-platform-with-mysql-)

## About

Ghost is a publishing platform: posts, pages, themes, members and paid newsletters, with an editor built for writing rather than for page-building.

This template runs the official ghost image on a pinned release, with MySQL and a persistent volume mounted at the content directory.

Both of those matter. Ghost keeps posts and members in MySQL, but themes, uploaded images and generated files live on disk under /var/lib/ghost/content. Without a volume every image you upload disappears with the next deploy, and the site keeps rendering broken links to files that are no longer there.

The image is pinned to a specific Ghost release instead of a moving tag, so a redeploy gives you the version you were running, not whatever shipped this morning.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:8.4` | Database |
| Ghost | `ghost:6.54.0-alpine` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | ghost |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `PORT` | Ghost | 2368 |
| `NODE_ENV` | Ghost | production |
| `server__host` | Ghost | 0.0.0.0 |
| `server__port` | Ghost | 2368 |
| `database__client` | Ghost | mysql |
| `database__connection__port` | Ghost | 3306 |
| `database__connection__user` | Ghost | (secret) |
| `database__connection__password` | Ghost | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/ghost-or-publishing-platform-with-mysql-)
