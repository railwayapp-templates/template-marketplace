# Deploy SysReptor on Railway

Customizable and powerful penetration testing reporting platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sysreptor)

## About

SysReptor is a fully customizable, open-source reporting tool designed specifically for penetration testers and security auditors. It streamlines the documentation process, allowing teams to collaborate on findings, manage vulnerability libraries, and generate professional, design-ready PDF and HTML reports using simple Markdown syntax.

Hosting SysReptor involves orchestrating a standard Python/Django application stack. The core application runs as a Docker container that interfaces with a **PostgreSQL** database for persistent storage of your reports, designs, and user data. Additionally, SysReptor requires **Redis** to handle asynchronous task queuing (such as rendering heavy PDF reports) and caching.

This Railway template automatically provisions the application container alongside the necessary PostgreSQL and Redis services. It connects them via private networking variables, ensuring your data remains secure while eliminating manual network configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sysreptor-app | `syslifters/sysreptor` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SECRET_KEY` | sysreptor-app | (secret) | - |
| `DATABASE_USER` | sysreptor-app | (secret) | - |
| `DATABASE_PASSWORD` | sysreptor-app | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/sysreptor)
