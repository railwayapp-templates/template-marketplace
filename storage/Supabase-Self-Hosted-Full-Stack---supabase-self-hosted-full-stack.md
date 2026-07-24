# Deploy Supabase (Self-Hosted, Full Stack) on Railway

Full Supabase stack: Postgres, Auth, REST, Storage, Studio behind Kong.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase-self-hosted-full-stack)

## About

Supabase is the open-source Firebase alternative: a full backend built on PostgreSQL with instant REST and GraphQL APIs, authentication, file storage, and a beautiful admin dashboard. This template deploys the real self-hosted stack — 7 services wired together over Railway's private network — not just a bare database.

One click deploys PostgreSQL 17 (Supabase build, on a persistent volume), GoTrue auth, PostgREST, Storage API (persistent volume), postgres-meta, Supabase Studio, and a Kong API gateway that exposes everything on a single public URL — exactly like the official docker-compose, adapted for Railway. Before deploying you must generate three secrets (2 minutes): open the official generator at https://supabase.com/docs/guides/self-hosting/docker#securing-your-services, create a `JWT_SECRET` with matching `ANON_KEY` and `SERVICE_ROLE_KEY`, and paste them into the deploy form. Everything else (database password, dashboard password) is auto-generated.

**After deploy:**

- Open the `kong` service's public URL → Supabase Studio (login: `DASHBOARD_USERNAME` / `DASHBOARD_PASSWORD` from the kong service variables)
- Your API endpoints: `https:///rest/v1/`, `/auth/v1/`, `/storage/v1/`, `/graphql/v1`
- Use with supabase-js: `createClient("https://", "")`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rest | `postgrest/postgrest:v14.12` | Database |
| auth | `supabase/gotrue:v2.189.0` | Database |
| Postgres | `supabase/postgres:17.6.1.136` | Database |
| studio | `supabase/studio:2026.07.07-sha-a6a04f2` | Database |
| storage | `supabase/storage-api:v1.60.4` | Database |
| meta | `supabase/postgres-meta:v0.96.6` | Database |
| kong | `kong/kong:3.9.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGRST_DB_URI` | rest | - | Database connection over private networking. Do not change. |
| `PGRST_DB_SCHEMAS` | rest | public,storage,graphql_public | Schemas exposed by the REST API. |
| `PGRST_JWT_SECRET` | rest | (secret) | Shared JWT secret. Do not change. |
| `PGRST_DB_ANON_ROLE` | rest | anon | Do not change. |
| `PGRST_DB_USE_LEGACY_GUCS` | rest | false | Do not change. |
| `PGRST_APP_SETTINGS_JWT_EXP` | rest | - | Do not change. |
| `PGRST_APP_SETTINGS_JWT_SECRET` | rest | (secret) | Do not change. |
| `GOTRUE_JWT_AUD` | auth | authenticated | Do not change. |
| `GOTRUE_JWT_EXP` | auth | - | JWT expiry. Do not change. |
| `GOTRUE_API_HOST` | auth | 0.0.0.0 | Bind address. Do not change. |
| `GOTRUE_API_PORT` | auth | 9999 | GoTrue port. Do not change. |
| `GOTRUE_SITE_URL` | auth | - | Your app's URL used in auth redirects and emails. Change to your frontend URL. |
| `API_EXTERNAL_URL` | auth | - | Public URL of the Supabase API gateway (Kong). |
| `GOTRUE_DB_DRIVER` | auth | postgres | Do not change. |
| `GOTRUE_JWT_SECRET` | auth | (secret) | Shared JWT secret. Do not change. |
| `GOTRUE_DISABLE_SIGNUP` | auth | false | Set true to block new user signups. |
| `GOTRUE_DB_DATABASE_URL` | auth | - | Auth database connection over private networking. Do not change. |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | Do not change. |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | Auto-confirm signups (no SMTP configured). Set false once you add SMTP. |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | Enable email/password auth. |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | Do not change. |
| `JWT_EXP` | Postgres | 3600 | JWT expiry in seconds. |
| `JWT_SECRET` | Postgres | (secret) | REQUIRED. 40+ char JWT secret shared by all Supabase services. Generate it together with matching ANON_KEY and SERVICE_ROLE_KEY at https://supabase.com/docs/guides/self-hosting/docker#securing-your-services |
| `POSTGRES_DB` | Postgres | postgres | Main database name. Keep as postgres. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated password for all internal Supabase database roles. |
| `PORT` | studio | 3000 | Pin Studio to port 3000 so Kong can reach it. Do not change. |
| `HOSTNAME` | studio | 0.0.0.0 | Bind address so the Railway edge and Kong can reach Studio. Do not change. |
| `POSTGRES_DB` | studio | - | Do not change. |
| `SUPABASE_URL` | studio | - | Internal Kong URL. Do not change. |
| `POSTGRES_HOST` | studio | - | DB host for Studio's SQL/Table editor. Do not change. |
| `POSTGRES_PORT` | studio | 5432 | Do not change. |
| `POSTGRES_USER` | studio | (secret) | DB user Studio's query editor connects as. Do not change. |
| `AUTH_JWT_SECRET` | studio | (secret) | Do not change. |
| `POSTGRES_PASSWORD` | studio | (secret) | Do not change. |
| `SUPABASE_ANON_KEY` | studio | - | Do not change. |
| `STUDIO_PG_META_URL` | studio | - | Do not change. |
| `SUPABASE_PUBLIC_URL` | studio | - | Public Supabase API URL shown in Studio connect instructions. |
| `DEFAULT_PROJECT_NAME` | studio | My Project | Project name shown in Studio. |
| `SUPABASE_SERVICE_KEY` | studio | - | Do not change. |
| `NEXT_PUBLIC_ENABLE_LOGS` | studio | false | Logs UI needs the analytics stack (not included). Keep false. |
| `DEFAULT_ORGANIZATION_NAME` | studio | My Organization | Organization name shown in Studio. |
| `PORT` | storage | 5000 | Pin Storage API to port 5000 so Kong can reach it. Do not change. |
| `REGION` | storage | stub | Do not change. |
| `ANON_KEY` | storage | - | Do not change. |
| `TENANT_ID` | storage | stub | Do not change. |
| `SERVICE_KEY` | storage | - | Do not change. |
| `DATABASE_URL` | storage | - | Do not change. |
| `POSTGREST_URL` | storage | - | Do not change. |
| `FILE_SIZE_LIMIT` | storage | 52428800 | Max upload size in bytes (50 MB default). |
| `STORAGE_BACKEND` | storage | file | Files stored on the attached Railway volume. |
| `GLOBAL_S3_BUCKET` | storage | stub | Do not change. |
| `PGRST_JWT_SECRET` | storage | (secret) | Do not change. |
| `FILE_STORAGE_BACKEND_PATH` | storage | /var/lib/storage | Do not change. |
| `ENABLE_IMAGE_TRANSFORMATION` | storage | false | Requires imgproxy with a shared volume, which Railway does not support. Keep false. |
| `PG_META_PORT` | meta | 8080 | Do not change. |
| `PG_META_DB_HOST` | meta | - | Do not change. |
| `PG_META_DB_NAME` | meta | - | Do not change. |
| `PG_META_DB_PORT` | meta | 5432 | Do not change. |
| `PG_META_DB_USER` | meta | (secret) | Do not change. |
| `PG_META_DB_PASSWORD` | meta | (secret) | Do not change. |
| `ANON_KEY` | kong | - | REQUIRED. Public anon API key (a JWT signed with your JWT_SECRET). Generate at https://supabase.com/docs/guides/self-hosting/docker#securing-your-services |
| `KONG_PLUGINS` | kong | request-transformer,cors,key-auth,acl,basic-auth | Do not change. |
| `KONG_DATABASE` | kong | off | Do not change. |
| `KONG_DNS_ORDER` | kong | LAST,A,AAAA,CNAME | Resolves Railway private IPv6 network. Do not change. |
| `SERVICE_ROLE_KEY` | kong | - | REQUIRED. Secret service_role API key (a JWT signed with your JWT_SECRET). Generate together with ANON_KEY. Never expose to browsers. |
| `KONG_PROXY_LISTEN` | kong | 0.0.0.0:8000 | Do not change. |
| `DASHBOARD_PASSWORD` | kong | (secret) | Auto-generated password for the Studio dashboard login. |
| `DASHBOARD_USERNAME` | kong | (secret) | Username for the Studio dashboard login. |
| `KONG_NGINX_PROXY_PROXY_BUFFERS` | kong | 64 160k | Do not change. |
| `KONG_NGINX_PROXY_PROXY_BUFFER_SIZE` | kong | 160k | Do not change. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Volume:** `/var/lib/storage`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/supabase-self-hosted-full-stack)
