# Deploy Adminer on Railway

Web interface for browsing, editing and querying your databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adminer-db)

## About

Adminer is a full-featured database management tool that upstream ships as a single PHP file. It gives you a browser UI for MySQL, MariaDB, PostgreSQL, CockroachDB, SQLite, MS SQL and Oracle — browsing and editing rows, altering tables and indexes, running SQL, importing and exporting dumps, following foreign keys as links — and bundled driver plugins extend it to MongoDB, Elasticsearch, ClickHouse, Redis and Firebird. Developers reach for it where phpMyAdmin is overkill: more engines, half a megabyte of interface, no state of its own.

This template lets you self-host Adminer on Railway with a managed PostgreSQL database already wired to it, so there is something to manage the moment the deploy finishes. Two services are created: **adminer**, the public web interface, and **Postgres**, reachable only over Railway's private network. The login form is held to an allow-list of servers — the bundled Postgres out of the box — which keeps a publicly reachable database client from being used to dial anything else in your project.

![Diagram of the Adminer and PostgreSQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789246482/adminer-architecture.webp)

Adminer replaces the loop of opening a terminal and hunting for the right connection string to answer a question someone asked in chat. It suits teams running several engines, or wanting a database UI for people without shell access.

- Full schema editing: tables, columns, indexes, foreign keys, views, routines, triggers and sequences
- Row-level work: search, sort, edit in place, clone, bulk-delete, follow foreign keys as links
- SQL console with syntax highlighting, column autocomplete, query history and `EXPLAIN`
- Import and export as SQL, CSV and TSV; ZIP and gzip output through plugins
- Users and permissions, process list, server variables, a visual schema diagram
- 43 translations, a plugin system and alternative themes

The architecture is deliberately small. **adminer** runs PHP 8.4 with the MySQL, PostgreSQL, SQLite, MS SQL and ODBC drivers compiled in, serving port 8080 behind Railway's TLS edge. **Postgres** is Railway's managed PostgreSQL 18 with its own volume, on the private network only. Adminer stores nothing between requests, so it needs no volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| adminer | [gridalpha/adminer-railway](https://github.com/gridalpha/adminer-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | adminer | 8080 | HTTP port the interface listens on |
| `ADMINER_DESIGN` | adminer | - | Optional bundled theme folder name |
| `ADMINER_PLUGINS` | adminer | - | Optional bundled plugin names, space separated |
| `ADMINER_SERVERS` | adminer | - | Allow-list shown as the Server dropdown |
| `ADMINER_DEFAULT_DB` | adminer | - | Prefills the login database field |
| `PHP_CLI_SERVER_WORKERS` | adminer | 4 | Requests served in parallel |
| `ADMINER_DEFAULT_USERNAME` | adminer | (secret) | Prefills the login username field |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** PHP, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/adminer-db)
