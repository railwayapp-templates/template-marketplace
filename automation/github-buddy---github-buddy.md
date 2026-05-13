# Deploy github-buddy on Railway

Supercharge your github with automated reviews, pull requests and context.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/github-buddy)

## About

github-buddy is a webhook-driven GitHub agent that turns your repository into a conversational workspace. It reviews pull requests, implements issues into draft PRs, fixes failing CI, answers `@github-buddy` questions in comment threads, and triages new issues — all by routing each event to the right specialist agent and posting the result back where the conversation started.

Hosting github-buddy means running a small Python service that receives GitHub webhooks on a public HTTPS endpoint, validates each delivery against a shared secret, and dispatches the work — either in-process (explain, CI summarization, issue triage, command routing) or out to sibling specialist agents (PR-AF for deep reviews, SWE-AF for issue-to-PR coding). The service is stateless, runs from a single Dockerfile, exposes a `/health` endpoint, and reads its configuration from environment variables. Railway provisions the container, the public URL you point your GitHub webhook at, and the always-on runtime so the bot stays responsive to repo activity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| control-plane | `agentfield/control-plane:v0.1.84` | Web service |
| github-buddy | [Agent-Field/github-buddy](https://github.com/Agent-Field/github-buddy) | Web service |
| SWE-AF | [Agent-Field/SWE-AF](https://github.com/Agent-Field/SWE-AF) | Worker |
| pr-af | [Agent-Field/pr-af](https://github.com/Agent-Field/pr-af) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `AGENTFIELD_PORT` | control-plane | 8080 | - |
| `AGENTFIELD_API_KEY` | control-plane | (secret) | - |
| `AGENTFIELD_STORAGE_MODE` | control-plane | postgres | - |
| `NODE_ID` | github-buddy | github-buddy | - |
| `AI_MODEL` | github-buddy | openrouter/minimax/minimax-m2.5 | - |
| `AGENTFIELD_API_KEY` | github-buddy | (secret) | - |
| `OPENROUTER_API_KEY` | github-buddy | (secret) | - |
| `GITHUB_WEBHOOK_SECRET` | github-buddy | (secret) | - |
| `GITHUB_BUDDY_POST_REVIEWS` | github-buddy | true | - |
| `PORT` | SWE-AF | 8003 | - |
| `NODE_ID` | SWE-AF | swe-planner | - |
| `GH_TOKEN` | SWE-AF | (secret) | github token (classic or org level token) |
| `EXA_API_KEY` | SWE-AF | (secret) | Required if you want to enable web-search on open-code |
| `HAX_API_KEY` | SWE-AF | (secret) | hax-sdk human in the loop integration |
| `HAX_SDK_URL` | SWE-AF | - | hax-sdk human in the loop integration |
| `SWE_DEFAULT_MODEL` | SWE-AF | openrouter/minimax/minimax-m2.5 | - |
| `AGENTFIELD_API_KEY` | SWE-AF | (secret) | - |
| `AGENT_CALLBACK_URL` | SWE-AF | http://swe-af.railway.internal:8003 | - |
| `OPENROUTER_API_KEY` | SWE-AF | (secret) | - |
| `OPENCODE_ENABLE_EXA` | SWE-AF | - | Required if you want to enable web-search on open-code |
| `SWE_DEFAULT_RUNTIME` | SWE-AF | open_code | - |
| `PORT` | pr-af | 8004 | - |
| `NODE_ID` | pr-af | pr-af | - |
| `GH_TOKEN` | pr-af | (secret) | - |
| `EXA_API_KEY` | pr-af | (secret) | - |
| `PR_AF_MODEL` | pr-af | openrouter/minimax/minimax-m2.5 | - |
| `PR_AF_PROVIDER` | pr-af | opencode | - |
| `PR_AF_NO_BUDGET` | pr-af | true | - |
| `AGENTFIELD_API_KEY` | pr-af | (secret) | - |
| `AGENT_CALLBACK_URL` | pr-af | http://pr-af.railway.internal:8004 | - |
| `OPENROUTER_API_KEY` | pr-af | (secret) | - |
| `OPENCODE_ENABLE_EXA` | pr-af | 1 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Python, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/github-buddy)
