# Deploy LlamaIndex durable agents on Railway

LlamaIndex approvals with DBOS recovery and private PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llamaindex-durable-agents)

## About

Run an authenticated human-approval workflow using [LlamaIndex Workflows](https://github.com/run-llama/llama-agents) and [DBOS](https://github.com/dbos-inc/dbos-transact-py), with private PostgreSQL persistence. This is a single-operator evaluation recipe.

One Docker-based API searches sample policies, proposes a demo invoice ledger entry, waits for human approval, and records the authorized entry. DBOS persists the real LlamaIndex step runtime, run store and events. A single leased executor identity allows a stopped/crashed process to be replaced against the same database. PostgreSQL stores workflow history, decisions and SQL-idempotent ledger records on a volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LlamaIndex API | [tech-progress/llamaindex-durable-agents](https://github.com/tech-progress/llamaindex-durable-agents) (branch: release-v1) (root: /) | Web service |
| Postgres | `postgres:17.11-bookworm@sha256:639ab7ceb90e13123085b741fb31ef493fba25463002f6da665352e7b534b652` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | LlamaIndex API | 3000 | HTTP routing port; one Uvicorn worker listens here. |
| `API_TOKEN` | LlamaIndex API | (secret) | Generated bearer secret protecting all run, event, debugger and documentation routes. |
| `DATABASE_URL` | LlamaIndex API | - | Private PostgreSQL connection for DBOS runtime, workflow store, events and demo ledger. |
| `OPENAI_MODEL` | LlamaIndex API | gpt-4.1-mini-2025-04-14 | Hosted proposal model; used only in openai mode and incurs provider charges. |
| `PROPOSAL_MODE` | LlamaIndex API | deterministic | deterministic (no external call) or openai (requires a separately supplied OPENAI_API_KEY). |
| `DBOS_EXECUTOR_PREFIX` | LlamaIndex API | llamaindex-approval | Permanent single-slot executor lease prefix; do not change while runs are pending. |
| `OPENAI_TIMEOUT_SECONDS` | LlamaIndex API | 30 | Bounded hosted-model request timeout from 1 to 120 seconds. |
| `PORT` | Postgres | 5432 | Private PostgreSQL listener; never add a public TCP proxy. |
| `POSTGRES_DB` | Postgres | workflows | Dedicated workflow database, including requests, approvals and ledger. |
| `POSTGRES_USER` | Postgres | (secret) | Dedicated database owner used for DBOS and LlamaIndex migrations. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password referenced privately by the API. |

## Configuration

- **Start command:** `/app/start.sh`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/llamaindex-durable-agents)
