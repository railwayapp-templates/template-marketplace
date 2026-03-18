# Deploy Authorizer on Railway

Your Data Your Control Authenticate & Authorize User For Free

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/authorizer-1)

## About

Authorizer– Open-source auth server supporting 13+ databases, $0/user

- CLI-first configuration (no .env files, no environment variables - everything via flags)
  - 13+ database backends: Postgres, MySQL, SQLite, MongoDB, DynamoDB, ArangoDB, CockroachDB, ScyllaDB, Couchbase, MariaDB, YugabyteDB, PlanetScale, LibSQL
  - Full OAuth2/OIDC compliance
  - Social logins, MFA (TOTP), magic links, email/password, role-based access
  - Webhook events for custom integrations
  - GraphQL API + REST endpoints
  - Admin dashboard included
  - Single binary deployment

  The core idea: you shouldn't have to pay per user for authentication, and your users' identity data should live in your database, not someone else's.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| authorizer | [authorizerdev/authorizer-railway](https://github.com/authorizerdev/authorizer-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `JWT_SECRET` | authorizer | (secret) | - |
| `ADMIN_SECRET` | authorizer | (secret) | - |
| `CLIENT_SECRET` | authorizer | (secret) | - |
| `DATABASE_TYPE` | authorizer | postgres | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/authorizer-1)
