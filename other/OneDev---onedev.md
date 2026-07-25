# Deploy OneDev on Railway

Self-hosted Git platform with PostgreSQL and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onedev)

## About

OneDev is a self-hosted development platform combining Git repositories, pull requests, issue tracking, Kanban boards, package registries, and CI/CD orchestration. This core Railway template deploys the OneDev server with managed PostgreSQL and durable application storage while intentionally leaving job execution to separately attached agents.

Hosting OneDev requires preserving both its relational database and its application-data directory. The database stores platform metadata, while `/opt/onedev` contains repositories, attachments, artifacts, and server state. This template connects OneDev to a private Railway PostgreSQL service, mounts persistent storage at the official data path, initializes the administrator account, and exposes the web interface over Railway HTTPS.

The template does not configure a local CI executor. Railway does not provide the Docker socket or privileged nested-container support required by OneDev's Docker executors. Builds remain unassigned until a compatible external agent or shell executor is configured.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| OneDev | [monotykamary/railway-template-onedev](https://github.com/monotykamary/railway-template-onedev) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created at initialization. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL connection URL. |
| `PORT` | OneDev | 6610 | Railway routing and health-check target for OneDev HTTP. |
| `initial_user` | OneDev | (secret) | Initial OneDev administrator username; used only on an empty installation. |
| `initial_email` | OneDev | admin@example.com | Initial administrator email; change it after first login. |
| `initial_password` | OneDev | (secret) | Generated initial administrator password; used only on an empty installation. |
| `hibernate_dialect` | OneDev | io.onedev.server.persistence.PostgreSQLDialect | OneDev PostgreSQL dialect. |
| `initial_server_url` | OneDev | - | Canonical public OneDev URL; used only on an empty installation. |
| `hibernate_connection_url` | OneDev | - | Private PostgreSQL JDBC URL. |
| `hibernate_connection_password` | OneDev | (secret) | PostgreSQL password reference. |
| `hibernate_connection_username` | OneDev | (secret) | PostgreSQL user reference. |
| `hibernate_connection_driver_class` | OneDev | org.postgresql.Driver | PostgreSQL JDBC driver. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/onedev`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/onedev)
