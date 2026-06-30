# Deploy WordPress — Self-Hosted CMS on Railway on Railway

Deploy WordPress with MariaDB. No traffic caps. No renewal price hikes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-pro-scalable-cloud-hosting)

## About

![WordPress Dashboard](https://sixsixninenine-co-uk.s3.amazonaws.com/wp-content/uploads/2015/12/wordpress-logo-banner.jpg)

WordPress is the world's most popular open-source CMS, powering 43% of all websites — from
personal blogs to enterprise e-commerce stores. This template deploys a production-ready
WordPress instance with a managed MariaDB database, persistent volume for media uploads,
and automatic HTTPS — giving you dedicated cloud infrastructure at a fraction of managed
WordPress hosting costs.

**Self-host WordPress for ~$5–10/month** — versus WP Engine at $30/month, Kinsta at $35/month,
and SiteGround which renews at $29.99/month. Full data ownership. No traffic caps.

---

Traditional shared WordPress hosting puts your site on overcrowded servers with other customers,
imposes traffic caps, charges renewal rates that often triple after the first year, and locks
you into proprietary control panels. Managed WordPress hosts like WP Engine and Kinsta solve
the performance problem but start at $30–35/month for a single site with visitor caps.

Railway gives you dedicated container infrastructure with no traffic caps, persistent storage,
automatic HTTPS, and private database networking — at ~$5–10/month flat. No cPanel. No FTP.
No renewal price shock. Your WordPress instance runs in an isolated container alongside its
own MariaDB database, with media files persisted on a Railway volume.

Typical cost: **~$5–10/month** on Railway's Hobby plan for the full stack.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb` | Database |
| Wordpress | `wordpress` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_USER` | mariadb | (secret) |
| `MARIADB_DATABASE` | mariadb | railway |
| `MARIADB_PASSWORD` | mariadb | (secret) |
| `MARIADB_PRIVATE_PORT` | mariadb | 3306 |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) |
| `PORT` | Wordpress | 80 |
| `WORDPRESS_DB_NAME` | Wordpress | railway |
| `WORDPRESS_DB_USER` | Wordpress | (secret) |
| `WORDPRESS_AUTH_KEY` | Wordpress | (secret) |
| `WORDPRESS_DB_PASSWORD` | Wordpress | (secret) |
| `WORDPRESS_SECURE_AUTH_KEY` | Wordpress | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-pro-scalable-cloud-hosting)
