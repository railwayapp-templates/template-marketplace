# Deploy Evo AI on Railway

Self-hosted AI agent platform with LangGraph workflows and MCP tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evo-ai)

## About

Evo AI is an open-source platform for building, running and sharing AI agents. It wraps Google's Agent Development Kit (ADK), LangGraph and CrewAI in a visual builder, so an agent is a role, a goal, instructions, a model and the tools it may reach — not a codebase you maintain. Every agent speaks Google's Agent-to-Agent (A2A) protocol and publishes a standard agent card. Teams reach for it when they want one shared place for prompt-and-tool work that product people edit and engineers call over HTTP.

This template lets you deploy Evo AI on Railway as a working stack rather than a single container. It runs four services: the FastAPI backend that executes agents and serves the A2A endpoints, the Next.js frontend people log into, a PostgreSQL database holding agents, tenants and sessions, and Mailpit as the mail server the platform needs for verification and password resets. Both web services get a public domain; Postgres and Mailpit's SMTP listener stay private.

![Diagram of the Evo AI API, frontend, Postgres and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787350996/evo-ai-architecture.png)

Evo AI sits between a no-code agent builder and a framework. Agents are database rows rather than files in a repository, so a non-engineer can adjust a prompt or swap a model without a deploy, and the result is still an HTTP service your code can call. Self-hosting matters because agents carry provider API keys and see whatever data you feed them.

- **Seven agent types** — LLM, A2A, Sequential, Parallel, Loop, Workflow (LangGraph) and Task, composable as sub-agents
- **Model-agnostic** — OpenAI, Anthropic, Gemini, Groq and Cohere keys, encrypted per tenant
- **MCP tools** — a shared catalogue of Model Context Protocol servers (Brave Search, GitHub, GitLab, Sequential Thinking, Firecrawl) grantable per agent
- **A2A protocol** — agent cards, streaming, push notifications and task history
- **Multi-tenant** — an admin manages client organisations and can enter any of them
- **Langfuse tracing** — OpenTelemetry export of prompts, responses and tool calls

`evo-ai-api` does everything — migrations, the REST API, the chat WebSocket, agent execution, the A2A endpoints — and `evo-ai-frontend` calls it from the browser, holding no state. PostgreSQL owns every row, and Mailpit is the mail server the verification flow needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| evo-ai-frontend | [gridalpha/evo-ai-railway](https://github.com/gridalpha/evo-ai-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| evo-ai-api | [gridalpha/evo-ai-railway](https://github.com/gridalpha/evo-ai-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | evo-ai-frontend | 3000 | HTTP port Next.js listens on |
| `NODE_ENV` | evo-ai-frontend | production | Next.js runtime mode |
| `NEXT_PUBLIC_API_URL` | evo-ai-frontend | - | Backend URL called from the browser |
| `NEXT_TELEMETRY_DISABLED` | evo-ai-frontend | 1 | Disables Next.js telemetry |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | mailpit | 8025 | Inbox HTTP port |
| `MP_UI_AUTH` | mailpit | - | Basic auth guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before pruning |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Inbox listener |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Private SMTP listener |
| `HOST` | evo-ai-api | 0.0.0.0 | Bind address |
| `PORT` | evo-ai-api | 8000 | HTTP port the API listens on |
| `API_URL` | evo-ai-api | - | Public API URL used in A2A agent cards |
| `APP_URL` | evo-ai-api | - | Public UI URL used in emailed links |
| `AI_ENGINE` | evo-ai-api | adk | Agent engine, adk or crewai |
| `LOG_LEVEL` | evo-ai-api | INFO | Application log verbosity |
| `SMTP_FROM` | evo-ai-api | noreply@evoai.dev | SMTP envelope sender |
| `SMTP_HOST` | evo-ai-api | - | Private mail server hostname |
| `SMTP_PORT` | evo-ai-api | 1025 | Mail server port |
| `EMAIL_FROM` | evo-ai-api | noreply@evoai.dev | Default sender address |
| `ADMIN_EMAIL` | evo-ai-api | admin@evoai.dev | First administrator login |
| `SMTP_USE_SSL` | evo-ai-api | false | Implicit TLS off for the private listener |
| `SMTP_USE_TLS` | evo-ai-api | false | STARTTLS off for the private listener |
| `JWT_ALGORITHM` | evo-ai-api | HS256 | Token signing algorithm |
| `EMAIL_PROVIDER` | evo-ai-api | smtp | Mail transport, smtp or sendgrid |
| `JWT_SECRET_KEY` | evo-ai-api | (secret) | Signs session tokens |
| `ORGANIZATION_URL` | evo-ai-api | - | Link shown in emails |
| `ORGANIZATION_NAME` | evo-ai-api | Evo AI | Name shown in emails |
| `MAX_LOGIN_ATTEMPTS` | evo-ai-api | (secret) | Failed logins before lockout |
| `TOKEN_EXPIRY_HOURS` | evo-ai-api | (secret) | Verification and reset link lifetime |
| `ENCRYPTION_KEY_SEED` | evo-ai-api | - | Seeds the at-rest key for provider API keys |
| `JWT_EXPIRATION_TIME` | evo-ai-api | 3600 | Session lifetime in seconds |
| `PASSWORD_MIN_LENGTH` | evo-ai-api | (secret) | Minimum password length |
| `LOGIN_LOCKOUT_MINUTES` | evo-ai-api | (secret) | Lockout duration |
| `ADMIN_INITIAL_PASSWORD` | evo-ai-api | (secret) | First administrator password, change after login |
| `POSTGRES_CONNECTION_STRING` | evo-ai-api | - | Private Postgres connection string |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Volume:** `/data`
- **Healthcheck:** `/`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/evo-ai)
