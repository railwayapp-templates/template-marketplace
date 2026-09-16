# Deploy Meta ADS MCP on Railway

Connect AI assistants to Meta Ads with secure MCP tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meta-ads-mcp)

## About

Meta ADS MCP connects compatible AI assistants to the Meta Marketing API. It provides tools for exploring ad accounts, retrieving campaigns and performance metrics, and managing advertising resources. Each connection uses its own Meta credentials, selected accounts, and permissions, with read-only access selected by default.

Deploying Meta ADS MCP requires the application service, a persistent PostgreSQL database, a public HTTPS URL, and an encryption key for stored Meta credentials. The included Docker image builds the application and applies database migrations automatically at startup.

Users connect their MCP-compatible assistant to the `/mcp` endpoint, authenticate, provide a valid Meta access token, and select the accounts and permissions to authorize. OAuth credentials and account selections persist in PostgreSQL. The server supports automatic OAuth renewal, paginated queries, and account-level authorization. Keep the database and encryption key backed up, and run one application replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| faceads-mcp-v2 | [yvfl/faceads-mcp-v2](https://github.com/yvfl/faceads-mcp-v2) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | faceads-mcp-v2 | 3000 | Internal HTTP port. Keep 3000 and use the same target port for the public domain. |
| `DATABASE_URL` | faceads-mcp-v2 | - | PostgreSQL connection URL, automatically linked to the Postgres service in this deployment. |
| `MCP_BASE_URL` | faceads-mcp-v2 | - | Public HTTPS address of this installation, without /mcp or a trailing slash. Used for OAuth and connection links. |
| `META_API_VERSION` | faceads-mcp-v2 | v26.0 | Meta Graph API version used for advertising requests. Keep v26.0 unless you are testing another supported version. |
| `MCP_ENCRYPTION_KEY` | faceads-mcp-v2 | - | Automatically generated 64-character hexadecimal key for encrypting saved Meta tokens. Preserve it across redeploys and back it up securely. |
| `META_LIVE_API_VERSION` | faceads-mcp-v2 | v26.0 | Meta Graph API version used for advertising requests. Keep v26.0 unless you are testing another supported version. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** JavaScript, TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/meta-ads-mcp)
