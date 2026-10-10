# Deploy Lead Rescue AI by Dev101Labs on Railway

Lead dashboard with optional AI, consent-based email, Postgres and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lead-rescue-ai-by--1)

## About

Capture inbound inquiries, prioritize them for a human, and track follow-up from a single dashboard. Lead Rescue AI by Dev101Labs is a self-hosted lead management starter for small service businesses and agencies, with optional AI qualification and verified email testing.

Deploy one isolated business dashboard with a web service, background worker and persistent databases. Railway generates administrator and infrastructure credentials for your installation. The web service exposes an HTTPS domain while the worker, PostgreSQL and Redis communicate privately. Start with demo leads and simulated follow-up; no external provider accounts are required for simulation. To enable controlled real AI and email tests, supply your own provider keys, verify a sending and receiving subdomain, and complete the owner reply/STOP checks. The approved tester portal then enforces consent and usage limits. Review backups and operational requirements before using customer data.

### What you get

- Business onboarding and industry presets.
- Lead capture, qualification summaries, pipeline stages, notes and human takeover.
- Persistent follow-up scheduling with a separate worker.
- Simulation available immediately without AI or email keys.
- Optional Groq, Gemini or OpenAI qualification using your own account.
- Resend delivery status, signed reply routing, STOP handling and suppression.
- Approved tester portal with consent and daily/lifetime AI and email limits.
- Private administrator login and generated deployment credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7-bookworm` | Database |
| Postgres | `postgres:17-bookworm` | Database |
| lead-rescue-web | `ghcr.io/dev101labshq/lead-rescue-web@sha256:48f13757a40c5756c497ad4b0907db4f4a8da9b146f1e5c2e5d2fa1b8dbff005` | Web service |
| lead-rescue-worker | `ghcr.io/dev101labshq/lead-rescue-worker@sha256:5421f954ce3ba482aecb001be5aa2cd1b3773cec36a33566e11f861ddeb18d29` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | Redis | - | Private Redis queue connection reference. Keep database and queue services private. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated private Redis password used by the authenticated start command. |
| `POSTGRES_DB` | Postgres | leadrescue | Application database name for this installation. |
| `DATABASE_URL` | Postgres | - | Private Postgres connection reference. Do not substitute a public proxy URL. |
| `POSTGRES_USER` | Postgres | (secret) | Application database username for this installation. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated private Postgres password. Do not copy a password from another deployment. |
| `PORT` | lead-rescue-web | 8080 | Web application listen port. Match the HTTP proxy port 8080. |
| `APP_URL` | lead-rescue-web | - | Generated HTTPS application origin. Update if you use a custom domain. |
| `NODE_ENV` | lead-rescue-web | production | Production runtime with HTTPS administrator authentication. |
| `REDIS_URL` | lead-rescue-web | - | Private Redis queue connection reference. Keep database and queue services private. |
| `GROQ_MODEL` | lead-rescue-web | openai/gpt-oss-20b | Groq structured-output model. Verify availability before enabling AI. |
| `ADMIN_EMAIL` | lead-rescue-web | - | Your own administrator email. Required for first login and owner email tests. |
| `AI_PROVIDER` | lead-rescue-web | groq | Optional AI provider. Groq is the initial supported beta choice; credentials are supplied separately. |
| `BETA_ENABLED` | lead-rescue-web | false | Keep false initially. Enable only the documented controlled test workflow after configuring your own providers. |
| `DATABASE_URL` | lead-rescue-web | - | Private Postgres connection reference. Do not substitute a public proxy URL. |
| `GEMINI_MODEL` | lead-rescue-web | gemini-3.5-flash-lite | Gemini model for the optional provider; verify availability and quota before use. |
| `GROQ_API_KEY` | lead-rescue-web | (secret) | Optional buyer-owned Groq key. Leave blank for simulation; web service only. |
| `OPENAI_MODEL` | lead-rescue-web | - | Explicit supported OpenAI Responses API model, required only if using OpenAI. |
| `ADMIN_PASSWORD` | lead-rescue-web | (secret) | Generated bootstrap password. Change it at /account after first login, then remove this variable. |
| `GEMINI_API_KEY` | lead-rescue-web | (secret) | Optional buyer-owned Gemini key. Leave blank unless using this provider. |
| `OPENAI_API_KEY` | lead-rescue-web | (secret) | Optional buyer-owned OpenAI API key. Separate API billing applies. |
| `SESSION_SECRET` | lead-rescue-web | (secret) | Generated private session signing secret. Keep stable; changing it signs out sessions. |
| `AI_LIVE_ENABLED` | lead-rescue-web | false | Keep false for this beta template. General live activation requires a separate production rollout with global budget and sending controls. |
| `AI_TEST_ENABLED` | lead-rescue-web | false | Keep false initially. Enable only the documented controlled test workflow after configuring your own providers. |
| `BETA_AI_ENABLED` | lead-rescue-web | false | Keep false initially. Enable only the documented controlled test workflow after configuring your own providers. |
| `BETA_EMAIL_ENABLED` | lead-rescue-web | false | Keep false initially. Enable only the documented controlled test workflow after configuring your own providers. |
| `BETA_TESTER_EMAILS` | lead-rescue-web | - | Comma-separated approved tester addresses. Defaults to your administrator; no customer recipients. |
| `EMAIL_REPLY_SECRET` | lead-rescue-web | (secret) | Generated shared secret for signed email reply addresses. Web and worker must use the same value. |
| `ALLOW_LIVE_DELIVERY` | lead-rescue-web | false | Keep false for this beta template. General live activation requires a separate production rollout with global budget and sending controls. |
| `INBOUND_EMAIL_DOMAIN` | lead-rescue-web | - | Your receiving subdomain verified in Resend. Separate from existing mailbox DNS. |
| `RESEND_WEBHOOK_SECRET` | lead-rescue-web | (secret) | Signing secret for your Resend webhook at /api/webhooks/resend. |
| `EMAIL_BETA_TEST_ENABLED` | lead-rescue-web | false | Keep false initially. Enable only the documented controlled test workflow after configuring your own providers. |
| `RESEND_RECEIVING_API_KEY` | lead-rescue-web | (secret) | Optional receiving key from a dedicated Resend account. Web only; never a shared team key. |
| `REDIS_URL` | lead-rescue-worker | - | Private Redis queue connection reference. Keep database and queue services private. |
| `EMAIL_FROM` | lead-rescue-worker | - | Optional verified sender on your own domain. Configure before owner email tests. |
| `ADMIN_EMAIL` | lead-rescue-worker | - | Your own administrator email. Required for first login and owner email tests. |
| `BETA_ENABLED` | lead-rescue-worker | - | Keep false initially. Enable only the documented controlled test workflow after configuring your own providers. |
| `DATABASE_URL` | lead-rescue-worker | - | Private Postgres connection reference. Do not substitute a public proxy URL. |
| `RESEND_API_KEY` | lead-rescue-worker | (secret) | Optional domain-scoped Resend Sending key. Worker only. |
| `BETA_EMAIL_ENABLED` | lead-rescue-worker | - | Keep false initially. Enable only the documented controlled test workflow after configuring your own providers. |
| `BETA_TESTER_EMAILS` | lead-rescue-worker | - | Comma-separated approved tester addresses. Defaults to your administrator; no customer recipients. |
| `EMAIL_REPLY_SECRET` | lead-rescue-worker | (secret) | Generated shared secret for signed email reply addresses. Web and worker must use the same value. |
| `ALLOW_LIVE_DELIVERY` | lead-rescue-worker | false | Keep false for this beta template. General live activation requires a separate production rollout with global budget and sending controls. |
| `INBOUND_EMAIL_DOMAIN` | lead-rescue-worker | - | Your receiving subdomain verified in Resend. Separate from existing mailbox DNS. |
| `EMAIL_BETA_TEST_ENABLED` | lead-rescue-worker | - | Keep false initially. Enable only the documented controlled test workflow after configuring your own providers. |

## Configuration

- **Start command:** `sh -c 'exec redis-server --appendonly yes --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/lead-rescue-ai-by--1)
