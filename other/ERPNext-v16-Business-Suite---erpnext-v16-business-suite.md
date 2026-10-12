# Deploy ERPNext v16 Business Suite on Railway

Accounting, inventory, sales and CRM in one ERP with workers and scheduler.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/erpnext-v16-business-suite)

## About

ERPNext is an open-source ERP built on the Frappe framework, covering accounting, inventory, selling, buying, manufacturing, projects and CRM. This community template deploys ERPNext v16 from the official Frappe image on Railway with MariaDB, separate cache and queue Redis, background workers and the scheduler, and creates your site automatically.

An ERPNext install consists of a Gunicorn web server, a socket.io realtime server, background workers for short and long jobs, a scheduler, and nginx for static assets, plus MariaDB and two Redis instances. All Frappe processes must share the same `sites` folder, and a Railway volume belongs to a single service, so this template runs those processes together under supervisord in one service that owns the `sites` volume, while MariaDB and Redis run as their own services. On first boot it creates the site, installs ERPNext, enables the scheduler and sets a generated Administrator password. After an image upgrade it runs the database migration once.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-queue | `redis:8.2` | Database |
| redis-cache | `redis:8.2` | Database |
| ERPNext | [baranberkay96/erpnext-railway](https://github.com/baranberkay96/erpnext-railway) (branch: main) (root: /services/erpnext) | Web service |
| MariaDB | `mariadb:11.8.9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | redis-queue | - | Private network hostname of the Redis service, only resolvable from services in the same environment. |
| `REDISPORT` | redis-queue | 6379 | Port that Redis listens on. |
| `REDISUSER` | redis-queue | default | Username for authenticating with Redis. |
| `REDIS_URL` | redis-queue | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | redis-queue | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | redis-queue | (secret) | Randomly generated password for authenticating with Redis. |
| `REDISHOST` | redis-cache | - | Private hostname (cache only: no persistence, LRU eviction at 256 MB). |
| `REDISPORT` | redis-cache | 6379 | Port that Redis listens on. |
| `REDISUSER` | redis-cache | default | Username for authenticating with Redis. |
| `REDIS_URL` | redis-cache | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | redis-cache | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | redis-cache | (secret) | Randomly generated password for authenticating with Redis. |
| `PORT` | ERPNext | 8080 | Port nginx listens on inside the container (public domain target). |
| `DB_HOST` | ERPNext | - | MariaDB host (private network). |
| `DB_PORT` | ERPNext | 3306 | MariaDB port. |
| `SITE_NAME` | ERPNext | erpnext.local | Internal Frappe site name. Fixed on purpose: every domain pointed at this service serves this site. Must not equal an app name; do not change after first boot. |
| `PUBLIC_URL` | ERPNext | - | Public URL written to the site's host_name (links in e-mails, prints, background jobs). Update it with a custom domain. |
| `AUTO_MIGRATE` | ERPNext | true | Run 'bench --site all migrate' automatically once after the image version changes. |
| `ADMIN_PASSWORD` | ERPNext | (secret) | Password of the 'Administrator' user, used once when the site is created. Change it later inside ERPNext. |
| `REDIS_CACHE_URL` | ERPNext | - | Redis for Frappe's cache. |
| `REDIS_QUEUE_URL` | ERPNext | - | Redis for background job queues and socket.io pub/sub. |
| `DB_ROOT_PASSWORD` | ERPNext | (secret) | MariaDB root password, used to create the site database and its user. |
| `GUNICORN_THREADS` | ERPNext | 4 | Threads per Gunicorn worker. |
| `GUNICORN_TIMEOUT` | ERPNext | 120 | Seconds before a web request is killed. |
| `GUNICORN_WORKERS` | ERPNext | 2 | Gunicorn worker processes (web requests). |
| `WORKER_LONG_PROCS` | ERPNext | 1 | Background worker processes for the long queue (imports, reposting, heavy reports). |
| `PROXY_READ_TIMEOUT` | ERPNext | 120 | nginx timeout (s) for slow reports and print formats. |
| `WORKER_SHORT_PROCS` | ERPNext | 1 | Background worker processes for the short/default queues. |
| `CLIENT_MAX_BODY_SIZE` | ERPNext | 50m | Max upload size accepted by nginx. |
| `MARIADBHOST` | MariaDB | - | Private hostname. |
| `MARIADBPORT` | MariaDB | 3306 | Port. |
| `MARIADB_AUTO_UPGRADE` | MariaDB | 1 | Run mariadb-upgrade automatically after an image upgrade. |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Root password (generated). |
| `MARIADB_INNODB_BUFFER_POOL_SIZE` | MariaDB | 512M | InnoDB buffer pool (main memory knob). Raise it as the database grows. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save '' --appendonly no --maxmemory 256mb --maxmemory-policy allkeys-lru"`
- **Healthcheck:** `/api/method/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/frappe/frappe-bench/sites`
- **Start command:** `/bin/sh -c "rm -rf /var/lib/mysql/lost+found && exec docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake '--bind-address=*' --innodb-buffer-pool-size=$MARIADB_INNODB_BUFFER_POOL_SIZE"`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Tags:** erpnext, frappe, erp, accounting, inventory · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/erpnext-v16-business-suite)
