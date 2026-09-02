# Deploy Bytebase on Railway

Database DevOps: schema change review, versioning and access governance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bytebase)

## About

Bytebase is an open-source database governance platform that sits between your team and your databases. Instead of engineers running ad-hoc SQL against production, every schema migration and data fix goes through a recorded workflow: written, checked against 200+ SQL review rules, signed off by a reviewer, then rolled out environment by environment with a full changelog. It also ships a web SQL Editor with per-column access rules, so read access stops meaning a shared superuser password. Platform teams, DBAs and security engineers self-host Bytebase across PostgreSQL, MySQL, SQL Server, Oracle, MongoDB, ClickHouse and around twenty more engines.

This template runs Bytebase as one web service backed by a Railway PostgreSQL database holding its metadata — workspaces, projects, users, change history and audit records. The service is built from [gridalpha/bytebase-railway](https://github.com/gridalpha/bytebase-railway), a thin layer on the official `bytebase/bytebase` image that wires the container to Railway's injected port and public domain, creates the first workspace administrator at boot so the account is never up for grabs, and closes the self-service sign-up endpoint the Community edition cannot switch off in the app. A volume holds the data directory; the databases you govern stay where they are.

![Diagram of the Bytebase and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788204727/bytebase-architecture.png)

Bytebase is a single Go binary serving its API and bundled web UI on one port, with all state in an external PostgreSQL database — which is what makes it comfortable on a platform that recreates containers every deploy. Self-host it when database credentials, query results and audit records must not leave your infrastructure.

- **Change management** — versioned migrations, declarative schema, batch changes, progressive rollout by environment, one-click rollback.
- **SQL review** — 200+ lint rules enforced before a change may run, catching naming, index and unsafe-statement problems by policy.
- **Access control** — workspace and project roles, time-boxed just-in-time grants, column-level masking at query time.
- **Compliance** — audit trail, data classification, and policy as code via the Terraform provider and API.
- **AI** — an MCP server so coding assistants change databases through the same governed path a human uses.

The Railway architecture is two services. **bytebase** is the web application and the only one with a public domain; it is the sole writer of the metadata database and runs one replica. **Postgres** is Railway's managed PostgreSQL, private-network only.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bytebase | [gridalpha/bytebase-railway](https://github.com/gridalpha/bytebase-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | bytebase | 8080 | Public HTTP port for the container |
| `PG_URL` | bytebase | - | External metadata database |
| `ALLOW_SIGNUP` | bytebase | false | Set true to reopen public self-service sign-up |
| `EXTERNAL_URL` | bytebase | - | Public URL used in generated links |
| `BYTEBASE_DATA_DIR` | bytebase | /var/opt/bytebase | Data directory and volume mount path |
| `BYTEBASE_ADMIN_NAME` | bytebase | Workspace Admin | Display name for that account |
| `BYTEBASE_ADMIN_EMAIL` | bytebase | admin@example.com | First workspace administrator |
| `BYTEBASE_INTERNAL_PORT` | bytebase | 8090 | Loopback port the server binds |
| `BYTEBASE_ADMIN_PASSWORD` | bytebase | (secret) | Password for that account, generated once |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/bytebase`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bytebase)
