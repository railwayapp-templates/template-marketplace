# Deploy Paperclip on Railway

Paperclip [Oct'26] — run Claude Code and Codex agent teams on Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-agent-orchestration)

## About

Paperclip is an open-source Node.js and React app for running a team of AI agents as an organisation. Hire Claude Code, Codex, OpenCode or Gemini agents into an org chart, give them roles, managers, budgets and long-lived goals, then approve and audit their work from one board. This template deploys it with Postgres and a volume holding the thing the quickstart glosses over: agent credentials.

Paperclip self-hosts cleanly. Getting agents to actually authenticate is where every deployment stalls, and the obvious route is the one that does not work.

**The in-UI login buttons do not work on a self-hosted instance.** Paperclip's in-browser sign-in flows for Claude and Codex each acquire a sandbox lease, and sandbox providers are not bundled in the self-hosted image. Clicking them is the first thing anyone tries, and it fails. Authenticate out of band: `CLAUDE_CODE_OAUTH_TOKEN` or `ANTHROPIC_API_KEY` for Claude, and for Codex, `railway ssh` into the service and run `codex login` there.

**Codex credentials land in a specific place, and ownership matters.** The image sets `HOME=/paperclip`, so a login inside the container writes to `/paperclip/.codex` — on the volume, surviving restarts. Follow it with `chown -R node:node /paperclip/.codex` or the agent fails with `configuration_incomplete` and a message about no Codex credentials for the managed home, which reads like a missing login rather than a permissions fault.

**Agents run inside your container, not in a sandbox.** Budgets and approvals are real and useful, but they cap spend, not reach. An agent working a task has the container's filesystem and whatever credentials you put there. Give scoped repository access rather than broad tokens, and decide what you are comfortable with before assigning a long-lived goal.

**Subscription auth is cheaper and raises a question worth answering.** `CLAUDE_CODE_OAUTH_TOKEN` bills agent work against your Claude Pro or Max plan rather than metered API, which changes the economics substantially. Those are individual subscriptions, and driving a standing team of agents from one on a server is worth checking against your provider's terms first.

**One gigabyte is not enough.** Railway's trial caps each service at 1 GB, and because agents run inside the Paperclip container rather than beside it, memory scales with how many work at once. Budget for concurrency, not the idle server.

**Autonomy is the feature and the risk.** Long-lived goals mean agents act while nobody watches. Set per-agent budgets and approval gates before the first goal, not after the first surprise — overspend pausing an agent is a backstop, not a plan.

Typical cost: **~$25–45/month** for Paperclip and Postgres at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes, driven almost entirely by concurrent agent memory. Model usage bills separately to your provider or your subscription.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| paperclip | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
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

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`

**Category:** AI/ML · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/paperclip-agent-orchestration)
