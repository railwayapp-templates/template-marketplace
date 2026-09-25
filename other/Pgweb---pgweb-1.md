# Deploy Pgweb on Railway

pgweb 0.17 web-based PostgreSQL browser with login and a Postgres database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgweb-1)

## About

pgweb is a lightweight, web-based PostgreSQL client written in Go. You browse tables, views and rows, run SQL queries, inspect indexes and constraints, view query history and export results as CSV, JSON or XML, all from the browser. It ships as a single binary with no dependencies, and starts in a second.

This template deploys pgweb v0.17.0 from the official image together with a Railway Postgres database, connected over the private network. The web UI is protected with basic authentication using a generated password. The connection is locked, so visitors cannot switch to other databases, and SSH tunnels are disabled. To browse an existing database instead, point `DATABASE_URL` at it. pgweb keeps no state and uses little memory, so it fits on the Hobby plan. It is useful as a quick admin view next to an application that already uses Railway Postgres.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| pgweb | `sosedoff/pgweb:0.17.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | pgweb | 8081 |
| `PGWEB_AUTH_USER` | pgweb | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'exec /usr/bin/pgweb --bind=0.0.0.0 --listen=8081 --url "$DATABASE_URL" --auth-user "$PGWEB_AUTH_USER" --auth-pass "$PGWEB_AUTH_PASS" --lock-session --no-ssh'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/pgweb-1)
