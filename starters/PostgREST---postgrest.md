# Deploy PostgREST on Railway

Instant Restful APIs for your PostgreSQL database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgrest)

## About

**What is PostgREST?**
PostgREST is a standalone web server that turns a PostgreSQL database directly into a RESTful API. It auto-generates endpoints from tables, views, and RPC functions, respects database permissions and RLS, and serves OpenAPI docs—perfect for data-centric backends without writing (or maintaining) application code.

Hosting PostgREST on Railway is simple: run the official Docker image and point it at a Railway PostgreSQL add-on via `DATABASE_URL`. Configure at runtime with env vars (e.g., `PGRST_DB_URI`, `PGRST_DB_SCHEMAS`, `PGRST_DB_ANON_ROLE`, and `PGRST_SERVER_PORT=$PORT`). Define roles/grants in SQL, enable RLS where needed, and (optionally) set `PGRST_JWT_SECRET` for authenticated access. Railway gives you a public HTTPS URL, logs, env-var management, and one-click scaling. Redeploy to apply config changes—no app code or build pipeline required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| postgrest | `postgrest/postgrest:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PGRST_DB_SCHEMAS` | postgrest | - | The list of database schemas to expose to clients |
| `PGRST_JWT_SECRET` | postgrest | (secret) | The secret or JSON Web Key (JWK) (or set) used to decode JWT tokens clients provide for authentication. For security the key must be at least 32 characters long. |
| `PGRST_SERVER_PORT` | postgrest | 3000 | Port the postgrest process is listening on for http requests |
| `PGRST_DB_ANON_ROLE` | postgrest | - | The database role to use when executing commands on behalf of unauthenticated clients.  |
| `PGRST_SERVER_HOST  ` | postgrest |  0.0.0.0 | - |
| `PGRST_JWT_SECRET_IS_BASE64` | postgrest | (secret) | When this is set to true, the value derived from jwt-secret will be treated as a base64 encoded secret. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/deploy/postgrest)
