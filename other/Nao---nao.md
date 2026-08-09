# Deploy Nao on Railway

Self Host Analytics Agent,Create Context,Nao chat included

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nao)

## About

Nao is a self-hosted framework for building and deploying analytics agents. Data teams can create an agent context containing data, metadata, documentation, modeling, rules, tools, and MCPs, then deploy a chat interface where users ask natural-language questions and receive analytics, SQL-driven insights, and visualizations.

Hosting Nao on Railway involves deploying the Nao application from its Docker image and connecting it to a PostgreSQL database for application data. Nao can use external data warehouses and other data sources configured through its agent context, along with an LLM provider such as OpenAI or Anthropic. Your Nao context can be maintained in a Git repository or included with the deployed project. Railway provides the application networking, public HTTPS domain, database infrastructure, environment variables, and scaling needed to run Nao in production without managing servers manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nao | `getnao/nao:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SERVER_PORT` | Nao | 5005 | - |
| `BETTER_AUTH_SECRET` | Nao | (secret) | - |
| `BETA_CONTEXT_RECOMMENDATIONS_ENABLED` | Nao | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/nao)
