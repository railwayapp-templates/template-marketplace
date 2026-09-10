# Deploy YOURLS on Railway

Open-source URL shortener with click stats and its own API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-yourls)

## About

YOURLS — *Your Own URL Shortener* — is the long-running open-source answer to Bitly. It turns long links into short ones on a domain you control, counts every click, and records where each visitor came from, so the data behind your links stays in your own database rather than a vendor's. It is a small PHP application with a plugin API, a documented HTTP API and a web admin. Self-host YOURLS when you want branded short links that keep working even if a shortening service shuts down, and analytics you can read without a plan upgrade.

Deploy YOURLS on Railway and you get two services. **YOURLS** runs the application on Apache and PHP 8.5 and is the only service exposed to the internet; **MySQL** is a Railway-managed database reachable only over the project's private network. On first boot the YOURLS service creates its own database and a MySQL role scoped to that database alone, then creates the `yourls_url`, `yourls_options` and `yourls_log` tables — the setup wizard you would normally click through is already done by the time the URL answers. A volume at `/var/www/html/user` keeps your configuration, plugins and translations across redeploys.

![Diagram of the YOURLS and MySQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788897217/yourls-architecture.png)

A URL shortener looks trivial until you own one: it has to resolve keywords fast, never lose a mapping, and keep a click log you can query later. YOURLS does all of that in a few hundred kilobytes of PHP backed by MySQL, which is why it has outlived most of its competitors. Teams self-host it when short links are part of the brand — a `go/` link in internal docs, a campaign link in an email — and have to keep resolving for years.

Key features:

- Custom or generated keywords, lowercase (base 36) or mixed case (base 62)
- Click statistics per link: hourly and daily graphs, historical totals, best day
- Referrer and country breakdowns for every short URL
- An HTTP API with signature-based authentication for scripts and integrations
- A plugin API with action and filter hooks, and a large community plugin ecosystem
- Private mode, on by default, so only your account can create links or read stats

The Railway architecture is two services. YOURLS serves every request — admin, API and the redirects themselves — and holds user content on its volume. MySQL stores the links, options and click log, and has no public domain, so the only route to your data is through the application.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| YOURLS | [gridalpha/yourls-railway](https://github.com/gridalpha/yourls-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the server |
| `PORT` | YOURLS | 8080 | Apache listening port |
| `YOURLS_PASS` | YOURLS | - | Admin password |
| `YOURLS_SITE` | YOURLS | - | Public base URL, no trailing slash |
| `YOURLS_USER` | YOURLS | (secret) | Admin username |
| `YOURLS_DB_HOST` | YOURLS | - | MySQL host and port |
| `YOURLS_DB_NAME` | YOURLS | yourls | Database created on first boot |
| `YOURLS_DB_PASS` | YOURLS | - | Password for the scoped role |
| `YOURLS_DB_USER` | YOURLS | (secret) | Scoped role created on first boot |
| `YOURLS_PRIVATE` | YOURLS | true | Restrict links and stats to the admin |
| `YOURLS_COOKIEKEY` | YOURLS | - | Signs the session cookie |
| `YOURLS_ADMIN_DATABASE_URL` | YOURLS | - | Admin URL, used only to provision |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/admin/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/user`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/deploy-yourls)
