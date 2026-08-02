# Deploy OmniRoute on Railway

Open-source LLM gateway: routing, fallbacks, API keys, cost analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omni-route)

## About

OmniRoute is an open-source AI gateway that puts one OpenAI-compatible `/v1` endpoint in front of every model provider you use. Rather than scattering API keys, base URLs, retry logic, and spend tracking across each application, you connect your own provider credentials once and point every client at a single address. A Next.js dashboard sits on a routing engine handling provider selection, failover chains, format translation, prompt compression, rate limiting, and cost analytics. Self-host OmniRoute to keep credentials on infrastructure you control.

This template runs one Railway service, `omniroute`, from the official image `diegosouzapw/omniroute:3.8.48`. There is no database container — all state lives in SQLite, so a volume is mounted at `/app/data` with `DATA_DIR` set to match. HTTPS terminates at the Railway edge and forwards to port `20128`, which serves `/login` and `/dashboard` for the UI and `/v1/*` for API traffic.

![OmniRoute Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1785648220/300_1x_shots_so_yze0wb.png)

Every model vendor brings its own SDK, auth scheme, error shape, rate limit, and billing portal, and that cost compounds the moment a codebase talks to more than one. Self-hosting fits when credentials must not leave your perimeter, when a team wants one shared endpoint with revocable per-client keys, or when you need routing policy hosted aggregators do not expose.

- **OpenAI-compatible `/v1` API** — chat completions, model listing, and the Responses API, with format translation between provider shapes.
- **Routing strategies and fallback combos** — priority, weighted, round-robin, cost-optimised; combos chain providers so a failing upstream hands the request onward.
- **Scoped keys, compression, and analytics** — per-app keys you revoke without touching provider credentials, token trimming on long agent sessions, and per-provider cost and latency.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| omniroute | `diegosouzapw/omniroute` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind address for the serve path |
| `PORT` | 20128 | App listen port, matches domain target port |
| `BASE_URL` | - | Canonical server-side public URL |
| `DATA_DIR` | /app/data | SQLite, backups and logs directory |
| `HOSTNAME` | 0.0.0.0 | Next.js bind address inside container |
| `NODE_ENV` | production | Production Next.js runtime |
| `JWT_SECRET` | (secret) | Signs dashboard session tokens |
| `API_KEY_SECRET` | (secret) | Encrypts stored gateway API keys |
| `MACHINE_ID_SALT` | - | Salt for derived machine identifiers |
| `REQUIRE_API_KEY` | (secret) | Rejects unauthenticated /v1 requests |
| `INITIAL_PASSWORD` | (secret) | Bootstrap dashboard login password |
| `AUTH_COOKIE_SECURE` | true | Secure cookie flag behind HTTPS |
| `OMNIROUTE_MEMORY_MB` | 2048 | Explicit V8 heap ceiling in MB |
| `ALLOW_API_KEY_REVEAL` | (secret) | Keeps key values masked in dashboard |
| `NEXT_PUBLIC_BASE_URL` | - | Canonical browser-facing public URL |
| `DISABLE_SQLITE_AUTO_BACKUP` | false | Keeps pre-migration DB backups on |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/omni-route)
