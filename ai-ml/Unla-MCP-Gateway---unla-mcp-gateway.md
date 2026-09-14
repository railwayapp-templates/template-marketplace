# Deploy Unla MCP Gateway on Railway

MCP gateway and management UI with persistent SQLite and owner access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unla-mcp-gateway)

## About

MCP gateway and management UI with persistent SQLite and owner access.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Two services. The pinned all-in-one image runs UI, API and MCP gateway; SQLite persists at /app/data/unla.db. The whole public origin is owner-protected. The inner proxy forwards streaming responses and WebSocket upgrades. Remote clients must support the additional header; a bare URL will not bypass the owner gate. OAuth/session behavior follows upstream defaults and must be verified across restarts; this is not a multi-replica topology. MIT upstream license.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Database |
| unla | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENV` | core | production | Firecrawl runtime mode. Keep local for this self-hosted deployment. |
| `LOGGER_LEVEL` | core | info | Logger level for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OAUTH2_ISSUER` | core | - | Oauth2 issuer resolved automatically from the linked service. Keep this reference when using the included topology. |
| `GATEWAY_DB_NAME` | core | /app/data/unla.db | Gateway db name for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `VITE_WS_BASE_URL` | core | /api/ws | Vite ws base url for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APISERVER_DB_NAME` | core | /app/data/unla.db | Apiserver db name for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `VITE_API_BASE_URL` | core | /api | Vite api base url for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SUPER_ADMIN_PASSWORD` | core | (secret) | Generated super admin password. Keep private and preserve with backups. |
| `SUPER_ADMIN_USERNAME` | core | (secret) | Super admin username for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LLM_CONFIG_ADMIN_ONLY` | core | true | Llm config admin only for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APISERVER_JWT_SECRET_KEY` | core | (secret) | Generated apiserver jwt secret key. Keep private and preserve with backups. |
| `VITE_MCP_GATEWAY_BASE_URL` | core | /gateway | Vite mcp gateway base url for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `VITE_GATEWAY_SERVICE_BASE_URL` | core | - | Vite gateway service base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `VITE_DIRECT_MCP_GATEWAY_MODIFIER` | core | /gateway | Vite direct mcp gateway modifier for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | unla | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | unla | true | Owner auth for unla. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | unla | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | unla | 80 | Upstream port for unla. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | unla | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/app/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/unla-mcp-gateway)
