# Deploy PostgREST | (Just Updated) REST API for Postgres, JWT Secret Generated, Data Survives Redeploys on Railway

REST API for Postgres with JWT auth. Secrets generated, data persists.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgrest-or-just-updated-rest-api-for-p)

## About

PostgREST turns a PostgreSQL database into a RESTful API straight from its schema, with JWT authentication and role-based access. This template deploys it together with its own Postgres database, with the JWT secret and database password generated for you.

The template starts two services: `postgrest` (the API server, public HTTPS domain) and `postgres` (private, on a persistent volume). PostgREST connects to Postgres over Railway's private network. A demo `public.todos` table, an `anon` role (read only) and an `authenticated` role (full access) are created on first boot, so the API answers something useful immediately. `PGRST_JWT_SECRET` is generated per deploy; sign a JWT with it and a `role` claim to write.

Machine-readable contract:

```
public_url:     https://${RAILWAY_PUBLIC_DOMAIN of service postgrest}
internal_url:   http://postgrest.railway.internal:8080
openapi:        GET /  (OpenAPI document, 200 when ready)
tables:         GET/POST/PATCH/DELETE /
health:         GET /  (200 when ready)
credentials:    PGRST_JWT_SECRET (service postgrest, HS256), POSTGRES_PASSWORD (service postgres)
database_url:   PGRST_DB_URI (service postgrest)
roles:          anon (read), authenticated (read/write) - JWT claim "role"
port:           8080 (HTTP)
```

Working checks, run them after the deploy turns green:

```
curl -s https:///todos

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgrest | `ghcr.io/bon5co/postgrest-railway@sha256:730411893fa046656d656ca8e3300bbe45948b2f96ed5ac116089105162f3507` | Database |
| postgres | `postgres:18.6@sha256:74935e72241653ca55e0414067e6d8763aceb8a810eb51b452253ec3dcfc4336` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PGRST_JWT_SECRET` | postgrest | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'printf "CREATE ROLE anon NOLOGIN;\nCREATE ROLE authenticated NOLOGIN;\nGRANT anon, authenticated TO postgres;\nCREATE TABLE IF NOT EXISTS public.todos (id serial PRIMARY KEY, task text NOT NULL, done boolean NOT NULL DEFAULT false);\nINSERT INTO public.todos (task) SELECT chr(104)||chr(101)||chr(108)||chr(108)||chr(111);\nGRANT USAGE ON SCHEMA public TO anon, authenticated;\nGRANT SELECT ON public.todos TO anon;\nGRANT ALL ON public.todos TO authenticated;\nGRANT USAGE, SELECT ON SEQUENCE public.todos_id_seq TO authenticated;\n" > /docker-entrypoint-initdb.d/00-postgrest.sql; exec docker-entrypoint.sh postgres'`
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/postgrest-or-just-updated-rest-api-for-p)
