# Deploy Multica — Self-Hosted AI Agent Teammates on Railway

Assign tasks to Claude Code & Codex agents — self-hosted platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica-agent-platform)

## About

Multica is an open-source managed agents platform — it turns coding agents into teammates you assign work to, rather than tools you prompt one request at a time. Create tasks, route them to Claude Code, Codex, OpenClaw, or OpenCode, track progress, and build up reusable skills across a team. Think project management for human + agent teams, fully self-hosted.

This template deploys the three-tier stack: a Go backend, a Next.js frontend, and pgvector-enabled PostgreSQL.

---

One thing to understand before deploying: **Multica on Railway is the control plane, not the execution environment.** The server orchestrates tasks, stores state, and hosts the workspace UI — but agents run on machines you register as runtimes. Each team member installs the `multica` CLI locally, connects it to your Railway instance, and their machine appears under Settings → Runtimes.

That architecture is deliberate. Agents get real access to local repositories, tooling, and credentials without any of that being uploaded to a server. It also means a fresh deployment will sit idle until at least one runtime is registered — expected behaviour, not a broken install.

The other requirement is `FRONTEND_ORIGIN`. Multica's task updates stream over WebSockets, and for public deployments the backend must know your real frontend domain or the connection is refused. This is the most common failure on a hosted install: the UI loads, but nothing updates in real time.

Multica is fully open source, so you bring your own LLM provider, swap agent backends, and audit exactly how tasks are routed. Nothing leaves your infrastructure except the model calls your agents make.

Typical cost: **~$10–20/month** on Railway across all three services, plus your LLM provider's usage. There is no per-seat licence for the self-hosted version.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg17` | Database |
| Frontend | [RockinPaul/multica_railway_template](https://github.com/RockinPaul/multica_railway_template) | Web service |
| Backend | [RockinPaul/multica_railway_template](https://github.com/RockinPaul/multica_railway_template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pgvector | multica | - |
| `POSTGRES_USER` | pgvector | (secret) | - |
| `POSTGRES_PASSWORD` | pgvector | (secret) | - |
| `PORT` | Frontend | 3000 | - |
| `DOCS_URL` | Frontend | https://multica.ai | - |
| `HOSTNAME` | Frontend | 0.0.0.0 | - |
| `NEXT_PUBLIC_APP_VERSION` | Frontend | railway-template | - |
| `PORT` | Backend | 8080 | - |
| `APP_ENV` | Backend | production | - |
| `JWT_SECRET` | Backend | (secret) | - |
| `ALLOW_SIGNUP` | Backend | true | - |
| `ALLOWED_EMAILS` | Backend | - | Comma-separated list of specific email addresses allowed to sign up. |
| `RESEND_API_KEY` | Backend | (secret) | API key for the Resend email delivery service (optional for local logs). |
| `GOOGLE_CLIENT_ID` | Backend | - | The Google OAuth2 Client ID for social authentication. |
| `LOCAL_UPLOAD_DIR` | Backend | /app/data/uploads | - |
| `RESEND_FROM_EMAIL` | Backend | - | The verified sender email address for Resend notifications. |
| `ANALYTICS_DISABLED` | Backend | true | - |
| `DATABASE_MAX_CONNS` | Backend | 10 | - |
| `DATABASE_MIN_CONNS` | Backend | 2 | - |
| `GOOGLE_CLIENT_SECRET` | Backend | (secret) | The Google OAuth2 Client Secret for social authentication. |
| `ALLOWED_EMAIL_DOMAINS` | Backend | - | Comma-separated list of email domains (e.g., company.com) allowed to sign up. |
| `REALTIME_METRICS_TOKEN` | Backend | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/uploads`

**Category:** AI/ML · **Languages:** TypeScript, Go, MDX, CSS, JavaScript, Shell, PowerShell, Makefile, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/multica-agent-platform)
