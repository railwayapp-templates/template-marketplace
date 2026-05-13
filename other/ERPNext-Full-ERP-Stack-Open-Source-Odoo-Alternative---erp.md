# Deploy ERPNext | Full ERP Stack | Open Source Odoo Alternative on Railway

Self Host ERPNext on Railway: accounting, inventory, HR, CRM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/erp)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/erp?referralCode=QXdhdr)

ERPNext is a 100% open-source ERP from Frappe Technologies — accounting, inventory, manufacturing, CRM, HR, projects — released under AGPLv3 as a free alternative to Odoo, NetSuite, and SAP Business One. Self-hosting ERPNext is usually painful: the official Frappe Docker stack runs 7+ containers sharing a `sites` volume, which is why most teams pay for Frappe Cloud.

Deploy ERPNext on Railway in one click. The template bundles supervisor, gunicorn, three worker types, the scheduler, socketio, and nginx into one container, leaving MariaDB and two Redis instances as separate services. Self-host ERPNext with real workers — no compose orchestration.

![ERPNext Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1778604218/69b71e78-cddd-42bd-b320-86102d09f727.png)

ERPNext is the flagship app on Frappe — a metadata-driven Python + JS platform.

- Double-entry accounting, multi-currency, multi-company
- Manufacturing (BOM, work orders, MRP), inventory, quality
- CRM, selling, buying, projects, HR, payroll, assets
- REST/GraphQL APIs, custom doctypes and scripts
- AGPLv3 — no per-user fees

Architecture: ERPNext container (supervisor → gunicorn + 3 workers + scheduler + socketio + nginx) → MariaDB 10.6 → RedisCache → RedisQueue (RQ + socketio collapsed).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:10.6` | Database |
| RedisCache | `redis:8.2.1` | Database |
| ERPNext | [praveen-ks-2001/erpnext-railway](https://github.com/praveen-ks-2001/erpnext-railway) | Web service |
| RedisQueue | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MariaDB | - | MariaDB internal hostname |
| `MYSQLPORT` | MariaDB | 3306 | MariaDB service port |
| `MYSQLUSER` | MariaDB | root | Default MariaDB root username |
| `MYSQL_URL` | MariaDB | - | Internal MariaDB connection string |
| `MYSQLDATABASE` | MariaDB | - | Database name reference variable |
| `MYSQLPASSWORD` | MariaDB | (secret) | MariaDB password reference |
| `MYSQL_DATABASE` | MariaDB | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MariaDB | - | Public MariaDB connection URL |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) | Root user password credential |
| `REDISHOST` | RedisCache | - | Redis internal hostname |
| `REDISPORT` | RedisCache | 6379 | Redis service port |
| `REDISUSER` | RedisCache | default | Redis default username |
| `REDIS_URL` | RedisCache | - | Internal Redis connection string |
| `REDISPASSWORD` | RedisCache | (secret) | Redis password reference |
| `REDIS_PASSWORD` | RedisCache | (secret) | Redis authentication password |
| `REDIS_PUBLIC_URL` | RedisCache | - | Public Redis connection URL |
| `PORT` | ERPNext | 80 | HTTP port nginx listens on |
| `RFP_DB_HOST` | ERPNext | - | MariaDB private hostname |
| `RFP_DB_PORT` | ERPNext | 3306 | MariaDB port |
| `RFP_DOMAIN_NAME` | ERPNext | frontend | Pinned Frappe site name |
| `RFP_REDIS_CACHE_URL` | ERPNext | - | Frappe cache backend |
| `RFP_REDIS_QUEUE_URL` | ERPNext | - | RQ worker queue |
| `RFP_DB_ROOT_PASSWORD` | ERPNext | (secret) | MariaDB root password |
| `RFP_REDIS_SOCKETIO_URL` | ERPNext | - | Socketio pub/sub (shares queue) |
| `RFP_SITE_ADMIN_PASSWORD` | ERPNext | (secret) | Bootstrap admin password (first boot) |
| `REDISHOST` | RedisQueue | - | Redis internal hostname |
| `REDISPORT` | RedisQueue | 6379 | Redis service port |
| `REDISUSER` | RedisQueue | default | Redis default username |
| `REDIS_URL` | RedisQueue | - | Internal Redis connection string |
| `REDISPASSWORD` | RedisQueue | (secret) | Redis password reference |
| `REDIS_PASSWORD` | RedisQueue | (secret) | Redis authentication password |
| `REDIS_PUBLIC_URL` | RedisQueue | - | Public Redis connection URL |

## Configuration

- **Start command:** `docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --innodb-file-per-table=1 --innodb-default-row-format=dynamic --skip-character-set-client-handshake`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/frappe/bench/sites`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/erp)
