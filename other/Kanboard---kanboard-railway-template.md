# Deploy Kanboard on Railway

A lightweight self-hosted Kanban project management platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kanboard-railway-template)

## About

Kanboard is a lightweight, self-hosted Kanban project management platform designed for teams that want a simple and focused way to manage tasks, projects, workflows, and work-in-progress limits.

This Railway template deploys Kanboard using the official Docker image and connects it to Railway PostgreSQL over the private network.

This template runs Kanboard as a public web application on Railway.

Kanboard serves its web interface through port `80`, while Railway handles the public HTTPS endpoint and TLS termination.

Application data is stored in PostgreSQL, while uploaded files and persistent application data are stored on a Railway volume mounted at:

```text
/var/www/app/data
```

The PostgreSQL service remains private and communicates with Kanboard through Railway's internal network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kanboard | `kanboard/kanboard:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | kanboard | 80 | Port |
| `DEBUG` | kanboard | false | Disable debug mode in production |
| `LOG_DRIVER` | kanboard | stdout | Send Kanboard logs to Railway logs |
| `DATABASE_URL` | kanboard | - | PostgreSQL connection through Railway private network |
| `KANBOARD_URL` | kanboard | - | Public Kanboard application URL |
| `PLUGIN_INSTALLER` | kanboard | false | Disable web plugin installer |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `sh -c 'mkdir -p /etc/nginx/ssl && openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout /etc/nginx/ssl/kanboard.key -out /etc/nginx/ssl/kanboard.crt -subj "/CN=localhost" && exec /usr/local/bin/entrypoint.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kanboard-railway-template)
