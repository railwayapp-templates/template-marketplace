# Deploy Archon on Railway

Archon: AI coding workflows with Claude Code, Codex and Pi, behind a login

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/archon-1)

## About

[Archon](https://github.com/coleam00/Archon) is an open-source tool for running AI coding as fixed workflows: you describe the steps in YAML (investigate an issue, plan, implement, review, open a PR), and Archon runs them with Claude Code, Codex, GitHub Copilot or Pi agents, with build and merge queues and triggers from cron, GitHub, Slack or Telegram. This template runs Archon 0.12.1 on a server, on Postgres, with its web login turned on.

Archon on a public URL runs coding agents on your subscriptions and your repositories, so the login comes first. Archon's own web login (Better Auth) only turns on with Postgres and a secret, and this template sets both: every `/api` call then needs a session. Sign-up is limited to `ARCHON_AUTH_ALLOWED_EMAILS`, and the owner account (`ARCHON_ADMIN_EMAIL` with the generated `ARCHON_ADMIN_PASSWORD`) is created on the first start while Archon listens on localhost only, so the public URL never shows an unclaimed sign-up. `BETTER_AUTH_URL` is set to the public domain, because Railway terminates HTTPS in front of the app and the login otherwise rejects your browser's origin.

The official image already handles the volume: it fixes the ownership of `/.archon` (workspaces, worktrees, artifacts) and drops to its non-root user. Conversations, runs and users live in Postgres.

To give the agents something to work with, set `CLAUDE_CODE_OAUTH_TOKEN` (run `claude setup-token` on your computer to use your Claude subscription) or `CLAUDE_API_KEY`, `CODEX_API_KEY` for Codex, or `OPENROUTER_API_KEY` for the Pi agent and any OpenRouter model. `GH_TOKEN` lets workflows clone, push and open pull requests.

Before publishing I tested it on Railway. `/api/health` answered, the API returned 401 without a session, and Archon reported sign-up as allowlist-only. The owner signed in through Archon's login, I set the default agent to Pi with `openrouter/openai/gpt-5-mini`, started a conversation and asked for one exact word, and the agent replied with it in 4 seconds. After restarting Archon and Postgres, sign-in worked and both conversations, with that reply, were still there. I didn't run Claude Code or Codex in the test, since I had no keys for them there.

Pi needs its model tiers set before it can answer (Archon ships tier defaults only for Claude and Codex): AI Settings, then Model Tiers, in the web UI.

Idle, it used about 0.15 GB of RAM for Archon and 0.1 GB for Postgres, a few dollars a month on Railway's usage pricing. Workflows use more while agents run, and the browser tool starts a Chromium.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Archon | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /archon) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Archon | 3000 | Port Railway routes to |
| `GH_TOKEN` | Archon | (secret) | Optional: GitHub token, so workflows can clone, push and open PRs |
| `ARCHON_URL` | Archon | - | Open this and sign in with ARCHON_ADMIN_EMAIL and ARCHON_ADMIN_PASSWORD |
| `DATABASE_URL` | Archon | - | Postgres over the private network |
| `CODEX_API_KEY` | Archon | (secret) | Optional: an OpenAI API key for Codex |
| `CLAUDE_API_KEY` | Archon | (secret) | Optional: an Anthropic API key instead of the subscription token |
| `BETTER_AUTH_URL` | Archon | - | Public URL the login checks requests against (Railway terminates HTTPS in front); set your custom domain here if you add one |
| `ARCHON_ADMIN_EMAIL` | Archon | - | Your email: the owner account, created on the first start |
| `BETTER_AUTH_SECRET` | Archon | (secret) | Signs login sessions (generated); with Postgres it turns Archon's web login on |
| `OPENROUTER_API_KEY` | Archon | (secret) | Optional: OpenRouter key for the Pi agent (any OpenRouter model) |
| `DEFAULT_AI_ASSISTANT` | Archon | claude | Default agent: claude, codex, copilot or pi |
| `ARCHON_ADMIN_PASSWORD` | Archon | (secret) | Its password (generated). Used once at first start |
| `CLAUDE_CODE_OAUTH_TOKEN` | Archon | (secret) | Optional: your Claude subscription token (run `claude setup-token` on your computer) |
| `ARCHON_AUTH_ALLOWED_EMAILS` | Archon | - | Emails allowed to sign up, comma-separated. Add teammates here |
| `POSTGRES_DB` | Postgres | archon | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/.archon`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Tags:** archon, claude-code, codex, ai-coding, coding-agent, workflows · **Languages:** Shell, Dockerfile, JavaScript, TypeScript

[View on Railway →](https://railway.com/deploy/archon-1)
