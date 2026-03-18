# Deploy Hasura on Railway

Self-hosted realtime GraphQL engine with minimal setup on PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/hasura-1)

## About

Deploying Hasura on Railway allows you to run a production-ready GraphQL backend with minimal setup using PostgreSQL as the primary database. Railway handles infrastructure, scaling, and networking, while Hasura connects directly to PostgreSQL and automatically generates realtime GraphQL and REST APIs. You can easily configure environment variables for database connections, enable JWT-based authentication, set up event triggers, and integrate external services. This setup is ideal for teams that want speed, reliability, and flexibility without managing servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| graphql-engine | `hasura/graphql-engine` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | graphql-engine | 8080 |
| `HASURA_GRAPHQL_SERVER_HOST` | graphql-engine | :: |
| `HASURA_GRAPHQL_ADMIN_SECRET` | graphql-engine | (secret) |
| `HASURA_GRAPHQL_ENABLE_CONSOLE` | graphql-engine | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/template/hasura-1)
