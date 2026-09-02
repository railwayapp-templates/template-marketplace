# Deploy Skyvern on Railway

Self-hosted Skyvern: LLM browser automation, workflows, credential vault

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/skyvern-ai)

## About

Skyvern is an open-source agent that automates browser workflows with LLMs and computer vision instead of brittle selectors. You describe a goal in plain English — log into this portal, download last month's invoices — and Skyvern drives a real Chromium browser to do it, re-reading the page each step so a redesigned form does not break the run. Operations teams and RPA developers use it instead of Playwright scripts.

Deploy Skyvern on Railway and you get the whole self-hosted stack: the FastAPI backend with its Chromium runtime, the React workflow builder, PostgreSQL, and a Caddy gateway publishing one password-protected URL in front of it. The gateway is the only service with a public domain — the API, the UI and the browser runtime stay private — and it routes the API, the live-view WebSockets and the run artifacts on one origin. A volume holds artifacts, recordings, downloads and the credential vault.

![Skyvern, its UI, a Caddy gateway and Postgres on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788224951/skyvern-architecture.png)

Traditional browser automation bakes a site's DOM into the script, so a class rename breaks it. Skyvern screenshots the page each step, asks a vision model what to click or type next, and executes that — so one workflow generalises across many sites sharing a shape, such as a hundred insurance quote forms. Self-hosting matters because the agent handles real credentials: the vault, the artifacts and the browser session stay in infrastructure you control.

Key capabilities:

- Prompt-driven and visual workflows with loops, branching and code blocks
- Persistent browser sessions that keep cookies and logins alive across runs
- An encrypted credential vault with TOTP, plus Bitwarden and 1Password
- A live browser stream with human takeover for CAPTCHAs and step-up auth
- A REST API and Python SDK, webhooks, and scheduled runs
- Provider-agnostic: OpenAI, Anthropic, Gemini, Azure, Bedrock, OpenRouter, Groq or Ollama

Four services carry this. **skyvern** is the API and agent runtime: a virtual display so Chromium renders as on a desktop, every browser action, and artifacts on the volume. **skyvern-ui** serves the React app and mints the session tokens the frontend uses. **Postgres** stores workflows, runs, steps and credential metadata. **gateway** is Caddy: public URL, basic auth, path routing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| skyvern | [gridalpha/skyvern-railway](https://github.com/gridalpha/skyvern-railway) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| skyvern-ui | [gridalpha/skyvern-railway](https://github.com/gridalpha/skyvern-railway) | Worker |
| gateway | [gridalpha/skyvern-railway](https://github.com/gridalpha/skyvern-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENV` | skyvern | production | Disables development-only routes |
| `PORT` | skyvern | 8000 | API listening port |
| `HAR_PATH` | skyvern | /data/har | Captured network traces |
| `LOG_PATH` | skyvern | /data/log | Browser console logs |
| `SECRET_KEY` | skyvern | (secret) | Signs the organization API token |
| `VIDEO_PATH` | skyvern | /data/videos | Session recordings |
| `BROWSER_TYPE` | skyvern | chromium-headful | Browser launched for each run |
| `DATABASE_URL` | skyvern | - | Postgres connection string |
| `GROQ_API_KEY` | skyvern | (secret) | Set this instead to use Groq |
| `ARTIFACT_PORT` | skyvern | 9090 | Artifact reader listening port |
| `DOWNLOAD_PATH` | skyvern | /data/downloads | Files downloaded during runs |
| `GEMINI_API_KEY` | skyvern | (secret) | Set this instead to use Gemini |
| `OPENAI_API_KEY` | skyvern | (secret) | Set this to run tasks with OpenAI. Have kept this non optional to bring attention to these 5 env vars. Whichever you want to use keep it, and remove the rest |
| `CODE_BLOCK_MODE` | skyvern | enabled | Enables custom code blocks |
| `SKYVERN_APP_URL` | skyvern | - | Public-facing app URL |
| `ANTHROPIC_API_KEY` | skyvern | (secret) | Set this instead to use Anthropic |
| `ENABLE_ENCRYPTION` | skyvern | true | Encrypts stored workflow secrets |
| `ENCRYPTOR_AES_SALT` | skyvern | - | Credential vault key salt |
| `OPENROUTER_API_KEY` | skyvern | (secret) | Set this instead to use OpenRouter |
| `SKYVERN_STORAGE_TYPE` | skyvern | local | Artifacts stored on the volume |
| `ARTIFACT_STORAGE_PATH` | skyvern | /data/artifacts | Screenshots and step artifacts |
| `CREDENTIAL_VAULT_TYPE` | skyvern | (secret) | Built-in credential vault |
| `BROWSER_STREAMING_MODE` | skyvern | cdp | Live view over Chrome DevTools |
| `SKYVERN_ORGANIZATION_ID` | skyvern | o_railway | Fixed organization identifier |
| `ENCRYPTOR_AES_SECRET_KEY` | skyvern | (secret) | Credential vault encryption key |
| `BROWSER_SESSION_BASE_PATH` | skyvern | /data/browser_sessions | Persistent browser profiles |
| `SKYVERN_ORGANIZATION_NAME` | skyvern | Skyvern | Organization display name |
| `LOCAL_CREDENTIAL_VAULT_PATH` | skyvern | (secret) | Credential vault location |
| `ENABLE_LOCAL_CREDENTIAL_VAULT` | skyvern | (secret) | Store credentials on the volume |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | skyvern-ui | 8080 | UI listening port |
| `VITE_ENVIRONMENT` | skyvern-ui | production | Frontend environment label |
| `VITE_API_BASE_URL` | skyvern-ui | - | Browser-facing API URL |
| `VITE_WSS_BASE_URL` | skyvern-ui | - | Browser-facing WebSocket URL |
| `SKYVERN_SECRET_KEY` | skyvern-ui | (secret) | Derives the organization API key |
| `SKYVERN_API_BASE_URL` | skyvern-ui | - | Private API address |
| `VITE_ENABLE_CODE_BLOCK` | skyvern-ui | true | Shows code blocks in the builder |
| `SKYVERN_ORGANIZATION_ID` | skyvern-ui | - | Organization identifier |
| `VITE_ENABLE_LOG_ARTIFACTS` | skyvern-ui | true | Shows run logs in the UI |
| `VITE_ARTIFACT_API_BASE_URL` | skyvern-ui | - | Browser-facing artifact URL |
| `VITE_BROWSER_STREAMING_MODE` | skyvern-ui | cdp | Live view over Chrome DevTools |
| `PORT` | gateway | 8080 | Caddy listening port |
| `GATEWAY_PASSWORD` | gateway | (secret) | Basic-auth password for the public URL |
| `GATEWAY_USERNAME` | gateway | (secret) | Basic-auth username for the public URL |
| `SKYVERN_UI_UPSTREAM` | gateway | - | Private UI address |
| `SKYVERN_API_UPSTREAM` | gateway | - | Private API address |
| `SKYVERN_ARTIFACT_UPSTREAM` | gateway | - | Private artifact address |

## Configuration

- **Healthcheck:** `/api/v1/heartbeat`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/skyvern-ai)
