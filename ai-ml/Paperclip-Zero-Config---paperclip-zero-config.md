# Deploy Paperclip (Zero Config) on Railway

Run a company of AI agents. Secure login, Postgres, zero config.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-zero-config)

## About

Paperclip is the open-source app for running a company of AI agents: hire Claude Code, Codex and other agents into an org chart, give them goals and monthly budgets, and review their work from one board. This template deploys it production-ready in one click: login required, Postgres included, every secret pre-generated, nothing to fill in.

Paperclip is a Node.js server with a bundled web UI. It keeps companies, agents, tickets and run history in PostgreSQL, and runs agents as processes inside its own container, using the Claude Code, Codex, OpenCode and Gemini CLIs that ship in the official image. Files, the secrets encryption key and agent workspaces live on a persistent volume.

Hosting it on the internet safely takes more than `docker run`: authenticated mode, a public auth URL, four signing and encryption secrets, a volume with the right permissions, and a one-time invite to create the first admin. This template handles all of it. You click Deploy, open one link from the logs, and you're the owner.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| paperclip-railway | [iaurg/paperclip-railway](https://github.com/iaurg/paperclip-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | paperclip-railway | 3100 | Port Paperclip listens on. Must match the HTTP port in Networking (3100). Leave as is. |
| `DATABASE_URL` | paperclip-railway | - | Connects Paperclip to the included Postgres over Railway's private network. Leave as is. |
| `GEMINI_API_KEY` | paperclip-railway | (secret) | Optional. Lets Gemini CLI agents run. Get a key at https://aistudio.google.com/apikey. You can also add it later inside Paperclip. |
| `OPENAI_API_KEY` | paperclip-railway | (secret) | Optional. Lets Codex agents run. Get a key at https://platform.openai.com/api-keys. You can also add it later inside Paperclip. |
| `ANTHROPIC_API_KEY` | paperclip-railway | (secret) | Optional. Lets Claude Code agents run. Get a key at https://console.anthropic.com/settings/keys. You can also skip it and add keys per agent inside Paperclip later. |
| `BETTER_AUTH_SECRET` | paperclip-railway | (secret) | Signs login sessions. Generated uniquely for your deploy. Leave as is; changing it logs everyone out. |
| `PAPERCLIP_IMAGE_TAG` | paperclip-railway | latest | Paperclip version to run. "latest" uses the newest release when the service builds. Set a release tag from github.com/paperclipai/paperclip/releases to pin a version. |
| `PAPERCLIP_PUBLIC_URL` | paperclip-railway | - | The address you open Paperclip at. Filled from your Railway domain automatically. Change it only if you add a custom domain (e.g. https://agents.example.com). |
| `CLAUDE_CODE_OAUTH_TOKEN` | paperclip-railway | (secret) | Optional. Use your Claude Pro/Max subscription instead of an API key: run `claude setup-token` on a computer where Claude Code is logged in and paste the token here. Leave ANTHROPIC_API_KEY as the placeholder if you use this. |
| `PAPERCLIP_AGENT_JWT_SECRET` | paperclip-railway | (secret) | Signs the short-lived tokens your agents use to talk to Paperclip. Generated for you. Leave as is. |
| `PAPERCLIP_SECRETS_MASTER_KEY` | paperclip-railway | (secret) | Encrypts the API keys and secrets you store in Paperclip. Generated for you. Never change it after deploying, or stored secrets become unreadable. |
| `PAPERCLIP_AUTH_PUBLIC_BASE_URL` | paperclip-railway | - | Login URL. Follows PAPERCLIP_PUBLIC_URL automatically. Leave as is. |
| `PAPERCLIP_TOOL_ACTION_SIGNING_SECRET` | paperclip-railway | (secret) | Signs approvals for agent tool actions. Generated for you. Leave as is. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/paperclip-zero-config)
