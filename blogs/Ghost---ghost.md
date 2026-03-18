# Deploy Ghost on Railway

Turn your audience into a business.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost)

## About

## Overview

Ghost is a powerful app for new-media creators to publish, share, and grow a business around their content. It comes with modern tools to build a website, publish content, send newsletters & offer paid subscriptions to members.

## Highlights

- Publish by web & email newsletter.
- Rich media & dynamic cards.
- Newsletters built-in.
- Native analytics.

## Learn More

- [Website](https://ghost.org/)
- [Documentation](https://ghost.org/docs/content-api/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9` | Database |
| ghost | [railwayapp-starters/ghost](https://github.com/railwayapp-starters/ghost) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `BLOG_URL` | ghost | - | The URL of your Ghost blog. |
| `NODE_ENV` | ghost | production | - |
| `CLOUDINARY_URL` | ghost | - | For file storage. If you do not add this, your images won't persist between deploys. |
| `MAILGUN_SMTP_LOGIN` | ghost | (secret) | The username for your Mailgun SMTP account. |
| `MAILGUN_SMTP_PASSWORD` | ghost | (secret) | The password for your Mailgun SMTP account. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** JavaScript, Shell, Procfile

[View on Railway →](https://railway.com/deploy/ghost)
