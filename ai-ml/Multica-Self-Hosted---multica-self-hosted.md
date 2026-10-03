# Deploy Multica Self-Hosted on Railway

Humans and AI coding agents on one task board. Sign-up limited to you.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica-self-hosted)

## About

Multica is the open-source task board where people and AI coding agents work as one team. Assign an issue to Claude
Code, Codex, Cursor, OpenCode, Gemini or 20 other agent CLIs the way you would to a colleague; the agent picks it
up, comments, reports back and shows up in the same activity feed as everyone else. This template deploys it ready
for the internet with sign-up limited to you and the people you invite. It is a community-maintained template and
is not affiliated with Multica.

Multica is a Go API with a Next.js web app, backed by PostgreSQL. Agents do not run on the server: each teammate
runs the `multica` daemon on their own machine next to their agent CLIs, and it connects back to the server over
HTTPS and WebSockets to claim work.

A plain deploy of the two official images has three problems on a public URL: anyone who finds it can create an
account, live updates and agent daemons fail because WebSockets don't pass through the web app, and the WebSocket
origin check only trusts localhost. This template puts the API and web app behind one Caddy front door so the
browser, the CLI and every daemon use the same address, limits sign-up to an email allowlist plus invitations, and
sets the production configuration for you. The official images are pinned by digest and used unmodified.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db | `pgvector/pgvector:0.8.7-pg17` | Database |
| multica | `ghcr.io/youssefsiam38/multica-railway:1.0.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | db | multica | - |
| `POSTGRES_USER` | db | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | PostgreSQL password, generated. |
| `PORT` | multica | 8080 | Port Railway routes traffic and health checks to (the front door, 8080). Keep it. |
| `SMTP_HOST` | multica | - | Optional. SMTP server for sign-in codes and invitations. Without SMTP or Resend, codes and invite links are written to this service's logs. |
| `SMTP_PORT` | multica | - | Optional. SMTP port (default 25; 465 uses implicit TLS, others STARTTLS). |
| `JWT_SECRET` | multica | (secret) | Signs login sessions, generated. Changing it signs everyone out. |
| `ALLOW_SIGNUP` | multica | false | true lets anyone who finds the URL create an account (upstream default). Keep false. |
| `DATABASE_URL` | multica | - | PostgreSQL connection string (bundled db service, private network). |
| `DO_NOT_TRACK` | multica | true | true stops the daily anonymous usage snapshot Multica sends to its maintainers. Set false to share it. |
| `SMTP_PASSWORD` | multica | (secret) | Optional. SMTP password. |
| `SMTP_USERNAME` | multica | (secret) | Optional. SMTP user name. |
| `ALLOWED_EMAILS` | multica | - | Your email address (comma-separate several). Only these people, plus anyone you invite, can create an account. |
| `RESEND_API_KEY` | multica | (secret) | Optional. Send email through Resend instead of SMTP (resend.com). |
| `MULTICA_APP_URL` | multica | - | The address you open Multica at; also the server URL for the CLI and agent daemons. Change it to https://your.domain after adding a custom domain. |
| `SMTP_FROM_EMAIL` | multica | - | Optional. Sender address for SMTP mail, e.g. multica@your.domain. Required with SMTP_HOST. |
| `GOOGLE_CLIENT_ID` | multica | - | Optional. Google sign-in. Redirect URI: <MULTICA_APP_URL>/auth/callback. |
| `RESEND_FROM_EMAIL` | multica | - | Optional. Sender address on a domain verified in Resend. |
| `MULTICA_LLM_API_KEY` | multica | (secret) | Optional. OpenAI-compatible key for server-side helpers such as chat titles. |
| `GOOGLE_CLIENT_SECRET` | multica | (secret) | Optional. Google sign-in client secret. |
| `MULTICA_LLM_BASE_URL` | multica | - | Optional. OpenAI-compatible base URL for MULTICA_LLM_API_KEY. |
| `ALLOWED_EMAIL_DOMAINS` | multica | - | Optional. Let everyone with an address at these domains sign up, e.g. yourcompany.com. |
| `MULTICA_VCS_SECRET_KEY` | multica | (secret) | Encrypts stored Git provider tokens, generated. Never change it after connecting a provider. |
| `MULTICA_SLACK_SECRET_KEY` | multica | (secret) | Encrypts Slack bot tokens and enables the Slack integration, generated. Never change it after connecting Slack. |
| `MULTICA_LLM_DEFAULT_MODEL` | multica | - | Optional. Model name for the server-side helpers. |
| `MULTICA_PLUGIN_SECRET_KEY` | multica | (secret) | Encrypts plugin secrets and enables plugin hooks, generated. Never change it after installing plugins. |
| `DISABLE_WORKSPACE_CREATION` | multica | - | Optional. true stops anyone creating new workspaces (create yours first). |
| `MULTICA_TELEGRAM_SECRET_KEY` | multica | (secret) | Encrypts Telegram bot tokens and enables the Telegram integration, generated. Never change it after connecting a bot. |
| `MULTICA_VCS_INTEGRATION_ENABLED` | multica | true | Enables the self-hosted Git provider integration (Forgejo, Gitea, GitLab). |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/multica-self-hosted)
