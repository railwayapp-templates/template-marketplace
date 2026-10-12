# Deploy Paperclip AI Company HQ on Railway

Run a team of AI agents with goals, budgets and org charts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-ai-company-hq)

## About

Paperclip is an open-source control plane for running a company staffed by AI agents. You set goals, an org chart and budgets, then hire agents such as Claude Code, Codex, OpenCode or Gemini CLI that work through tasks on a schedule and ask for your approval when needed. This template runs it with Postgres, a volume and object storage.

Paperclip runs a Node.js server that serves the board UI and API, wakes agents on heartbeats and launches their CLIs as local processes. It needs Postgres for companies, agents, tasks and users, a persistent home directory for agent workspaces, CLI logins and backups, and somewhere durable for attachments. This community template uses the official `ghcr.io/paperclipai/paperclip` image pinned to a release, Railway Postgres on the private network, a volume at `/paperclip` and a Railway Bucket through Paperclip's S3 storage provider. It runs in authenticated mode with every signing secret generated for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Paperclip | `ghcr.io/paperclipai/paperclip:2026.1005.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Paperclip | 0.0.0.0 | Listen on all interfaces so Railway's edge and private network can reach the server. |
| `PORT` | Paperclip | 3100 | Port the Paperclip server listens on; the public domain targets it. |
| `TRUST_PROXY` | Paperclip | 1 | Trust exactly one proxy hop (Railway's edge) for client IPs used by rate limiting. |
| `DATABASE_URL` | Paperclip | - | Postgres connection string on the private network (replaces the embedded database). |
| `GEMINI_API_KEY` | Paperclip | (secret) | Optional. Gemini API key (must be restricted to the Gemini API) for gemini_local agents. |
| `OPENAI_API_KEY` | Paperclip | (secret) | Optional. Lets codex_local agents run with an API key; alternatively `codex login --device-auth` via Railway SSH. |
| `ANTHROPIC_API_KEY` | Paperclip | (secret) | Optional. Lets claude_local agents run with an API key; alternatively run `claude` login via Railway SSH (stored on the volume). |
| `AWS_ACCESS_KEY_ID` | Paperclip | - | Bucket access key (read by the AWS SDK). |
| `BETTER_AUTH_SECRET` | Paperclip | (secret) | Session signing secret for Better Auth (generated). |
| `PAPERCLIP_PUBLIC_URL` | Paperclip | - | Canonical public URL for auth callbacks, invite links and the hostname allow-list. Change it when you add a custom domain. |
| `AWS_SECRET_ACCESS_KEY` | Paperclip | (secret) | Bucket secret key (read by the AWS SDK). |
| `PAPERCLIP_DEPLOYMENT_MODE` | Paperclip | authenticated | Login required (Better Auth). Never use local_trusted on a public URL. |
| `PAPERCLIP_AGENT_JWT_SECRET` | Paperclip | (secret) | Signing secret for short-lived agent API tokens (generated, kept separate from the session secret). |
| `PAPERCLIP_STORAGE_PROVIDER` | Paperclip | s3 | Store attachments and uploads in the Railway Bucket instead of the volume. |
| `PAPERCLIP_ALLOWED_HOSTNAMES` | Paperclip | - | Extra hostnames accepted by the private-host guard: Railway's healthcheck and the private network. The public URL host is added automatically. |
| `PAPERCLIP_STORAGE_S3_BUCKET` | Paperclip | - | Bucket name. |
| `PAPERCLIP_STORAGE_S3_PREFIX` | Paperclip | paperclip | Key prefix inside the bucket. |
| `PAPERCLIP_STORAGE_S3_REGION` | Paperclip | - | Bucket region. |
| `PAPERCLIP_SECRETS_MASTER_KEY` | Paperclip | (secret) | 32-byte (64 hex) key encrypting company secrets in Postgres. Back it up; losing it makes stored secrets unreadable. |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | Paperclip | private | Upstream's appliance mode: enables the browser 'Claim this instance' first-admin flow and the hostname allow-list. |
| `PAPERCLIP_STORAGE_S3_ENDPOINT` | Paperclip | - | S3 endpoint of the Railway Bucket (virtual-hosted style). |
| `PAPERCLIP_MIGRATION_AUTO_APPLY` | Paperclip | true | Apply database migrations automatically on start and upgrade. |
| `PAPERCLIP_AUTH_RATE_LIMIT_ENABLED` | Paperclip | true | Rate-limit sign-in attempts (off by default in private mode upstream). |
| `PAPERCLIP_TOOL_ACTION_SIGNING_SECRET` | Paperclip | (secret) | Signs tool-action approvals. Without it approvals cannot be issued (generated). |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Tags:** paperclip, ai-agents, multi-agent, claude-code, codex

[View on Railway →](https://railway.com/deploy/paperclip-ai-company-hq)
