# Deploy ChartDB on Railway

Database diagram editor that builds an ERD from your schema

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chartdb)

## About

ChartDB is an open-source database diagram editor that turns a live schema into an editable entity-relationship diagram in about a minute. Run one read-only "Smart Query" against PostgreSQL, MySQL, MariaDB, SQL Server, SQLite, CockroachDB or ClickHouse, paste the JSON it returns, and every table, column, key and foreign key is drawn for you — no database password, no driver, nothing installed near production. Engineers use it to document a schema nobody has drawn since the first migration, and data teams to plan a change before writing it.

Self-host ChartDB on Railway and you get one service: nginx serving the compiled application on a Railway domain, behind an HTTP username and password you choose at deploy time. Upstream ships no authentication at all, so this template adds it in front of everything; the only open surface is the health route Railway probes. There is no database or volume to pay for, because ChartDB is client-side — every diagram lives in the browser of the person editing it, which is also why nothing you paste in reaches a server you do not control.

![Diagram of the single ChartDB service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788787038/chartdb-architecture.png)

ChartDB solves a specific problem: schema documentation goes stale the moment someone ships a migration, and general-purpose diagramming tools make redrawing expensive enough that nobody bothers. Because ChartDB reads the schema out of the database itself, regenerating the diagram is a paste rather than an afternoon. Teams self-host it mainly for data handling — a hosted diagram tool puts your table and column names on somebody else's servers, a conversation nobody wants to have about a production schema.

Key capabilities:

- One-query schema import for PostgreSQL, MySQL, MariaDB, SQL Server, SQLite, CockroachDB and ClickHouse, plus Supabase, Timescale and Cloudflare D1
- Import from a `pg_dump` script or DBML instead, for schemas you would rather not query live
- A live DBML editor beside the canvas, keeping diagram and text definition in sync
- DDL export in your engine's dialect, plus deterministic conversion between dialects
- Diagram export as JSON, plus image export for docs and slides
- Custom types, indexes, check constraints and per-table comments

The Railway architecture is deliberately small. The single `chartdb` service runs nginx, serving the compiled bundle, applying the HTTP password to every route, and exposing one unauthenticated health path so Railway can tell a live container from a broken one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chartdb | [gridalpha/chartdb-railway](https://github.com/gridalpha/chartdb-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | nginx listening port |
| `LLM_MODEL_NAME` | gpt-4o-mini-2024-07-18 | Model used for AI dialect conversion |
| `CHARTDB_PASSWORD` | (secret) | HTTP basic-auth password |
| `CHARTDB_USERNAME` | (secret) | HTTP basic-auth username |
| `LLM_API_BASE_URL` | https://api.openai.com/v1 | OpenAI-compatible endpoint for AI export |
| `DISABLE_ANALYTICS` | true | Disable upstream's analytics script |
| `HIDE_CHARTDB_CLOUD` | true | Hide hosted-product prompts in the UI |
| `CHARTDB_AUTH_ENABLED` | true | Set false to publish without a password |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/chartdb)
