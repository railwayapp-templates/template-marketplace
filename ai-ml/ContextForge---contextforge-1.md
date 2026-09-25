# Deploy ContextForge on Railway

IBM ContextForge 1.0 MCP gateway and registry with auth, on Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/contextforge-1)

## About

ContextForge is IBM's open-source gateway, registry and proxy for the Model Context Protocol. It federates many MCP servers and REST APIs behind one authenticated endpoint, groups their tools into virtual servers, and adds an admin UI, JWT and OAuth auth, teams, rate limiting, observability and plugins for agent platforms.

This template deploys ContextForge v1.0.10 from the official image with a Railway Postgres database. Every endpoint requires authentication: the admin signs in with a generated password, public registration is off and cookies are secure. JWT and encryption secrets are generated at deploy time, and worker count is pinned. Private network access is allowed, so you can register MCP servers running as other Railway services by their internal address. Connect agents and IDEs to the gateway with a token. It fits the Hobby plan. Back up Postgres regularly, since it stores gateways, tools and tokens.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| contextforge | `ghcr.io/ibm/mcp-context-forge:v1.0.10` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `HOST` | contextforge | [::] |
| `PORT` | contextforge | 4444 |
| `ENVIRONMENT` | contextforge | production |
| `JWT_SECRET_KEY` | contextforge | (secret) |
| `SECURE_COOKIES` | contextforge | true |
| `BASIC_AUTH_USER` | contextforge | (secret) |
| `GUNICORN_WORKERS` | contextforge | 2 |
| `BASIC_AUTH_PASSWORD` | contextforge | (secret) |
| `PLATFORM_ADMIN_EMAIL` | contextforge | admin@example.com |
| `DEFAULT_USER_PASSWORD` | contextforge | (secret) |
| `MCPGATEWAY_UI_ENABLED` | contextforge | true |
| `AUTH_ENCRYPTION_SECRET` | contextforge | (secret) |
| `PLATFORM_ADMIN_PASSWORD` | contextforge | (secret) |
| `PUBLIC_REGISTRATION_ENABLED` | contextforge | false |
| `SSRF_ALLOW_PRIVATE_NETWORKS` | contextforge | true |
| `MCPGATEWAY_ADMIN_API_ENABLED` | contextforge | true |
| `ADMIN_REQUIRE_PASSWORD_CHANGE_ON_BOOTSTRAP` | contextforge | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/contextforge-1)
