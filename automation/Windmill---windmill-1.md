# Deploy Windmill on Railway

Quick deployment of Windmill on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-1)

## About

Windmill is an open-source platform for building internal tools, automating workflows, and orchestrating scripts. Execute Python, TypeScript, and SQL with real code capabilities. Create APIs, UIs, and scheduled jobs in minutes without managing infrastructure.

Deploying Windmill on Railway provides a seamless experience for teams looking to automate their operations. Railway handles the infrastructure, scaling, and database management, so you focus on building automations. Windmill includes a visual workflow builder, script editor, and integrated PostgreSQL database. Deploy in one click with automatic SSL, environment variables, and persistent storage. Perfect for DevOps teams, startups, and enterprises managing complex automation pipelines at scale.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Windmill | [Pluma-Negra/windmill-railway](https://github.com/Pluma-Negra/windmill-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DATABASE_URL` | Windmill | - | Database URL |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/windmill-1)
