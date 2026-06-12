# Deploy Agentic Data Stack Lite on Railway

LibreChat, ClickHouse, Langfuse: an open-source agentic analytics stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentic-data-stack-lite)

## About

A self-hosted, observability-first agentic chat platform combining LibreChat (multi-provider LLM chat with MCP tool support), Langfuse v3 (full trace observability), and a ClickHouse MCP server pre-wired to the public ClickHouse demo cluster.

This template deploys ten Railway services: LibreChat with its admin panel and MongoDB store, Langfuse v3 (web + worker) backed by Postgres, Redis, MinIO, and ClickHouse, and a ClickHouse MCP server that exposes ClickHouse's public sql-clickhouse.clickhouse.com demo cluster to LibreChat's agents. After deploy, you sign into LibreChat and start chatting with agents that can query the ClickHouse demo data out of the box, OAuth into your own ClickHouse Cloud account via the ClickHouse Cloud MCP, or bring your own MCP servers. Every agent run streams traces to Langfuse for inspection, scoring, and evaluation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo | `mongo:8.0.17` | Database |
| langfuse-worker | `langfuse/langfuse-worker:3` | Worker |
| librechat | `ghcr.io/danny-avila/librechat:latest` | Web service |
| clickhouse | `clickhouse/clickhouse-server` | Database |
| langfuse | `langfuse/langfuse:3` | Web service |
| redis | `redis:7-alpine` | Database |
| postgres | `postgres:17` | Database |
| clickhouse-mcp | `mcp/clickhouse` | Database |
| minio | `quay.io/minio/minio` | Database |
| librechat-admin-panel | `ghcr.io/clickhouse/librechat-admin-panel:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) | Root password for MongoDB. Auto-generated per deploy. |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) | Root username for MongoDB. Used by LibreChat to authenticate. |
| `SALT` | langfuse-worker | - | Cryptographic salt. Must match the web service. |
| `DATABASE_URL` | langfuse-worker | - | Postgres connection string. |
| `CLICKHOUSE_URL` | langfuse-worker | - | HTTP endpoint for ClickHouse. |
| `ENCRYPTION_KEY` | langfuse-worker | - | Encryption key. Must match the web service. |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | ClickHouse username for Langfuse. |
| `TELEMETRY_ENABLED` | langfuse-worker | true | Whether Langfuse sends anonymous usage telemetry. |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | ClickHouse password for Langfuse. |
| `REDIS_CONNECTION_STRING` | langfuse-worker | - | Redis connection string with auth and IPv6 hint. |
| `CLICKHOUSE_MIGRATION_URL` | langfuse-worker | - | Native protocol endpoint for ClickHouse migrations. |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false | Whether ClickHouse is running in cluster mode. |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | langfuse | MinIO bucket for raw trace events. |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | auto | S3 region label. |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | langfuse | MinIO bucket for media attachments. |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | auto | S3 region label for media uploads. |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse-worker | - | MinIO endpoint URL for events. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse-worker | - | MinIO endpoint URL for media uploads. |
| `LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES` | langfuse-worker | false | Toggle for unstable Langfuse features. |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | MinIO username for events bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | - | MinIO username for media bucket. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Path-style S3 URLs required by MinIO. |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | Path-style S3 URLs for media uploads. |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | MinIO password for events bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | MinIO password for media bucket. |
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
| `LANGFUSE_BASE_URL` | librechat | - | Langfuse host URL used by the agents SDK for trace export. Wired to the langfuse service. |
| `ALLOW_REGISTRATION` | librechat | true | Whether new users can self-register. true for an open demo. |
| `JWT_REFRESH_SECRET` | librechat | (secret) | Signing key for LibreChat refresh JWTs. |
| `LANGFUSE_PUBLIC_KEY` | librechat | - | Langfuse public API key. Wired from the langfuse service's init keys. |
| `LANGFUSE_SECRET_KEY` | librechat | (secret) | Langfuse secret API key. |
| `CLICKHOUSE_MCP_AUTH_TOKEN` | librechat | (secret) | Bearer token sent to the in-cluster ClickHouse MCP server. |
| `CLICKHOUSE_DB` | clickhouse | default | Default database in this ClickHouse instance. Langfuse uses it for trace storage. |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Username for ClickHouse. Used by Langfuse to authenticate. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password for ClickHouse. Auto-generated per deploy. |
| `SALT` | langfuse | - | Cryptographic salt for password hashing. |
| `DATABASE_URL` | langfuse | - | Postgres connection string. Wired from the postgres service. |
| `NEXTAUTH_URL` | langfuse | - | Public URL of the Langfuse web service. |
| `CLICKHOUSE_URL` | langfuse | - | HTTP endpoint for ClickHouse. |
| `ENCRYPTION_KEY` | langfuse | - | 64-char hex key encrypting sensitive Langfuse data at rest. |
| `CLICKHOUSE_USER` | langfuse | (secret) | ClickHouse username for Langfuse. |
| `NEXTAUTH_SECRET` | langfuse | (secret) | NextAuth session crypto secret. |
| `TELEMETRY_ENABLED` | langfuse | true | Whether Langfuse sends anonymous usage telemetry. |
| `CLICKHOUSE_PASSWORD` | langfuse | (secret) | ClickHouse password for Langfuse. |
| `LANGFUSE_INIT_ORG_ID` | langfuse | default-org | Organization ID auto-created on first boot. |
| `LANGFUSE_INIT_ORG_NAME` | langfuse | Default Organization | Organization name shown in the Langfuse UI. |
| `LANGFUSE_INIT_USER_NAME` | langfuse | Admin | Display name of the initial admin user. |
| `REDIS_CONNECTION_STRING` | langfuse | - | Redis connection string with auth and IPv6 hint. |
| `CLICKHOUSE_MIGRATION_URL` | langfuse | - | Native protocol endpoint for ClickHouse migrations. |
| `LANGFUSE_INIT_PROJECT_ID` | langfuse | default-project | Default project ID auto-created on first boot. |
| `LANGFUSE_INIT_USER_EMAIL` | langfuse | admin@example.com | Email of the initial admin user. Sign in with this. |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse | false | Whether ClickHouse is running in cluster mode. |
| `LANGFUSE_INIT_PROJECT_NAME` | langfuse | Default Project | Default project name. |
| `LANGFUSE_INIT_USER_PASSWORD` | langfuse | (secret) | Password of the initial admin user. |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse | langfuse | MinIO bucket for raw trace events. |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse | auto | S3 region label. |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse | langfuse | MinIO bucket for media attachments. |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse | auto | S3 region label for media uploads. |
| `LANGFUSE_INIT_PROJECT_PUBLIC_KEY` | langfuse | - | Public API key for the default project. Used by LibreChat to send traces. |
| `LANGFUSE_INIT_PROJECT_SECRET_KEY` | langfuse | (secret) | Secret API key for the default project. |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | langfuse | - | MinIO endpoint URL for events. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | langfuse | - | MinIO endpoint URL for media uploads. |
| `LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES` | langfuse | false | Toggle for unstable Langfuse features. |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse | - | MinIO username for events bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse | - | MinIO username for media bucket. |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse | true | Path-style S3 URLs required by MinIO. |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse | true | Path-style S3 URLs for media uploads. |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse | (secret) | MinIO password for events bucket. |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse | (secret) | MinIO password for media bucket. |
| `REDIS_PASSWORD` | redis | (secret) | Auth password for Redis. Enforced via the --requirepass start command; referenced by Langfuse services in their connection string. |
| `POSTGRES_DB` | postgres | postgres | Default Postgres database name. Langfuse migrations target this database. |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres password. Auto-generated per deploy. |
| `CLICKHOUSE_HOST` | clickhouse-mcp | sql-clickhouse.clickhouse.com | Hostname of the ClickHouse instance the MCP server queries. Defaults to the public demo cluster. |
| `CLICKHOUSE_PORT` | clickhouse-mcp | 8443 | Port for the ClickHouse HTTPS interface. |
| `CLICKHOUSE_USER` | clickhouse-mcp | (secret) | Username for the demo cluster. |
| `CLICKHOUSE_SECURE` | clickhouse-mcp | true | Whether to use TLS when connecting. |
| `CLICKHOUSE_PASSWORD` | clickhouse-mcp | (secret) | MUST be left blank - if Railway prevents you from deploying from template without populating this field, please remember to change it back to an empty value after deployment, otherwise calls to the clickhouse sample database will fail auth. |
| `CLICKHOUSE_MCP_BIND_HOST` | clickhouse-mcp | 0.0.0.0 | Network interface the MCP server listens on. 0.0.0.0 so Railway can route to it. |
| `CLICKHOUSE_MCP_BIND_PORT` | clickhouse-mcp | 8000 | Port the MCP server listens on. |
| `CLICKHOUSE_MCP_AUTH_TOKEN` | clickhouse-mcp | (secret) | Bearer token LibreChat sends to authenticate MCP requests. Auto-generated per deploy. |
| `CLICKHOUSE_MCP_SERVER_TRANSPORT` | clickhouse-mcp | http | Transport protocol. http so LibreChat can connect via streamable-http. |
| `MINIO_ROOT_USER` | minio | (secret) | Root username for MinIO. Used as the S3 access key by Langfuse uploads. |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Root password for MinIO. Used as the S3 secret key. Auto-generated per deploy. |
| `PORT` | librechat-admin-panel | 3000 | Port the admin panel listens on. |
| `API_SERVER_URL` | librechat-admin-panel | - | Server-side LibreChat API URL over the private network. |
| `SESSION_SECRET` | librechat-admin-panel | (secret) | 32+ char crypto secret for admin panel sessions. |
| `VITE_API_BASE_URL` | librechat-admin-panel | - | Browser-facing LibreChat API URL. |

## Configuration

- **Volume:** `/data/db`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/api/public/health`
- **Start command:** `sh -c "redis-server --requirepass \"$REDIS_PASSWORD\" --maxmemory-policy noeviction"`
- **Start command:** `sh -c 'mkdir -p /data/langfuse && minio server --address ":9000" --console-address ":9001" /data'`
- **Healthcheck:** `/`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/agentic-data-stack-lite)
