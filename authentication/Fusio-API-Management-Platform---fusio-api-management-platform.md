# Deploy Fusio – API Management Platform on Railway

Fusio 6.2 Self-hosted API management with OAuth2, OpenAPI and admin UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fusio-api-management-platform)

## About

Fusio is an open-source API management platform for building, securing, and operating REST APIs. It provides an admin UI to design endpoints, apply OAuth2 authentication, manage consumers/apps, and automatically generate an OpenAPI specification. Fusio is ideal for self-hosted API gateways, developer portals, and scalable backend integrations.

This Railway template deploys Fusio with a MySQL database in a production-ready setup. Railway manages the infrastructure and networking, while Fusio runs as a containerized service connected to MySQL using internal service variables. The template initializes an admin account from environment variables, sets a secure project key, and configures the public base URLs used by OAuth2, redirects, and web apps. After deployment, you can access the Fusio backend UI, create Operations (routes), attach Actions (logic), secure endpoints with scopes, and export your API definition via OpenAPI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Fusio | [XavTo/Fusio](https://github.com/XavTo/Fusio) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Fusio | 80 | Internal port used by Fusio (handled automatically by Railway) |
| `FUSIO_URL` | Fusio | - | Public base URL of your Fusio instance |
| `FUSIO_APPS_URL` | Fusio | - | Public URL for Fusio web apps (admin & developer portals) |
| `FUSIO_BACKEND_PW` | Fusio | - | Password for the initial Fusio admin user (auto-generated) |
| `FUSIO_CONNECTION` | Fusio | - | MySQL connection string (automatically linked) |
| `FUSIO_PROJECT_KEY` | Fusio | - | Unique secret key used internally by Fusio |
| `FUSIO_BACKEND_USER` | Fusio | (secret) | Initial admin username for the Fusio backend |
| `FUSIO_BACKEND_EMAIL` | Fusio | admin@example.com | Email address for the initial Fusio admin user |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | railway | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/fusio-api-management-platform)
