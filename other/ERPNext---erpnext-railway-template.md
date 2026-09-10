# Deploy ERPNext on Railway

A complete open-source ERP platform for managing modern businesses.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/erpnext-railway-template)

## About

ERPNext is a comprehensive open-source ERP platform built on the Frappe Framework. It provides integrated modules for accounting, CRM, sales, purchasing, inventory, manufacturing, HR, payroll, projects, assets, support, and other core business operations from a single self-hosted application.

Hosting ERPNext requires more than running a single web application because the platform depends on several supporting services for database storage, caching, background jobs, realtime communication, and scheduled tasks.

This Railway template runs ERPNext using the official `frappe/erpnext` image and consolidates its main application processes into a single ERPNext service. MariaDB stores the primary application data, Redis Cache handles transient cache data, and Redis Queue supports background jobs and realtime operations. Persistent Railway storage is mounted to the ERPNext sites directory so site configuration and uploaded files survive redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb` | Database |
| Redis Queue | `redis:8.2` | Database |
| Redis Cache | `redis:8.2` | Database |
| ERPNext | `frappe/erpnext` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | MariaDB | 3306 | Port |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) | Compatibility variable used by MariaDB tooling |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Root password for ERPNext site provisioning |
| `REDISHOST` | Redis Queue | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis Queue | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis Queue | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis Queue | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis Queue | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis Queue | (secret) | Randomly generated password for authenticating with Redis |
| `REDISHOST` | Redis Cache | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis Cache | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis Cache | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis Cache | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis Cache | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis Cache | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | ERPNext | 8080 | Port ERPNext UI |
| `BACKEND` | ERPNext | 127.0.0.1:8000 | Internal Gunicorn backend |
| `DB_HOST` | ERPNext | - | MariaDB hostname through Railway private network |
| `DB_PORT` | ERPNext | 3306 | MariaDB port |
| `SOCKETIO` | ERPNext | 127.0.0.1:9000 | Internal Socket.IO endpoint |
| `SITE_NAME` | ERPNext | erpnext | Stable internal Frappe site name |
| `REDIS_CACHE` | ERPNext | - | Redis cache endpoint |
| `REDIS_QUEUE` | ERPNext | - | Redis queue and realtime endpoint |
| `DB_ROOT_USER` | ERPNext | (secret) | Root user used only for initial site creation |
| `SOCKETIO_PORT` | ERPNext | 9000 | Internal Socket.IO port |
| `ADMIN_PASSWORD` | ERPNext | (secret) | Initial ERPNext Administrator password |
| `DB_ROOT_PASSWORD` | ERPNext | (secret) | MariaDB root password |
| `GUNICORN_THREADS` | ERPNext | 4 | Threads per Gunicorn worker |
| `GUNICORN_TIMEOUT` | ERPNext | 120 | Gunicorn request timeout |
| `GUNICORN_WORKERS` | ERPNext | 2 | Gunicorn worker count |
| `PROXY_READ_TIMEOUT` | ERPNext | 120 | Nginx upstream timeout |
| `CLIENT_MAX_BODY_SIZE` | ERPNext | 50m | Maximum upload size |
| `FRAPPE_SITE_NAME_HEADER` | ERPNext | erpnext | Force Railway hostname to serve the ERPNext site |

## Configuration

- **Start command:** `docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `bash -lc 'set -e; cd /home/frappe/frappe-bench; echo "[1/7] Waiting MariaDB"; wait-for-it -t 120 "$DB_HOST:$DB_PORT"; echo "[2/7] Waiting Redis Cache"; wait-for-it -t 120 "$REDIS_CACHE"; echo "[3/7] Waiting Redis Queue"; wait-for-it -t 120 "$REDIS_QUEUE"; echo "[4/7] Configuring Frappe"; ls -1 apps > sites/apps.txt; bench set-config -g db_host "$DB_HOST"; bench set-config -gp db_port "$DB_PORT"; bench set-config -g redis_cache "redis://$REDIS_CACHE"; bench set-config -g redis_queue "redis://$REDIS_QUEUE"; bench set-config -g redis_socketio "redis://$REDIS_QUEUE"; bench set-config -gp socketio_port "$SOCKETIO_PORT"; bench set-config -g chromium_path /usr/bin/chromium-headless-shell; echo "[5/7] Checking site"; if [ ! -f "sites/$SITE_NAME/site_config.json" ]; then bench new-site "$SITE_NAME" --mariadb-user-host-login-scope="%" --db-root-username="$DB_ROOT_USER" --db-root-password="$DB_ROOT_PASSWORD" --admin-password="$ADMIN_PASSWORD" --install-app erpnext --set-default; else bench --site "$SITE_NAME" migrate; fi; echo "[6/7] Starting processes"; start.sh & PID_BACKEND=$!; node /home/frappe/frappe-bench/apps/frappe/socketio.js & PID_SOCKETIO=$!; bench worker --queue short,default & PID_SHORT=$!; bench worker --queue long,default,short & PID_LONG=$!; bench schedule & PID_SCHEDULER=$!; echo "[7/7] Starting nginx"; nginx-entrypoint.sh & PID_NGINX=$!; trap "kill $PID_BACKEND $PID_SOCKETIO $PID_SHORT $PID_LONG $PID_SCHEDULER $PID_NGINX 2>/dev/null || true" TERM INT EXIT; wait -n $PID_BACKEND $PID_SOCKETIO $PID_SHORT $PID_LONG $PID_SCHEDULER $PID_NGINX; echo "One ERPNext process exited unexpectedly"; exit 1'`
- **Volume:** `/home/frappe/frappe-bench/sites`

**Category:** Other

[View on Railway →](https://railway.com/deploy/erpnext-railway-template)
