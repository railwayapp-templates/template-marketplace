# Deploy Frappe Framework on Railway

A template to deploy Frappe Framework on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/frappe-framework)

## About

Frappe Framework is an open-source web framework for building business applications. It comes with useful features like authentication, permissions, APIs, background jobs, forms, and reports out of the box. It also powers ERPNext.

Running Frappe involves more than just hosting a web server. You also need a database, Redis for caching and background jobs, workers, and persistent storage for your site files.

On Railway, these can run as separate services inside the same project and communicate over a private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frappe_railway | [harshtandiya/frappe_railway](https://github.com/harshtandiya/frappe_railway) (root: /frappe) | Web service |
| mariadb | [harshtandiya/frappe_railway](https://github.com/harshtandiya/frappe_railway) (root: /mariadb) | Database |
| redis | [harshtandiya/frappe_railway](https://github.com/harshtandiya/frappe_railway) (root: /redis) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_HOST` | frappe_railway | - | Private hostname of the MariaDB service. Keep the reference to MariaDB. |
| `DB_PORT` | frappe_railway | 3306 | Port MariaDB listens on. |
| `REDIS_URL` | frappe_railway | - | Authenticated Redis URL used for cache, queue and Socket.IO. Keep the reference to Redis. |
| `SITE_NAME` | frappe_railway | frontend | Name of the Frappe site created on first boot. Changing it after the first deploy won't migrate an existing site. |
| `ADMIN_PASSWORD` | frappe_railway | (secret) | Password for the Frappe Administrator account. Generated on deploy — read it from this variable to sign in. |
| `DB_ROOT_PASSWORD` | frappe_railway | (secret) | Root password used once to provision the site's database. Keep the reference to MariaDB. |
| `FRAPPE_SITE_NAME_HEADER` | frappe_railway | - | Forces Railway's domain to serve this Frappe site. Keep it referencing SITE_NAME. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Root password for the MariaDB service. Generated on deploy; referenced by the Frappe service. |

## Configuration

- **Healthcheck:** `/api/method/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/frappe/frappe-bench/sites`
- **Volume:** `/var/lib/mysql`
- **Volume:** `/var/lib/redis`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/frappe-framework)
