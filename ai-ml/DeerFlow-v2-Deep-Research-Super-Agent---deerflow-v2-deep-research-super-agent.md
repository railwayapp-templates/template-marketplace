# Deploy DeerFlow v2 Deep Research Super Agent on Railway

ByteDance's open-source agent that researches the web and writes reports.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deerflow-v2-deep-research-super-agent)

## About

DeerFlow is ByteDance's open-source (MIT) super-agent harness: give it a goal and a lead agent plans, searches the web, reads sources, delegates to sub-agents and delivers a cited report or other files. This community template runs DeerFlow v2.1.0 on Railway behind one HTTPS URL, with login, Postgres and Redis.

A self-hosted DeerFlow is more than one container. A FastAPI Gateway runs the LangGraph agent runtime, a Next.js frontend serves the workspace, and an nginx edge puts both on one origin. Postgres keeps users, conversations, checkpoints, run history, custom agents and schedules; Redis carries live run events so a reloaded page picks up a running task; a volume holds each thread's uploads, workspace and outputs. This template wires all of it with private networking, pinned upstream images, a generated admin account, closed self-registration and a config file rendered from Railway variables, so adding a model is just adding an API key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Frontend | `ghcr.io/bytedance/deer-flow-frontend:v2.1.0` | Worker |
| Gateway | [baranberkay96/deer-flow-railway](https://github.com/baranberkay96/deer-flow-railway) (branch: main) (root: /services/gateway) | Database |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Nginx | [baranberkay96/deer-flow-railway](https://github.com/baranberkay96/deer-flow-railway) (branch: main) (root: /services/nginx) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Frontend | 3000 | Next.js listen port (Railway health-checks this port). |
| `NODE_ENV` | Frontend | production | Node environment. |
| `BETTER_AUTH_SECRET` | Frontend | (secret) | Frontend session secret required by upstream compose (32+ characters). |
| `NEXT_TELEMETRY_DISABLED` | Frontend | 1 | Disable Next.js telemetry. |
| `DEER_FLOW_TRUSTED_ORIGINS` | Frontend | - | Public browser origin (update when you add a custom domain). |
| `DEER_FLOW_INTERNAL_GATEWAY_BASE_URL` | Frontend | - | Gateway URL used by server-side rendering for auth checks (private network). |
| `PORT` | Gateway | 8001 | Gateway (FastAPI) listen port; Railway health-checks this port. |
| `E2B_API_KEY` | Gateway | (secret) | Optional. E2B key; enables bash/code execution in E2B cloud sandboxes (off without it). |
| `DATABASE_URL` | Gateway | - | Postgres for users, threads, checkpoints, run events, custom agents and scheduled tasks. |
| `GEMINI_MODEL` | Gateway | gemini-2.5-pro | Gemini model id(s), comma-separated. Used only when GEMINI_API_KEY is set. |
| `JINA_API_KEY` | Gateway | (secret) | Optional. Jina Reader key; raises the web_fetch rate limit. |
| `OPENAI_MODEL` | Gateway | gpt-5 | OpenAI model id(s), comma-separated. Used only when OPENAI_API_KEY is set. |
| `DEER_FLOW_ENV` | Gateway | production | Production mode: refuses the DEER_FLOW_AUTH_DISABLED bypass. |
| `DEEPSEEK_MODEL` | Gateway | deepseek-v4-pro | DeepSeek model id(s), comma-separated. Used only when DEEPSEEK_API_KEY is set. |
| `GEMINI_API_KEY` | Gateway | (secret) | Optional. Google AI Studio key; adds GEMINI_MODEL. |
| `OPENAI_API_KEY` | Gateway | (secret) | Optional. OpenAI (or OpenAI-compatible) key; adds OPENAI_MODEL. |
| `TAVILY_API_KEY` | Gateway | (secret) | Optional. Tavily key; replaces keyless DuckDuckGo web search. |
| `ANTHROPIC_MODEL` | Gateway | claude-opus-5-5 | Claude model id(s), comma-separated. Used only when ANTHROPIC_API_KEY is set. |
| `AUTH_JWT_SECRET` | Gateway | (secret) | Signs session tokens. Changing it signs everyone out. |
| `GATEWAY_WORKERS` | Gateway | 1 | Uvicorn workers. Keep 1 (upstream default; run control is in-process). >1 falls back to an IPv4-only listener. |
| `DEEPSEEK_API_KEY` | Gateway | (secret) | Optional. DeepSeek key; adds DEEPSEEK_MODEL. |
| `OPENROUTER_MODEL` | Gateway | openai/gpt-5 | OpenRouter model id(s), comma-separated. Used only when OPENROUTER_API_KEY is set. |
| `ANTHROPIC_API_KEY` | Gateway | (secret) | Optional. Anthropic key; adds Claude models (ANTHROPIC_MODEL). |
| `DEERFLOW_LOG_LEVEL` | Gateway | info | DeerFlow log level (debug, info, warning, error). |
| `DEERFLOW_SCHEDULER` | Gateway | true | Background scheduler for scheduled agent runs. |
| `OPENROUTER_API_KEY` | Gateway | (secret) | Optional. OpenRouter key; adds OPENROUTER_MODEL. |
| `DEERFLOW_AGENTS_API` | Gateway | true | Custom-agent management in the UI (auth is enforced). |
| `GATEWAY_ENABLE_DOCS` | Gateway | false | true exposes Swagger/ReDoc at /docs and /redoc. |
| `AUTH_TRUSTED_PROXIES` | Gateway | 10.0.0.0/8,100.64.0.0/10,172.16.0.0/12,192.168.0.0/16,fc00::/7,::ffff:10.0.0.0/104,::ffff:100.64.0.0/106,::ffff:172.16.0.0/108,::ffff:192.168.0.0/112 | Private ranges (plain and IPv4-mapped) whose X-Real-IP is trusted, i.e. the Nginx service, for the per-IP login lockout. |
| `DEERFLOW_ADMIN_EMAIL` | Gateway | admin@example.com | Login email of the admin account created on first boot. Change before deploying if you like. |
| `GATEWAY_CORS_ORIGINS` | Gateway | - | Allowed browser origin for auth/CSRF checks (add custom domains, comma-separated). |
| `DEERFLOW_DEFAULT_MODEL` | Gateway | - | Optional. Model id to list first (default model). Empty = first configured provider. |
| `DEERFLOW_ADMIN_PASSWORD` | Gateway | (secret) | Password of that admin account (generated). Read it here to sign in. |
| `DEERFLOW_OPENAI_BASE_URL` | Gateway | - | Optional. Base URL of an OpenAI-compatible API (vLLM, Groq, Together, ...); empty = OpenAI. |
| `DEERFLOW_ALLOW_REGISTRATION` | Gateway | false | true lets anyone with the URL create an account and spend your model credits. |
| `DEER_FLOW_INTERNAL_AUTH_TOKEN` | Gateway | (secret) | Internal token for Gateway self-calls (IM channels, scheduler). |
| `DEER_FLOW_STREAM_BRIDGE_REDIS_URL` | Gateway | - | Redis Streams bridge for live run events (SSE resume/replay). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Nginx | 2026 | Port nginx listens on; the public domain targets it. |
| `DEERFLOW_GATEWAY_UPSTREAM` | Nginx | - | Gateway private address (/api/*, /health, API docs). |
| `DEERFLOW_FRONTEND_UPSTREAM` | Nginx | - | Frontend private address (everything else). |
| `DEERFLOW_ALLOW_PUBLIC_SETUP` | Nginx | false | true re-opens the browser /setup page; keep false, the Gateway creates the admin itself. |

## Configuration

- **Healthcheck:** `/`
- **Healthcheck:** `/health/ready`
- **Volume:** `/app/backend/.deer-flow`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Tags:** deerflow, deer-flow, ai-agent, deep-research, langgraph · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/deerflow-v2-deep-research-super-agent)
