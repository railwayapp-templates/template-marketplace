# Deploy Supabase Lite on Railway

Minimal self-hosted Supabase: 7 core services, ~1.5 GB RAM, ~$10-15/mo.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase-lite)

## About

A minimal, cost-optimized self-hosted Supabase stack for Railway. Unlike the full 12-service Supabase template that needs 4–8 GB RAM, **Supabase Lite runs the 7 core services in ~1.5 GB RAM for roughly $10–15/mo**.

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/mv2xIy)

Supabase Lite runs 7 Docker-based services on Railway's managed infrastructure. All inter-service communication uses Railway private networking (`*.railway.internal`). Only the Kong gateway is exposed publicly via a Railway domain. Two persistent volumes are provisioned automatically: `postgres-data` (mounted at `/var/lib/postgresql`) and `minio-data` (mounted at `/data`).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rest | `postgrest/postgrest:v14.8` | Database |
| realtime | `supabase/realtime:v2.76.5` | Database |
| auth | `supabase/gotrue:v2.186.0` | Database |
| postgres | [INAPP-Mobile/railway-supabase-lite](https://github.com/INAPP-Mobile/railway-supabase-lite) (root: postgres) | Database |
| storage | `supabase/storage-api:v1.48.26` | Database |
| kong | [INAPP-Mobile/railway-supabase-lite](https://github.com/INAPP-Mobile/railway-supabase-lite) (root: kong) | Web service |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGRST_DB_URI` | rest | - | PostgreSQL connection string for PostgREST. Uses private networking and references postgres service vars. The *** is auto-resolved to the real password by Railway. |
| `PGRST_DB_SCHEMAS` | rest | public,storage | Comma-separated list of database schemas PostgREST exposes. graphql_public omitted (requires pg_graphql extension). |
| `PGRST_JWT_SECRET` | rest | (secret) | HS256 secret for verifying JWTs. References the auth service's JWT_SECRET so all services share the same signing key. |
| `PGRST_SERVER_PORT` | rest | 8080 | PostgREST listen port. Set to Railway-injected ${{PORT}} so health checks and Kong proxy can reach it. |
| `PGRST_DB_ANON_ROLE` | rest | anon | Database role used for anonymous (unauthenticated) requests. Must match the role created in PostgreSQL init scripts. |
| `PGRST_DB_EXTRA_SEARCH_PATH` | rest | public | Extra schema search path for PostgREST to find functions and types in the public schema. |
| `DB_HOST` | realtime | - | PostgreSQL host via Railway private networking. References the postgres service's private domain. |
| `DB_NAME` | realtime | - | PostgreSQL database name. References the postgres service's POSTGRES_DB. |
| `DB_PORT` | realtime | - | PostgreSQL port. References the postgres service's POSTGRES_PORT. |
| `DB_USER` | realtime | (secret) | PostgreSQL username. References the postgres service's POSTGRES_USER. |
| `APP_NAME` | realtime | realtime | Application name for the Realtime service. Required by the Elixir/Erlang app for node naming. |
| `DNS_NODES` | realtime | - | DNS node names for Erlang clustering. Leave empty for single-node deployment. |
| `ERL_AFLAGS` | realtime | -proto_dist inet_tcp | Erlang distribution flags. inet_tcp ensures standard TCP clustering works on Railway. |
| `JWT_SECRET` | realtime | (secret) | JWT secret for Realtime. References the auth service's JWT_SECRET so all services share the same signing key. |
| `DB_PASSWORD` | realtime | (secret) | PostgreSQL password. References the postgres service's POSTGRES_PASSWORD. |
| `API_JWT_SECRET` | realtime | (secret) | JWT secret for the Realtime API. Mirrors JWT_SECRET from the auth service. |
| `SECRET_KEY_BASE` | realtime | (secret) | Elixir secret key base for crypto operations (session signing, CSRF tokens). Auto-generated 64-char secret. |
| `ENABLE_TAILSCALE` | realtime | false | Enable Tailscale-based clustering. Set to false for Railway (uses standard TCP). |
| `DB_AFTER_CONNECT_QUERY` | realtime | SET search_path TO _realtime | SQL executed after connecting to PostgreSQL. Sets the search path to the _realtime schema. |
| `ANON_KEY` | auth | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9e3yw3PVyZLmKs5qLD6nGL1SI | Public client API key — JWT signed by JWT_SECRET with role=anon. Pre-computed for default JWT_SECRET; regenerate if you change JWT_SECRET. |
| `JWT_SECRET` | auth | (secret) | JWT secret used to sign API tokens. Default is the Supabase demo secret — change this and regenerate ANON_KEY/SERVICE_ROLE_KEY for production. |
| `DATABASE_URL` | auth | - | Raw PostgreSQL connection string (without search_path). Available for migrations and tooling. |
| `GOTRUE_JWT_EXP` | auth | 3600 | JWT expiration time in seconds (3600 = 1 hour). |
| `GOTRUE_API_HOST` | auth | 0.0.0.0 | Bind address for the GoTrue (Supabase Auth) API server. 0.0.0.0 binds all interfaces so Railway's proxy can reach it. |
| `GOTRUE_API_PORT` | auth | 8080 | Listen port for GoTrue API. Set to Railway-injected ${{PORT}} so health checks and Kong proxy can reach it. |
| `GOTRUE_SITE_URL` | auth | - | Site URL for auth redirect flows. Points to the Kong gateway public domain. |
| `API_EXTERNAL_URL` | auth | - | External-facing API URL. Points to the Kong gateway's public domain so OAuth redirects work correctly. |
| `GOTRUE_DB_DRIVER` | auth | postgres | Database driver — always postgres. |
| `GOTRUE_SMTP_HOST` | auth | - | SMTP server host for sending auth emails. Leave empty to disable email sending (emails will not be sent). Example: smtp.gmail.com |
| `GOTRUE_SMTP_PORT` | auth | 587 | SMTP server port. Must be numeric (GoTrue requires an integer). Common: 587 (TLS), 465 (SSL), 25 (unencrypted). Ignored when GOTRUE_SMTP_HOST is empty. |
| `SERVICE_ROLE_KEY` | auth | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIn0.M2d2z4SFn5C7HlJlaSLfrzuYim9nbY_XI40uWFN3hEE | Server-side key with full database access — JWT signed by JWT_SECRET with role=service_role. Pre-computed for default JWT_SECRET; regenerate if you change JWT_SECRET. |
| `GOTRUE_JWT_SECRET` | auth | (secret) | GoTrue-specific JWT secret. Mirrors JWT_SECRET within the same service. |
| `DASHBOARD_PASSWORD` | auth | (secret) | Password for admin dashboard access. Auto-generated. |
| `DASHBOARD_USERNAME` | auth | (secret) | Username for admin dashboard access (if Studio were included). |
| `GOTRUE_URI_ALLOW_LIST` | auth | - | Comma-separated list of additional allowed redirect URIs for OAuth flows. Leave empty to allow only the site URL. |
| `GOTRUE_DB_DATABASE_URL` | auth | - | PostgreSQL connection string for GoTrue. Uses private networking and references postgres service vars. The *** is auto-resolved by Railway to the actual password. |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | Auto-confirm user emails on signup (development mode). Set to false in production to require email verification. |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | Enable external email provider support. Set to false to disable email auth. |
| `POSTGRES_DB` | postgres | postgres | Name of the default database created on first boot. All Supabase schemas (auth, storage, _realtime, public) are created inside this database. |
| `DATABASE_URL` | postgres | - | Self-referencing connection string. Consumed by the postgres service itself and referenced by dependent services as ${{postgres.DATABASE_URL}}. |
| `POSTGRES_PORT` | postgres | 5432 | Port PostgreSQL listens on inside the container. Must stay 5432 — all other services reference this port via private networking. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL superuser username. Change to harden the default account. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Master database password — auto-generated at deploy time. Referenced by all Supabase services (auth, rest, realtime, storage) via ${{postgres.POSTGRES_PASSWORD}}. |
| `REGION` | storage | us-east-1 | Region for the storage API. Must match AWS_REGION. |
| `ANON_KEY` | storage | - | Public anon JWT. References the auth service's ANON_KEY so client-side storage calls are authenticated. |
| `AWS_REGION` | storage | us-east-1 | AWS region for S3. MinIO ignores this but the storage API requires a non-empty value. |
| `DATABASE_URL` | storage | - | PostgreSQL connection string for storage API. Uses private networking and references postgres service vars. |
| `AWS_S3_ENDPOINT` | storage | - | S3 endpoint URL. Points to MinIO via Railway private networking on port 8080 (Railway-injected PORT). |
| `FILE_SIZE_LIMIT` | storage | 52428800 | Maximum file upload size in bytes (52428800 = 50 MB). Increase for larger file support. |
| `STORAGE_BACKEND` | storage | s3 | Storage backend type. 's3' uses MinIO (S3-compatible). 'file' uses local disk (not recommended for Railway). |
| `GLOBAL_S3_BUCKET` | storage | supabase-storage | Default S3 bucket name. The bucket is created automatically on first storage API startup if it does not exist. |
| `PGRST_JWT_SECRET` | storage | (secret) | HS256 secret for JWT verification. References the auth service's JWT_SECRET. |
| `SERVICE_ROLE_KEY` | storage | - | Server-side full-access key. References the auth service's SERVICE_ROLE_KEY for admin storage operations. |
| `AWS_ACCESS_KEY_ID` | storage | - | S3 access key. References the minio service's MINIO_ROOT_USER. |
| `AWS_SECRET_ACCESS_KEY` | storage | (secret) | S3 secret key. References the minio service's MINIO_ROOT_PASSWORD (auto-generated). |
| `AWS_S3_FORCE_PATH_STYLE` | storage | true | Force path-style S3 addressing. Required for MinIO compatibility (not using virtual-host-style). |
| `FILE_STORAGE_BACKEND_PATH` | storage | /tmp | Temporary path for file processing before upload to S3. |
| `ENABLE_IMAGE_TRANSFORMATION` | storage | false | Enable image transformation (resize, optimize). Set to false to save RAM on Railway. |
| `PORT` | kong | 8080 | Railway-injected port. Kong proxy listens on this port. |
| `AUTH_HOST` | kong | - | Private domain for the auth (GoTrue) service. Kong proxies /auth/v1/* requests here. |
| `REST_HOST` | kong | - | Private domain for the rest (PostgREST) service. Kong proxies /rest/v1/* requests here. |
| `STORAGE_HOST` | kong | - | Private domain for the storage service. Kong proxies /storage/v1/* requests here. |
| `REALTIME_HOST` | kong | - | Private domain for the realtime service. Kong proxies /realtime/v1/* requests here. |
| `KONG_PROXY_LISTEN` | kong | - | Kong proxy listen address. Uses Railway-injected ${{PORT}} so health checks and external traffic can reach it. |
| `PORT` | minio | 8080 | Railway-injected port. Minio API listens on this port. |
| `MINIO_ADDRESS` | minio | 0.0.0.0:8080 | MinIO listen address. Port 8080 matches Railway's injected PORT so health checks can reach it. |
| `MINIO_ROOT_USER` | minio | (secret) | MinIO root (admin) username. Referenced by the storage service as AWS_ACCESS_KEY_ID via ${{minio.MINIO_ROOT_USER}}. |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | MinIO root password — auto-generated at deploy time. Referenced by the storage service as AWS_SECRET_ACCESS_KEY via ${{minio.MINIO_ROOT_PASSWORD}}. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Start command:** `sh -c 'until nc -z $POSTGRES_HOST $POSTGRES_PORT 2>/dev/null; do echo waiting for postgres; sleep 2; done; exec gotrue'`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `sh -c 'until nc -z $POSTGRES_HOST $POSTGRES_PORT 2>/dev/null; do echo waiting for postgres; sleep 2; done; until nc -z $MINIO_HOST 8080 2>/dev/null; do echo waiting for minio; sleep 2; done; exec node dist/start/server.js'`
- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `minio server /data --address 0.0.0.0:8080 --console-address 0.0.0.0:9001`
- **Healthcheck:** `/minio/health/live`
- **Volume:** `/data`

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/supabase-lite)
