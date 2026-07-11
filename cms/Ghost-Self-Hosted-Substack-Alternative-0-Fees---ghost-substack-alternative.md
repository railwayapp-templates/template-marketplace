# Deploy Ghost — Self-Hosted Substack Alternative, 0% Fees on Railway

Self-host Ghost: newsletters & memberships. 0% fees, unlike Substack.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-substack-alternative)

## About

Ghost is the open-source publishing platform built for writers — ~50k GitHub stars, run by a
non-profit foundation, and used by Buffer, Airtable, Kickstarter, and 404 Media. A clean,
fast, SEO-first CMS with built-in newsletters, paid memberships, and (since v6.0) ActivityPub
syndication to Mastodon and Bluesky — all in one platform. This template deploys Ghost with a
MySQL database and a persistent volume for your content and images.

**Substack takes 10% of your subscription revenue forever.** A newsletter earning $5,000/month
hands Substack $500/month — roughly $6,000/year. Ghost takes **0% platform fees**: you keep
everything but Stripe's standard processing. Self-hosted on Railway for ~$5–10/month flat, you
own your site, your subscriber list, and your payment relationships.

---

Ghost is a Node.js application backed by MySQL, with content (images, themes) on disk. Running it
means a persistent server, a MySQL 8 database, a content volume, a public HTTPS endpoint, and an
external email provider for newsletters. The official self-host path is Docker Compose on a VPS
plus manual database, SSL, and email wiring. This template does the database, volume, and HTTPS
parts on Railway automatically.

> **Email — the part everyone gets wrong:** self-hosted Ghost needs an external email provider,
> and **Mailgun is the only first-class option for bulk newsletter sends** as of 2026. Set your
> Mailgun API details in config to send newsletters; without it, publishing works but email
> delivery won't. Railway Hobby blocks raw SMTP, so use HTTPS-based email.

Typical cost: **~$5–10/month** on Railway for Ghost and MySQL, plus Mailgun (free to 1,000
emails/month, then usage-based) and Stripe fees. Ghost(Pro) managed hosting is $15–199/month;
Substack takes 10% of revenue. Self-hosted Ghost on Railway is flat compute with a 0% platform fee.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Ghost | `ghost:alpine` | Database |

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
| `PORT` | Ghost | 2368 | - |
| `mail__transport` | Ghost | SMTP | - |
| `database__client` | Ghost | mysql | - |
| `mail__options__auth__user` | Ghost | (secret) | - |
| `database__connection__user` | Ghost | (secret) | - |
| `database__connection__password` | Ghost | (secret) | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Volume:** `/var/lib/ghost/content`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/ghost-substack-alternative)
