# Deploy ERPNext on Railway

Deploy and Host ERPNext with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/erpnext)

## About

Hosting ERPNext involves deploying the Frappe framework along with its essential services: MariaDB for data storage, Redis for caching and queuing, and a reverse proxy like Nginx.
On Railway, you can containerize ERPNext, configure environment variables, and attach persistent storage volumes for durability.

### Service Overview

![frappe-service-overfiew](https://ik.imagekit.io/caffeinnne/random/railway-frappe-arch_9_7rYuCfW.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| erpnext | [pipech/erpnext-docker-debian](https://github.com/pipech/erpnext-docker-debian) | Web service |
| mariadb | `mariadb:10.6` | Database |
| redis-queue | `redis:6.2-alpine` | Database |
| redis-cache | `redis:6.2-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RFP_DOMAIN_NAME` | erpnext | - | Public domain name, will be use to create Frappe/ERPNext site and configure Nginx. Change to custom domain name if need. Sample value: your-erp-site.com |
| `FRAPPE_DB_PASSWORD` | erpnext | (secret) | [Removable after initial site setup] |
| `RFP_DB_ROOT_PASSWORD` | erpnext | (secret) | [Removable after initial site setup] |
| `RFP_SITE_ADMIN_PASSWORD` | erpnext | (secret) | [Removable after initial site setup] |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | [Removable after initial site setup] |

## Configuration

- **Start command:** `tail -f /dev/null`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/frappe/bench/sites`
- **Start command:** `docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake --skip-innodb-read-only-compressed --ignore-db-dirs=lost+found`
- **Volume:** `/var/lib/mysql`
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile, Python, Shell

[View on Railway →](https://railway.com/deploy/erpnext)
