# Deploy Hasura — Instant GraphQL API for PostgreSQL on Railway

Self-host Hasura — instant GraphQL & REST APIs on Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hasura-graphql-api)

## About

Hasura gives you an instant, production-ready GraphQL API over your PostgreSQL database — connect a database and get a full GraphQL (and REST) API in seconds, with queries, mutations, subscriptions, relationships, and fine-grained authorization, no resolver code to write. This template deploys the open-source Hasura GraphQL Engine with PostgreSQL and a secured admin console, so you can model permissions and ship a real-time API in minutes.

---

Hasura is powerful and fast to deploy, and a couple of specifics keep it secure and correctly wired — both handled here.

**Two database roles — metadata and your data.** Hasura uses two connection settings: `HASURA_GRAPHQL_METADATA_DATABASE_URL`, where it stores its own configuration (tables tracked, permissions, relationships), and `PG_DATABASE_URL`, the database whose tables it exposes as a GraphQL API. They can point at the same Postgres (as this template does) or be split. This two-URL model is what trips up most first-time deployments — the template wires both correctly.

**The admin secret is mandatory — never run without it.** Without `HASURA_GRAPHQL_ADMIN_SECRET`, your GraphQL console and full admin API are open to anyone who finds the URL, giving them complete control of your data. This template sets a strong admin secret, so the console and admin endpoints require it. Keep it secret and never expose it to client-side code.

**Harden for production.** For a live API, set `HASURA_GRAPHQL_ENABLE_CONSOLE="false"` and `HASURA_GRAPHQL_DEV_MODE="false"` so the console and detailed error traces aren't publicly served, and set `HASURA_GRAPHQL_CORS_DOMAIN` to your frontend's domain to restrict which origins can call the API.

**JWT authentication for real apps.** Set `HASURA_GRAPHQL_JWT_SECRET` to a config pointing at your auth provider's JWKS URL (Auth0, Clerk, Firebase), and Hasura validates tokens on every request and exposes their claims as `x-hasura-*` session variables. You then write row- and column-level permission rules against those variables in Hasura — authorization without a custom backend.

**Bring your own database, or use the included one.** By default this template includes PostgreSQL for both metadata and data. If you already run Postgres on Neon, Supabase, or RDS, remove the bundled database and point both database URLs at your external connection strings — Hasura layers a GraphQL API over your existing schema instantly.

**Real-time subscriptions built in.** Beyond queries and mutations, Hasura serves GraphQL subscriptions over WebSockets, so your frontend gets live updates as data changes — real-time features with no extra infrastructure.

Typical cost: **~$5–10/month** on Railway for the engine and Postgres. The core Hasura GraphQL Engine is Apache-2.0 and free — self-hosting costs only your infrastructure, versus Hasura Cloud's usage-based pricing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hasura | `hasura/graphql-engine:v2.40.2` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HASURA_GRAPHQL_SERVER_HOST` | Hasura | :: | - |
| `HASURA_GRAPHQL_ADMIN_SECRET` | Hasura | (secret) | - |
| `HASURA_GRAPHQL_ENABLE_CONSOLE` | Hasura | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/hasura-graphql-api)
