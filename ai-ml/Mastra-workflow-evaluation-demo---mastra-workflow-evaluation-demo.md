# Deploy Mastra workflow evaluation demo on Railway

Deterministic Mastra memory and human approval workflow demo.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastra-workflow-evaluation-demo)

## About

Deterministic Mastra memory and human approval workflow demo.

This single-operator evaluation recipe combines a typed [Mastra](https://mastra.ai/) API with private [PostgreSQL](https://www.postgresql.org/) storage. It persists conversations and workflow snapshots, and demonstrates explicit human approval before a SQL-idempotent ledger effect. It does not ship public Studio or claim automatic recovery of arbitrary in-flight work.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastra API | [tech-progress/mastra-agent-postgres](https://github.com/tech-progress/mastra-agent-postgres) (branch: release-v1) (root: /) | Web service |
| Postgres | `postgres:17.11-bookworm@sha256:639ab7ceb90e13123085b741fb31ef493fba25463002f6da665352e7b534b652` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mastra API | 3000 | HTTP port exposed by the API service; Railway health checks use this port. |
| `API_TOKEN` | Mastra API | (secret) | Generated shared operator bearer token, at least 32 characters; protects all agent and workflow APIs. |
| `DATABASE_URL` | Mastra API | - | Private PostgreSQL connection reference. Credentials must be URL-safe or encoded. |
| `DO_NOT_TRACK` | Mastra API | 1 | Requests dependency telemetry opt-out. |
| `OPENAI_MODEL` | Mastra API | gpt-4.1-mini | Operator-selected OpenAI chat model; default gpt-4.1-mini incurs provider charges. |
| `MODEL_PROVIDER` | Mastra API | offline-fixture | offline-fixture is a deterministic evaluation test double, not an LLM. Optional openai integration is unverified and requires an authorized key. |
| `OPENAI_API_KEY` | Mastra API | (secret) | Optional in the default fixture mode. Required real operator-supplied key when selecting openai; startup then fails without it and calls incur provider charges. |
| `MASTRA_TELEMETRY_DISABLED` | Mastra API | 1 | Disables Mastra CLI telemetry. |
| `PORT` | Postgres | 5432 | Private PostgreSQL TCP port. Never publish a database service domain or TCP proxy. |
| `POSTGRES_DB` | Postgres | mastra | Persistent database for conversation messages, workflow snapshots, approvals and ledger effects. |
| `POSTGRES_USER` | Postgres | (secret) | Database owner used by the template; separate roles are recommended before production. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated URL-safe PostgreSQL password. Preserve with the database volume. |

## Configuration

- **Start command:** `node .mastra/output/index.mjs`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** JavaScript, TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mastra-workflow-evaluation-demo)
