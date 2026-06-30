# Deploy WordPress — Self-Hosted CMS with MariaDB on Railway on Railway

Self-host WordPress + MariaDB. No traffic caps. No renewal price hikes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-cms)

## About

![WordPress self-hosted CMS dashboard](https://cmscritic.com/ms-content/uploads/2023/08/wplogoblue-stacked-rgb_zqpuyr.png?format=auto&width=2048)

WordPress is the world's most popular open-source CMS — powering 43% of all websites, from
personal blogs to enterprise e-commerce. This template deploys a production-ready WordPress
instance with a MariaDB database, persistent volumes for files and database, auto-generated
security keys, and `WP_HOME`/`WP_SITEURL` wired to your Railway domain automatically. No LAMP
stack setup, no SSL wrangling, no manual configuration.

**Self-host WordPress for ~$5–10/month** — versus WP Engine at $30/month, Kinsta at $35/month,
or SiteGround which renews at $29.99/month. No traffic caps. No renewal price hikes. Full
ownership of your site and data.

---

Traditional shared WordPress hosting puts your site on overcrowded servers, imposes traffic
caps, and triples renewal rates after year one. Managed hosts like WP Engine and Kinsta solve
performance but start at $30–35/month for a single site with visitor caps. Running WordPress
yourself on a VPS means configuring Apache, PHP, MariaDB, SSL, and patching all of it forever.

Railway eliminates all of that. This template runs the official WordPress and MariaDB images
over private networking with persistent volumes, automatic HTTPS, and an environment-variable
UI for rotating secrets without SSH. The full two-container stack is live in under two minutes.

Typical cost: **~$5–10/month** on Railway's Hobby plan. WP Engine starts at $30/month, Kinsta
at $35/month, and SiteGround renews at $29.99/month — all with visitor caps. Railway has no
traffic limits and no renewal pricing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mariadb | `mariadb:latest` | Database |
| Wordpress | `wordpress` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_PORT` | Mariadb | 3306 |
| `MARIADB_USER` | Mariadb | (secret) |
| `MARIADB_DATABASE` | Mariadb | railway |
| `MARIADB_PASSWORD` | Mariadb | (secret) |
| `MARIADB_ROOT_PASSWORD` | Mariadb | (secret) |
| `PORT` | Wordpress | 80 |
| `WORDPRESS_DB_HOST` | Wordpress | mariadb.railway.internal:3306 |
| `WORDPRESS_DB_NAME` | Wordpress | railway |
| `WORDPRESS_DB_USER` | Wordpress | (secret) |
| `WORDPRESS_AUTH_KEY` | Wordpress | (secret) |
| `WORDPRESS_DB_PASSWORD` | Wordpress | (secret) |
| `WORDPRESS_SECURE_AUTH_KEY` | Wordpress | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'a2dismod mpm_event mpm_worker || true; a2enmod mpm_prefork || true; exec docker-entrypoint.sh apache2-foreground'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-cms)
