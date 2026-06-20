# Deploy gmailmcp on Railway

Deploy and Host gmailmcp with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gmailmcp)

## About

gmailmcp is a Model Context Protocol (MCP) server that connects AI clients such as Claude, Cursor, or any MCP host to Gmail. After a one-time Google OAuth connection, your assistant can read, search, organize, draft, and send email on your behalf, at your direction, over a single authenticated `/mcp` endpoint.

Hosting gmailmcp means running a FastAPI + FastMCP backend as a single Docker image that exposes the MCP server at `/mcp` alongside an HTTP API. It needs a PostgreSQL database for application state and for encrypted OAuth token storage; Alembic migrations run automatically before each deploy. Authentication is handled by WorkOS AuthKit (OAuth 2.1 on the MCP transport), and Gmail access uses a Google Cloud OAuth client requesting the `gmail.modify` scope. You provide those credentials as environment variables; the template auto-generates the session secret and the token-encryption key and wires the database connection for you. After the first deploy, point your OAuth redirect URIs at the assigned Railway domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gmailmcp-landing-page | [Miyamura80/MCP-Template](https://github.com/Miyamura80/MCP-Template) (root: landing-page) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| gmailmcp-backend | [Miyamura80/MCP-Template](https://github.com/Miyamura80/MCP-Template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `DEV_ENV` | gmailmcp-backend | prod |
| `WORKOS_API_KEY` | gmailmcp-backend | (secret) |
| `GOOGLE_CLIENT_ID` | gmailmcp-backend | user should set this value |
| `WORKOS_CLIENT_ID` | gmailmcp-backend | user should set this value |
| `SESSION_SECRET_KEY` | gmailmcp-backend | (secret) |
| `GOOGLE_REDIRECT_URI` | gmailmcp-backend | user should set this value |
| `GOOGLE_CLIENT_SECRET` | gmailmcp-backend | (secret) |
| `GOOGLE_TOKEN_ENC_KEY` | gmailmcp-backend | (secret) |
| `WORKOS_AUTHKIT_DOMAIN` | gmailmcp-backend | user should set this value |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, TypeScript, Astro, Makefile, Shell, CSS, Dockerfile, Smarty, Mako, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/gmailmcp)
