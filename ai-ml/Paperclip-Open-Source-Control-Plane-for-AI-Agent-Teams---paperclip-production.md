# Deploy Paperclip | Open-Source Control Plane for AI Agent Teams on Railway

Run a company of AI agents: org chart, goals, budgets, approvals. Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-production?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=paperclip-production)

[Paperclip](https://paperclip.ing) is an open-source control plane for teams of AI agents. You set up a company with a goal, hire agents into an org chart (a CEO, engineers, a marketer), give them budgets and approval rules, and they work through issues on a schedule. Claude Code, Codex, OpenCode and Gemini CLI run inside the container as agents, and you watch and steer it all from a web dashboard. It is MIT licensed.

This template runs the official Paperclip image against Railway Postgres:

| Service | What it does |
|---|---|
| **Paperclip** | The Paperclip server and web UI, plus the agent CLIs (Claude Code, Codex, OpenCode, Gemini CLI). Its volume holds agent workspaces, CLI logins, uploaded files and hourly database backups. |
| **Postgres** | PostgreSQL 17 on a volume. |

Paperclip's Docker setup is built for a private network: the first visitor claims the instance from the browser. On a public Railway URL that would be a race, so this template sets it up for public use:

- **Admin account from variables.** On first boot a small step creates your admin account from `ADMIN_EMAIL` and the generated `ADMIN_PASSWORD`, through Paperclip's own sign-up, and makes it the instance admin. Nothing is claimable from the browser.
- **Public mode.** Paperclip runs in `authenticated` mode with public exposure: every page needs a login, and the public URL is set to your Railway domain so sign-in, invite links and agent callbacks work over HTTPS.
- **Strangers can't do anything.** Anyone can create an account on the sign-in page (Paperclip needs that for invites), but without an invite to a company they see an empty instance and can't create one. Only the instance admin can.
- **Real client IPs.** Paperclip trusts one proxy hop, so its per-IP rate limits see each visitor instead of Railway's edge.
- **Migrations on boot.** Database migrations apply automatically on start, so upgrades are just a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Paperclip | [two-workspaces/paperclip](https://github.com/two-workspaces/paperclip) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | paperclip | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `PORT` | Paperclip | 3100 | Port Paperclip listens on. Leave as is. |
| `ADMIN_EMAIL` | Paperclip | - | Email for the first admin account, created on first boot. You sign in with it and ADMIN_PASSWORD. |
| `DATABASE_URL` | Paperclip | - | Postgres connection over Railway's private network. |
| `ADMIN_PASSWORD` | Paperclip | (secret) | Password for the first admin account. Generated; read it here after deploy. Only used on first boot - change it in Paperclip afterwards. |
| `OPENAI_API_KEY` | Paperclip | (secret) | Optional. OpenAI API key for Codex agents (and OpenCode). |
| `ANTHROPIC_API_KEY` | Paperclip | (secret) | Optional. Anthropic API key for Claude Code agents. Or set CLAUDE_CODE_OAUTH_TOKEN to use a Claude subscription. |
| `PAPERCLIP_VERSION` | Paperclip | 2026.1012.0 | Paperclip image tag to build from (github.com/paperclipai/paperclip/releases, without the v). Raise it and redeploy to upgrade; migrations run on start. |
| `BETTER_AUTH_SECRET` | Paperclip | (secret) | Signs sessions and agent tokens. Generated; changing it signs everyone out. |
| `PAPERCLIP_PUBLIC_URL` | Paperclip | - | Public URL of this instance, used for sign-in, invite links and agent callbacks. Change it if you add a custom domain. |
| `CLAUDE_CODE_OAUTH_TOKEN` | Paperclip | (secret) | Optional. Claude subscription token for Claude Code agents, from `claude setup-token` on your machine. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/paperclip-production)
