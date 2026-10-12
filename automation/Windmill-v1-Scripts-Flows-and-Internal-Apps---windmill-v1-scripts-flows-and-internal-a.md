# Deploy Windmill v1 Scripts, Flows and Internal Apps on Railway

Turn Python and TS scripts into workflows, UIs and cron jobs with workers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-v1-scripts-flows-and-internal-a)

## About

Windmill is an open-source developer platform that turns Python, TypeScript, Go, Bash and SQL scripts into flows, auto-generated UIs, internal apps, webhooks and cron jobs. This community template runs the full self-hosted stack on Railway: API server, scalable worker pool, native worker, editor services and Postgres.

A production Windmill install is more than one container. The server serves the UI and REST API and runs database migrations; workers pull jobs from a queue stored in Postgres and execute your code; a native worker handles lightweight queries and HTTP calls in-process; the windmill-extra service provides editor autocompletion and a step-through debugger over websockets. Because Railway gives each service a single public port, a small Caddy proxy sends editor websocket paths to windmill-extra and everything else to the server. Everything except the proxy stays on Railway's private network, all images are pinned to the same Windmill release, and the default admin password is replaced automatically on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Windmill Extra | `ghcr.io/windmill-labs/windmill-extra:1.830.0` | Worker |
| Windmill | `ghcr.io/windmill-labs/windmill:1.830.0` | Worker |
| Windmill Native Worker | `ghcr.io/windmill-labs/windmill:1.830.0` | Worker |
| Admin Bootstrap | [baranberkay96/windmill-railway](https://github.com/baranberkay96/windmill-railway) (branch: main) (root: /services/admin-bootstrap) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Windmill Worker | `ghcr.io/windmill-labs/windmill:1.830.0` | Worker |
| Proxy | [baranberkay96/windmill-railway](https://github.com/baranberkay96/windmill-railway) (branch: main) (root: /services/proxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Windmill Extra | 3000 | Gateway port; Railway healthchecks /health here (forwarded to the LSP). |
| `ENABLE_LSP` | Windmill Extra | true | Language servers for editor autocompletion and diagnostics (Python, TS, Go, Bash). |
| `GATEWAY_HOST` | Windmill Extra | :: | Bind the gateway on all IPv6/IPv4 interfaces for the private network. |
| `GATEWAY_PORT` | Windmill Extra | 3000 | Port of the built-in gateway that fans out /ws/*, /ws_debug/*, /ws_mp/*. |
| `ENABLE_NSJAIL` | Windmill Extra | false | nsjail for debug sessions needs privileged containers, which Railway does not offer. |
| `ENABLE_DEBUGGER` | Windmill Extra | true | Step-through debugger for scripts in the editor (upstream compose default). |
| `WINDMILL_BASE_URL` | Windmill Extra | - | Private URL of the Windmill server; the debugger fetches its signing keys from it. |
| `ENABLE_MULTIPLAYER` | Windmill Extra | false | Real-time co-editing; Enterprise Edition only, so off. |
| `DEBUG_ALLOWED_ORIGINS` | Windmill Extra | - | Browser origins allowed to open debugger websockets; add your custom domain here if you add one. |
| `REQUIRE_SIGNED_DEBUG_REQUESTS` | Windmill Extra | true | Only accept debug sessions signed by the Windmill server. Never set to false on a public deployment. |
| `MODE` | Windmill | server | Runs the API server and UI only; jobs run on the worker services. |
| `PORT` | Windmill | 8000 | HTTP port of the Windmill server (Proxy and healthcheck use it). |
| `BASE_URL` | Windmill | - | Public URL of the instance; Instance settings > Base URL overrides it once saved. |
| `RUST_LOG` | Windmill | info | Log level of the Windmill server. |
| `DATABASE_URL` | Windmill | - | Postgres connection string over the private network (TLS off, as in upstream .env). |
| `SERVER_BIND_ADDR` | Windmill | :: | Bind on all IPv6/IPv4 interfaces so the Railway private network can reach the server. |
| `MODE` | Windmill Native Worker | worker | Runs a job worker only (no API server). |
| `BASE_URL` | Windmill Native Worker | - | Public URL used in links that jobs generate. |
| `RUST_LOG` | Windmill Native Worker | info | Log level of the native worker. |
| `NATIVE_MODE` | Windmill Native Worker | true | Native mode: forces 8 workers per replica and accepts native jobs only (upstream compose setting). |
| `SLEEP_QUEUE` | Windmill Native Worker | 200 | Milliseconds between queue polls, multiplied by worker count (upstream compose value). |
| `DATABASE_URL` | Windmill Native Worker | - | Postgres connection string over the private network. |
| `WORKER_GROUP` | Windmill Native Worker | native | Worker group for lightweight in-process jobs (native TS, SQL queries, HTTP calls). |
| `WINDMILL_ADMIN_EMAIL` | Admin Bootstrap | admin@windmill.dev | Seeded superadmin account whose default password the job replaces. |
| `WINDMILL_INTERNAL_URL` | Admin Bootstrap | - | Private URL of the Windmill server used by this one-shot job. |
| `BOOTSTRAP_WAIT_SECONDS` | Admin Bootstrap | 900 | How long the job waits for the server (first boot runs all database migrations). |
| `WINDMILL_ADMIN_PASSWORD` | Admin Bootstrap | (secret) | Generated first-login password for admin@windmill.dev. Change it after your first login. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `MODE` | Windmill Worker | worker | Runs a job worker only (no API server). |
| `BASE_URL` | Windmill Worker | - | Public URL used in links that jobs generate (e.g. approval/resume URLs). |
| `RUST_LOG` | Windmill Worker | info | Log level of the worker. |
| `NUM_WORKERS` | Windmill Worker | 1 | Workers per replica; Windmill forces 1 outside native mode. Scale with replicas instead. |
| `DATABASE_URL` | Windmill Worker | - | Postgres connection string over the private network (the queue lives in Postgres). |
| `WORKER_GROUP` | Windmill Worker | default | Worker group whose tags and settings (Workers page) this service pulls; runs Python, TS, Bash, Go and other jobs. |
| `FAVOR_UNSHARE_PID` | Windmill Worker | true | Upstream default: PID-namespace isolation per job; Windmill logs a warning and runs unisolated if the container does not allow it. |
| `PORT` | Proxy | 8080 | Port Caddy listens on; the public domain and the healthcheck target it. |
| `WINDMILL_EXTRA_UPSTREAM` | Proxy | - | Private address of the windmill-extra gateway; receives /ws/*, /ws_debug/* and /ws_mp/*. |
| `WINDMILL_SERVER_UPSTREAM` | Proxy | - | Private address of the Windmill server; receives every path except the editor websockets. |

## Configuration

- **Healthcheck:** `/health`
- **Healthcheck:** `/api/health/status`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/__proxy/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Tags:** windmill, workflow, automation, scripts, internal-tools · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/windmill-v1-scripts-flows-and-internal-a)
