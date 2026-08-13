# Deploy Bag Of Words on Railway

Chat with your data with memory, rules, and observability built in.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bagofwords)

## About

Bag of Words (BOW) is an open-source agentic analytics platform that connects LLMs with business data, tools, credentials, instructions, and permissions. It enables teams to build data agents that can generate queries, reports, dashboards, deep analysis, root-cause investigations, automations, scheduled tasks, and MCP workflows.

Railway hosts BOW as a Docker-based application with PostgreSQL providing persistent application data. The application and database communicate through Railway's private network, while Railway provides public HTTP/HTTPS networking for users and external integrations.

The recommended deployment uses the published `bagofwords/bagofwords` Docker image and a Railway PostgreSQL service. A separate Caddy, Docker Compose, or Kubernetes deployment is not required. Railway handles service networking, domains, TLS, environment variables, and application scaling.

BOW can connect to external databases, warehouses, BI systems, files, business applications, LLM providers, MCP servers, and APIs after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bagofwords | `bagofwords/bagofwords:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | bagofwords | 0.0.0.0 | - |
| `PORT` | bagofwords | 3000 | - |
| `BOW_ENCRYPTION_KEY` | bagofwords | Wz3vR9xL8mK2pQ5sT7wX4zY1bC6dF0gH3jN2vL5pK8s= | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/bagofwords)
