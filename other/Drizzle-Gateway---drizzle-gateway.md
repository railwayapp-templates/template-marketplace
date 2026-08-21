# Deploy Drizzle Gateway on Railway

Browser database client for viewing and editing your tables

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/drizzle-gateway)

## About

Drizzle Gateway is the self-hosted edition of Drizzle Studio, the browser-based database client from the team behind Drizzle ORM. It gives you a spreadsheet-style data grid, a SQL console with syntax highlighting and query timings, and a visual schema editor covering columns, constraints, indexes and row-level security — in one container, reachable from any browser rather than a laptop-bound desktop app. It speaks PostgreSQL, MySQL, MariaDB, SQLite, Cloudflare D1 and Turso, and one instance can hold as many connections as you like.

Deploy Drizzle Gateway on Railway and you get the studio container plus a PostgreSQL database, already wired together. The gateway keeps its connection list, saved SQL scratches and preferences on a persistent volume at `/app`, so nothing is lost when the container restarts. The included database is registered as a connection on first boot over Railway's private network, so it never needs a public address. Self-host Drizzle Studio this way and the only thing facing the internet is the gateway's own password-protected UI.

![Diagram of the Drizzle Gateway and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787212353/drizzle-gateway-architecture.png)

Drizzle Studio began as `npx drizzle-kit studio`, a local command serving a database UI for the length of a terminal session. That suits a laptop, not a database in the cloud, where the usual answers are exposing the port, running an SSH tunnel, or paying for a hosted console. Drizzle Gateway is the long-running server version, sitting in your own infrastructure and serving the same UI behind a password. Because it runs next to your data, the link between studio and database stays on the private network — a managed database with no public endpoint is still fully browsable, and no credentials cross the internet.

Key features:

- Editable data grid with filtering, multi-column sorting, column reordering and CSV export
- SQL console with syntax highlighting, `EXPLAIN`/`ANALYZE`, query telemetry and saved scratches
- Visual schema editor for columns, constraints, foreign keys, indexes and row-level security
- CSV and SQL import, plus copy-as-`INSERT` for moving rows between environments
- Multiple connections and multiple engines in one instance

The template runs two services. **drizzle-gateway** is the studio, the only one with a public domain, on port 4983 with a volume at `/app` for its connection list. **Postgres** is Railway managed PostgreSQL with its own volume, no public domain, reached only at `postgres.railway.internal`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| drizzle-gateway | `ghcr.io/drizzle-team/gateway:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by entrypoint |
| `PORT` | drizzle-gateway | 4983 | HTTP listening port |
| `MASTERPASS` | drizzle-gateway | - | Admin password, required for auth |
| `STORE_PATH` | drizzle-gateway | /app | Connection store path, matches volume |
| `DATABASE_URL_Postgres` | drizzle-gateway | - | Seeds Postgres connection on first boot |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Other

[View on Railway →](https://railway.com/deploy/drizzle-gateway)
