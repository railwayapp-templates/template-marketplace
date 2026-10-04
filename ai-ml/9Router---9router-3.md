# Deploy 9Router on Railway

9Router AI gateway: one OpenAI-compatible API for 40+ LLM providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-3)

## About

![9Router dashboard: usage counters and connected providers, with a fallback combo open on a phone](https://bogusz.co/external/9router-banner-v1.png)

One OpenAI-compatible endpoint for Claude Code, Cursor, Codex and any OpenAI client, routed across 40+ AI providers with fallback combos and usage tracking.

**Get started**

1. **Deploy.** Nothing to fill in. It idles at about 85 MB and runs on every plan, including Free.
2. **Sign in with the generated password.** Open the service URL and enter `INITIAL_PASSWORD` from the 9Router service's **Variables** tab. The login page's "Default password is 123456" hint is wrong for this template, and failed attempts count toward the lockout.
3. **Connect a provider, then a client.** **Providers** → add an API key; **Endpoint** → create a 9Router API key. Point your client at `https://your-service.up.railway.app/v1` with that key.

9Router is an open-source, self-hosted AI gateway: one OpenAI-compatible endpoint (`/v1`) in front of 40+ AI providers - Claude, OpenAI, Gemini, DeepSeek, OpenRouter, Ollama, GitHub Copilot, Codex, Antigravity and more - with combos (fallback and round-robin across providers), quota tracking, token savers and a web dashboard. This template deploys the official 9Router image, digest-pinned, with a persistent volume and a deployment healthcheck. It runs as a single Node.js service with a SQLite database under `/app/data`, which this template mounts on a Railway volume so providers, API keys, combos and usage history survive redeploys and restarts. Every secret (`INITIAL_PASSWORD`, `JWT_SECRET`, `API_KEY_SECRET`, `MACHINE_ID_SALT`) is generated at deploy time; nothing has to be typed into the deploy form. The image is pinned to a specific version and digest (`decolua/9router:0.5.75`), so a redeploy never picks up an untested upstream build. Railway probes `/api/health` before switching traffic, and the service restarts whenever the process exits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9Router | `decolua/9router:0.5.75@sha256:7c893bc2c27ecea2ae337abd5eacfec9e5763091b3a3b7862fc0625b770bb156` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | Port 9Router listens on. Railway's healthcheck and public domain probe this port; keep 20128. |
| `BASE_URL` | - | Public URL of this deployment, used for OIDC/SAML callbacks and cloud sync. Follows your Railway domain automatically. |
| `DATA_DIR` | /app/data | Where the SQLite database, backups and certificates live. Matches the attached volume; do not change. |
| `HOSTNAME` | 0.0.0.0 | Bind address. 0.0.0.0 is required for Railway's public domain and private networking; do not change. |
| `CLOUD_URL` | https://9router.com | Optional - 9Router cloud sync endpoint. Only used if you turn on Cloud Sync in the dashboard. |
| `JWT_SECRET` | (secret) | Signs dashboard session cookies. Generated once; changing it logs every browser out. |
| `SEARXNG_URL` | - | Optional - SearXNG search URL for the built-in web-search provider, e.g. http://searxng.railway.internal:8080/search. |
| `HEADROOM_URL` | - | Optional - URL of a Headroom token-saver service if you add one, e.g. http://headroom.railway.internal:8787. |
| `API_KEY_SECRET` | (secret) | HMAC secret used when 9Router generates API keys. Generated so keys are not forgeable with upstream's public default. |
| `MACHINE_ID_SALT` | - | Salt for this instance's machine ID. Generated once; keep it stable. |
| `INITIAL_PASSWORD` | (secret) | Dashboard password for your first login. Generated for you - copy it from this service's Variables tab after deploying. Used only until you save a password in the dashboard. |
| `AUTH_COOKIE_SECURE` | true | Marks the dashboard session cookie Secure. Railway domains are HTTPS-only, so keep true. |
| `ENABLE_REQUEST_LOGS` | false | Optional - Set true to write per-request logs under /app/logs (ephemeral, grows without bound). |
| `NEXT_PUBLIC_BASE_URL` | - | Same public URL for the dashboard frontend. Follows your Railway domain automatically. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-3)
