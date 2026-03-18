# Deploy Soft Serve / Soft-Serve on Railway

A tasty, self-hostable Git server for the command line

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/soft-serve-soft-serve)

## About

**Soft Serve** is a self-hosted Git server with a terminal-based user interface (TUI) accessed over SSH. It provides repository browsing, management, and collaboration features without requiring a web UI, making it ideal for lightweight, private Git hosting.

Hosting Soft Serve on Railway involves running the official Soft Serve container, attaching a single persistent volume for repository data, and configuring SSH access as the primary interface. PostgreSQL is used as the backing datastore for metadata and application state instead of the default embedded storage. Railway manages networking, scaling, and uptime, while you control access via SSH keys and environment variables. This setup is well-suited for teams that want a low-maintenance Git server without managing virtual machines or complex orchestration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Soft Serve | `charmcli/soft-serve:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `SOFT_SERVE_NAME` | Soft Serve | SOFET_SERVE |
| `SOFT_SERVE_DB_DRIVER` | Soft Serve | postgres |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/soft-serve`

**Category:** Other

[View on Railway →](https://railway.com/deploy/soft-serve-soft-serve)
