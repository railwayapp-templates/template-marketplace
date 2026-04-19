# Deploy NakatomiCRM on Railway

Headless Agentic first CRM.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nakatomicrm)

## About

Nakatomi is a headless, agent-native CRM. No human UI to click through — every primitive (contacts, companies, deals, pipelines, activities, notes, tasks, files, relationships, timeline, webhooks) is a REST endpoint and also an MCP tool. Built for Claude, ChatGPT, Cursor, and Perplexity.

Hosting Nakatomi means running a single FastAPI + Postgres service behind Railway's TLS edge. The Dockerfile runs Alembic migrations, boots uvicorn with proxy-header awareness, starts a durable webhook worker, and mounts an MCP server at `/mcp`. OAuth 2.1 + dynamic client registration is baked in so Claude Desktop's GUI connector works out of the box; bearer API keys handle Claude Code, Cursor, and raw HTTP clients. A single 512 MB instance paired with Postgres handles thousands of contacts easily. Files go to a mounted volume by default, or plug in S3/R2 via env vars.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nakatomi | [mrdulasolutions/NakatomiCRM](https://github.com/mrdulasolutions/NakatomiCRM) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on first boot. |
| `DATABASE_URL` | Postgres | - | Full internal connection string. What Nakatomi consumes to talk to Postgres. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser account name created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, auto-generated per install. Never share or reuse. |
| `DATABASE_PUBLIC_URL` | Postgres | - | External connection string for Postgres. Only set if you expose the DB publicly. |
| `PORT` | nakatomi | 8080 | Port the app listens on.  |
| `LOG_LEVEL` | nakatomi | INFO | Logging verbosity. INFO for normal use, DEBUG for troubleshooting. |
| `S3_BUCKET` | nakatomi | - | Linked from the Nakatomi Files Bucket service. |
| `S3_REGION` | nakatomi | - | Railway sets the Bucket region automatically. |
| `SECRET_KEY` | nakatomi | (secret) | Signing secret for JWTs and OAuth codes. Generated on install — do not share. |
| `ENVIRONMENT` | nakatomi | production | Environment label shown in /health. Use production. |
| `CORS_ORIGINS` | nakatomi | * | Comma-separated origins allowed to call the API. * is fine for agent-only use. |
| `DATABASE_URL` | nakatomi | - | Postgres connection. Linked automatically to the attached Postgres service. |
| `GBRAIN_TOKEN` | nakatomi | (secret) | Bearer token minted with gbrain auth create <label>. |
| `S3_ACCESS_KEY` | nakatomi | - | Linked from the Bucket. |
| `S3_SECRET_KEY` | nakatomi | (secret) | Linked, sensitive. |
| `GBRAIN_MCP_URL` | nakatomi | - | GBrain remote MCP endpoint URL (an ngrok tunnel ending in /mcp). |
| `S3_ENDPOINT_URL` | nakatomi | - | Linked |
| `STORAGE_BACKEND` | nakatomi | s3 | Where uploaded files go: local (uses the mounted volume) or s3. |
| `DASHBOARD_ENABLED` | nakatomi | false | Exposes the audit UI at /dashboard. Leave false unless you add your own auth in front. |
| `DOCDEPLOY_API_KEY` | nakatomi | (secret) | Bearer key for DocDeploy. Only needed if docdeploy is in MEMORY_CONNECTORS. |
| `MEMORY_CONNECTORS` | nakatomi | - | Comma-separated memory connectors to enable: docdeploy, supermemory, gbrain. Leave blank to disable. |
| `JWT_EXPIRE_MINUTES` | nakatomi | 60 | How long user login tokens stay valid. Default 60. |
| `STORAGE_LOCAL_PATH` | nakatomi | /app/data/files | Where local-backend files are written. Must be inside the mounted /app/data volume. |
| `SUPERMEMORY_API_KEY` | nakatomi | (secret) | Bearer key for Supermemory. Only needed if supermemory is in MEMORY_CONNECTORS |
| `WEBHOOK_MAX_RETRIES` | nakatomi | 3 | Retries per failed webhook delivery before giving up. |
| `WEBHOOK_WORKER_ENABLED` | nakatomi | true | Background worker that delivers webhooks. Keep true. |
| `WEBHOOK_TIMEOUT_SECONDS` | nakatomi | 10 | Request timeout for each webhook POST. |
| `API_KEY_RATE_LIMIT_PER_MINUTE` | nakatomi | (secret) | Max requests per API key per minute. Default 120. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Shell, Mako, Dockerfile

[View on Railway →](https://railway.com/deploy/nakatomicrm)
