# Deploy MCPJungle Enterprise Mode on Railway

MCP registry and gateway with PostgreSQL and a protected initialization.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcpjungle-enterprise-mode)

## About

MCP registry and gateway with PostgreSQL and a protected initialization.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Three services: MCPJungle, PostgreSQL and owner gateway. Upstream enterprise mode is a server authorization mode, not a bundled commercial license. The uninitialized service is private behind the owner gate. The standard distroless image supports the included runtime; arbitrary local stdio programs and host-shell tools are not installed. Prefer remote HTTP MCP servers. Mozilla Public License 2.0 upstream terms apply. Client tooling must support the additional header.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `ghcr.io/mcpjungle/mcpjungle:0.4.6@sha256:59940d2e3a586ab9a063cf24fa37460bc993686fa056729fd1ada25436123dd9` | Worker |
| mcpjungle | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| postgres | `postgres:17-alpine@sha256:18cfe3ef5e6815560c98237d6216d1e5119702fb0f3894c8785dd58b8bbe5d73` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SERVER_MODE` | core | enterprise | Server mode for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATABASE_URL` | core | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `OTEL_ENABLED` | core | false | Otel enabled for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MCP_SERVER_INIT_REQ_TIMEOUT_SEC` | core | 20 | Mcp server init req timeout sec for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | mcpjungle | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | mcpjungle | true | Owner auth for mcpjungle. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | mcpjungle | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | mcpjungle | 8080 | Upstream port for mcpjungle. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | mcpjungle | (secret) | Generated access password. Keep private and preserve with backups. |
| `POSTGRES_DB` | postgres | mcpjungle | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/mcpjungle-enterprise-mode)
