# Deploy ContextForge MCP Gateway on Railway

Self-hosted IBM registry, proxy and admin UI for MCP servers and REST APIs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/contextforge-mcp-g-1)

## About

ContextForge is IBM's open-source MCP gateway, registry and proxy: one endpoint that every AI client
and agent points at, federating your MCP servers, A2A agents and REST APIs behind a single address
with shared discovery, authentication and access control. It replaces the per-client config files
where Claude Desktop, Cursor and each of your own agents keeps its own private server list. Standing
it up yourself means running a PostgreSQL database alongside it and working through an example
environment file documenting more than 900 settings. This template brings up the gateway and its
database already wired to each other, on versions I deploy and test as a set, with every secret and
password generated for you at deploy time.

The gateway runs as a single container against PostgreSQL, and both arrive configured. The database
connection is assembled from live references to the database service, so it survives any later change
to those credentials, and schema migrations run on every boot. The JWT signing key, the credential
encryption secret and all three passwords are generated at deploy time, and the admin UI's allowed
origin is bound to the public domain Railway issues you. Worker count and the rate limiter are sized
for a single instance, so an idle gateway sits under a gigabyte of memory. You supply one value, the
email address for your administrator account, and deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| ContextForge | `ghcr.io/ibm/mcp-context-forge:v1.0.10` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | [Do not change] Name of the database created on first boot. |
| `DATABASE_URL` | Postgres | - | [Do not change] Standard connection string for database clients. |
| `POSTGRES_USER` | Postgres | (secret) | [Do not change] Superuser created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password of your database. |
| `HOST` | ContextForge | 0.0.0.0 | [Do not change] Interface the gateway binds to. |
| `PORT` | ContextForge | 4444 | [Do not change] Port the gateway listens on. |
| `APP_DOMAIN` | ContextForge | - | [Do not change] Public URL of this gateway. CORS and OAuth callbacks are bound to it. |
| `ENVIRONMENT` | ContextForge | production | [Do not change] Runtime mode. Production enforces strict CORS and secure cookies. |
| `DATABASE_URL` | ContextForge | - | [Do not change] Connection string to the bundled Postgres, in the psycopg scheme the gateway requires. |
| `JWT_SECRET_KEY` | ContextForge | (secret) | Signs login sessions and API tokens. |
| `LLM_API_PREFIX` | ContextForge | /llm/v1 | [Do not change] URL prefix of the built-in LLM proxy endpoints. |
| `SECURE_COOKIES` | ContextForge | true | [Do not change] Marks session cookies HTTPS-only. |
| `BASIC_AUTH_USER` | ContextForge | (secret) | Username for HTTP Basic Auth, which is off by default. |
| `GUNICORN_WORKERS` | ContextForge | 1 | [Do not change] Number of gateway worker processes. The built-in LLM Chat needs Redis with more than one. |
| `REQUIRE_USER_IN_DB` | ContextForge | false | [Do not change] Keeps the administrator bootstrap login enabled. |
| `BASIC_AUTH_PASSWORD` | ContextForge | (secret) | Password for HTTP Basic Auth, which is off by default. |
| `PLATFORM_ADMIN_EMAIL` | ContextForge | - | Login email of the administrator account. Required: enter your own address. |
| `UAID_ALLOWED_DOMAINS` | ContextForge | - | [Do not change] Domain allowlist for cross-gateway routing. |
| `DEFAULT_USER_PASSWORD` | ContextForge | (secret) | Initial password of users created through the admin UI. They must replace it on first sign-in. |
| `MCPGATEWAY_UI_ENABLED` | ContextForge | true | Serves the admin web UI at /admin. |
| `AUTH_ENCRYPTION_SECRET` | ContextForge | (secret) | Encrypts the credentials you store for connected MCP servers. |
| `PLATFORM_ADMIN_PASSWORD` | ContextForge | (secret) | First-login password of the administrator account. The gateway makes you replace it on first sign-in. |
| `MCPGATEWAY_SKIP_MIGRATIONS` | ContextForge | false | [Do not change] Runs database migrations on every deployment. |
| `RATE_LIMITING_REDIS_ENABLED` | ContextForge | false | [Do not change] Rate limiting runs in memory. This template ships no Redis. |
| `SSRF_ALLOW_PRIVATE_NETWORKS` | ContextForge | true | [Do not change] Allows registering MCP servers that run on this project's private network. |
| `MCPGATEWAY_ADMIN_API_ENABLED` | ContextForge | true | Enables the admin REST API. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/contextforge-mcp-g-1)
