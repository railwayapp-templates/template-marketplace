# Deploy PgAdmin 4 | Open Source PostgreSQL GUI on Railway on Railway

Self Host PgAdmin. Web UI,  SQL editor, ERD, Backup, Monitoring

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgadmin4)

## About

pgAdmin 4 is the leading open source administration and development platform for PostgreSQL — a fully web-based GUI that lets you manage databases, run queries, inspect schemas, monitor server activity, and much more, all from a browser. 

Self-hosting pgAdmin gives your team a shared, always-on database management interface without installing anything locally. This Railway template deploys `dpage/pgadmin4:latest` with all required environment variables pre-configured, so you can run pgAdmin on Railway with a single click and connect it to any PostgreSQL instance — including Railway-hosted Postgres services via private networking.

pgAdmin 4 is a complete rewrite of the original pgAdmin desktop client, rebuilt as a Python/Flask web application with a ReactJS frontend. It is the official management tool maintained by the PostgreSQL community and supports PostgreSQL 9.2 and above.

Key features:
- **Query Tool** — full-featured SQL editor with syntax highlighting, auto-complete, query history, and EXPLAIN visualizer
- **Schema Browser** — hierarchical tree view of databases, schemas, tables, views, functions, roles, and extensions
- **ERD Tool** — auto-generates entity-relationship diagrams from existing schemas
- **Backup & Restore** — GUI-driven `pg_dump` / `pg_restore` with format and compression options
- **Server Monitoring** — real-time dashboards for active sessions, locks, and transaction throughput
- **pgAgent** — optional job scheduling engine for automating maintenance tasks
- **Multi-server management** — connect to and manage multiple PostgreSQL servers from a single interface

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PgAdmin | `dpage/pgadmin4:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | PORT TO OPEN |
| `PGADMIN_DEFAULT_EMAIL` | - | Default admin login email |
| `PGADMIN_DEFAULT_PASSWORD` | (secret) | Default admin login password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/pgadmin`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgadmin4)
