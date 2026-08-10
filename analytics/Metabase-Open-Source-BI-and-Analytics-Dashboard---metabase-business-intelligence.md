# Deploy Metabase | Open Source BI and Analytics Dashboard on Railway

Business intelligence and dashboards, backed by a persistent Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-business-intelligence)

## About

Metabase is an open-source business intelligence tool: connect a database, and anyone on the team can build dashboards, ask questions in a point-and-click editor or write SQL — without waiting on an analyst.

This template runs the official `metabase/metabase` image on a pinned stable tag, paired with a PostgreSQL 18 instance on a persistent Railway volume. Nothing is rebuilt or forked, so upstream releases and upstream security fixes are what you get.

The Postgres service is the part that matters. Metabase falls back to an embedded H2 file when no application database is configured, and on a platform with an ephemeral container filesystem that file disappears on every redeploy — dashboards, questions, users and permissions with it. Here Metabase is wired to Postgres from the first boot, so a redeploy is a redeploy and not a factory reset. That single detail is the most common defect in other Metabase templates, and it is worth checking for before you trust one.

Credentials for the data sources you connect are encrypted at rest with a key generated once at deploy time. Postgres itself is reachable only over Railway's private network and has no public endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Metabase | `metabase/metabase:v0.63.5.2` | Web service |
| Postgres | `postgres:18.4-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Metabase | 3000 | Where Railway sends traffic and healthchecks. Metabase never reads this variable, so it has to be set to the port Metabase actually listens on — otherwise the platform probes a closed port and the deploy fails while the app is healthy. |
| `JAVA_OPTS` | Metabase | -Xmx1g | JVM options. The heap cap keeps a schema sync over a large warehouse inside a GC pause instead of the container memory limit. Raise it together with the service's memory. |
| `MB_DB_HOST` | Metabase | - | Private hostname of the bundled Postgres. Repoint it to reuse an application database you already run. |
| `MB_DB_PASS` | Metabase | - | Application database password. Resolves to the password generated for the bundled Postgres. |
| `MB_DB_PORT` | Metabase | 5432 | Port of the application database. |
| `MB_DB_TYPE` | Metabase | postgres | Application database engine. Keep it postgres: the h2 fallback writes to the container filesystem and is wiped on every redeploy. |
| `MB_DB_USER` | Metabase | (secret) | Application database user. |
| `MB_DB_DBNAME` | Metabase | metabase | Database that holds Metabase's own state — questions, dashboards, users, permissions. |
| `MB_JETTY_HOST` | Metabase | :: | Bind address. `::` serves IPv6 (Railway's private network) and IPv4 (healthchecks and the edge proxy) at once. |
| `MB_JETTY_PORT` | Metabase | 3000 | Port Metabase listens on. Keep it equal to PORT. |
| `MB_ENCRYPTION_SECRET_KEY` | Metabase | (secret) | Encrypts the credentials of every connected data source at rest. Generated once at deploy — changing it later makes all saved connections undecryptable. |
| `POSTGRES_DB` | Postgres | metabase | Database created on first boot for Metabase's application state. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser owning the application database. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated once at deploy. Postgres is reachable only over the private network — it has no public endpoint. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-business-intelligence)
