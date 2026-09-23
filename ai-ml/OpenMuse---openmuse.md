# Deploy OpenMuse on Railway

OpenMuse personal AI assistant with browser, tasks, goals and Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openmuse)

## About

OpenMuse is CopilotKit's open-source personal assistant: chat, a persistent browser, delegated tasks, goals, ideas and document workflows in a mobile-friendly web app. This template deploys the web app and API, a private Chromium browser worker, and PostgreSQL. Workspace data, documents and browser profiles survive redeploys. **One input is required:** your CopilotKit Intelligence project key. The workspace login key, encryption key, browser token and database password are generated for you.

**This is an alpha for self-hosters and tinkerers, not a managed assistant.** Bring your own model provider, review agent actions, and expect upstream behavior to change. The optional Docker-based Linux desktop/terminal is not included; Railway cannot provide the Docker engine it needs. Browser automation works without it.

Three services make up this deployment:

| Service | Purpose | Persistent storage |
|---|---|---|
| OpenMuse | Web client, API, task worker and Caddy, on one public HTTPS origin | `/data`: documents and the session-signing key |
| Browser | Private Playwright Chromium worker, authenticated with a generated token | `/data`: browser profiles |
| Postgres | Workspace records, tasks, goals, approvals and encrypted connector credentials | `/var/lib/postgresql/data` |

Conversations use **CopilotKit Intelligence**, a separate hosted dependency. This is not a completely offline or entirely self-contained deployment. Create a free Developer project at [CopilotKit Intelligence](https://platform.copilotkit.ai), or run `npx copilotkit@latest login` followed by `npx copilotkit@latest project select`. Put its server-only key in `CPK_INTELLIGENCE_API_KEY`. CopilotKit plan limits and retention apply; model-provider usage is separate.

The API and browser worker drop root privileges before running. Only OpenMuse has a public domain. PostgreSQL and the browser communicate over Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenMuse | `ghcr.io/will-bogusz/openmuse:fed01e9-20260922@sha256:67063ca1a871c563332525699e9da80618e7acbe00de35a0bf755bdd0d3a6a73` | Web service |
| Browser | `ghcr.io/will-bogusz/openmuse-browser-worker:fed01e9-20260922@sha256:f6c625b5bffc5c65c912ed4b128a1e8ac2323107b8ab153d4cde05cad5549cf6` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OpenMuse | 8080 | Public web and API proxy port. |
| `MODEL` | OpenMuse | - | Optional model, e.g. openai/gpt-5.6-terra, anthropic/claude-sonnet-4-6 or google/gemini-2.5-flash. Set the matching provider key. Blank starts the workspace without model chat. |
| `DATA_DIR` | OpenMuse | /data | Persistent documents and workspace signing key. Do not change without migrating the volume. |
| `AGENT_URL` | OpenMuse | - | Optional remote AG-UI agent endpoint. Set AGENT_BACKEND=agui to use your own harness. |
| `AGENT_TOKEN` | OpenMuse | (secret) | Optional bearer token for AGENT_URL. |
| `DATABASE_URL` | OpenMuse | - | Private PostgreSQL connection for workspace state. |
| `WORKER_TOKEN` | OpenMuse | (secret) | Shared authentication for the private browser worker. |
| `AGENT_BACKEND` | OpenMuse | model | Agent harness: model for built-in provider, or agui with AGENT_URL. |
| `GOOGLE_API_KEY` | OpenMuse | (secret) | Optional Google provider key for google/ models. |
| `OPENAI_API_KEY` | OpenMuse | (secret) | Optional OpenAI or OpenAI-compatible provider key. Required when MODEL uses openai/. |
| `PUBLIC_API_URL` | OpenMuse | - | Public origin for web client, OAuth callbacks and signed file links. |
| `WORKSPACE_MODE` | OpenMuse | live | Live persistent workspace. Sample mode is not for public hosting. |
| `OPENAI_BASE_URL` | OpenMuse | - | Optional OpenAI-compatible API base URL. Leave blank for OpenAI. |
| `COMPUTER_ENABLED` | OpenMuse | false | Linux desktop requires a Docker host and is unavailable on Railway. Browser automation remains enabled. |
| `GOOGLE_CLIENT_ID` | OpenMuse | - | Optional Google OAuth web-client ID for Gmail and Calendar. See overview for consent setup. |
| `ANTHROPIC_API_KEY` | OpenMuse | (secret) | Optional Anthropic provider key for anthropic/ models. |
| `BROWSER_WORKER_URL` | OpenMuse | - | Private browser-worker endpoint. |
| `OPENMUSE_ACCESS_KEY` | OpenMuse | - | Generated workspace sign-in key. Copy this value from Variables to log in; keep it private. |
| `TASK_WORKER_ENABLED` | OpenMuse | true | Run durable background tasks in the API service. |
| `GOOGLE_CLIENT_SECRET` | OpenMuse | (secret) | Optional Google OAuth client secret; configure with GOOGLE_CLIENT_ID. |
| `TOKEN_ENCRYPTION_KEY` | OpenMuse | (secret) | Generated canonical base64 encryption key, exactly 32 bytes. Keep unchanged after connecting accounts. |
| `CPK_INTELLIGENCE_API_KEY` | OpenMuse | (secret) | Required CopilotKit Intelligence project key for durable conversations. Create a free project at platform.copilotkit.ai or run npx copilotkit@latest login and project select. |
| `PORT` | Browser | 8790 | Browser worker port and Railway healthcheck port. |
| `WORKER_HOST` | Browser | 0.0.0.0 | Listen on the private network. |
| `WORKER_TOKEN` | Browser | (secret) | Generated private authentication token shared with OpenMuse. |
| `WORKER_DATA_DIR` | Browser | /data | Persistent isolated Chromium profiles. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `sh -c 'chown pwuser:pwuser /data && exec setpriv --reuid=pwuser --regid=pwuser --init-groups node --experimental-strip-types src/index.ts'`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openmuse)
