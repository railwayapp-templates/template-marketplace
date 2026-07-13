# Deploy SurfSense on Railway

Open-source AI research agent (NotebookLM alternative)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/surfsense)

## About

SurfSense is an open-source AI research agent and NotebookLM alternative. It connects your personal knowledge base to search engines, Slack, Notion, Gmail, GitHub, and 15+ other sources, letting you chat with your documents, generate podcasts, and run deep research agents — all on your own infrastructure with your own LLM keys.

SurfSense is a six-service stack: a FastAPI backend (which also runs Alembic migrations, a Celery worker, and Celery beat), a Next.js frontend, Postgres with pgvector and logical replication enabled, Redis as the Celery broker, a Zero sync engine for real-time UI updates, and a Caddy proxy that serves everything from a single public origin — required for session cookies and Zero's websocket paths. This template wires all of it together with private networking, persistent volumes for Postgres, uploaded files, and the Zero replica, and generated secrets. First boot takes ~15–20 minutes while the backend image pulls and migrations run; zero-cache restarting during that window is expected and self-heals.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | `ghcr.io/modsetter/surfsense-web:latest` | Worker |
| zero-cache | `rocicorp/zero:1.6.0` | Database |
| db | `pgvector/pgvector:pg17` | Database |
| backend | `ghcr.io/modsetter/surfsense-backend:latest` | Database |
| proxy | `caddy:2-alpine` | Web service |
| redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | frontend | 3000 | Port the Next.js standalone server listens on. |
| `AUTH_TYPE` | frontend | LOCAL | Must match the backend's AUTH_TYPE. |
| `ETL_SERVICE` | frontend | DOCLING | Must match the backend's ETL_SERVICE (drives upload UI hints). |
| `DEPLOYMENT_MODE` | frontend | self-hosted | Must match the backend's DEPLOYMENT_MODE. |
| `ZERO_QUERY_API_KEY` | frontend | (secret) | Shared secret validating requests from zero-cache; references zero-cache's generated value so they always match. |
| `SURFSENSE_BACKEND_INTERNAL_URL` | frontend | - | Backend URL for Next.js server-side calls over private networking (browser calls go same-origin through the proxy). |
| `PORT` | zero-cache | 4848 | Informational; Zero listens on 4848 regardless. |
| `ZERO_CVR_DB` | zero-cache | - | Client-view-record database (same Postgres instance). |
| `ZERO_CHANGE_DB` | zero-cache | - | Change-log database (same Postgres instance). |
| `ZERO_QUERY_URL` | zero-cache | - | Frontend endpoint that resolves Zero queries (delegates auth to the app). |
| `ZERO_AUTO_RESET` | zero-cache | true | If replication halts, wipe and re-sync the local replica without touching Postgres. |
| `ZERO_MUTATE_URL` | zero-cache | - | Required by Zero when auth tokens are used; SurfSense's mutate endpoint is a no-op. |
| `ZERO_UPSTREAM_DB` | zero-cache | - | Upstream Postgres that zero-cache replicates from via logical replication. |
| `ZERO_REPLICA_FILE` | zero-cache | /data/zero.db | SQLite replica location, on the volume so restarts don't re-sync from scratch. |
| `ZERO_CVR_MAX_CONNS` | zero-cache | 30 | Max CVR Postgres connections; must be >= ZERO_NUM_SYNC_WORKERS. |
| `ZERO_QUERY_API_KEY` | zero-cache | (secret) | Generated shared secret for the zero-cache -> /api/zero/query hop. The frontend references this value. |
| `ZERO_ADMIN_PASSWORD` | zero-cache | (secret) | Generated password protecting Zero's admin endpoints. |
| `ZERO_APP_PUBLICATIONS` | zero-cache | zero_publication | Postgres publication to replicate; created by SurfSense's Alembic migrations on first backend boot. |
| `ZERO_NUM_SYNC_WORKERS` | zero-cache | 4 | Sync worker count (the image defaults to CPU cores, which can exceed connection pool limits). |
| `ZERO_UPSTREAM_MAX_CONNS` | zero-cache | 20 | Max upstream Postgres connections; must be >= ZERO_NUM_SYNC_WORKERS. |
| `ZERO_QUERY_FORWARD_COOKIES` | zero-cache | true | Forward browser session cookies on the zero-cache -> query-route hop. |
| `ZERO_AUTH_REVALIDATE_INTERVAL_SECONDS` | zero-cache | 60 | How often open sockets re-check auth revocation. |
| `ZERO_AUTH_RETRANSFORM_INTERVAL_SECONDS` | zero-cache | 60 | How often open sockets re-apply RBAC membership changes. |
| `POSTGRES_DB` | db | surfsense | Database created on first boot. |
| `POSTGRES_USER` | db | (secret) | Database superuser created on first boot. |
| `POSTGRES_PASSWORD` | db | (secret) | Generated password for POSTGRES_USER. Referenced by the backend and zero-cache connection URLs. |
| `PORT` | backend | 8000 | Port Railway probes for the /ready healthcheck; uvicorn listens on 8000. Do not set UVICORN_HOST=:: (Railway probes over IPv4). |
| `AUTH_TYPE` | backend | LOCAL | Authentication mode: LOCAL (email/password) or GOOGLE (OAuth, requires GOOGLE_OAUTH_CLIENT_ID/_SECRET). Must match the frontend's AUTH_TYPE. |
| `SECRET_KEY` | backend | (secret) | Generated JWT / session signing secret (FastAPI Users). |
| `BACKEND_URL` | backend | - | Public URL the backend advertises for itself (OAuth callbacks etc.). Same single origin as the frontend. |
| `ETL_SERVICE` | backend | DOCLING | Document parsing engine: DOCLING (local, no key), UNSTRUCTURED, or LLAMACLOUD (require API keys). Must match the frontend. |
| `STT_SERVICE` | backend | local/base | Speech-to-text engine (local Faster-Whisper base model; e.g. openai/whisper-1 also works). |
| `TTS_SERVICE` | backend | local/kokoro | Text-to-speech engine (local Kokoro by default; any LiteLLM provider works). |
| `DATABASE_URL` | backend | - | Async SQLAlchemy connection URL to the pgvector database over private networking. |
| `SERVICE_ROLE` | backend | all | Entrypoint mode: run Alembic migrations, then start the FastAPI API, Celery worker, and Celery beat in this one container. |
| `REDIS_APP_URL` | backend | - | Application-level Redis cache and locks. |
| `SURFSENSE_ENV` | backend | production | Deployment environment flag. |
| `DEPLOYMENT_MODE` | backend | self-hosted | self-hosted enables self-hosted behavior (local connectors visible, billing off). Must match the frontend. |
| `EMBEDDING_MODEL` | backend | sentence-transformers/all-MiniLM-L6-v2 | Embedding model for vector search. Local sentence-transformers by default; openai://... or cohere://... also supported with API keys. |
| `CELERY_BROKER_URL` | backend | - | Celery task broker (Redis). |
| `MIGRATION_TIMEOUT` | backend | 900 | Seconds allowed for `alembic upgrade head` before the entrypoint aborts. |
| `NEXT_FRONTEND_URL` | backend | - | Public origin of the app, used for CORS and links. Points at the Caddy proxy (single origin). |
| `CELERY_RESULT_BACKEND` | backend | - | Celery result store (Redis). |
| `FILE_STORAGE_LOCAL_PATH` | backend | /app/.local_object_store | Object-store path; matches the volume mount so uploaded files persist. |
| `SURFSENSE_ENABLE_SKILLS` | backend | true | Chat-agent feature flag (upstream production default). |
| `CELERY_TASK_DEFAULT_QUEUE` | backend | surfsense | Default Celery queue name; the worker also consumes the .connectors and .gateway sub-queues. |
| `SURFSENSE_ENABLE_DOOM_LOOP` | backend | true | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_ACTION_LOG` | backend | true | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_BUSY_MUTEX` | backend | true | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_PERMISSION` | backend | true | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_RETRY_AFTER` | backend | true | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_REVERT_ROUTE` | backend | true | Chat-agent feature flag (upstream production default). |
| `UNSTRUCTURED_HAS_PATCHED_LOOP` | backend | 1 | Marks the unstructured event-loop patch as applied (mirrors upstream compose). |
| `SURFSENSE_ENABLE_COMPACTION_V2` | backend | true | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_MODEL_FALLBACK` | backend | false | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_CONTEXT_EDITING` | backend | true | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_TOOL_CALL_LIMIT` | backend | true | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_MODEL_CALL_LIMIT` | backend | true | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_TOOL_CALL_REPAIR` | backend | true | Chat-agent feature flag (upstream production default). |
| `SURFSENSE_ENABLE_SPECIALIZED_SUBAGENTS` | backend | true | Chat-agent feature flag (upstream production default). |
| `PORT` | proxy | 8080 | Port Caddy listens on; the service's public domain targets this port. |
| `CADDYFILE` | proxy | {
	admin off
	auto_https off
	servers {
		client_ip_headers X-Forwarded-For X-Real-IP
		trusted_proxies static 0.0.0.0/0
	}
}

:{$PORT} {
	request_body {
		max_size {$SURFSENSE_MAX_BODY_SIZE:5GB}
	}

	# Railway healthcheck — answered by Caddy itself, no upstream involved.
	respond /proxy-healthz 200

	# Frontend-owned auth page (post-login token handler).
	reverse_proxy /auth/callback* {$FRONTEND_HOST}

	# Backend auth + user routes (FastAPI Users + OAuth helpers).
	reverse_proxy /auth/* {$BACKEND_HOST}
	reverse_proxy /users/* {$BACKEND_HOST}

	# Backend REST, streaming, connector OAuth, messaging gateway.
	reverse_proxy /api/v1/* {$BACKEND_HOST} {
		flush_interval -1
	}

	# Zero sync auth context lives on the backend.
	reverse_proxy /zero/context {$BACKEND_HOST}

	# Zero sync engine (websockets).
	reverse_proxy /zero/* {$ZERO_HOST}

	# Next.js app and frontend-owned API routes.
	reverse_proxy /* {$FRONTEND_HOST}
}
 | Full Caddy config, written to /etc/caddy/Caddyfile by the start command. Routes /auth, /users, /api/v1 to the backend, /zero/* to zero-cache, everything else to the frontend. Uses {$VAR} placeholders resolved from the variables below. |
| `ZERO_HOST` | proxy | - | Upstream for Zero sync websocket traffic. |
| `BACKEND_HOST` | proxy | - | Upstream for auth, user, and REST/streaming API routes. |
| `FRONTEND_HOST` | proxy | - | Upstream for app pages and frontend-owned API routes. |
| `SURFSENSE_MAX_BODY_SIZE` | proxy | 5GB | Request body limit (large document uploads). |
| `REDISHOST` | redis | - | Private-network hostname of this Redis instance. |
| `REDISPORT` | redis | 6379 | Redis port. |
| `REDISUSER` | redis | default | Redis ACL user. |
| `REDIS_URL` | redis | - | Private-network connection URL. Consumed by the backend as ${{redis.REDIS_URL}}. |
| `REDISPASSWORD` | redis | (secret) | Alias of REDIS_PASSWORD (Railway convention). |
| `REDIS_PASSWORD` | redis | (secret) | Generated Redis password. |
| `REDIS_PUBLIC_URL` | redis | - | Public connection URL via Railway's TCP proxy (only valid if a TCP proxy is enabled). |

## Configuration

- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh postgres -c wal_level=logical -c max_replication_slots=10 -c max_wal_senders=10 -c max_connections=200 -c shared_buffers=256MB`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ready`
- **Volume:** `/app/.local_object_store`
- **Start command:** `sh -c 'printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/proxy-healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/surfsense)
