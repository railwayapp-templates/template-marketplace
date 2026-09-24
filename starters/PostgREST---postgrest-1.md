# Deploy PostgREST on Railway

PostgREST 16.3 instant REST API over Postgres with JWT auth and Swagger UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgrest-1)

## About

PostgREST turns a PostgreSQL database into a RESTful API. Tables, views and functions in the exposed schema become endpoints with filtering, pagination, embedding and OpenAPI docs. Permissions come from Postgres roles, grants and row-level security, and requests are authenticated with JWTs. It powers the REST layer of Supabase.

This template deploys PostgREST v16.3, a Railway Postgres database and Swagger UI. On every start, a small wrapper creates the `authenticator`, `web_anon` and `authenticated` roles and the `api` schema, and it is safe to re-run. It also adds an event trigger so new tables appear in the API without a restart. Anonymous requests get nothing until you grant access. Requests carrying a JWT with `"role": "authenticated"`, signed with the generated secret, can read and write tables in `api`. PostgREST is light and stateless, so the Hobby plan is enough for most projects.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgrest | [aalfath/postgrest-railway-template](https://github.com/aalfath/postgrest-railway-template) | Web service |
| docs | `swaggerapi/swagger-ui:v5.33.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | postgrest | 3000 |
| `PGRST_DB_SCHEMAS` | postgrest | api |
| `PGRST_JWT_SECRET` | postgrest | (secret) |
| `PGRST_DB_ANON_ROLE` | postgrest | web_anon |
| `PGRST_AUTHENTICATOR_PASSWORD` | postgrest | (secret) |
| `PORT` | docs | 8080 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Shell, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/deploy/postgrest-1)
