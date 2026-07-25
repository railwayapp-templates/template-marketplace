# Deploy Frappe HRMS on Railway

Frappe HRMS v16 with ERPNext, MariaDB, Redis, and workers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/frappe-hrms)

## About

Frappe HRMS is an open-source human resources and payroll platform covering employee lifecycle management, leave, attendance, expenses, recruitment, performance, and payroll.

This template pins Frappe HRMS `v16.14.0` with ERPNext `v16.29.0`. It deploys one HRMS application service plus private MariaDB and Redis services. On first boot it creates the site, installs ERPNext and HRMS, and initializes the Administrator account. Subsequent boots run `bench migrate` before starting application processes.

Frappe's standard production topology shares the `sites` directory across nginx, Gunicorn, Socket.IO, workers, and scheduler. Railway does not share volumes across services, so this template supervises those processes in one application container where they safely share one persistent volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | [monotykamary/railway-template-frappe-hrms](https://github.com/monotykamary/railway-template-frappe-hrms) (root: /mariadb) | Database |
| hrms | [monotykamary/railway-template-frappe-hrms](https://github.com/monotykamary/railway-template-frappe-hrms) (root: /hrms) | Web service |
| redis | [monotykamary/railway-template-frappe-hrms](https://github.com/monotykamary/railway-template-frappe-hrms) (root: /redis) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_ROOT_PASSWORD` | mariadb | (secret) | Compatibility alias for the MariaDB root password. |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Upgrade system tables when the image changes. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated MariaDB root password. |
| `PORT` | hrms | 8080 | Public nginx port. |
| `BACKEND` | hrms | 127.0.0.1:8000 | Local Gunicorn upstream. |
| `DB_HOST` | hrms | - | Private MariaDB host. |
| `DB_PORT` | hrms | 3306 | MariaDB port. |
| `SOCKETIO` | hrms | 127.0.0.1:9000 | Local Socket.IO upstream. |
| `REDIS_URL` | hrms | - | Private Redis queue and cache URL. |
| `SITE_NAME` | hrms | frontend | Internal Frappe site name. |
| `ADMIN_PASSWORD` | hrms | (secret) | Generated password for the Frappe Administrator account. |
| `DB_ROOT_PASSWORD` | hrms | (secret) | MariaDB root password used for site provisioning. |
| `GUNICORN_THREADS` | hrms | 4 | Threads per Gunicorn worker. |
| `GUNICORN_TIMEOUT` | hrms | 120 | Gunicorn request timeout. |
| `GUNICORN_WORKERS` | hrms | 1 | Gunicorn workers; increase with available memory. |
| `PROXY_READ_TIMEOUT` | hrms | 120 | Long request timeout in seconds. |
| `CLIENT_MAX_BODY_SIZE` | hrms | 50m | Maximum request and attachment size. |
| `FRAPPE_SITE_NAME_HEADER` | hrms | frontend | Route every public hostname to the persistent site. |
| `UPSTREAM_REAL_IP_HEADER` | hrms | X-Forwarded-For | Forwarded client IP header. |
| `UPSTREAM_REAL_IP_ADDRESS` | hrms | 127.0.0.1 | Trusted proxy source for nginx. |
| `UPSTREAM_REAL_IP_RECURSIVE` | hrms | off | nginx real-IP recursion. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/api/method/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/frappe/frappe-bench/sites`
- **Volume:** `/var/lib/redis`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/frappe-hrms)
