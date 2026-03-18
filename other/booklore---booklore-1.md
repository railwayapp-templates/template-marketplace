# Deploy booklore on Railway

BookLore is a self-hosted, multi-user digital library for books and comics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/booklore-1)

## About

[BookLore](https://github.com/booklore-app/booklore) is an open-source, self-hosted digital library for books and comics. It combines a modern web UI with a Spring Boot backend, supports EPUB/PDF/comic reading, metadata enrichment, OPDS feeds, BookDrop ingestion, and multi-user access.

This Railway template deploys BookLore from the official Docker image and wires it to a dedicated MariaDB sidecar service (`lscr.io/linuxserver/mariadb`). The app runs as one web service on port `6060`, with persistent application data mounted at `/app/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| booklore | `xiaosong233/booklore-archive:latest` | Web service |
| mariadb | `mariadb:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `TZ` | booklore | Etc/UTC |
| `PORT` | booklore | 6060 |
| `USER_ID` | booklore | 1000 |
| `GROUP_ID` | booklore | 1000 |
| `DISK_TYPE` | booklore | LOCAL |
| `BOOKLORE_PORT` | booklore | 6060 |
| `DATABASE_PORT` | booklore | 3306 |
| `SWAGGER_ENABLED` | booklore | false |
| `DATABASE_PASSWORD` | booklore | (secret) |
| `DATABASE_USERNAME` | booklore | (secret) |
| `FORCE_DISABLE_OIDC` | booklore | false |
| `TZ` | mariadb | Etc/UTC |
| `MYSQL_USER` | mariadb | (secret) |
| `MYSQL_DATABASE` | mariadb | booklore |
| `MYSQL_PASSWORD` | mariadb | (secret) |
| `MYSQL_ROOT_PASSWORD` | mariadb | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/template/booklore-1)
