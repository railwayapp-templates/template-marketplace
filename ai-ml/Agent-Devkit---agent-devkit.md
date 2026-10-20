# Deploy Agent Devkit on Railway

AI-powered QA and product delivery platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agent-devkit)

## About

Agent Devkit (ADK) is an open-source QA and product-delivery platform driven by AI assistants. It combines a knowledge base, specs, test plans, agents, design prototypes and Playwright E2E automation in shared workspaces, and exposes everything to Claude, Codex and other assistants through an MCP server.

Hosting Agent Devkit means running five connected services: a PostgreSQL database, the REST API, the React web app, a remote MCP server and a Playwright E2E worker. This template provisions all of them in one click, generates every secret (encryption key, worker token, OAuth secret) and wires the services together over Railway's private network. When the deploy finishes, you open the Web service, create your account and first workspace, and connect your AI assistant through the ADK CLI or the remote MCP endpoint. SMTP and Google/GitHub OAuth are optional and can be added later.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | [lucaseduardocrp/Agent-Development-Kit](https://github.com/lucaseduardocrp/Agent-Development-Kit) (root: /apps/Backend) | Web service |
| E2E Worker - Playwright  | [lucaseduardocrp/Agent-Development-Kit](https://github.com/lucaseduardocrp/Agent-Development-Kit) (root: /apps/Backend) | Web service |
| ADK MCP | [lucaseduardocrp/Agent-Development-Kit](https://github.com/lucaseduardocrp/Agent-Development-Kit) (root: /apps/Mcp) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Frontend | [lucaseduardocrp/Agent-Development-Kit](https://github.com/lucaseduardocrp/Agent-Development-Kit) (root: /apps/Frontend) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | Backend | - | Runtime mode of the API. Keep as `production`. |
| `SMTP_URL` | Backend | - | Optional. SMTP connection URL (for example `smtp://user:pass@host:587`) used to send password-recovery emails. Leave empty to disable email. |
| `LOG_LEVEL` | Backend | - | Verbosity of API logs (`error`, `warn`, `info` or `debug`). Use `info` unless you are troubleshooting. |
| `SMTP_FROM` | Backend | - | Optional. Sender address shown on emails sent by ADK (for example `ADK <no-reply@example.com>`). Only used when `SMTP_URL` is set. |
| `E2E_R2_URL` | Backend | - | Optional. S3-compatible endpoint of your Cloudflare R2 bucket for E2E videos and screenshots. Leave empty to store artifacts in PostgreSQL. (verify) |
| `DATABASE_URL` | Backend | - | PostgreSQL connection string. Filled in automatically from the Postgres service over Railway's private network. |
| `E2E_WORKER_URL` | Backend | - | Internal URL of the E2E Worker service, used by the API to dispatch Playwright runs. Filled in automatically. |
| `E2E_WORKER_TOKEN` | Backend | (secret) | Shared secret between the API and the E2E Worker. Generated automatically; must match the worker's value. |
| `DATABASE_PROVIDER` | Backend | - | Database engine used by Prisma. Keep as `postgresql`. (verify) |
| `E2E_R2_ACCESS_KEY_ID` | Backend | - | Optional. Access key ID of your R2 API token. Only needed when using R2 storage. |
| `E2E_R2_SECRET_ACCESS_KEY` | Backend | (secret) | Optional. Secret access key of your R2 API token. Only needed when using R2 storage. |
| `INTEGRATION_ENCRYPTION_KEY` | Backend | - | Secret used to encrypt stored integration credentials (Azure DevOps, test-management tools). Generated automatically; do not change it after first use, or saved integrations become unreadable. |
| `E2E_R2_URL` | E2E Worker - Playwright  | - | Optional. S3-compatible endpoint of your Cloudflare R2 bucket. Must match the API's value. Leave empty to use PostgreSQL storage. (verify) |
| `DATABASE_URL` | E2E Worker - Playwright  | - | PostgreSQL connection string, shared with the API. Filled in automatically. |
| `E2E_WORKER_TOKEN` | E2E Worker - Playwright  | (secret) | Shared secret used to authenticate requests from the API. Filled in automatically; must match the API's value. |
| `E2E_R2_ACCESS_KEY_ID` | E2E Worker - Playwright  | - | Optional. R2 access key ID. Must match the API's value. |
| `E2E_WORKER_CONCURRENCY` | E2E Worker - Playwright  | - | Maximum number of Playwright runs executed at the same time. Start with `1` or `2`; raise it only if the service has enough CPU and memory. |
| `E2E_R2_SECRET_ACCESS_KEY` | E2E Worker - Playwright  | (secret) | Optional. R2 secret access key. Must match the API's value. |
| `INTEGRATION_ENCRYPTION_KEY` | E2E Worker - Playwright  | - | Must be identical to the API's key so the worker can decrypt integration credentials. Filled in automatically from the API service. |
| `ADK_API_URL` | ADK MCP | - | Internal URL of the ADK API that the MCP server talks to. Filled in automatically. |
| `ADK_MCP_PUBLIC_URL` | ADK MCP | - | Public URL of this MCP service (for example `https://your-mcp.up.railway.app`). Used for OAuth redirects when connecting claude.ai and other remote clients. Filled in automatically. |
| `ADK_MCP_OAUTH_SECRET` | ADK MCP | (secret) | Secret used to sign OAuth tokens issued by the MCP server. Generated automatically; keep it private. |
| `POSTGRES_DB` | Postgres | - | Name of the database created for ADK. Default is fine. |
| `DATABASE_URL` | Postgres | - | Full connection string assembled from the values above. Referenced by the API and the E2E Worker. |
| `POSTGRES_USER` | Postgres | (secret) | Database user. Default is fine. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password. Generated automatically. |
| `VITE_API_BASE_URL` | Frontend | - | Public URL of the ADK API that the web app calls from the browser (for example https://your-api.up.railway.app). Filled in automatically from the API service domain. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript, PLpgSQL, Dockerfile, HTML, Shell

[View on Railway →](https://railway.com/deploy/agent-devkit)
