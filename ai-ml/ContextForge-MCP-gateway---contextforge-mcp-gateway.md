# Deploy ContextForge MCP gateway on Railway

Secure MCP gateway and registry with PostgreSQL, Redis, and admin UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/contextforge-mcp-gateway)

## About

ContextForge provides an authenticated registry, proxy, and administration layer for MCP, A2A, REST, and gRPC tools.

The template runs one ContextForge gateway with private PostgreSQL and authenticated Redis, durable volumes, generated secrets, automatic migrations, and strict SSRF defaults.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ContextForge Redis | `redis:8-alpine@sha256:978f0e01593e65eed801f2402944efcd936d43b5027e4908a7897baf88ed6241` | Database |
| ContextForge | `ghcr.io/ibm/mcp-context-forge:v1.0.6@sha256:049b8e61fa1187f72773d94bcf91fc63338f4fea7808949a8a5daacbc89ef92e` | Web service |
| ContextForge PostgreSQL | `postgres:18@sha256:3a82e1f56c8f0f5616a11103ac3d47e632c3938698946a7ad26da0df1334744a` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | ContextForge Redis | (secret) | Generated Redis password. |
| `HOST` | ContextForge | 0.0.0.0 | Listen on every container interface. |
| `PORT` | ContextForge | 4444 | ContextForge HTTP port. |
| `LOG_LEVEL` | ContextForge | INFO | Production log verbosity. |
| `REDIS_URL` | ContextForge | - | Authenticated private Redis connection string. |
| `APP_DOMAIN` | ContextForge | - | Public HTTPS origin used for cookies and links. |
| `CACHE_TYPE` | ContextForge | redis | Use private Redis for caching. |
| `JWT_ISSUER` | ContextForge | - | Bind tokens to the public deployment origin. |
| `ENVIRONMENT` | ContextForge | production | Enable production validation and behavior. |
| `HTTP_SERVER` | ContextForge | gunicorn | Use the supported Gunicorn server. |
| `REQUIRE_JTI` | ContextForge | true | Require revocable token identifiers. |
| `DATABASE_URL` | ContextForge | - | Private PostgreSQL connection string. |
| `DB_POOL_SIZE` | ContextForge | 10 | Use a small direct PostgreSQL pool for one gateway worker. |
| `JWT_AUDIENCE` | ContextForge | contextforge-railway | Restrict tokens to this ContextForge deployment class. |
| `AUTH_REQUIRED` | ContextForge | true | Require authentication across protected routes. |
| `RUST_MCP_MODE` | ContextForge | off | Use the supported Python transport instead of the deprecated Rust sidecar. |
| `ENABLE_METRICS` | ContextForge | false | Disable the unused internal metrics endpoint. |
| `JWT_SECRET_KEY` | ContextForge | (secret) | Generated signing key for sessions and API tokens. |
| `SECURE_COOKIES` | ContextForge | true | Send session cookies only over Railway HTTPS. |
| `TRANSPORT_TYPE` | ContextForge | all | Enable supported HTTP, SSE, and streamable HTTP transports. |
| `BASIC_AUTH_USER` | ContextForge | (secret) | Non-default placeholder for the disabled Basic authentication path. |
| `DB_MAX_OVERFLOW` | ContextForge | 10 | Bound temporary PostgreSQL connections above the base pool. |
| `LLMCHAT_ENABLED` | ContextForge | false | Disable the upstream in-memory chat feature with known v1.0.6 issues. |
| `SKIP_SSL_VERIFY` | ContextForge | false | Validate outbound TLS certificates. |
| `GUNICORN_WORKERS` | ContextForge | 1 | Run one worker for predictable starter resource use and session continuity. |
| `MCP_REQUIRE_AUTH` | ContextForge | true | Require authentication on MCP transports. |
| `BASIC_AUTH_PASSWORD` | ContextForge | (secret) | Generated fallback secret even though Basic API auth is disabled. |
| `API_ALLOW_BASIC_AUTH` | ContextForge | false | Keep legacy Basic authentication disabled for APIs. |
| `GUNICORN_PRELOAD_APP` | ContextForge | true | Share preloaded application pages between workers. |
| `OTEL_TRACES_EXPORTER` | ContextForge | none | Disable unconfigured OpenTelemetry trace export. |
| `PLATFORM_ADMIN_EMAIL` | ContextForge | admin@example.com | Bootstrap administrator login email; change before first deployment if needed. |
| `SSRF_ALLOW_LOCALHOST` | ContextForge | false | Block loopback upstream targets. |
| `SSRF_DNS_FAIL_CLOSED` | ContextForge | true | Reject targets when DNS safety checks fail. |
| `DEFAULT_USER_PASSWORD` | ContextForge | (secret) | Generated fallback password for seeded users. |
| `DOCS_ALLOW_BASIC_AUTH` | ContextForge | false | Keep Basic authentication disabled for documentation routes. |
| `MCPGATEWAY_UI_ENABLED` | ContextForge | true | Enable the authenticated operator UI; review the documented upstream caveat. |
| `OTEL_METRICS_EXPORTER` | ContextForge | none | Disable unconfigured OpenTelemetry metric export. |
| `AUTH_ENCRYPTION_SECRET` | ContextForge | (secret) | Generated key for encrypting stored upstream credentials. |
| `PLATFORM_ADMIN_PASSWORD` | ContextForge | (secret) | Generated bootstrap administrator password. |
| `SSRF_PROTECTION_ENABLED` | ContextForge | true | Enable outbound SSRF validation. |
| `PLATFORM_ADMIN_FULL_NAME` | ContextForge | Platform Administrator | Bootstrap administrator display name. |
| `REQUIRE_TOKEN_EXPIRATION` | ContextForge | (secret) | Reject tokens without expiration. |
| `DERIVE_KEY_PER_ENVIRONMENT` | ContextForge | true | Derive an environment-specific signing key. |
| `MCPGATEWAY_SKIP_MIGRATIONS` | ContextForge | false | Run idempotent database migrations during startup. |
| `ALLOW_UNAUTHENTICATED_ADMIN` | ContextForge | false | Never grant administrator context to anonymous requests. |
| `PUBLIC_REGISTRATION_ENABLED` | ContextForge | false | Prevent anonymous account registration. |
| `SSRF_ALLOW_PRIVATE_NETWORKS` | ContextForge | false | Block private upstream targets until an operator narrows an allowlist. |
| `MCPGATEWAY_ADMIN_API_ENABLED` | ContextForge | true | Enable authenticated administration APIs. |
| `MCPGATEWAY_REVERSE_PROXY_ENABLED` | ContextForge | false | Disable the optional generic reverse proxy. |
| `MCPGATEWAY_STDIO_TRANSPORT_ENABLED` | ContextForge | false | Disable server-side process execution through stdio. |
| `ADMIN_REQUIRE_PASSWORD_CHANGE_ON_BOOTSTRAP` | ContextForge | (secret) | Use the generated administrator password immediately on first boot. |
| `POSTGRES_DB` | ContextForge PostgreSQL | contextforge | ContextForge database name. |
| `POSTGRES_USER` | ContextForge PostgreSQL | (secret) | ContextForge database user. |
| `POSTGRES_PASSWORD` | ContextForge PostgreSQL | (secret) | Generated database password. |

## Configuration

- **Start command:** `/bin/sh -ec 'umask 077; printf "appendonly yes\nrequirepass %s\n" "$REDIS_PASSWORD" >/tmp/redis.conf; exec redis-server /tmp/redis.conf'`
- **Volume:** `/data`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/contextforge-mcp-gateway)
