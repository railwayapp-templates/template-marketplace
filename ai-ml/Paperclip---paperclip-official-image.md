# Deploy Paperclip on Railway

Run a team of AI agents: Claude Code, Codex and more, with Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-official-image)

## About

[Paperclip](https://github.com/paperclipai/paperclip) (MIT) runs a company of AI agents. You hire agents such as Claude Code, Codex, OpenCode or Gemini CLI, give them roles, managers and budgets, and assign them tasks. Each agent wakes on a heartbeat, works in its own workspace and reports back in the task thread.

This template runs Paperclip's official image, which already has those agent CLIs installed, in the login-required mode upstream documents for internet-facing servers, with a Railway Postgres for the data.

Paperclip's docs say a public instance can't be claimed from the browser: the first admin needs a one-time invite from `paperclipai auth bootstrap-ceo`. The official image can't run that command as shipped, so this template adds one start step that creates the same invite and prints the link in the deploy logs of the paperclip service. Only members of your Railway project can read those logs.

When the deploy finishes, open the paperclip service, then Deployments, then the logs of the latest deploy, and look for the lines starting with `[railway-bootstrap]`. Open the link, create your account, and you're the instance admin. The link works once and expires after 72 hours. Until someone uses it, every restart prints a new link and cancels the old one; after that the step logs "instance already has an admin" and does nothing.

Then add your model credentials in Paperclip and hire your first agent. On a public instance Paperclip runs in strict secret mode, so API keys go into its encrypted secrets store and agents get references to them, not the raw values.

Before publishing I deployed the template and drove it through the API. `/api/health` answers without a login and the rest of the API returns 403. The invite link was in the logs; signing up and accepting it made me instance admin, and the same link returned 404 afterwards. A second account that signed up without an invite saw an empty company list. I created a company and a Claude Code agent, assigned it a task, and 33 seconds later it had commented on the task and marked it done. After a redeploy the companies were still there and no new invite was printed.

I routed Claude through OpenRouter for that test (Claude Haiku 4.5). With OpenRouter, Claude's default ACP engine stalled until the 5 minute timeout, and switching the agent's engine to `cli` fixed it. I haven't tested ACP with a direct Anthropic key or a Claude subscription. The first heartbeat cost $0.21, mostly from loading about 30,000 tokens of Paperclip context.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperclip | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /paperclip) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | paperclip | 3100 | Port of the board (web UI and API) |
| `DATABASE_URL` | paperclip | - | Railway Postgres over the private network |
| `PAPERCLIP_URL` | paperclip | - | Your board. The first admin's invite link is in this service's deploy logs |
| `BETTER_AUTH_SECRET` | paperclip | (secret) | Signs login sessions (generated) |
| `PAPERCLIP_PUBLIC_URL` | paperclip | - | Public URL Paperclip uses for logins and invite links |
| `PAPERCLIP_DEPLOYMENT_MODE` | paperclip | authenticated | Login required (upstream's mode for servers) |
| `HEARTBEAT_SCHEDULER_ENABLED` | paperclip | true | Wake agents on their schedules |
| `PAPERCLIP_SECRETS_MASTER_KEY` | paperclip | (secret) | Encrypts the API keys and tokens you store in Paperclip (generated). Keep it: stored secrets can't be read without it |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | paperclip | public | Internet-facing: stricter checks, no browser claim of the instance |
| `PAPERCLIP_MIGRATION_AUTO_APPLY` | paperclip | true | Apply database migrations on start, so redeploying moves you to the newest release |
| `POSTGRES_DB` | Postgres | paperclip | Database name |
| `DATABASE_URL` | Postgres | - | Private connection string used by Paperclip |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Tags:** paperclip, ai-agents, claude-code, codex, orchestration, postgres · **Languages:** Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/paperclip-official-image)
