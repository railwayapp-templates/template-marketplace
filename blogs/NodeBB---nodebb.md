# Deploy NodeBB on Railway

Node.js based forum software built for the modern web

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nodebb)

## About

NodeBB is a modern forum software built on Node.js, designed for real-time discussions and notifications. It supports various database backends and offers a rich API for integrations.

Hosting NodeBB involves deploying the application on a server, configuring the database, and setting up the necessary environment for optimal performance. Railway simplifies this process by providing a seamless deployment experience, allowing you to focus on customizing your forum without worrying about infrastructure management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| NodeBB | `ghcr.io/nodebb/nodebb:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | NodeBB | 4567 | - |
| `NODEBB_DB` | NodeBB | postgres | - |
| `CONFIG_JSON` | NodeBB | - | Template configuration file (this should not be modified). |
| `NODEBB_SECRET` | NodeBB | (secret) | - |
| `NODEBB_DB_USER` | NodeBB | (secret) | - |
| `NODEBB_DB_PASSWORD` | NodeBB | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `tini -- sh -c "mkdir -p /mnt/volume/build /mnt/volume/uploads /mnt/volume/config && ln -sfn /mnt/volume/build /usr/src/app/build && ln -sfn /mnt/volume/uploads /usr/src/app/public/uploads && ln -sfn /mnt/volume/config /opt/config && echo $CONFIG_JSON > /usr/src/app/setup.json && /usr/local/bin/entrypoint.sh"`
- **Healthcheck:** `/sping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/volume`

**Category:** Blogs

[View on Railway →](https://railway.com/template/nodebb)
