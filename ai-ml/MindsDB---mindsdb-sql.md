# Deploy MindsDB on Railway

Query engine that runs SQL and AI across all your data sources

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mindsdb-sql)

## About

MindsDB is an open-source AI query engine that puts one SQL interface in front of every database, warehouse, SaaS application and file your team already uses. Rather than copying Postgres tables, Salesforce objects and S3 files into a warehouse, you connect each source once and query across all of them in one statement. It also turns those connections into something an LLM can use: knowledge bases give semantic search over text, agents answer questions in plain English, and a built-in MCP server exposes the whole thing to Claude, Cursor and other Model Context Protocol clients — which is how teams keep AI answers grounded in live data.

This template lets you deploy MindsDB on Railway with the storage it needs for real work. The **mindsdb** service runs the official `mindsdb/mindsdb` image and serves the Studio editor, the REST API and the MCP and A2A endpoints on one public domain. A **Postgres** service holds the catalogue — projects, datasources, jobs, agents and query history — and doubles as the pgvector store behind knowledge bases, so nothing important lives in a replaceable container. A volume keeps uploaded files and model artifacts, and a TCP proxy publishes the MySQL wire protocol so Tableau, Metabase or DBeaver can connect to it as a database.

![Diagram of the MindsDB and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788742885/mindsdb-architecture.png)

MindsDB solves the problem of answers that are stale the moment they are computed: a federated engine reads from the source at query time, so a dashboard or an agent sees the row as it is now. Self-hosting matters more here than for most tools, because the credentials you give MindsDB are the credentials to your production databases.

Key capabilities:

- **200+ integrations** — Postgres, MySQL, MongoDB, Snowflake, BigQuery, Salesforce, HubSpot, Slack, S3, Drive
- **Federated SQL** — join a warehouse table to a SaaS object in one statement, no ETL step
- **Knowledge bases** — chunk, embed and semantically search text, backed by pgvector
- **Agents and jobs** — plain-English questions over your data, plus scheduled queries
- **MCP and A2A servers** — expose data to Claude, Cursor and other agent clients
- **MySQL wire protocol** — existing BI and SQL tooling connects, no adapter

The two services split cleanly. **mindsdb** parses SQL, plans the federation and calls each source. **Postgres** is the durable half, holding the catalogue and the vector tables behind every knowledge base, so redeploying the app never loses your configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mindsdb | `mindsdb/mindsdb:latest` | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mindsdb | 47334 | HTTP API and Studio port |
| `MINDSDB_APIS` | mindsdb | http,mysql | APIs started at boot |
| `MINDSDB_DB_CON` | mindsdb | - | Catalogue database connection string |
| `KB_PGVECTOR_URL` | mindsdb | - | pgvector store for knowledge bases |
| `MINDSDB_PASSWORD` | mindsdb | (secret) | Password for all four surfaces |
| `MINDSDB_USERNAME` | mindsdb | (secret) | Login for Studio, REST, MCP, MySQL |
| `MINDSDB_STORAGE_DIR` | mindsdb | /mindsdb/var | Data directory on the volume |
| `MINDSDB_HTTP_AUTH_TYPE` | mindsdb | session_or_token | Session cookie or bearer token |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/api/util/ping`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 47335
- **Volume:** `/mindsdb`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mindsdb-sql)
