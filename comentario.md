# Deploy Comentario on Railway

Fast, flexible, and powerful free comment server for web pages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/comentario)

## About

Comentario is a lightweight, privacy-focused commenting engine that can be self-hosted on your own infrastructure. It provides an alternative to third-party commenting services like Disqus, giving you full control over your users' data and commenting experience.

Hosting Comentario on Railway involves containerizing the application using Docker and configuring it to connect to a PostgreSQL database. Railway handles the infrastructure management, automatically deploying your containerized application and providing a managed PostgreSQL database. The deployment process includes setting up environment variables for database connection, which are then substituted into the configuration file during the build process.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Comentario | [ThallesP/comentario-on-railway](https://github.com/ThallesP/comentario-on-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Comentario | 80 | Port to listen on, Comentarios uses 80 by default |
| `BASE_URL` | Comentario | - | The host URL where Comentario will use |
| `POSTGRES_HOST` | Comentario | - | Host to connect to Comentario's Postgres. |
| `POSTGRES_PORT` | Comentario | - | Port to connect to Comentario's Postgres. |
| `POSTGRES_DATABASE` | Comentario | - | Database name to connect to Comentario's Postgres. |
| `POSTGRES_PASSWORD` | Comentario | (secret) | Password to connect to Comentario's Postgres. |
| `POSTGRES_USERNAME` | Comentario | (secret) | Username to connect to Comentario's Postgres. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/en/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/comentario)
