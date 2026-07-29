# Deploy Ghost on Railway

Professional publishing platform for blogs, newsletters, and memberships.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-2)

## About

Ghost is a powerful open-source publishing platform built for professional creators. It combines a fast, minimalist CMS with native memberships, paid subscriptions, newsletters, and SEO tooling, letting bloggers, journalists, and publishers run and monetize a modern publication without the bloat of traditional CMSs.

Hosting Ghost means running a Node.js application that serves your site on port 2368, backed by a MySQL 8 database — the only database Ghost supports in production. Ghost needs persistent storage for uploaded images, themes, and content files, plus a canonical `url` setting so it can generate correct links, RSS feeds, and sitemaps. On Railway, Ghost runs as one service with a persistent volume at `/var/lib/ghost/content`, connected over the private network to a MySQL 8.4 service with its own volume at `/var/lib/mysql`. Configuration is done entirely through environment variables — database connection, site URL, and mail — with no config files to manage. Railway handles TLS, the public domain, scaling, and restarts, so a production-grade Ghost deploy is a one-click operation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ghost | `ghost:6.54.0` | Web service |
| MySQL | `mysql:8.4.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `database__client` | Ghost | mysql |
| `database__connection__user` | Ghost | (secret) |
| `database__connection__database` | Ghost | ghost |
| `database__connection__password` | Ghost | (secret) |
| `security__staffDeviceVerification` | Ghost | false |
| `MYSQL_DATABASE` | MySQL | ghost |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/ghost-2)
