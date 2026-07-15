# Deploy Convex — Self-Hosted Reactive Backend & Firebase Alternative on Railway

Self-host Convex: reactive backend with live queries. No per-dev cloud fee.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convex-reactive-backend)

## About

Convex is the open-source reactive backend that makes real-time apps simple — a document
database, TypeScript server functions, and automatic live-updating queries in one platform.
Built by former Dropbox engineers and backed to a $10.5B valuation, Convex makes every query a
live subscription by default: change data anywhere, and every connected client re-renders
instantly, with no WebSocket plumbing or sync logic. Schema, mutations, and auth are pure
TypeScript with end-to-end type safety.

Convex Cloud Pro is $25/developer/month with usage-based billing. This template self-hosts the
open-source Convex backend on Railway for flat compute (~$10–15/month) — the same reactive
backend, dashboard, and CLI, on infrastructure you own, for teams that want data sovereignty or
cost control.

---

Convex is a reactive backend: instead of SQL against a database, you write TypeScript functions
Convex runs, and its query engine tracks dependencies so that when data changes, subscribed
clients update automatically. Running the open-source backend means the backend service, the
dashboard, a database (SQLite or Postgres), and HTTPS — this template wires all of it on Railway.

&gt; **Self-hosting tradeoffs, honestly:** the self-hosted backend includes most cloud features —
&gt; dashboard, CLI, live queries, scheduling, vector search. Two caveats: the self-hosted tooling is
&gt; newer and less battle-tested than Convex Cloud, and Convex uses a proprietary document model with
&gt; no SQL, so migrating away means rewriting your data layer. Choose it for reactivity + data
&gt; ownership; if you need Postgres/SQL, Supabase fits better.

Typical cost: **~$10–15/month** on Railway for the backend, dashboard, and Postgres. Convex Cloud
Pro is $25/developer/month plus usage. Self-hosting removes the per-developer fee and keeps your
data on infrastructure you control.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Convex Backend | `get-convex/convex-backend:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Convex Dashboard | `get-convex/convex-dashboard:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Convex Backend | 3210 | - |
| `RUST_LOG` | Convex Backend | info | - |
| `DISABLE_BEACON` | Convex Backend | true | - |
| `INSTANCE_SECRET` | Convex Backend | (secret) | - |
| `DO_NOT_REQUIRE_SSL` | Convex Backend | true | - |
| `CONVEX_SELF_HOSTED_ADMIN_KEY` | Convex Backend | invalid | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Convex Dashboard | 8080 | - |

## Configuration

- **Volume:** `/convex/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/convex-reactive-backend)
