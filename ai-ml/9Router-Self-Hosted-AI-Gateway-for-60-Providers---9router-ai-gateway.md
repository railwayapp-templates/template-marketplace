# Deploy 9Router — Self-Hosted AI Gateway for 60+ Providers on Railway

Route Claude Code & Cursor to 60+ LLM providers with fallback

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-ai-gateway)

## About

9Router is an open-source AI routing gateway — a single OpenAI-compatible endpoint that sits between your coding tools and 60+ LLM providers, automatically falling back across subscription, cheap, and free tiers so a session never dies on a 429. Point Claude Code, Cursor, Cline, Codex, or Copilot at one URL and let the router pick the cheapest available model for each request.

Running it on Railway makes that endpoint reachable from every machine you work on, instead of only the laptop it's installed on.

---

9Router is normally run locally, bound to `localhost:20128`. That works well until you use more than one machine: your provider keys, tier configuration, and usage history live on one laptop, and the router is offline whenever that laptop is.

Hosting it on Railway gives you one always-on gateway with a stable HTTPS URL. Your desktop, laptop, and any remote environment point at the same endpoint, share the same fallback configuration, and report into the same usage dashboard.

**That convenience has a real security cost, and it's worth being explicit about.** A hosted 9Router holds every provider API key and OAuth token you connect to it, behind a single login on a publicly reachable domain. Compromise it and you lose all of them at once. So:

- Set a long, unique `JWT_SECRET` and a strong dashboard password before connecting any provider
- Never reuse a password from elsewhere
- Treat the instance as a credential store, because that is what it is

9Router itself is fully self-hosted — requests go only to the providers you configure, with no traffic routed through a central service unless you explicitly enable cloud sync.

Typical cost: **~$5/month** on Railway's Hobby plan for the single service. 9Router is MIT-licensed and free; you pay providers directly.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9Router | `codestorm-official/9router-v3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 20128 |
| `DATA_DIR` | /data |
| `NODE_ENV` | production |
| `CLOUD_URL` | https://9router.com |
| `JWT_SECRET` | (secret) |
| `INSTANCE_NAME` | 9router V3 |
| `API_KEY_SECRET` | (secret) |
| `MACHINE_ID_SALT` | endpoint-proxy-salt |
| `REQUIRE_API_KEY` | (secret) |
| `INITIAL_PASSWORD` | (secret) |
| `AUTH_COOKIE_SECURE` | false |
| `ENABLE_REQUEST_LOGS` | false |
| `NEXT_PUBLIC_CLOUD_URL` | https://9router.com |
| `OBSERVABILITY_ENABLED` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-ai-gateway)
