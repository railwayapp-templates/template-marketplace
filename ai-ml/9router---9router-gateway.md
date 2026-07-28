# Deploy 9router on Railway

Self-host 9router: OpenAI-compatible endpoint, 100+ models, fallback & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-gateway)

## About

9Router is an open-source AI gateway that puts a single OpenAI-compatible endpoint in front of 40+ model providers and 100+ models. 

Rather than wiring every coding tool to a different SDK, key, and base URL, you point Claude Code, Cursor, Cline, Copilot, OpenCode, or any OpenAI-compatible client at one `/v1` URL and manage providers, keys, fallback order, and spend from one dashboard. 

Teams self-host 9Router to consolidate scattered provider keys, ride out rate limits without editing config, and see which model answered which request at what cost.

Deploy 9Router on Railway and the gateway runs as one container with a persistent volume and public HTTPS in front of it. It keeps providers, issued API keys, fallback chains ("combos"), usage history, and settings in an embedded SQLite database on that volume, so there is no Postgres or Redis to operate. Your tool sends an OpenAI-format request to `https:///v1`; 9Router authenticates it against a key you issued, picks a provider from your chain, translates to that provider's native format, and streams the response back.

9Router addresses a problem that appears as soon as a team uses more than one provider: each tool wants its own configuration, each provider has its own auth scheme and request format, and one rate limit can stall everything. Self-hosting keeps the gateway, credentials, and request logs on infrastructure you control.

Key features:

- One OpenAI-compatible `/v1` endpoint fronting 40+ providers and 100+ models
- Fallback chains that reroute automatically on rate limits and errors
- Per-provider quota and usage tracking with cost estimation
- Format translation across OpenAI, Anthropic, and Gemini request styles
- RTK token compression that shrinks diffs, grep output, and file trees
- Separately issued API keys, so tools never hold your upstream credentials

One Node.js service serves the dashboard and routing layer on port `20128`, and one volume at `/app/data` holds the SQLite database and backups — no database tier to provision or pay for.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9router | `decolua/9router:0.5.40` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | App HTTP listening port |
| `BASE_URL` | - | Public self-callback URL |
| `DATA_DIR` | /app/data | SQLite location on mounted volume |
| `HOSTNAME` | 0.0.0.0 | Bind all interfaces for routing |
| `NODE_ENV` | production | Production Next.js runtime |
| `JWT_SECRET` | (secret) | Signs dashboard session cookies |
| `API_KEY_SECRET` | (secret) | HMAC secret for issued API keys |
| `MACHINE_ID_SALT` | - | Salt for machine ID hashing |
| `REQUIRE_API_KEY` | (secret) | Reject unauthenticated /v1 calls |
| `INITIAL_PASSWORD` | (secret) | Seeds first dashboard login |
| `AUTH_COOKIE_SECURE` | true | Secure cookie flag behind HTTPS |
| `ENABLE_REQUEST_LOGS` | false | Keep request bodies off disk |
| `NEXT_PUBLIC_BASE_URL` | - | Legacy public base URL |
| `OBSERVABILITY_ENABLED` | true | Enable usage and quota tracking |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-gateway)
