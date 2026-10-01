# Deploy Paperclip AI Teams on Railway

Run AI agent teams (Claude Code, Codex). Owner seeded, invite-only sign-up.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-ai-teams)

## About

Paperclip is the open-source app for running a company of AI agents: hire Claude Code, Codex, OpenCode or Gemini
agents into an org chart, give them goals and budgets, approve their work and audit every run from one board. This
template deploys it ready for the internet: you are the owner from the first second, and nobody can create an
account without your invitation. It is a community-maintained template and is not affiliated with the Paperclip
project.

Paperclip is a Node.js server with a bundled web UI, backed by PostgreSQL. It runs agents as processes inside its
own container, using the agent CLIs that ship in its official image, and keeps uploads, agent workspaces and run
logs on disk.

A stock Paperclip on a public URL has two problems: someone has to become the first admin (either whoever signs up
first, or an operator running a CLI command and copying an invite from the logs), and anyone who finds the URL can
create an account. Paperclip's only switch against the second problem also breaks its invitation links.

This template creates your owner account from the email you enter and a generated password, and makes it the
instance admin before the app answers on its URL. Sign-up is then allowed only from a live invitation link, so
inviting teammates keeps working while walk-up sign-up is refused. Everything else runs from the official
Paperclip image, pinned by digest and unmodified.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperclip | `ghcr.io/youssefsiam38/paperclip-railway:1.2.0` | Web service |
| db | `postgres:18.2-alpine3.23` | Database |
| storage | `ghcr.io/youssefsiam38/paperclip-railway-storage:1.2.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | paperclip | 3100 | Port Railway routes traffic and health checks to (the front door, 3100). Keep it. |
| `ADMIN_NAME` | paperclip | Owner | Display name of the owner account. |
| `ADMIN_EMAIL` | paperclip | - | Your email. The owner account is created with it before the app goes live; you sign in with it. |
| `DATABASE_URL` | paperclip | - | PostgreSQL connection string (bundled db service, private network). |
| `ADMIN_PASSWORD` | paperclip | (secret) | The owner's initial password, generated. Copy it from here to sign in; change it in Paperclip later. |
| `GEMINI_API_KEY` | paperclip | (secret) | Optional. Lets Gemini CLI agents run; Google requires a key restricted to the Gemini API. |
| `OPENAI_API_KEY` | paperclip | (secret) | Optional. Lets Codex agents run (platform.openai.com). |
| `ANTHROPIC_API_KEY` | paperclip | (secret) | Optional. Lets Claude Code agents run (console.anthropic.com). Can also be set per agent in Paperclip. |
| `AWS_ACCESS_KEY_ID` | paperclip | - | Storage access key, taken from the storage service. |
| `BETTER_AUTH_SECRET` | paperclip | (secret) | Signs login sessions, generated. Changing it signs everyone out. |
| `PAPERCLIP_PUBLIC_URL` | paperclip | - | The address you open Paperclip at. Change it to https://your.domain after adding a custom domain. |
| `AWS_SECRET_ACCESS_KEY` | paperclip | (secret) | Storage secret key, taken from the storage service. |
| `PAPERCLIP_SIGNUP_MODE` | paperclip | invite-only | invite-only: accounts only from invitation links. closed: nobody else. open: anyone (upstream default). |
| `CLAUDE_CODE_OAUTH_TOKEN` | paperclip | (secret) | Optional. Use a Claude Pro/Max subscription instead of an API key: run `claude setup-token` locally and paste it. |
| `PAPERCLIP_AGENT_JWT_SECRET` | paperclip | (secret) | Signs the short-lived tokens agents use to call Paperclip, generated. |
| `PAPERCLIP_STORAGE_PROVIDER` | paperclip | s3 | s3 stores uploads in the bundled RustFS service; local_disk keeps them on the /paperclip volume. |
| `PAPERCLIP_STORAGE_S3_BUCKET` | paperclip | paperclip | Bucket for uploads; created at start if missing. |
| `PAPERCLIP_STORAGE_S3_REGION` | paperclip | us-east-1 | Region name sent to the S3 API (RustFS accepts any). |
| `PAPERCLIP_SECRETS_MASTER_KEY` | paperclip | (secret) | Encrypts the secrets you store in Paperclip, generated. Never change it after deploying. |
| `PAPERCLIP_STORAGE_S3_ENDPOINT` | paperclip | - | The bundled RustFS S3 API on Railway's private network. |
| `PAPERCLIP_TOOL_ACTION_SIGNING_SECRET` | paperclip | (secret) | Signs approvals for agent tool actions, generated. |
| `PAPERCLIP_STORAGE_S3_FORCE_PATH_STYLE` | paperclip | true | Path-style S3 URLs, required for RustFS on a private hostname. |
| `POSTGRES_DB` | db | paperclip | - |
| `POSTGRES_USER` | db | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | PostgreSQL password, generated. |
| `PORT` | storage | 9000 | RustFS S3 API port on the private network. |
| `RUSTFS_ACCESS_KEY` | storage | - | RustFS access key, generated. |
| `RUSTFS_SECRET_KEY` | storage | (secret) | RustFS secret key, generated. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`
- **Volume:** `/var/lib/postgresql`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/paperclip-ai-teams)
