# Deploy DeerFlow on Railway

AI assistant that researches topics and writes reports for you

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deer-flow)

## About

DeerFlow is ByteDance's open-source super-agent harness. Give it a goal in plain language and a lead agent plans the work, searches the web, reads and writes files, delegates to sub-agents, and returns a finished piece of work — a cited briefing, a slide deck, a chart, a podcast script. Its abilities come from Markdown *skills*, twenty-two of which ship in the box, and it is model-agnostic: OpenAI, Anthropic, Gemini, DeepSeek, or your own vLLM endpoint. MIT-licensed, and number one on GitHub Trending when version 2 landed.

Deploy DeerFlow on Railway and the four services it needs are wired together for you. An nginx edge service takes the public domain and splits it between the Next.js frontend and the FastAPI gateway, since DeerFlow serves UI and API on one origin. The gateway runs the agent and keeps threads, checkpoints, users, and run events in managed Postgres, with a volume for thread workspaces, uploads, and memory. Self-host DeerFlow this way and you skip the parts everyone gets wrong: the config file, the skills directory, and the routing table. Images build from [gridalpha/deerflow-railway](https://github.com/gridalpha/deerflow-railway).

![Diagram of the DeerFlow proxy, gateway, frontend and Postgres services](https://res.cloudinary.com/rroe4rtk/image/upload/v1787440230/deerflow-architecture.png)

Version 2 is a ground-up rewrite of what began as a deep-research framework. Teams self-host it when the research is sensitive, when they want their own model contract rather than a per-seat subscription, or when they need private skills.

- **Skills** — Markdown files teaching a workflow: deep research, literature review, charts, slides, podcasts, front-end design.
- **Sub-agents** — bounded work delegated to children with their own turn and time budgets, so long tasks outlive one context window.
- **Long-term memory** — facts learned across conversations feed later prompts.
- **Any model, plus MCP** — the OpenAI protocol, native Anthropic and Gemini, external tools over the Model Context Protocol, and custom agents with their own prompt and tools.

**deerflow** is the only public service; it owns the domain and routes `/api/*` to the gateway, everything else to the frontend. **gateway** runs the agent loop and streams results. **frontend** is the Next.js UI. **Postgres** stores users, threads, checkpoints, and run traces; the gateway's volume holds each thread's files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | [gridalpha/deerflow-railway](https://github.com/gridalpha/deerflow-railway) | Database |
| deerflow | [gridalpha/deerflow-railway](https://github.com/gridalpha/deerflow-railway) | Web service |
| frontend | `ghcr.io/bytedance/deer-flow-frontend:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gateway | 8001 | FastAPI listening port |
| `LLM_MODEL` | gateway | gpt-5 | Model id for the OpenAI-compatible entry |
| `LLM_API_KEY` | gateway | (secret) | Set to use the OpenAI-compatible entry |
| `DATABASE_URL` | gateway | - | Postgres connection string |
| `GEMINI_MODEL` | gateway | gemini-2.5-flash | Model id for the Gemini entry |
| `LLM_BASE_URL` | gateway | https://api.openai.com/v1 | Any OpenAI-compatible endpoint |
| `DEER_FLOW_ENV` | gateway | production | Blocks the auth-bypass switch |
| `GEMINI_API_KEY` | gateway | (secret) | Set to use the Gemini entry |
| `ANTHROPIC_MODEL` | gateway | claude-sonnet-4-6 | Model id for the Anthropic entry |
| `AUTH_JWT_SECRET` | gateway | (secret) | Session token signing key |
| `GATEWAY_WORKERS` | gateway | 1 | Run state is worker-local, keep at 1 |
| `ANTHROPIC_API_KEY` | gateway | (secret) | Set to use the Anthropic entry |
| `GATEWAY_ENABLE_DOCS` | gateway | false | Swagger UI, ReDoc, OpenAPI schema |
| `DEERFLOW_ADMIN_EMAIL` | gateway | admin@deerflow.app | First admin account, seeded at boot |
| `DEERFLOW_ADMIN_PASSWORD` | gateway | (secret) | First admin password, 8+ characters |
| `PORT` | deerflow | 2026 | nginx listening port |
| `GATEWAY_UPSTREAM` | deerflow | - | Gateway host and port |
| `FRONTEND_UPSTREAM` | deerflow | - | Frontend host and port |
| `DEERFLOW_ALLOW_REGISTRATION` | deerflow | false | Public sign-up, off by default |
| `PORT` | frontend | 3000 | Next.js listening port |
| `BETTER_AUTH_SECRET` | frontend | (secret) | Frontend session signing key |
| `DEER_FLOW_TRUSTED_ORIGINS` | frontend | - | Allowed browser origin |
| `DEER_FLOW_INTERNAL_GATEWAY_BASE_URL` | frontend | - | Gateway base URL for SSR |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/app/backend/.deer-flow`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell, Python

[View on Railway →](https://railway.com/deploy/deer-flow)
