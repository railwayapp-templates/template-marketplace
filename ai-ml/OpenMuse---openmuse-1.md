# Deploy OpenMuse on Railway

CopilotKit's personal agent with a browser, files and tasks, on Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openmuse-1)

## About

[OpenMuse](https://github.com/CopilotKit/openmuse) is CopilotKit's open-source personal agent: a chat app with its own browser, files and background tasks, where you can watch the agent work and take over its browser. This template runs it as upstream designed it for hosting: the API, a private Chromium worker and the web app, with Postgres.

OpenMuse has no releases yet and changes daily, so the template builds a pinned commit (d0b3a6b, 2026-09-29) rather than whatever is newest.

Two changes from upstream's own cloud setup:

- The API uses Railway Postgres instead of its embedded database. That embedded store is why upstream sizes the API at 2 GB; here it idled at 0.15 GB.
- The browser worker has no public address. It listens on Railway's private network and only the API talks to it, with a generated shared secret.

Everything else is generated at deploy: `OPENMUSE_ACCESS_KEY` (what you sign in with), the token encryption key and the worker secret. You bring two things:

- A CopilotKit Intelligence key (`CPK_INTELLIGENCE_API_KEY`). OpenMuse stores its chat threads there and won't start without one. The free plan covers one developer: run `npx copilotkit@latest login`, then `npx copilotkit@latest project select`.
- A model key. The default is `MODEL=openai/gpt-5-mini` with `OPENAI_API_KEY`; Anthropic (`anthropic/...`) and Google (`google/...`) work too. For OpenRouter, set `OPENAI_BASE_URL=https://openrouter.ai/api/v1` and `MODEL=openai//`.

Before publishing I tested it on Railway with OpenRouter as the model provider. The API reported live mode with the agent and browser configured, the web app loaded with the API address built in, and the access key signed in. The browser worker opened https://example.com over the private network and read the page back. An agent task read the same page with its browser tool and finished. After restarting the API, the browser worker and Postgres, the same checks passed.

Two things I couldn't test: chat needs a real CopilotKit Intelligence key, and through OpenRouter `gpt-4o-mini` never called the agent's tools while `gpt-5-mini` did.

Memory at idle: API 0.15 GB, browser worker 0.25 GB (0.48 GB while browsing), web app 0.02 GB, Postgres 0.08 GB. That's about $5 a month on Railway's usage pricing, plus your model and CopilotKit usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| OpenMuse | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /openmuse-web) | Web service |
| Browser | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /openmuse-browser) | Database |
| API | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /openmuse-api) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | openmuse | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |
| `PORT` | OpenMuse | 8080 | Port Railway routes to |
| `EXPO_PUBLIC_API_URL` | OpenMuse | - | API URL, built into the web app |
| `PORT` | Browser | 8790 | The worker always listens on 8790 |
| `WORKER_TOKEN` | Browser | (secret) | Shared secret between the API and the browser worker (generated) |
| `WORKER_DATA_DIR` | Browser | /data | Browser profiles and downloads, on the volume |
| `HOST` | API | 0.0.0.0 | Listen on all interfaces |
| `PORT` | API | 8787 | Port Railway routes to |
| `MODEL` | API | openai/gpt-5-mini | Model as provider/model: openai/..., anthropic/... or google/... |
| `DATA_DIR` | API | /data | Files and the session signing key, on the volume |
| `DATABASE_URL` | API | - | Postgres over the private network (instead of the embedded store) |
| `OPENMUSE_URL` | API | - | Open this and sign in with OPENMUSE_ACCESS_KEY |
| `WORKER_TOKEN` | API | (secret) | Same secret as the browser worker |
| `AGENT_BACKEND` | API | model | Agent runs on MODEL |
| `GOOGLE_API_KEY` | API | (secret) | Google key, for MODEL=google/... |
| `OPENAI_API_KEY` | API | (secret) | OpenAI key (or an OpenRouter key with OPENAI_BASE_URL) |
| `PUBLIC_API_URL` | API | - | Public URL of this API |
| `WORKSPACE_MODE` | API | live | Live mode (sample mode only runs on localhost) |
| `ALLOWED_ORIGINS` | API | - | The web app's origin; other origins are refused |
| `OPENAI_BASE_URL` | API | - | Optional OpenAI-compatible Responses API endpoint, e.g. https://openrouter.ai/api/v1 (then MODEL=openai/vendor/model) |
| `COMPUTER_ENABLED` | API | false | The optional Linux computer needs Docker, which Railway services don't have |
| `ANTHROPIC_API_KEY` | API | (secret) | Anthropic key, for MODEL=anthropic/... |
| `BROWSER_WORKER_URL` | API | - | Browser worker over the private network |
| `OPENMUSE_ACCESS_KEY` | API | - | The key you sign in to OpenMuse with (generated) |
| `TASK_WORKER_ENABLED` | API | true | Background tasks run inside the API |
| `TOKEN_ENCRYPTION_KEY` | API | (secret) | Encrypts stored tokens: 32 bytes as base64 (generated). Keep it |
| `CPK_INTELLIGENCE_API_KEY` | API | (secret) | CopilotKit Intelligence project key (server-only). Free plan: run `npx copilotkit@latest login`, then `npx copilotkit@latest project select`. The server won't start without it |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/data`
- **Healthcheck:** `/api/health`

**Category:** AI/ML · **Tags:** openmuse, copilotkit, ag-ui, ai-agent, browser-agent, personal-agent · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openmuse-1)
