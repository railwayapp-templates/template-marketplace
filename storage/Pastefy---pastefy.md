# Deploy Pastefy on Railway

Self-hosted pastebin for sharing code, text, and links.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pastefy)

## About

Pastefy is an open-source pastebin for storing and sharing text, code snippets, and links through a simple web interface. It is suited to teams and individuals that want a focused, self-hosted place for temporary or persistent paste collections.

This template runs the Pastefy application with MariaDB as its persistent data store. Keep database traffic on Railway private networking, expose the application service for browser access, and attach durable storage to MariaDB before using it for important pastes. Database passwords are generated at deployment time or represented through service references, so the template does not copy a source credential. Review the upstream project documentation for application-specific configuration and upgrade guidance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:11.4.5@sha256:5dfb3093333fa0ea53194ddef0a2bfa21d3b1e1353bd228b22610cd6fc0c04da` | Database |
| Pastefy | `interaapps/pastefy:7.1.6@sha256:353ce246ccf24ab1dec42e3c387744b47925065c207699f0bf1ce8e560619ca9` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_USER` | MariaDB | (secret) |
| `MYSQL_DATABASE` | MariaDB | pastefy |
| `MYSQL_PASSWORD` | MariaDB | (secret) |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) |
| `PORT` | Pastefy | 80 |
| `DATABASE_PORT` | Pastefy | 3306 |
| `DATABASE_USER` | Pastefy | (secret) |
| `DATABASE_DRIVER` | Pastefy | mysql |
| `HTTP_SERVER_CORS` | Pastefy | * |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pastefy)
