# Deploy ERPNext on Railway

Free and Powerful Open Source Enterprise Resource Planning (ERP)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/erp-next)

## About

ERPNext is a full open-source ERP: accounting, stock and warehouse management, buying and selling, CRM, manufacturing, projects, HR and payroll and a customer portal — one application, GPLv3, with no paid tier holding features back. It is built on the Frappe framework, which gives every record a REST API, a permission model, custom fields and scripted workflows without forking the codebase. Small manufacturers, distributors and service businesses run it as the system of record their spreadsheets used to be.

Self-host ERPNext on Railway and the pieces the Frappe stack expects are already wired together. **ERPNext** runs nginx, the gunicorn web workers, two background queue workers and the scheduler; **Websocket** runs the realtime server that pushes live document updates into the browser; **MariaDB** stores every transaction; and **Redis-Cache** and **Redis-Queue** hold the cache and the job queue. Deploy ERPNext on Railway and the site is created, the admin account set, the scheduler enabled and public sign-up closed before the first request arrives.

![ERPNext Railway architecture](placeholder-architecture.png)

ERPNext replaces the patchwork most growing companies accumulate — accounting software, a spreadsheet for stock, a separate CRM — with one database where a sales order, the stock it reserves and the invoice it produces are the same transaction. Teams self-host it when they want financial data on infrastructure they control, or when per-user SaaS pricing stops making sense.

Key capabilities:

- Double-entry accounting, multi-currency, multi-company, multi-fiscal-year
- Stock control with batches, serial numbers, multiple warehouses, perpetual inventory
- Order-to-cash and procure-to-pay: quotations, orders, invoices
- Manufacturing: bills of materials, work orders, job cards, capacity planning
- CRM, projects with timesheets, HR with payroll, asset depreciation
- A REST API over every document type, plus server scripts and custom fields

Architecture in plain language: nginx serves static assets and hands application requests to gunicorn. Anything slow — reports, PDF rendering, email, scheduled jobs — goes onto a Redis queue and is run by the background workers alongside it, so the web tier stays responsive. The realtime service subscribes to the same Redis instance and streams document updates over WebSockets. MariaDB holds business data; the volume holds attachments and backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ERPNext | [gridalpha/erpnext-railway](https://github.com/gridalpha/erpnext-railway) | Web service |
| Redis-Cache | `redis:8.2` | Database |
| Websocket | [gridalpha/erpnext-railway](https://github.com/gridalpha/erpnext-railway) | Worker |
| MariaDB | `mariadb:11.8` | Database |
| Redis-Queue | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ERPNext | 8080 | nginx listening port |
| `ROLE` | ERPNext | app | Runs web, workers and scheduler |
| `DB_HOST` | ERPNext | - | MariaDB private hostname |
| `DB_PORT` | ERPNext | 3306 | MariaDB port |
| `SITE_NAME` | ERPNext | erpnext.local | Internal site identity |
| `DB_ROOT_USER` | ERPNext | (secret) | MariaDB superuser name |
| `SITE_DB_NAME` | ERPNext | erpnext | Site database name |
| `FRAPPE_SECRET` | ERPNext | (secret) | Seed for derived site credentials |
| `SOCKETIO_HOST` | ERPNext | - | Realtime service hostname |
| `SOCKETIO_PORT` | ERPNext | 9000 | Realtime service port |
| `ADMIN_PASSWORD` | ERPNext | (secret) | Administrator password, set at site creation |
| `DISABLE_SIGNUP` | ERPNext | 1 | Close public sign-up on first boot |
| `REDIS_CACHE_URL` | ERPNext | - | Frappe cache endpoint |
| `REDIS_QUEUE_URL` | ERPNext | - | Job queue and pub/sub endpoint |
| `DB_ROOT_PASSWORD` | ERPNext | (secret) | Used to create the site |
| `GUNICORN_THREADS` | ERPNext | 4 | Threads per web worker |
| `GUNICORN_TIMEOUT` | ERPNext | 120 | Web request timeout seconds |
| `GUNICORN_WORKERS` | ERPNext | 2 | Web worker processes |
| `PROXY_READ_TIMEOUT` | ERPNext | 120 | nginx upstream read timeout |
| `CLIENT_MAX_BODY_SIZE` | ERPNext | 50m | Maximum upload size |
| `REDISHOST` | Redis-Cache | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis-Cache | 6379 | Standard Redis port |
| `REDISUSER` | Redis-Cache | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis-Cache | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis-Cache | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis-Cache | (secret) | Generated password for the default user |
| `ROLE` | Websocket | websocket | Runs the Frappe realtime server |
| `SOCKETIO_PORT` | Websocket | 9000 | Realtime listening port |
| `REDIS_CACHE_URL` | Websocket | - | Frappe cache endpoint |
| `REDIS_QUEUE_URL` | Websocket | - | Job queue and pub/sub endpoint |
| `TZ` | MariaDB | UTC | Server timezone |
| `MARIADB_AUTO_UPGRADE` | MariaDB | 1 | Upgrade data dir after image bumps |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | MariaDB superuser password |
| `REDISHOST` | Redis-Queue | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis-Queue | 6379 | Standard Redis port |
| `REDISUSER` | Redis-Queue | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis-Queue | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis-Queue | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis-Queue | (secret) | Generated password for the default user |

## Configuration

- **Healthcheck:** `/railway/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/frappe/frappe-bench/sites`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'MEM=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$MEM" in ""|max|*[!0-9]*) MEM=2147483648;; esac; BP=$((MEM/2/1048576)); [ "$BP" -lt 128 ] && BP=128; echo "railway: container memory $((MEM/1048576))M, innodb_buffer_pool_size=${BP}M"; exec docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake --innodb-buffer-pool-size=${BP}M --max-allowed-packet=256M'`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/erp-next)
