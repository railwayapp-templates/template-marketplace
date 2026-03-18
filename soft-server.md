# Deploy soft-server on Railway

A tasty, self-hostable Git server for the command line.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/soft-server)

## About

Hosting Soft Serve involves running a single Go binary that acts as a custom SSH server. It is lightweight but requires persistent storage to retain your repositories and database. Unlike traditional web-based Git servers, Soft Serve is configured via "GitOps": you clone a special administrative repository, edit the config or access lists, and push changes back to apply them. On Railway, the service requires a TCP Proxy to expose the SSH interface, allowing users to connect, push code, and access the TUI securely using their existing SSH keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| source-database | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| soft-serve | `charmcli/soft-serve:latest` | TCP service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | source-database | source_database |
| `POSTGRES_USER` | source-database | (secret) |
| `POSTGRES_PASSWORD` | source-database | (secret) |
| `SOFT_SERVE_DB_DRIVER` | soft-serve | postgres |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 23231
- **Volume:** `/soft-serve`

**Category:** Other

[View on Railway →](https://railway.com/template/soft-server)
