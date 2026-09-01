# Deploy Claude Agent SDK Worker on Railway

[Sep'26] Scheduled autonomous Claude agents — official SDK + run history

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claude-agent-sdk-worker)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claude-agent-sdk-worker?referralCode=qxxcuG)

Run **scheduled autonomous Claude agents** on your own infrastructure — the official-SDK alternative to OpenClaw and Hermes for recurring jobs. Define tasks in YAML (a cron schedule plus a plain-English prompt), and a worker built on Anthropic's official [`@anthropic-ai/claude-agent-sdk`](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk) runs each one with real tools — web search, web fetch, bash, file access — records every run in Postgres, and shows results on a password-protected status page.

Three example tasks ship enabled-or-ready out of the box: a **daily web-research digest** on any topic you set, a **weekly RSS briefing**, and a **GitHub repo issue triage** report. Each run's full output, cost in dollars, and turn count is stored — you always know what your agents did and what it cost.

**Who it's for:** builders and teams who want recurring AI work (research, monitoring, triage, reporting) running unattended — without gluing together a chat assistant that was never designed for cron jobs.

Two services, wired over Railway's private network:

| Service | Version | Role |
|---|---|---|
| **worker** | Node 22 (image pinned by digest), `@anthropic-ai/claude-agent-sdk` `0.3.241` (exact-pinned) | Schedules tasks with node-cron, runs the agent loop, serves the status page |
| **PostgreSQL** | Railway managed | Run history: status, full output, cost (USD), turn count per run |

The status page (on the worker's public URL, HTTP Basic auth: user `admin`, password from `ADMIN_PASSWORD`) lists every task with its schedule, the last 50 runs with outputs and per-run cost, and a **Run now** button per task. `/runs.json` returns history as JSON; `/healthz` is the unauthenticated healthcheck.

**Setup (~3 minutes):**

1. Click **Deploy Now** and paste your **Anthropic API key** ([console.anthropic.com](https://console.anthropic.com)). The admin password is auto-generated.
2. When the worker goes green, open its URL and log in (`admin` / the `ADMIN_PASSWORD` value from the service's Variables).
3. Set `RESEARCH_TOPIC` (e.g. "my industry + competitors") and `RSS_FEEDS` in Variables — the two starter tasks use them. Press **Run now** to test immediately.
4. Edit tasks any time by setting the `TASKS_YAML` variable (paste a full YAML document — same format as [the default](https://github.com/Kjudeh/claude-agent-worker/blob/main/services/worker/tasks.yaml)). No fork or rebuild of your own needed; the service restarts with the new schedule.

**Task options:** cron `schedule` (in your `TZ`), `prompt` (supports `${VAR}` placeholders resolved from Variables), `model`, `maxTurns`, `allowedTools` (restrict tools per task), `enabled`. Optional `WEBHOOK_URL` posts every successful result as JSON — point it at Slack, Discord, n8n, Zapier, or Make to deliver digests anywhere (including email).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | [Kjudeh/claude-agent-worker](https://github.com/Kjudeh/claude-agent-worker) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ADMIN_PASSWORD` | worker | (secret) |
| `ANTHROPIC_API_KEY` | worker | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/claude-agent-sdk-worker)
