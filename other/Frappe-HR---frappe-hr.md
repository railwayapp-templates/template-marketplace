# Deploy Frappe HR on Railway

Open source HR and payroll software for small and mid-size teams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/frappe-hr)

## About

Frappe HR is an open-source HRIS and payroll system covering the whole employee lifecycle: onboarding, employee records, leave policies and approvals, shifts and attendance, expense claims, appraisals and salary processing. Built by Frappe Technologies on the Frappe framework — the same foundation as ERPNext — it suits teams that want BambooHR-style HR software without per-employee SaaS fees. Deploy Frappe HR on Railway and you get the whole module set, an employee self-service PWA, and a REST API over every record.

This template runs the production shape, not the single-container demo. **Frappe-HR** is the public service: nginx fronts gunicorn, with two queue workers and the scheduler beside it so leave notifications, payroll runs and scheduled reports actually execute. **Websocket** is the Frappe realtime server. **MariaDB** holds every record. **Redis-Cache** and **Redis-Queue** are separate instances, as Frappe's deployment guide specifies. A volume on the app service keeps uploads, payslip PDFs and backups. Self-hosting Frappe HR elsewhere means wiring these five pieces up by hand; here they arrive connected.

![Diagram of the Frappe HR, realtime, MariaDB and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788404935/frappe-hr-architecture.png)

Frappe HR replaces spreadsheet-and-email HR administration with one system of record. It is the `hrms` app on the Frappe framework, and because it declares ERPNext as a required app, the deployment also carries ERPNext's accounting doctypes — which is what lets payroll post real journal entries.

Key features:

- Employee lifecycle: onboarding, promotions, transfers, separation
- Leave: types, policies, allocations, approval workflows, encashment
- Shifts and attendance: shift types, rosters, check-in, attendance requests
- Payroll: salary components and structures, tax slabs, payroll entries, salary slips
- Expense claims, employee advances and travel requests
- Performance: goals, KRAs, appraisal cycles and feedback
- Recruitment: job openings, applicants, interviews and offers
- An employee self-service PWA at `/hrms` and a roster view

The split follows Frappe's own recommendation. The app service holds the web tier and the workers together because they share the uploaded-files directory; the realtime server runs separately because it needs only Redis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Websocket | [gridalpha/frappe-hr-railway](https://github.com/gridalpha/frappe-hr-railway) | Worker |
| Redis-Cache | `redis:8.2` | Database |
| Frappe-HR | [gridalpha/frappe-hr-railway](https://github.com/gridalpha/frappe-hr-railway) | Web service |
| Redis-Queue | `redis:8.2` | Database |
| MariaDB | `mariadb:11.8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ROLE` | Websocket | websocket | Runs the Frappe realtime server only |
| `SOCKETIO_PORT` | Websocket | 9000 | Realtime server port |
| `REDIS_CACHE_URL` | Websocket | - | Frappe cache connection string |
| `REDIS_QUEUE_URL` | Websocket | - | Frappe queue connection string |
| `REDISHOST` | Redis-Cache | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis-Cache | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis-Cache | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis-Cache | - | Private connection string |
| `REDISPASSWORD` | Redis-Cache | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis-Cache | (secret) | Auth password, read by the server |
| `PORT` | Frappe-HR | 8080 | nginx listening port |
| `ROLE` | Frappe-HR | app | Runs nginx, gunicorn, workers, scheduler |
| `DB_HOST` | Frappe-HR | - | Private MariaDB hostname |
| `DB_PORT` | Frappe-HR | 3306 | MariaDB port |
| `SITE_NAME` | Frappe-HR | hr.local | Internal Frappe site name |
| `DB_ROOT_USER` | Frappe-HR | (secret) | MariaDB superuser |
| `SITE_DB_NAME` | Frappe-HR | frappe_hr | Database created for the site |
| `FRAPPE_SECRET` | Frappe-HR | (secret) | Root secret the site keys derive from |
| `SOCKETIO_HOST` | Frappe-HR | - | Private realtime server hostname |
| `SOCKETIO_PORT` | Frappe-HR | 9000 | Realtime server port |
| `ADMIN_PASSWORD` | Frappe-HR | (secret) | First Administrator password |
| `DISABLE_SIGNUP` | Frappe-HR | 1 | Closes public sign-up on first boot |
| `REDIS_CACHE_URL` | Frappe-HR | - | Frappe cache connection string |
| `REDIS_QUEUE_URL` | Frappe-HR | - | Frappe queue connection string |
| `DB_ROOT_PASSWORD` | Frappe-HR | (secret) | MariaDB superuser password |
| `GUNICORN_THREADS` | Frappe-HR | 4 | Threads per web worker |
| `GUNICORN_TIMEOUT` | Frappe-HR | 120 | Web request timeout in seconds |
| `GUNICORN_WORKERS` | Frappe-HR | 2 | Web worker processes |
| `PROXY_READ_TIMEOUT` | Frappe-HR | 120 | nginx upstream read timeout |
| `CLIENT_MAX_BODY_SIZE` | Frappe-HR | 50m | Maximum upload size |
| `REDISHOST` | Redis-Queue | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis-Queue | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis-Queue | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis-Queue | - | Private connection string |
| `REDISPASSWORD` | Redis-Queue | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis-Queue | (secret) | Auth password, read by the server |
| `TZ` | MariaDB | UTC | Server time zone |
| `MARIADB_AUTO_UPGRADE` | MariaDB | 1 | Runs mariadb-upgrade after a version bump |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Superuser password, read by the entrypoint |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/railway/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/frappe/frappe-bench/sites`
- **Start command:** `/bin/sh -c 'M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$M" in ""|max|*[!0-9]*) P=1024;; *) P=$((M/1048576/2));; esac; if [ "$P" -lt 256 ]; then P=256; fi; echo "mariadb: cgroup_mem=${M} innodb_buffer_pool_size=${P}M"; exec docker-entrypoint.sh mariadbd --datadir=/var/lib/mysql/data --bind-address=:: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake --innodb-buffer-pool-size=${P}M --max-connections=300'`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/frappe-hr)
