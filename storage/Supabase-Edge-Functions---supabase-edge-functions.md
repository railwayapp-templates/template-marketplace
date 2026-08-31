# Deploy Supabase + Edge Functions on Railway

Self-hosted Supabase with Auth, Storage, Realtime, Studio and Functions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase-edge-functions)

## About

Supabase is an open source backend platform built around Postgres. This template deploys Studio, Auth, REST, Realtime, Storage, Edge Functions, postgres-meta, Supavisor, and a persistent Supabase Postgres 17 database behind one Envoy gateway.

This template follows the official `self-hosted/v0.8.0` Docker snapshot and pins its tested service versions. Railway generates every database, dashboard, and JWT secret. Six thin wrapper images package the configuration files that Docker Compose normally bind-mounts. Matching anon and service-role API keys are derived automatically from one generated JWT secret, so the deploy form has no manual key-generation step.

Studio is available through the gateway and protected with generated HTTP Basic Auth. Postgres data and uploaded files each persist on their own Railway volume. The direct database and Supavisor transaction pool both receive TCP endpoints.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storage | `ghcr.io/hmseeb/supabase-railway-storage:v0.8.0-r3` | Database |
| db | `ghcr.io/hmseeb/supabase-railway-db:v0.8.0-r3` | Database |
| studio | `ghcr.io/hmseeb/supabase-railway-studio:v0.8.0-r3` | Database |
| meta | `supabase/postgres-meta:v0.96.6` | Database |
| functions | `ghcr.io/hmseeb/supabase-railway-functions:v0.8.0-r3` | Database |
| realtime-dev | `supabase/realtime:v2.102.3` | Database |
| pooler | `ghcr.io/hmseeb/supabase-railway-pooler:v0.8.0-r3` | Database |
| auth | `supabase/gotrue:v2.189.0` | Database |
| gateway | `ghcr.io/hmseeb/supabase-railway-gateway:v0.8.0-r3` | Database |
| rest | `postgrest/postgrest:v14.12` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | storage | 5000 | - |
| `REGION` | storage | stub | - |
| `TENANT_ID` | storage | stub | - |
| `JWT_SECRET` | storage | (secret) | - |
| `SERVER_HOST` | storage | :: | - |
| `SERVER_PORT` | storage | 5000 | - |
| `AUTH_JWT_SECRET` | storage | (secret) | - |
| `FILE_SIZE_LIMIT` | storage | 52428800 | Maximum upload size in bytes. Default is 50 MB. |
| `STORAGE_BACKEND` | storage | file | - |
| `GLOBAL_S3_BUCKET` | storage | stub | - |
| `FILE_STORAGE_BACKEND_PATH` | storage | /var/lib/storage | - |
| `ENABLE_IMAGE_TRANSFORMATION` | storage | false | - |
| `S3_PROTOCOL_ACCESS_KEY_SECRET` | storage | (secret) | - |
| `REQUEST_ALLOW_X_FORWARDED_PATH` | storage | true | - |
| `JWT_EXP` | db | 3600 | - |
| `ANON_KEY` | db | - | Optional migration override. Leave blank to derive it from JWT_SECRET. |
| `JWT_SECRET` | db | (secret) | Generated HS256 secret. Do not rotate without replacing every API key. |
| `POSTGRES_DB` | db | postgres | - |
| `POSTGRES_HOST` | db | /var/run/postgresql | - |
| `POSTGRES_PORT` | db | 5432 | - |
| `POSTGRES_USER` | db | (secret) | - |
| `SECRET_KEY_BASE` | db | (secret) | - |
| `SERVICE_ROLE_KEY` | db | - | Optional migration override. Leave blank to derive it from JWT_SECRET. |
| `POSTGRES_PASSWORD` | db | (secret) | Generated password shared by Supabase database roles. |
| `S3_PROTOCOL_ACCESS_KEY_SECRET` | db | (secret) | - |
| `PORT` | studio | 3000 | - |
| `HOSTNAME` | studio | :: | - |
| `JWT_SECRET` | studio | (secret) | - |
| `POSTGRES_DB` | studio | postgres | - |
| `POSTGRES_PORT` | studio | 5432 | - |
| `AUTH_JWT_SECRET` | studio | (secret) | - |
| `PGRST_DB_SCHEMAS` | studio | public,graphql_public | - |
| `PGRST_DB_MAX_ROWS` | studio | 1000 | - |
| `POSTGRES_PASSWORD` | studio | (secret) | - |
| `SUPABASE_SECRET_KEY` | studio | (secret) | - |
| `DEFAULT_PROJECT_NAME` | studio | Default Project | - |
| `POSTGRES_USER_READ_WRITE` | studio | postgres | - |
| `DEFAULT_ORGANIZATION_NAME` | studio | Default Organization | - |
| `ENABLED_FEATURES_LOGS_ALL` | studio | false | - |
| `PGRST_DB_EXTRA_SEARCH_PATH` | studio | public | - |
| `SNIPPETS_MANAGEMENT_FOLDER` | studio | /app/snippets | - |
| `EDGE_FUNCTIONS_MANAGEMENT_FOLDER` | studio | /app/edge-functions | - |
| `PORT` | meta | 8080 | - |
| `PG_META_HOST` | meta | :: | - |
| `PG_META_PORT` | meta | 8080 | - |
| `PG_META_DB_NAME` | meta | postgres | - |
| `PG_META_DB_PORT` | meta | 5432 | - |
| `PG_META_DB_USER` | meta | (secret) | - |
| `PG_META_DB_PASSWORD` | meta | (secret) | - |
| `PORT` | functions | 9000 | - |
| `JWT_SECRET` | functions | (secret) | - |
| `VERIFY_JWT` | functions | false | - |
| `SUPABASE_SECRET_KEYS` | functions | (secret) | - |
| `SUPABASE_PUBLISHABLE_KEYS` | functions | {"default":""} | - |
| `PORT` | realtime-dev | 4000 | - |
| `DB_NAME` | realtime-dev | postgres | - |
| `DB_PORT` | realtime-dev | 5432 | - |
| `DB_USER` | realtime-dev | (secret) | - |
| `APP_NAME` | realtime-dev | realtime | - |
| `DNS_NODES` | realtime-dev | '' | - |
| `ERL_AFLAGS` | realtime-dev | -proto_dist inet_tcp | - |
| `DB_PASSWORD` | realtime-dev | (secret) | - |
| `RUN_JANITOR` | realtime-dev | true | - |
| `RLIMIT_NOFILE` | realtime-dev | 10000 | - |
| `API_JWT_SECRET` | realtime-dev | (secret) | - |
| `SEED_SELF_HOST` | realtime-dev | true | - |
| `SECRET_KEY_BASE` | realtime-dev | (secret) | - |
| `METRICS_JWT_SECRET` | realtime-dev | (secret) | - |
| `DB_AFTER_CONNECT_QUERY` | realtime-dev | SET search_path TO _realtime | - |
| `DISABLE_HEALTHCHECK_LOGGING` | realtime-dev | true | - |
| `PORT` | pooler | 4000 | - |
| `REGION` | pooler | local | - |
| `ERL_AFLAGS` | pooler | -proto_dist inet_tcp | - |
| `POSTGRES_DB` | pooler | postgres | - |
| `DB_POOL_SIZE` | pooler | 5 | - |
| `POSTGRES_PORT` | pooler | 5432 | - |
| `API_JWT_SECRET` | pooler | (secret) | - |
| `SECRET_KEY_BASE` | pooler | (secret) | - |
| `CLUSTER_POSTGRES` | pooler | true | - |
| `POOLER_POOL_MODE` | pooler | transaction | - |
| `POOLER_TENANT_ID` | pooler | railway | - |
| `POSTGRES_PASSWORD` | pooler | (secret) | - |
| `METRICS_JWT_SECRET` | pooler | (secret) | - |
| `POOLER_MAX_CLIENT_CONN` | pooler | 100 | - |
| `POOLER_DEFAULT_POOL_SIZE` | pooler | 20 | - |
| `PORT` | auth | 9999 | - |
| `GOTRUE_JWT_AUD` | auth | authenticated | - |
| `GOTRUE_JWT_EXP` | auth | 3600 | - |
| `GOTRUE_API_HOST` | auth | :: | - |
| `GOTRUE_API_PORT` | auth | 9999 | - |
| `GOTRUE_SITE_URL` | auth | - | Default redirect after authentication. Change to your application URL. |
| `GOTRUE_DB_DRIVER` | auth | postgres | - |
| `GOTRUE_SMTP_PORT` | auth | 587 | - |
| `GOTRUE_SMTP_USER` | auth | (secret) | - |
| `GOTRUE_JWT_SECRET` | auth | (secret) | - |
| `GOTRUE_DISABLE_SIGNUP` | auth | false | Set true to close public registration. |
| `GOTRUE_URI_ALLOW_LIST` | auth | - | Comma-separated additional authentication redirect URLs. |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | - |
| `GOTRUE_SMS_AUTOCONFIRM` | auth | false | - |
| `GOTRUE_SMTP_ADMIN_EMAIL` | auth | admin@example.com | - |
| `GOTRUE_SMTP_SENDER_NAME` | auth | Supabase | - |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | True for first-run testing. Set false after configuring SMTP. |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | - |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | - |
| `GOTRUE_MAILER_URLPATHS_INVITE` | auth | /auth/v1/verify | - |
| `GOTRUE_MAILER_URLPATHS_RECOVERY` | auth | /auth/v1/verify | - |
| `GOTRUE_MAILER_URLPATHS_CONFIRMATION` | auth | /auth/v1/verify | - |
| `GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE` | auth | /auth/v1/verify | - |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | auth | false | - |
| `PORT` | gateway | 8000 | - |
| `JWT_SECRET` | gateway | (secret) | - |
| `DASHBOARD_PASSWORD` | gateway | (secret) | Generated HTTP Basic Auth password for Studio. |
| `DASHBOARD_USERNAME` | gateway | (secret) | HTTP Basic Auth username for Studio. |
| `SUPABASE_SECRET_KEY` | gateway | (secret) | - |
| `PORT` | rest | 3000 | - |
| `PGRST_DB_SCHEMAS` | rest | public,graphql_public | - |
| `PGRST_JWT_SECRET` | rest | (secret) | - |
| `PGRST_DB_MAX_ROWS` | rest | 1000 | - |
| `PGRST_SERVER_HOST` | rest | *6 | - |
| `PGRST_SERVER_PORT` | rest | 3000 | - |
| `PGRST_DB_ANON_ROLE` | rest | anon | - |
| `PGRST_ADMIN_SERVER_HOST` | rest | localhost | - |
| `PGRST_ADMIN_SERVER_PORT` | rest | 3001 | - |
| `PGRST_DB_USE_LEGACY_GUCS` | rest | false | - |
| `PGRST_APP_SETTINGS_JWT_EXP` | rest | 3600 | - |
| `PGRST_DB_EXTRA_SEARCH_PATH` | rest | public | - |
| `PGRST_APP_SETTINGS_JWT_SECRET` | rest | (secret) | - |

## Configuration

- **Healthcheck:** `/status`
- **Volume:** `/var/lib/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/platform/profile`
- **Healthcheck:** `/health`
- **Healthcheck:** `/hello`
- **Healthcheck:** `/api/health`
- **TCP Proxies:** 6543
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `postgrest`
- **Healthcheck:** `/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/supabase-edge-functions)
