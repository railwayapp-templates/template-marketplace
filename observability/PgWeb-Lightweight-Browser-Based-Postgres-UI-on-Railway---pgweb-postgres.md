# Deploy PgWeb | Lightweight Browser-Based Postgres UI on Railway on Railway

Self-host PgWeb. Cross-platform client for PostgreSQL databases.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgweb-postgres)

## About

Self-host pgweb on Railway to get an instant, browser-based PostgreSQL client with zero dependencies. Deploy pgweb — a lightweight Go binary distributed as a single Docker image (`sosedoff/pgweb`) — alongside a Railway-managed Postgres instance and access your database from any browser in seconds.

This Railway template provisions the pgweb web UI and a PostgreSQL 18 database, wires the connection automatically via a cross-service reference, and exposes a public HTTPS URL with no manual configuration required.

pgweb is an open-source, cross-platform web client for PostgreSQL databases, written in Go by Dan Sosedoff. It solves the problem of needing a heavy desktop app or complex setup just to inspect a Postgres database — the entire tool ships as a single statically-linked binary with zero runtime dependencies.

**Key features:**
- Works with PostgreSQL 9.1 and above
- Zero dependencies — single binary, single Docker image
- Multiple concurrent database sessions (`PGWEB_SESSIONS=1`)
- Native SSH tunnel support for remote databases
- Custom SQL query execution with query history
- Table and query export to CSV, JSON, and XML
- Server bookmarks for quickly switching databases
- Cross-platform: Mac, Linux, Windows (64-bit)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgweb | `sosedoff/pgweb` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | pgweb | 8080 | HTTP server listening port |
| `PGWEB_AUTH_PASS` | pgweb | - | Create auth password credential |
| `PGWEB_AUTH_USER` | pgweb | (secret) | Create auth username credential |
| `PGWEB_DATABASE_URL` | pgweb | - | Postgres connection string |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c 'pgweb --listen $PORT --bind 0.0.0.0 --auth-user $PGWEB_AUTH_USER --auth-pass $PGWEB_AUTH_PASS'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/pgweb-postgres)
