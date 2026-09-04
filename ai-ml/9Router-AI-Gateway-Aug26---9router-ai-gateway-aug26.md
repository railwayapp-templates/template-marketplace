# Deploy 9Router AI Gateway [Aug'26] on Railway

Self-hosted AI gateway for Claude Code, Cursor & 40+ LLM providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-ai-gateway-aug26)

## About

9Router is an open-source, self-hosted AI gateway and LLM router. It puts a single OpenAI-compatible endpoint in front of 40+ AI providers — including OpenAI, Anthropic, Google Gemini, Mistral, Groq, DeepSeek, and OpenRouter — and 100+ models, so Claude Code, Cursor, Cline, Codex, Copilot, Windsurf, and Gemini CLI all authenticate against your own gateway instead of scattering provider API keys across every tool you use.

Hosting 9Router means running one Node.js service with a persistent disk. There is no PostgreSQL, Redis, or external database to operate: providers, issued API keys, fallback chains, usage history, and settings all live in an embedded SQLite database under `/app/data`, alongside automatic backups. This template deploys the official `decolua/9router` image pinned to a known-good version, attaches the volume, serves the dashboard and the `/v1` API on an HTTPS domain, and generates the session and API-key signing secrets fresh for your deployment. You pick a dashboard password before deploying; everything else is pre-configured.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| decolua/9router:0.5.55 | `decolua/9router:0.5.55` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | Port the container listens on. The 9Router image binds 20128 — leave this as is. |
| `BASE_URL` | - | Public URL of this instance, used by 9Router's server-side sync jobs. Resolves to your Railway domain. |
| `DATA_DIR` | /app/data | Where the SQLite database and its backups live. Must match the mounted volume path (/app/data). |
| `JWT_SECRET` | (secret) | Signing key for the dashboard session cookie. Generated fresh for your deployment. |
| `API_KEY_SECRET` | (secret) | HMAC secret for the API keys you issue from the dashboard. Generated fresh for your deployment. |
| `MACHINE_ID_SALT` | - | Salt used to hash machine IDs consistently. Generated fresh for your deployment. |
| `REQUIRE_API_KEY` | (secret) | Require a Bearer API key on /v1/* requests. Keep true: the endpoint is reachable from the public internet. |
| `INITIAL_PASSWORD` | (secret) | Password for your first dashboard login. Choose a strong one — it protects every provider key you add. |
| `AUTH_COOKIE_SECURE` | true | Marks the dashboard auth cookie Secure. Keep true — Railway serves this over HTTPS. |
| `ENABLE_REQUEST_LOGS` | false | Write full request and response bodies to disk. Leave false unless you are debugging a routing problem. |
| `NEXT_PUBLIC_BASE_URL` | - | Base URL the dashboard front end calls. Resolves to your Railway domain; the upstream default points at localhost. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-ai-gateway-aug26)
