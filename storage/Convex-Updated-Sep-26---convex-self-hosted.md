# Deploy Convex [Updated Sep '26] on Railway

Convex self-hosted — Backend + Dashboard + Postgres, verified live

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convex-self-hosted)

## About

Convex is an open-source reactive database built for TypeScript — queries, mutations, and real-time subscriptions without hand-writing a sync layer yourself. This template deploys the self-hosted stack verified live: a full first-boot cycle, admin key generation, and both public endpoints confirmed working, not assumed from a reference config.

Self-hosting Convex means running three pieces together: the **Backend** (the reactive database and function runtime), the **Dashboard** (a web UI for logs, data, and functions), and **Postgres** (the Backend's storage). All three are wired together automatically — networking, volumes, and reference variables already set so the services find each other without manual configuration.

What makes Convex different from a normal database-plus-API setup is that "reactive" isn't marketing language — it's the execution model. A query function isn't just called once and forgotten; the Backend tracks exactly which documents and indexes it read, and if any change, every subscribed client gets pushed the new result automatically. No polling, no per-feature WebSocket wiring, no cache-invalidation logic to get wrong. You write a query as a plain TypeScript function; reactivity is the platform's job.

The one genuinely manual step is the admin key, worth understanding rather than treating as friction. Convex derives it deterministically from two values — `INSTANCE_NAME` and `INSTANCE_SECRET` — via its own `generate_key` binary. Both only exist once the container has started, so the key can't be pre-computed into the template ahead of time, on Railway or anywhere else. The Backend generates it on first boot and prints it to the deploy logs; copy it into `CONVEX_SELF_HOSTED_ADMIN_KEY` and redeploy once. That's simpler than Convex's own official Railway guide, which asks you to run `railway ssh` and execute the script by hand — here it just happens on boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Convex Dashboard | `ghcr.io/get-convex/convex-dashboard:latest` | Web service |
| Convex Backend | `ghcr.io/get-convex/convex-backend:latest` | TCP service |
| Postgres | `postgres:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Convex Dashboard | 8080 | Port the dashboard's Next.js server listens on. |
| `NEXT_PUBLIC_DEPLOYMENT_URL` | Convex Dashboard | - | Points the dashboard at your backend's Cloud API. References the Backend service directly — stays correct automatically if that origin ever changes. |
| `PORT` | Convex Backend | 3210 | The Cloud API's port. Do not change — the start command and networking config both assume this value. |
| `RUST_LOG` | Convex Backend | info | Log verbosity for the backend (Rust-based). debug gives more detail if you're troubleshooting. |
| `POSTGRES_URL` | Convex Backend | - | Connection string to the Postgres service, sourced automatically from its own variables. |
| `INSTANCE_NAME` | Convex Backend | - | Identifies this Convex instance. References the Postgres service's own database name. |
| `DISABLE_BEACON` | Convex Backend | true | Disables Convex's telemetry beacon. |
| `INSTANCE_SECRET` | Convex Backend | (secret) | Per-deployment secret used (with INSTANCE_NAME) to deterministically derive the admin key. Auto-generated — never needs manual editing. |
| `CONVEX_SITE_ORIGIN` | Convex Backend | - | The origin for HTTP Actions (Convex functions exposed over plain HTTP). Public by default; switch to the private variant for internal-only use. |
| `DO_NOT_REQUIRE_SSL` | Convex Backend | true | Allows the backend to accept connections without enforcing TLS itself — Railway's own edge already terminates TLS for the public domain. |
| `CONVEX_CLOUD_ORIGIN` | Convex Backend | - | The origin your frontend/CLI actually connects to for the main API. Points at the public origin by default — switch to ${{PRIVATE_CONVEX_CLOUD_ORIGIN}} for a private-only deployment. |
| `CONVEX_SELF_HOSTED_URL` | Convex Backend | - | Mirrors CONVEX_CLOUD_ORIGIN — some tooling reads this name instead. |
| `PUBLIC_CONVEX_SITE_ORIGIN` | Convex Backend | - | Publicly reachable HTTP Actions origin, routed through Railway's TCP proxy on port 3211. |
| `PRIVATE_CONVEX_SITE_ORIGIN` | Convex Backend | - | Internal-only HTTP Actions origin. |
| `PUBLIC_CONVEX_CLOUD_ORIGIN` | Convex Backend | - | Publicly reachable Cloud API origin — what your deployed frontend actually talks to by default. |
| `PRIVATE_CONVEX_CLOUD_ORIGIN` | Convex Backend | - | Internal-only Cloud API origin, reachable only from other services in this Railway project. |
| `CONVEX_SELF_HOSTED_ADMIN_KEY` | Convex Backend | invalid | Starts as invalid so the backend generates a real key on first boot and prints it to the deploy logs. Paste the generated value back here once you have it — see README. |
| `PGSSLMODE` | Postgres | disable | Disables SSL for connections — safe here since traffic stays on Railway's private network, never the public internet. |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Standard full connection string, private network. |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated password for the default Postgres user. |
| `CONVEX_DATABASE_URL` | Postgres | - | The exact connection string the Convex Backend service reads via its own POSTGRES_URL variable. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'mkdir -p "/convex/data/credentials" && echo "$INSTANCE_SECRET" > "/convex/data/credentials/instance_secret" && echo "$INSTANCE_NAME" > "/convex/data/credentials/instance_name" && ([ -z "$CONVEX_SELF_HOSTED_ADMIN_KEY" ] || [ "$CONVEX_SELF_HOSTED_ADMIN_KEY" = "invalid" ]) && ./generate_admin_key.sh || echo "Admin key: $CONVEX_SELF_HOSTED_ADMIN_KEY" && exec ./run_backend.sh'`
- **Healthcheck:** `/version`
- **TCP Proxies:** 3211
- **Volume:** `/convex/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/convex-self-hosted)
