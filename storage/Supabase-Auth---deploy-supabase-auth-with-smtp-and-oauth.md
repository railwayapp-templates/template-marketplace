# Deploy Supabase Auth on Railway

Self-hosted Supabase Auth with SMTP and OAuth logins

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-supabase-auth-with-smtp-and-oauth)

## About

This template deploys self hosted Supabase Auth via GoTrue. Email signup is on and autoconfirm on (no SMTP), so anyone can sign up. For production set SMTP vars, disable autoconfirm, add OAuth env vars, and use RLS with auth.uid(). Keep service_role key server-side.

This template runs the self-hosted Supabase stack on Railway, including supabase/gotrue v2.196.0 for auth, Postgres 17.6.1.136 for users and RLS, PostgREST, Realtime, Storage, Edge Runtime, and Studio.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rest | `postgrest/postgrest:v14.17@sha256:c9dc201e555f5d8e37e7f39cdd4df0229774996e213bfd7de8d10ac609030f2c` | Database |
| studio | `ghcr.io/onepush-dev/supabase-studio:2026.10@sha256:38b4da0f64779557c9e45ddaad54fb6fc13c43342b6a3735ebc4caa3f1d38134` | Database |
| storage | `ghcr.io/onepush-dev/supabase-storage:2026.10@sha256:d9018525e8cd4f28844b9392f22c9be52c3c4639d28c3f1afe123dca2a91c8c5` | Database |
| functions | `ghcr.io/onepush-dev/supabase-functions:2026.10@sha256:1b6159cc1316fd11f26176cd7a0483e42dffb7642a2e20c1a816b07e357a8063` | Database |
| meta | `supabase/postgres-meta:v0.99.0@sha256:9a079ac1c94d89629262822a4bd1902d5b1be4adb464e5a0a8fd078aaed72158` | Database |
| realtime | `supabase/realtime:v2.134.10@sha256:cbcc6a7986fc28b6dcffa798b077d5fb9c69cd25500371ab49147a86d7edbb03` | Database |
| db | `ghcr.io/onepush-dev/supabase-db:2026.10@sha256:4936b9cfac0cb3899f7635423af568aa6c2274f9604aa3fcad0a54fd055ca1fc` | Database |
| auth | `supabase/gotrue:v2.196.0@sha256:c0c25187a6b835e65a6f6e6c6b39d090e832d40e6de5186f2c038e0411944232` | Database |
| supabase | `ghcr.io/onepush-dev/supabase-gateway:2026.10@sha256:d7489fa86d5ea212547271e2fc5d29bcf8d04b8d7ab3c4f5db026feacee7fed9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | rest | 3000 | Service port used by Railway. |
| `PGRST_DB_URI` | rest | - | Postgres connection for the authenticator role. |
| `PGRST_DB_SCHEMAS` | rest | public,storage,graphql_public | Schemas exposed over the REST API. |
| `PGRST_JWT_SECRET` | rest | (secret) | Shared JWT secret from the gateway. |
| `PGRST_DB_MAX_ROWS` | rest | 1000 | Max rows returned per request. |
| `PGRST_SERVER_HOST` | rest | * | Bind address for PostgREST. |
| `PGRST_SERVER_PORT` | rest | 3000 | PostgREST API port (3000). |
| `PGRST_DB_ANON_ROLE` | rest | anon | Role used for requests with the anon key. |
| `PGRST_ADMIN_SERVER_PORT` | rest | 3001 | PostgREST admin and health port. |
| `PGRST_DB_USE_LEGACY_GUCS` | rest | false | Use legacy request settings; keep false. |
| `PGRST_APP_SETTINGS_JWT_EXP` | rest | 3600 | JWT expiry exposed to SQL as an app setting. |
| `PGRST_DB_EXTRA_SEARCH_PATH` | rest | public | Extra schemas on the search path. |
| `PORT` | studio | 3000 | Studio listen port (3000). |
| `HOSTNAME` | studio | :: | Bind address; :: listens on IPv6. |
| `JWT_SECRET` | studio | (secret) | Shared JWT secret from the gateway. |
| `POSTGRES_DB` | studio | postgres | Database name. |
| `SUPABASE_URL` | studio | - | Private URL of the gateway. |
| `POSTGRES_HOST` | studio | - | Private host of the db service. |
| `POSTGRES_PORT` | studio | 5432 | Postgres port. |
| `AUTH_JWT_SECRET` | studio | (secret) | JWT secret for auth calls from Studio. |
| `PGRST_DB_SCHEMAS` | studio | public,storage,graphql_public | Schemas shown as exposed in the API settings. |
| `PGRST_DB_MAX_ROWS` | studio | 1000 | Max rows shown in API settings. |
| `POSTGRES_PASSWORD` | studio | (secret) | Postgres password from the db service. |
| `PG_META_CRYPTO_KEY` | studio | - | Must match CRYPTO_KEY on meta. |
| `STUDIO_PG_META_URL` | studio | - | Private URL of the meta service. |
| `SUPABASE_PUBLIC_URL` | studio | - | Public URL of this project. |
| `DEFAULT_PROJECT_NAME` | studio | Default Project | Project name shown in Studio. |
| `POSTGRES_USER_READ_WRITE` | studio | postgres | Role Studio uses for queries. |
| `DEFAULT_ORGANIZATION_NAME` | studio | Default Organization | Organization name shown in Studio. |
| `ENABLED_FEATURES_LOGS_ALL` | studio | false | Logs pages; off (no analytics service). |
| `PGRST_DB_EXTRA_SEARCH_PATH` | studio | public | Extra search path shown in API settings. |
| `SNIPPETS_MANAGEMENT_FOLDER` | studio | /app/snippets | Saved SQL snippets folder on the volume. |
| `EDGE_FUNCTIONS_MANAGEMENT_FOLDER` | studio | /app/edge-functions | Edge function files folder on the volume. |
| `PORT` | storage | 5000 | Storage listen port (5000). |
| `REGION` | storage | local | Region label for the storage API. |
| `TENANT_ID` | storage | stub | Tenant id for self-hosted mode. |
| `JWT_SECRET` | storage | (secret) | Shared JWT secret from the gateway. |
| `SERVER_PORT` | storage | 5000 | Storage API port. |
| `DATABASE_URL` | storage | - | Postgres connection for the storage admin role. |
| `POSTGREST_URL` | storage | - | Private URL of the rest service. |
| `AUTH_JWT_SECRET` | storage | (secret) | JWT secret used to verify user tokens. |
| `FILE_SIZE_LIMIT` | storage | 52428800 | Max upload size in bytes (50 MB). |
| `STORAGE_BACKEND` | storage | file | Storage backend (file, on the volume). |
| `GLOBAL_S3_BUCKET` | storage | stub | Bucket name used by the storage backend. |
| `STORAGE_PUBLIC_URL` | storage | - | Public URL for storage links. |
| `FILE_STORAGE_BACKEND_PATH` | storage | /var/lib/storage | Files directory on the volume. |
| `S3_PROTOCOL_ACCESS_KEY_ID` | storage | - | Access key for the S3-compatible endpoint. |
| `ENABLE_IMAGE_TRANSFORMATION` | storage | false | Image resizing; off (no imgproxy service). |
| `S3_PROTOCOL_ACCESS_KEY_SECRET` | storage | (secret) | Secret for the S3-compatible endpoint. |
| `REQUEST_ALLOW_X_FORWARDED_PATH` | storage | true | Trust the forwarded path from the gateway. |
| `PORT` | functions | 9000 | Edge runtime port (9000). |
| `JWT_SECRET` | functions | (secret) | Shared JWT secret from the gateway. |
| `VERIFY_JWT` | functions | false | Require a valid JWT to call functions. |
| `SUPABASE_URL` | functions | - | Private URL of the gateway for function code. |
| `SUPABASE_DB_URL` | functions | - | Postgres connection for function code. |
| `SUPABASE_PUBLIC_URL` | functions | - | Public URL of this project. |
| `SUPABASE_SECRET_KEYS` | functions | (secret) | Secret keys passed to functions. |
| `SUPABASE_PUBLISHABLE_KEYS` | functions | {"default":""} | Publishable keys passed to functions. |
| `PORT` | meta | 8080 | Service port used by Railway. |
| `CRYPTO_KEY` | meta | - | Encrypts saved connection strings; must match studio. |
| `PG_META_PORT` | meta | 8080 | postgres-meta port (8080). |
| `PG_META_DB_HOST` | meta | - | Private host of the db service. |
| `PG_META_DB_NAME` | meta | postgres | Database name. |
| `PG_META_DB_PORT` | meta | 5432 | Postgres port. |
| `PG_META_DB_USER` | meta | (secret) | Postgres role for postgres-meta. |
| `PG_META_DB_PASSWORD` | meta | (secret) | Postgres password from the db service. |
| `PORT` | realtime | 4000 | Realtime listen port (4000). |
| `DB_HOST` | realtime | - | Private host of the db service. |
| `DB_NAME` | realtime | postgres | Database name. |
| `DB_PORT` | realtime | 5432 | Postgres port. |
| `DB_USER` | realtime | (secret) | Postgres role for realtime. |
| `APP_NAME` | realtime | realtime | Node name (realtime). |
| `DNS_NODES` | realtime | '' | Cluster DNS discovery; empty for one node. |
| `DB_ENC_KEY` | realtime | - | Encryption key for stored tenant secrets; generated. |
| `DB_PASSWORD` | realtime | (secret) | Postgres password from the db service. |
| `RUN_JANITOR` | realtime | true | Run the cleanup janitor. |
| `RLIMIT_NOFILE` | realtime | 10000 | Open file limit. |
| `API_JWT_SECRET` | realtime | (secret) | Shared JWT secret from the gateway. |
| `SEED_SELF_HOST` | realtime | true | Seed the default self-hosted tenant on boot. |
| `SECRET_KEY_BASE` | realtime | (secret) | Phoenix secret for signing; generated. |
| `METRICS_JWT_SECRET` | realtime | (secret) | JWT secret for the metrics endpoint. |
| `DB_AFTER_CONNECT_QUERY` | realtime | SET search_path TO _realtime | Sets the _realtime search path on connect. |
| `DISABLE_HEALTHCHECK_LOGGING` | realtime | true | Hide health check lines in logs. |
| `JWT_EXP` | db | 3600 | JWT expiry in seconds, written into database settings. |
| `POSTGRES_DB` | db | postgres | Main database name (postgres). |
| `POSTGRES_HOST` | db | /var/run/postgresql | Unix socket dir used by init scripts. |
| `POSTGRES_PORT` | db | 5432 | Postgres port (5432). |
| `PGSODIUM_ROOT_KEY` | db | - | pgsodium root key, generated; never change after first boot. |
| `POSTGRES_PASSWORD` | db | (secret) | Postgres superuser password, generated per deploy. |
| `PORT` | auth | 9999 | Auth listen port (9999). |
| `GOTRUE_JWT_AUD` | auth | authenticated | JWT audience claim. |
| `GOTRUE_JWT_EXP` | auth | 3600 | Access token lifetime in seconds. |
| `GOTRUE_API_HOST` | auth | :: | Bind address; :: listens on IPv6 for Railway. |
| `GOTRUE_API_PORT` | auth | 9999 | Auth API port (9999). |
| `GOTRUE_SITE_URL` | auth | - | Your app URL; default redirect after sign-in. |
| `API_EXTERNAL_URL` | auth | - | Public URL used in auth emails and redirects. |
| `GOTRUE_DB_DRIVER` | auth | postgres | Database driver (postgres). |
| `GOTRUE_SMTP_PORT` | auth | 587 | SMTP server port. |
| `GOTRUE_JWT_ISSUER` | auth | - | JWT issuer claim. |
| `GOTRUE_JWT_SECRET` | auth | (secret) | Shared JWT secret from the gateway. |
| `GOTRUE_DISABLE_SIGNUP` | auth | false | Set true to block new sign-ups. |
| `GOTRUE_DB_DATABASE_URL` | auth | - | Postgres connection for the auth admin role. |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | Roles allowed to use the admin API. |
| `GOTRUE_SMS_AUTOCONFIRM` | auth | false | Skip SMS confirmation. |
| `GOTRUE_SMTP_ADMIN_EMAIL` | auth | admin@example.com | From address for auth emails. |
| `GOTRUE_SMTP_SENDER_NAME` | auth | Supabase | Sender name on auth emails. |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | Skip email confirmation; set false once SMTP works. |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | Allow email and password sign-in. |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | Allow phone sign-in (needs an SMS provider). |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | Default role for signed-in users. |
| `GOTRUE_MAILER_URLPATHS_INVITE` | auth | /auth/v1/verify | Path used in invite links. |
| `GOTRUE_MAILER_URLPATHS_RECOVERY` | auth | /auth/v1/verify | Path used in password recovery links. |
| `GOTRUE_MAILER_URLPATHS_CONFIRMATION` | auth | /auth/v1/verify | Path used in confirmation links. |
| `GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE` | auth | /auth/v1/verify | Path used in email change links. |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | auth | false | Allow anonymous sign-ins. |
| `PORT` | supabase | 8000 | Gateway listen port and public target (8000). |
| `AUTH_HOST` | supabase | - | Private host of the auth service. |
| `META_HOST` | supabase | - | Private host of the meta service. |
| `REST_HOST` | supabase | - | Private host of the rest service. |
| `JWT_SECRET` | supabase | (secret) | Shared JWT secret; anon and service_role keys derive from it. |
| `STUDIO_HOST` | supabase | - | Private host of the studio service. |
| `STORAGE_HOST` | supabase | - | Private host of the storage service. |
| `REALTIME_HOST` | supabase | - | Private host of the realtime service. |
| `FUNCTIONS_HOST` | supabase | - | Private host of the functions service. |
| `DASHBOARD_PASSWORD` | supabase | (secret) | Studio basic-auth password, generated per deploy. |
| `DASHBOARD_USERNAME` | supabase | (secret) | Studio basic-auth username. |
| `SUPABASE_PUBLIC_URL` | supabase | - | Public HTTPS URL of this gateway. |

## Configuration

- **Healthcheck:** `/api/platform/profile`
- **Volume:** `/app/snippets`
- **Healthcheck:** `/status`
- **Volume:** `/var/lib/storage`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/deploy-supabase-auth-with-smtp-and-oauth)
