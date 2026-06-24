# Deploy Agentic Data Stack Lite (Langfuse Cloud) on Railway

The Agentic Data Stack instrumented with Langfuse Cloud

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentic-data-stack-lite-langfuse-cloud)

## About

A self-hosted, observability-first agentic chat platform combining LibreChat (multi-provider LLM chat with MCP tool support), Langfuse Cloud (full trace observability), and a ClickHouse MCP server pre-wired to the public ClickHouse demo cluster.

This template deploys five Railway services: LibreChat with its admin panel and MongoDB store, ClickHouse, and a ClickHouse MCP server that exposes ClickHouse's public sql-clickhouse.clickhouse.com demo cluster to LibreChat's agents. After deploy, you sign into LibreChat and start chatting with agents that can query the ClickHouse demo data out of the box, OAuth into your own ClickHouse Cloud account via the ClickHouse Cloud MCP, or bring your own MCP servers. Every agent run streams traces to a configurable Langfuse Cloud project for inspection, scoring, and evaluation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse-mcp | `mcp/clickhouse` | Database |
| librechat-admin-panel | `ghcr.io/clickhouse/librechat-admin-panel:latest` | Database |
| librechat | `ghcr.io/danny-avila/librechat:latest` | Web service |
| clickhouse | `clickhouse/clickhouse-server` | Database |
| mongo | `mongo:8.0.17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_HOST` | clickhouse-mcp | sql-clickhouse.clickhouse.com | Hostname of the ClickHouse instance the MCP server queries. Defaults to the public demo cluster. |
| `CLICKHOUSE_PORT` | clickhouse-mcp | 8443 | Port for the ClickHouse HTTPS interface. |
| `CLICKHOUSE_USER` | clickhouse-mcp | (secret) | Username for the demo cluster. |
| `CLICKHOUSE_SECURE` | clickhouse-mcp | true | Whether to use TLS when connecting. |
| `CLICKHOUSE_PASSWORD` | clickhouse-mcp | (secret) | MUST be left blank - if Railway prevents you from deploying from template without populating this field, please remember to change it back to an empty value after deployment, otherwise calls to the clickhouse sample database will fail auth. |
| `CLICKHOUSE_MCP_BIND_HOST` | clickhouse-mcp | 0.0.0.0 | Network interface the MCP server listens on. 0.0.0.0 so Railway can route to it. |
| `CLICKHOUSE_MCP_BIND_PORT` | clickhouse-mcp | 8000 | Port the MCP server listens on. |
| `CLICKHOUSE_MCP_AUTH_TOKEN` | clickhouse-mcp | (secret) | Bearer token LibreChat sends to authenticate MCP requests. Auto-generated per deploy. |
| `CLICKHOUSE_MCP_SERVER_TRANSPORT` | clickhouse-mcp | http | Transport protocol. http so LibreChat can connect via streamable-http. |
| `PORT` | librechat-admin-panel | 3000 | Port the admin panel listens on. |
| `API_SERVER_URL` | librechat-admin-panel | - | Server-side LibreChat API URL over the private network. |
| `SESSION_SECRET` | librechat-admin-panel | (secret) | 32+ char crypto secret for admin panel sessions. |
| `VITE_API_BASE_URL` | librechat-admin-panel | - | Browser-facing LibreChat API URL. |
| `HOST` | librechat | 0.0.0.0 | Network interface LibreChat binds to. 0.0.0.0 so Railway can route requests. |
| `PORT` | librechat | 3080 | Port LibreChat listens on. |
| `SEARCH` | librechat | false | Enable Meilisearch-backed chat search. false since this template doesn't deploy Meilisearch. |
| `CREDS_IV` | librechat | - | 32-char hex IV paired with CREDS_KEY. |
| `CREDS_KEY` | librechat | - | 64-char hex key encrypting LibreChat credentials at rest. |
| `MONGO_URI` | librechat | - | MongoDB connection string. Wired to the mongo service. |
| `GOOGLE_KEY` | librechat | user_provided | Your Google AI API key. Get one at aistudio.google.com. |
| `JWT_SECRET` | librechat | (secret) | Signing key for LibreChat access JWTs. |
| `CONFIG_PATH` | librechat | https://raw.githubusercontent.com/ClickHouse/agentic-data-stack/main/librechat.railway.yaml | URL of the LibreChat config file fetched on boot. |
| `DOMAIN_CLIENT` | librechat | - | Public URL of LibreChat. Required for OAuth callbacks against external MCP servers. |
| `DOMAIN_SERVER` | librechat | - | Same as DOMAIN_CLIENT. |
| `LANGFUSE_HOST` | librechat | - | Langfuse host URL for the feedback-scoring path. |
| `OPENAI_API_KEY` | librechat | (secret) | Your OpenAI API key (sk-...). Get one at platform.openai.com. |
| `ALLOW_EMAIL_LOGIN` | librechat | (secret) | Whether users can sign in with email + password. |
| `ANTHROPIC_API_KEY` | librechat | (secret) | Your Anthropic API key (sk-ant-...). Get one at console.anthropic.com. |
| `LANGFUSE_BASE_URL` | librechat | - | Langfuse host URL used by the agents SDK for trace export. |
| `ALLOW_REGISTRATION` | librechat | true | Whether new users can self-register. true for an open demo. |
| `JWT_REFRESH_SECRET` | librechat | (secret) | Signing key for LibreChat refresh JWTs. |
| `LANGFUSE_PUBLIC_KEY` | librechat | - | Langfuse public API key. |
| `LANGFUSE_SECRET_KEY` | librechat | (secret) | Langfuse secret API key. |
| `CLICKHOUSE_MCP_AUTH_TOKEN` | librechat | (secret) | Bearer token sent to the in-cluster ClickHouse MCP server. |
| `CLICKHOUSE_DB` | clickhouse | default | Default database in this ClickHouse instance. Langfuse uses it for trace storage. |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Username for ClickHouse. Used by Langfuse to authenticate. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password for ClickHouse. Auto-generated per deploy. |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) | Root password for MongoDB. Auto-generated per deploy. |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) | Root username for MongoDB. Used by LibreChat to authenticate. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/data/db`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/agentic-data-stack-lite-langfuse-cloud)
