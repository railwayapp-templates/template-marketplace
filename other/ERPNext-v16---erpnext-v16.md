# Deploy ERPNext v16 on Railway

Deploy and Host ERPNext with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/erpnext-v16)

## About

Hosting ERPNext involves deploying the Frappe framework along with its essential services: MariaDB for data storage, Redis for caching and queuing, and a reverse proxy like Nginx.

On Railway, you can containerize ERPNext, configure environment variables, and attach persistent storage volumes for durability.

### Service Overview

![frappe-service-overfiew](https://ik.imagekit.io/caffeinnne/random/railway-frappe-arch_9_7rYuCfW.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-queue | `redis:6.2-alpine` | Database |
| redis-cache | `redis:6.2-alpine` | Database |
| mariadb | `mariadb:11.8` | Database |
| erpnext-docker | [thspacecode/erpnext-docker](https://github.com/thspacecode/erpnext-docker) (root: /setup-railway-separated) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | [Removable after initial site setup] |
| `FRAPPE_DB_HOST` | erpnext-docker | - | Database server host that Frappe connects to. |
| `RFP_DOMAIN_NAME` | erpnext-docker | - | Public domain name, will be use to create Frappe/ERPNext site and configure Nginx. Change to custom domain name if need. Sample value: your-erp-site.com |
| `FRAPPE_DB_PASSWORD` | erpnext-docker | (secret) | [Removable after initial site setup] |
| `FRAPPE_REDIS_CACHE` | erpnext-docker | - | Redis endpoint used for caching in Frappe. |
| `FRAPPE_REDIS_QUEUE` | erpnext-docker | - | Redis endpoint used for background job queues in Frappe. |
| `RFP_SITE_ADMIN_PASSWORD` | erpnext-docker | (secret) | [Removable after initial site setup] |

## Configuration

- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake --skip-innodb-read-only-compressed`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/frappe/frappe-bench/sites`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/erpnext-v16)
