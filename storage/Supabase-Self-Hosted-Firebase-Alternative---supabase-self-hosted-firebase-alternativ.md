# Deploy Supabase (Self-Hosted Firebase Alternative) on Railway

Self-hosted Firebase alternative - full Supabase stack [Updated Aug '26]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase-self-hosted-firebase-alternativ)

## About

Supabase is an open-source Firebase alternative — a complete backend platform built on PostgreSQL that you fully own. It gives you a Postgres database, authentication, instant REST and realtime APIs, file storage, and an admin dashboard, all from one stack. This template deploys the full self-hosted Supabase platform — PostgreSQL, the GoTrue auth server, PostgREST, the Realtime server, Storage with Imgproxy, Postgres-Meta, the Supabase Studio dashboard, a Supavisor connection pooler, and an Envoy API gateway that fronts everything on a single domain — each pinned to a verified upstream image and wired over Railway's private network so it comes up working on the first deploy.

Supabase is a multi-service application: PostgreSQL at the core, GoTrue for authentication, PostgREST for the auto-generated REST API, a Realtime server for websockets and change-data-capture, Storage with an Imgproxy image transformer, Postgres-Meta for schema introspection, the Next.js Studio dashboard, a Supavisor pooler, and an Envoy gateway. Only the Envoy gateway is exposed publicly; it routes `/auth`, `/rest`, `/realtime`, `/storage` and the Studio dashboard to the right internal service over Railway's private network, and the dashboard sits behind HTTP basic auth. This template wires every connection string, ships a matching set of JWT signing keys (`JWT_SECRET`, `ANON_KEY`, `SERVICE_ROLE_KEY` and the JWKS the services verify against), generates a fresh database password per deploy, and attaches persistent volumes to Postgres and Storage. When it finishes deploying, open the Envoy domain to reach Studio and start creating tables, auth users and storage buckets.

Security note: this template ships with a working default `JWT_SECRET` and matching `ANON_KEY` / `SERVICE_ROLE_KEY` so it runs out of the box, exactly like Supabase's own docker `.env` example. For any production or internet-facing use you should rotate these — generate a new `JWT_SECRET`, regenerate the anon and service keys from it, and update the Studio service variables — so your instance does not share keys with other deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Supavisor | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) (root: /pooler) | TCP service |
| Imgproxy | `darthsim/imgproxy:v3.30.1` | Worker |
| Gotrue Auth | `supabase/gotrue:v2.189.0` | Database |
| Supabase Realtime | `supabase/realtime:v2.102.3` | Database |
| Postgres Meta | `supabase/postgres-meta:v0.96.6` | Database |
| Supabase Storage | `supabase/storage-api:v1.60.4` | Database |
| Envoy | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) (root: /envoy) | Web service |
| Supabase Studio | `supabase/studio:2026.08.03-sha-022b374` | Database |
| Postgres | `ghcr.io/6ixfalls/supabase-postgres:17.6.1.136` | Database |
| Postgrest | `postgrest/postgrest:v14.12` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Supavisor | 4000 | - |
| `REGION` | Supavisor | local | - |
| `ERL_AFLAGS` | Supavisor | -proto_dist inet_tcp | - |
| `DB_POOL_SIZE` | Supavisor | 5 | Pool size for internal metadata storage used by Supavisor; This is separate from client connections and used only by Supavisor itself |
| `API_JWT_SECRET` | Supavisor | (secret) | - |
| `SECRET_KEY_BASE` | Supavisor | (secret) | - |
| `CLUSTER_POSTGRES` | Supavisor | true | - |
| `POOLER_POOL_MODE` | Supavisor | transaction | - |
| `POOLER_TENANT_ID` | Supavisor | railway | Unique Supavisor tenant identifier: https://supabase.com/docs/guides/self-hosting/docker#accessing-postgres |
| `POSTGRES_PASSWORD` | Supavisor | (secret) | - |
| `METRICS_JWT_SECRET` | Supavisor | (secret) | - |
| `POOLER_MAX_CLIENT_CONN` | Supavisor | 100 | Maximum number of client connections Supavisor accepts per pool |
| `POOLER_DEFAULT_POOL_SIZE` | Supavisor | 20 | Maximum number of PostgreSQL connections Supavisor opens per pool |
| `USE_THIS_POOLER_POSTGRES_URL` | Supavisor | - | Internal Pooler Postgres URL for you to use. |
| `USE_THIS_POOLER_EXTERNAL_POSTGRES_URL` | Supavisor | - | External Pooler Postgres URL for you to use. |
| `PORT` | Imgproxy | 5001 | - |
| `IMGPROXY_USE_ETAG` | Imgproxy | true | - |
| `IMGPROXY_AUTO_WEBP` | Imgproxy | true | - |
| `IMGPROXY_MAX_SRC_RESOLUTION` | Imgproxy | 16.8 | - |
| `GOTRUE_JWT_AUD` | Gotrue Auth | authenticated | - |
| `GOTRUE_API_HOST` | Gotrue Auth | :: | - |
| `GOTRUE_API_PORT` | Gotrue Auth | 9999 | - |
| `GOTRUE_SITE_URL` | Gotrue Auth | - | The base URL your site is located at. Currently used in combination with other settings to construct URLs used in emails. Any URI that shares a host with SITE_URL is a permitted value for redirect_to params (see /authorize etc.). You can set this to `http://localhost:3000` for testing. |
| `GOTRUE_DB_DRIVER` | Gotrue Auth | postgres | - |
| `GOTRUE_JWT_SECRET` | Gotrue Auth | (secret) | - |
| `GOTRUE_JWT_ADMIN_ROLES` | Gotrue Auth | service_role | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | Gotrue Auth | authenticated | - |
| `PORT` | Supabase Realtime | 4000 | - |
| `DB_USER` | Supabase Realtime | (secret) | - |
| `APP_NAME` | Supabase Realtime | realtime | - |
| `DNS_NODES` | Supabase Realtime | '' | - |
| `ERL_AFLAGS` | Supabase Realtime | -proto_dist inet6_tcp | - |
| `DB_PASSWORD` | Supabase Realtime | (secret) | - |
| `RUN_JANITOR` | Supabase Realtime | true | - |
| `RLIMIT_NOFILE` | Supabase Realtime | 10000 | - |
| `API_JWT_SECRET` | Supabase Realtime | (secret) | - |
| `SEED_SELF_HOST` | Supabase Realtime | true | - |
| `SECRET_KEY_BASE` | Supabase Realtime | (secret) | - |
| `METRICS_JWT_SECRET` | Supabase Realtime | (secret) | - |
| `SELF_HOST_TENANT_NAME` | Supabase Realtime | realtime-dev | - |
| `DB_AFTER_CONNECT_QUERY` | Supabase Realtime | SET search_path TO _realtime | - |
| `DISABLE_HEALTHCHECK_LOGGING` | Supabase Realtime | true | - |
| `PG_META_HOST` | Postgres Meta | :: | - |
| `PG_META_PORT` | Postgres Meta | 8080 | - |
| `PG_META_DB_USER` | Postgres Meta | (secret) | - |
| `PG_META_DB_PASSWORD` | Postgres Meta | (secret) | - |
| `PORT` | Supabase Storage | 5000 | - |
| `TENANT_ID` | Supabase Storage | railway | - |
| `SERVER_HOST` | Supabase Storage | :: | - |
| `AUTH_JWT_SECRET` | Supabase Storage | (secret) | - |
| `STORAGE_BACKEND` | Supabase Storage | s3 | - |
| `AWS_SECRET_ACCESS_KEY` | Supabase Storage | (secret) | - |
| `UPLOAD_FILE_SIZE_LIMIT` | Supabase Storage | 524288000 | - |
| `STORAGE_S3_FORCE_PATH_STYLE` | Supabase Storage | true | - |
| `IMAGE_TRANSFORMATION_ENABLED` | Supabase Storage | true | - |
| `S3_PROTOCOL_ACCESS_KEY_SECRET` | Supabase Storage | (secret) | - |
| `REQUEST_ALLOW_X_FORWARDED_PATH` | Supabase Storage | true | - |
| `UPLOAD_FILE_SIZE_LIMIT_STANDARD` | Supabase Storage | 52428800 | - |
| `PORT` | Envoy | 8000 | - |
| `ANALYTICS_HOST` | Envoy | not_present | - |
| `FUNCTIONS_HOST` | Envoy | not_present | - |
| `DASHBOARD_PASSWORD` | Envoy | (secret) | - |
| `DASHBOARD_USERNAME` | Envoy | (secret) | - |
| `SUPABASE_SECRET_KEY` | Envoy | (secret) | - |
| `PORT` | Supabase Studio | 3000 | - |
| `ANON_KEY` | Supabase Studio | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNhYzZiMmUwLWQ1MjgtNDU4My04ODJhLTZmNTgzMTM1OGI3OSJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzM1Njg5NjAwLCJleHAiOjIwNTEwNDk2MDB9.BM2ocpJ8XU9OEd0q32-zFVkYz3slJg9mgFfA9yf4oPw | - |
| `HOSTNAME` | Supabase Studio | :: | - |
| `JWT_JWKS` | Supabase Studio | {"keys":[{"kty":"oct","k":"dGdtWE50ajVHSmRRQVJwZlZwMzhQOXlGSDBSQU5aVjZ6M0RxYkpLcQ","kid":"3ac6b2e0-d528-4583-882a-6f5831358b79","alg":"HS256","key_ops":["sign","verify"]}]} | - |
| `JWT_KEYS` | Supabase Studio | [{"kty":"oct","k":"dGdtWE50ajVHSmRRQVJwZlZwMzhQOXlGSDBSQU5aVjZ6M0RxYkpLcQ","kid":"3ac6b2e0-d528-4583-882a-6f5831358b79","alg":"HS256","key_ops":["sign","verify"]}] | - |
| `JWT_SECRET` | Supabase Studio | (secret) | - |
| `OPENAI_API_KEY` | Supabase Studio | (secret) | Add your OpenAI API key to enable AI Assistant |
| `AUTH_JWT_SECRET` | Supabase Studio | (secret) | - |
| `PGRST_DB_SCHEMAS` | Supabase Studio | public,graphql_public | Postgres schemas exposed via the REST API |
| `SERVICE_ROLE_KEY` | Supabase Studio | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNhYzZiMmUwLWQ1MjgtNDU4My04ODJhLTZmNTgzMTM1OGI3OSJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3MzU2ODk2MDAsImV4cCI6MjA1MTA0OTYwMH0.2fVclvTRTjrYrUfG-qSRfbGGyzjSd3VSDmUbztD36S8 | - |
| `PGRST_DB_MAX_ROWS` | Supabase Studio | 1000 | Max number of rows returned by a request |
| `POSTGRES_PASSWORD` | Supabase Studio | (secret) | - |
| `SUPABASE_SECRET_KEY` | Supabase Studio | (secret) | - |
| `DEFAULT_PROJECT_NAME` | Supabase Studio | Default Project | - |
| `AAAA_IMPORTANT_READ_ME` | Supabase Studio | - | READ THIS! To setup Supabase, you need to generate a JWT Secret and the respective secrets. Either copy the secrets one by one, or deploy the template and paste the entire ENV block into the bottom of Supabase Studio > Environment > Raw Editor (don't touch the existing variables!) This value can be set to anything to proceed. http://6ixfalls.github.io/supabase |
| `NEXT_PUBLIC_ENABLE_LOGS` | Supabase Studio | true | - |
| `POSTGRES_USER_READ_WRITE` | Supabase Studio | postgres | - |
| `DEFAULT_ORGANIZATION_NAME` | Supabase Studio | Default Organization | - |
| `ENABLED_FEATURES_LOGS_ALL` | Supabase Studio | false | - |
| `PGRST_DB_EXTRA_SEARCH_PATH` | Supabase Studio | public | Extra schemas added to the search_path of every request |
| `SNIPPETS_MANAGEMENT_FOLDER` | Supabase Studio | /mnt/data/snippets | - |
| `NEXT_ANALYTICS_BACKEND_PROVIDER` | Supabase Studio | postgres | - |
| `JWT_SECRET` | Postgres | (secret) | - |
| `POSTGRES_DB` | Postgres | postgres | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PGRST_JWT_SECRET` | Postgrest | (secret) | - |
| `PGRST_SERVER_HOST` | Postgrest | *6 | - |
| `PGRST_DB_ANON_ROLE` | Postgrest | anon | - |
| `PGRST_DB_USE_LEGACY_GUCS` | Postgrest | false | - |
| `PGRST_APP_SETTINGS_JWT_EXP` | Postgrest | 3600 | - |
| `PGRST_APP_SETTINGS_JWT_SECRET` | Postgrest | (secret) | - |

## Configuration

- **Healthcheck:** `/api/health`
- **TCP Proxies:** 6543
- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/platform/profile`
- **Volume:** `/mnt/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `postgrest`

**Category:** Storage · **Languages:** HTML, PLpgSQL, Shell, JavaScript, Dockerfile, Elixir

[View on Railway →](https://railway.com/deploy/supabase-self-hosted-firebase-alternativ)
