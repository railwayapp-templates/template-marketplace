# Deploy Mem0 LangGraph on Railway

Long-term memory for LangGraph agents via the Mem0 API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-mem0-memory-for-langgraph-agents)

## About

This template deploys Mem0's OSS API and dashboard on Railway so LangGraph agents get long-term, cross-session memory via plain HTTP calls from graph nodes. You run a retrieve node before the LLM and a store node after, using `user_id` filters. Built for operators who want durable facts without a managed service.

You own every extracted memory: the template stores them in your Postgres 18 with pgvector, and the SQLite history file sits on a persistent volume. Nothing goes to Mem0's cloud. You just create an API key and point your LangGraph nodes at /memories and /search.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mem0 | `caddy:2.11.7-alpine@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mem0-dashboard | `ghcr.io/onepush-dev/mem0-dashboard:v2.2.1@sha256:9e654f2351b8177296146aab1ba28aa27159b2f54f012762a57c8d59d0c58e82` | Worker |
| mem0-api | `ghcr.io/onepush-dev/mem0-api:v2.2.1@sha256:b43ca243fffdbb8112992b87eb32da39a2e28de2491198a9f72827fe24f8ff91` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mem0 | 8080 | Caddy listen port and public target port (8080). |
| `CADDYFILE` | mem0 | {
	admin off
	servers {
		trusted_proxies static private_ranges 100.64.0.0/10
	}
}

:{$PORT:8080} {
	handle /healthz {
		respond "ok" 200
	}

	@api path /auth /auth/* /api-keys /api-keys/* /entities /entities/* /requests /requests/* /memories /memories/* /search /configure /configure/* /generate-instructions /reset /docs /docs/* /redoc /openapi.json
	handle @api {
		reverse_proxy {$MEM0_API_UPSTREAM}
	}

	handle {
		reverse_proxy {$MEM0_DASHBOARD_UPSTREAM}
	}
} | Caddy config written to disk at start; path routing. |
| `MEM0_API_UPSTREAM` | mem0 | - | Private host:port of mem0-api for API paths. |
| `MEM0_DASHBOARD_UPSTREAM` | mem0 | - | Private host:port of mem0-dashboard for other paths. |
| `POSTGRES_DB` | Postgres | railway | Default database (railway). |
| `DATABASE_URL` | Postgres | - | Private connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser (postgres). |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated per deploy; keep alphanumeric. |
| `PORT` | mem0-dashboard | 3000 | Dashboard listen port (3000). |
| `HOSTNAME` | mem0-dashboard | :: | Bind address; :: for Railway IPv6. |
| `DASHBOARD_URL` | mem0-dashboard | - | Public dashboard URL; makes the refresh cookie Secure. |
| `API_INTERNAL_URL` | mem0-dashboard | - | Private mem0-api URL for server-side calls. |
| `NEXT_PUBLIC_API_URL` | mem0-dashboard | - | Public API base URL, same origin through the proxy. |
| `NEXT_PUBLIC_INSTANCE_NAME` | mem0-dashboard | Mem0 | Instance name shown in the dashboard. |
| `PORT` | mem0-api | 8000 | API listen port (8000). |
| `MEM0_DIR` | mem0-api | /app/history/.mem0 | Mem0 working directory on the volume. |
| `JWT_SECRET` | mem0-api | (secret) | Signs dashboard sessions; changing it logs everyone out. |
| `APP_DB_NAME` | mem0-api | mem0_app | Database for users, keys, settings, logs; created on boot. |
| `POSTGRES_DB` | mem0-api | - | Database holding the pgvector memories collection. |
| `ADMIN_API_KEY` | mem0-api | (secret) | Server-wide admin key, sent as the X-API-Key header. |
| `AUTH_DISABLED` | mem0-api | false | Turn off authentication; keep false. |
| `DASHBOARD_URL` | mem0-api | - | Public dashboard URL, used as the CORS origin. |
| `POSTGRES_HOST` | mem0-api | - | Postgres private hostname. |
| `POSTGRES_PORT` | mem0-api | - | Postgres port. |
| `POSTGRES_USER` | mem0-api | (secret) | Postgres user. |
| `MEM0_TELEMETRY` | mem0-api | false | Send anonymous telemetry; false. |
| `OPENAI_API_KEY` | mem0-api | (secret) | Optional OpenAI key; memory calls need a provider. |
| `HISTORY_DB_PATH` | mem0-api | /app/history/history.db | SQLite memory-history file on the /app/history volume. |
| `OPENAI_BASE_URL` | mem0-api | - | Optional OpenAI-compatible endpoint, such as OpenRouter. |
| `POSTGRES_PASSWORD` | mem0-api | (secret) | Postgres password from the Postgres service. |
| `MEM0_DEFAULT_LLM_MODEL` | mem0-api | gpt-5-mini | Default LLM for fact extraction (gpt-5-mini). |
| `POSTGRES_COLLECTION_NAME` | mem0-api | memories | pgvector table for memories; change when switching embedders. |
| `MEM0_DEFAULT_EMBEDDER_MODEL` | mem0-api | text-embedding-3-small | Default embedding model (text-embedding-3-small). |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$CADDYFILE" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Healthcheck:** `/docs`
- **Volume:** `/app/history`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deploy-mem0-memory-for-langgraph-agents)
