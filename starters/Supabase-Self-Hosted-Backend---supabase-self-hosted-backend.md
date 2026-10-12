# Deploy Supabase Self-Hosted Backend on Railway

Postgres, auth, storage, realtime, edge functions and Studio in one stack.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase-self-hosted-backend)

## About

Run your own Supabase on Railway: Postgres 17 with Supabase extensions, Auth, auto-generated REST and GraphQL APIs, Realtime, Storage backed by a Railway Bucket, Edge Functions, the Supavisor pooler and Studio. Keys are generated on deploy with no manual setup, and only the API gateway is public. Community template.

Self-hosted Supabase is not one container. It is about a dozen cooperating services that must share one JWT secret and matching API keys, reach Postgres over a private network, and sit behind a gateway that checks API keys and protects the dashboard. This template follows the official `supabase/supabase` Docker setup (release `self-hosted/v0.8.2`) and adapts it to Railway: init scripts and gateway config are baked into images instead of bind mounts, files go to a Railway Bucket instead of a local disk, each service listens on IPv6 and IPv4 for Railway's private network, and the anon and service_role keys are derived from one generated secret when each service starts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Realtime | `supabase/realtime:v2.134.10` | Database |
| Storage | [baranberkay96/supabase-railway](https://github.com/baranberkay96/supabase-railway) (branch: main) (root: /services/storage) | Worker |
| Functions | [baranberkay96/supabase-railway](https://github.com/baranberkay96/supabase-railway) (branch: main) (root: /services/functions) | Worker |
| Gateway | [baranberkay96/supabase-railway](https://github.com/baranberkay96/supabase-railway) (branch: main) (root: /services/api-gateway) | Web service |
| Studio | [baranberkay96/supabase-railway](https://github.com/baranberkay96/supabase-railway) (branch: main) (root: /services/studio) | Database |
| Postgres | [baranberkay96/supabase-railway](https://github.com/baranberkay96/supabase-railway) (branch: main) (root: /services/postgres) | Database |
| Meta | `supabase/postgres-meta:v0.99.0` | Database |
| Supavisor | [baranberkay96/supabase-railway](https://github.com/baranberkay96/supabase-railway) (branch: main) (root: /services/supavisor) | Worker |
| imgproxy | `darthsim/imgproxy:v3.31.4` | Worker |
| REST | `postgrest/postgrest:v14.17` | Database |
| Auth | `supabase/gotrue:v2.196.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Realtime | 4000 | Realtime port. |
| `DB_HOST` | Realtime | - | Postgres host (private). |
| `DB_NAME` | Realtime | - | Postgres database. |
| `DB_PORT` | Realtime | 5432 | Postgres port. |
| `DB_USER` | Realtime | (secret) | Realtime needs a superuser for replication slots. |
| `APP_NAME` | Realtime | realtime | Application name. |
| `DNS_NODES` | Realtime | '' | No clustering. |
| `DB_ENC_KEY` | Realtime | - | Encryption key for _realtime secrets (exactly 16 chars). |
| `ERL_AFLAGS` | Realtime | -proto_dist inet_tcp | Erlang distribution transport (single node). |
| `DB_PASSWORD` | Realtime | (secret) | Postgres password. |
| `RUN_JANITOR` | Realtime | true | Clean up stale channels/slots. |
| `RLIMIT_NOFILE` | Realtime | 10000 | File descriptor limit. |
| `API_JWT_SECRET` | Realtime | (secret) | JWT verification secret. |
| `SEED_SELF_HOST` | Realtime | true | Create the self-hosted tenant (realtime-dev) on start. |
| `SECRET_KEY_BASE` | Realtime | (secret) | Phoenix secret key base (64+ chars). |
| `METRICS_JWT_SECRET` | Realtime | (secret) | JWT secret for the metrics endpoint. |
| `DB_AFTER_CONNECT_QUERY` | Realtime | SET search_path TO _realtime | Realtime metadata schema. |
| `DISABLE_HEALTHCHECK_LOGGING` | Realtime | true | Keep healthchecks out of the logs. |
| `PORT` | Storage | 5000 | Storage API port. |
| `REGION` | Storage | - | Bucket region. |
| `ANON_KEY` | Storage | - | Pinned anon key, if any (empty = derived). |
| `TENANT_ID` | Storage | stub | Single-tenant id (key prefix inside the bucket). |
| `JWT_SECRET` | Storage | (secret) | JWT secret (API keys are derived from it at start). |
| `SERVER_HOST` | Storage | :: | Listen on all IPv4/IPv6 interfaces. |
| `DATABASE_URL` | Storage | - | Storage database connection (private). |
| `IMGPROXY_URL` | Storage | - | imgproxy URL (private). |
| `POSTGREST_URL` | Storage | - | PostgREST URL (private). |
| `AUTH_JWT_SECRET` | Storage | (secret) | JWT verification secret. |
| `FILE_SIZE_LIMIT` | Storage | 52428800 | Max upload size in bytes (50 MB). |
| `STORAGE_BACKEND` | Storage | s3 | Store objects in the Railway Bucket. |
| `GLOBAL_S3_BUCKET` | Storage | - | Railway Bucket name. |
| `SERVICE_ROLE_KEY` | Storage | - | Pinned service_role key, if any (empty = derived). |
| `AWS_ACCESS_KEY_ID` | Storage | - | Bucket access key. |
| `GLOBAL_S3_ENDPOINT` | Storage | - | Railway Bucket S3 endpoint. |
| `STORAGE_PUBLIC_URL` | Storage | - | Public project URL used in generated links. |
| `AWS_SECRET_ACCESS_KEY` | Storage | (secret) | Bucket secret key. |
| `S3_PROTOCOL_ACCESS_KEY_ID` | Storage | - | Access key for Storage's own S3-compatible endpoint (/storage/v1/s3). |
| `GLOBAL_S3_FORCE_PATH_STYLE` | Storage | false | Virtual-hosted addressing (Railway default). Set true for buckets that require path-style. |
| `ENABLE_IMAGE_TRANSFORMATION` | Storage | true | Image resizing via imgproxy. |
| `S3_PROTOCOL_ACCESS_KEY_SECRET` | Storage | (secret) | Secret for Storage's own S3-compatible endpoint. |
| `REQUEST_ALLOW_X_FORWARDED_PATH` | Storage | true | Trust the gateway's X-Forwarded-Prefix. |
| `STORAGE_S3_REQUEST_CHECKSUM_CALCULATION` | Storage | WHEN_REQUIRED | Only send S3 checksums when required (compatibility with S3-compatible stores). |
| `STORAGE_S3_RESPONSE_CHECKSUM_VALIDATION` | Storage | WHEN_REQUIRED | Only validate S3 checksums when required. |
| `PORT` | Functions | 9000 | Edge runtime port. |
| `ANON_KEY` | Functions | - | Pinned anon key, if any (empty = derived). |
| `JWT_SECRET` | Functions | (secret) | JWT secret (keys derived at start; also used when VERIFY_JWT=true). |
| `VERIFY_JWT` | Functions | false | Require a valid JWT for every function call (applies to all functions). |
| `SUPABASE_URL` | Functions | - | Gateway URL on the private network (for supabase-js inside functions). |
| `SUPABASE_DB_URL` | Functions | - | Direct database URL available to functions. |
| `SERVICE_ROLE_KEY` | Functions | - | Pinned service_role key, if any (empty = derived). |
| `SUPABASE_PUBLIC_URL` | Functions | - | Public project URL. |
| `SUPABASE_SECRET_KEYS` | Functions | (secret) | New-style secret keys (JSON). Empty value = legacy mode. |
| `SUPABASE_PUBLISHABLE_KEYS` | Functions | - | New-style publishable keys (JSON). Empty value = legacy mode. |
| `PORT` | Gateway | 8000 | Port Envoy listens on (public domain target). |
| `ANON_KEY` | Gateway | - | Optional. Leave empty to derive the anon key from JWT_SECRET (recommended). Set only to pin an existing key. |
| `AUTH_HOST` | Gateway | - | Private host of the Auth service. |
| `META_HOST` | Gateway | - | Private host of postgres-meta. |
| `REST_HOST` | Gateway | - | Private host of PostgREST. |
| `JWT_EXPIRY` | Gateway | 3600 | Access token lifetime in seconds. |
| `JWT_SECRET` | Gateway | (secret) | Project JWT secret. ANON_KEY and SERVICE_ROLE_KEY are derived from it; changing it rotates both and signs everyone out. |
| `STUDIO_HOST` | Gateway | - | Private host of Studio. |
| `STORAGE_HOST` | Gateway | - | Private host of Storage. |
| `REALTIME_HOST` | Gateway | - | Private host of Realtime. |
| `FUNCTIONS_HOST` | Gateway | - | Private host of Edge Functions. |
| `SERVICE_ROLE_KEY` | Gateway | - | Optional. Leave empty to derive the service_role key from JWT_SECRET (recommended). |
| `DASHBOARD_PASSWORD` | Gateway | (secret) | Studio basic-auth password (generated). |
| `DASHBOARD_USERNAME` | Gateway | (secret) | Studio basic-auth username (letters, digits, . _ -). |
| `ANON_KEY_ASYMMETRIC` | Gateway | - | Optional ES256 anon JWT used internally for sb_ key translation. |
| `SUPABASE_PUBLIC_URL` | Gateway | - | Public URL of your Supabase project (API + Studio). Change to https://your-domain after adding a custom domain. |
| `SUPABASE_SECRET_KEY` | Gateway | (secret) | Optional new-style sb_secret_ key. Empty = legacy keys only. |
| `SUPABASE_PUBLISHABLE_KEY` | Gateway | - | Optional new-style sb_publishable_ key (see README, new API keys). Empty = legacy keys only. |
| `SERVICE_ROLE_KEY_ASYMMETRIC` | Gateway | - | Optional ES256 service_role JWT used internally for sb_ key translation. |
| `PORT` | Studio | 3000 | Studio port (reached through the Gateway only). |
| `ANON_KEY` | Studio | - | Pinned anon key, if any (empty = derived). |
| `HOSTNAME` | Studio | :: | Listen on all IPv4/IPv6 interfaces. |
| `JWT_SECRET` | Studio | (secret) | JWT secret (API keys are derived from it at start). |
| `POSTGRES_DB` | Studio | - | Postgres database. |
| `SUPABASE_URL` | Studio | - | Gateway URL on the private network. |
| `POSTGRES_HOST` | Studio | - | Postgres host (private). |
| `POSTGRES_PORT` | Studio | 5432 | Postgres port. |
| `OPENAI_API_KEY` | Studio | (secret) | Optional. Enables the Studio AI assistant. |
| `AUTH_JWT_SECRET` | Studio | (secret) | JWT secret used by Studio to verify tokens. |
| `PGRST_DB_SCHEMAS` | Studio | - | Schemas exposed by the REST API (mirrors PostgREST). |
| `SERVICE_ROLE_KEY` | Studio | - | Pinned service_role key, if any (empty = derived). |
| `PGRST_DB_MAX_ROWS` | Studio | - | Max rows per REST request (mirrors PostgREST). |
| `POSTGRES_PASSWORD` | Studio | (secret) | Postgres password. |
| `PG_META_CRYPTO_KEY` | Studio | - | Shared key for encrypted connection strings between Studio and postgres-meta. |
| `STUDIO_PG_META_URL` | Studio | - | postgres-meta URL (private). |
| `SUPABASE_PUBLIC_URL` | Studio | - | Public project URL. |
| `SUPABASE_SECRET_KEY` | Studio | (secret) | Optional new-style secret key. |
| `DEFAULT_PROJECT_NAME` | Studio | Default Project | Project name shown in Studio. |
| `POSTGRES_USER_READ_WRITE` | Studio | postgres | Role Studio uses for read/write queries. |
| `SUPABASE_PUBLISHABLE_KEY` | Studio | - | Optional new-style publishable key. |
| `DEFAULT_ORGANIZATION_NAME` | Studio | Default Organization | Organization name shown in Studio. |
| `ENABLED_FEATURES_LOGS_ALL` | Studio | false | Logs Explorer needs Logflare + Vector, which this template does not run. |
| `PGRST_DB_EXTRA_SEARCH_PATH` | Studio | - | Extra search_path (mirrors PostgREST). |
| `SNIPPETS_MANAGEMENT_FOLDER` | Studio | /app/snippets | SQL snippets folder (on the volume). |
| `JWT_EXP` | Postgres | - | JWT lifetime stored as app.settings.jwt_exp on first init. |
| `POSTGRES_DB` | Postgres | postgres | Main database name (Supabase expects postgres). |
| `DATABASE_URL` | Postgres | - | Direct private connection string (user postgres). |
| `POSTGRES_PORT` | Postgres | 5432 | Port used by the image's init scripts. |
| `POSTGRES_USER` | Postgres | (secret) | Bootstrap superuser of the Supabase image. Must stay supabase_admin. |
| `PGSODIUM_ROOT_KEY` | Postgres | - | pgsodium/Vault root key (64 hex). Never change or lose it: Vault secrets become unreadable. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password of supabase_admin and of every Supabase role (postgres, authenticator, supabase_auth_admin, ...). Set once: changing it later does not update the roles. |
| `PORT` | Meta | 8080 | postgres-meta port. |
| `CRYPTO_KEY` | Meta | - | Key for encrypted connection strings (shared with Studio). |
| `PG_META_HOST` | Meta | :: | Listen on all IPv4/IPv6 interfaces. |
| `PG_META_PORT` | Meta | 8080 | postgres-meta port. |
| `PG_META_DB_HOST` | Meta | - | Postgres host (private). |
| `PG_META_DB_NAME` | Meta | - | Postgres database. |
| `PG_META_DB_PORT` | Meta | 5432 | Postgres port. |
| `PG_META_DB_USER` | Meta | (secret) | Role used by postgres-meta. |
| `PG_META_DB_PASSWORD` | Meta | (secret) | Postgres password. |
| `PORT` | Supavisor | 4000 | Supavisor HTTP API port. |
| `REGION` | Supavisor | local | Region label. |
| `ADDR_TYPE` | Supavisor | inet6 | HTTP API listens on IPv6 (dual-stack). |
| `ERL_AFLAGS` | Supavisor | -proto_dist inet_tcp | Erlang distribution transport (single node). |
| `POSTGRES_DB` | Supavisor | - | Postgres database. |
| `DATABASE_URL` | Supavisor | - | Supavisor metadata database. |
| `DB_POOL_SIZE` | Supavisor | 5 | Connections for Supavisor's own metadata. |
| `POSTGRES_HOST` | Supavisor | - | Postgres host (private). |
| `POSTGRES_PORT` | Supavisor | 5432 | Postgres port. |
| `VAULT_ENC_KEY` | Supavisor | - | Encryption key for tenant config (exactly 32 chars). |
| `API_JWT_SECRET` | Supavisor | (secret) | JWT secret for the management API. |
| `SECRET_KEY_BASE` | Supavisor | (secret) | Phoenix secret key base. |
| `CLUSTER_POSTGRES` | Supavisor | true | Store cluster state in Postgres. |
| `POOLER_POOL_MODE` | Supavisor | transaction | Default pool mode. |
| `POOLER_TENANT_ID` | Supavisor | supabase | Tenant id; pooled connections log in as postgres.<tenant id>. |
| `POSTGRES_PASSWORD` | Supavisor | (secret) | Postgres password (pgbouncer role). |
| `METRICS_JWT_SECRET` | Supavisor | (secret) | JWT secret for metrics. |
| `POOLER_URL_SESSION` | Supavisor | - | Pooled connection string, session mode (private network). |
| `POOLER_MAX_CLIENT_CONN` | Supavisor | 100 | Client connections per pool. |
| `POOLER_URL_TRANSACTION` | Supavisor | - | Pooled connection string, transaction mode (private network). |
| `SUPAVISOR_DB_IP_VERSION` | Supavisor | ipv6 | Reach the metadata DB over IPv6 (works in all Railway environments). |
| `POOLER_DEFAULT_POOL_SIZE` | Supavisor | 20 | Server connections per pool. |
| `PORT` | imgproxy | 5001 | imgproxy port. |
| `IMGPROXY_BIND` | imgproxy | :5001 | Listen address. |
| `IMGPROXY_USE_ETAG` | imgproxy | true | Send ETags. |
| `IMGPROXY_AUTO_WEBP` | imgproxy | true | Serve WebP when the browser supports it. |
| `IMGPROXY_MAX_SRC_RESOLUTION` | imgproxy | 16.8 | Max source image size in megapixels. |
| `PORT` | REST | 3000 | PostgREST port. |
| `PGRST_DB_URI` | REST | - | Database connection as the authenticator role (private). |
| `PGRST_DB_SCHEMAS` | REST | public,graphql_public | Schemas exposed via the REST API. |
| `PGRST_JWT_SECRET` | REST | (secret) | JWT verification secret (or a JWKS when using new API keys). |
| `PGRST_DB_MAX_ROWS` | REST | 1000 | Max rows returned per request. |
| `PGRST_SERVER_HOST` | REST | * | Listen on all IPv4/IPv6 interfaces. |
| `PGRST_SERVER_PORT` | REST | 3000 | PostgREST port. |
| `PGRST_DB_ANON_ROLE` | REST | anon | Role for unauthenticated requests. |
| `PGRST_ADMIN_SERVER_HOST` | REST | localhost | Admin server bind address. |
| `PGRST_ADMIN_SERVER_PORT` | REST | 3001 | Admin/health server port (container-local). |
| `PGRST_DB_USE_LEGACY_GUCS` | REST | false | Use current GUC names. |
| `PGRST_APP_SETTINGS_JWT_EXP` | REST | - | JWT lifetime exposed as app.settings.jwt_exp. |
| `PGRST_DB_EXTRA_SEARCH_PATH` | REST | public | Extra schemas on every request's search_path. |
| `PORT` | Auth | 9999 | Auth port. |
| `GOTRUE_JWT_AUD` | Auth | authenticated | JWT audience. |
| `GOTRUE_JWT_EXP` | Auth | - | Access token lifetime (s). |
| `GOTRUE_API_HOST` | Auth | :: | Listen on all IPv4/IPv6 interfaces. |
| `GOTRUE_API_PORT` | Auth | 9999 | Auth port. |
| `GOTRUE_SITE_URL` | Auth | - | Your app's URL: default redirect after sign-up/sign-in. Set this to your frontend URL. |
| `API_EXTERNAL_URL` | Auth | - | Public URL of the Auth API (OAuth callbacks, email links). |
| `GOTRUE_DB_DRIVER` | Auth | postgres | Database driver. |
| `GOTRUE_SMTP_HOST` | Auth | - | SMTP host for confirmation/recovery emails. Empty = auth emails are not delivered. |
| `GOTRUE_SMTP_PASS` | Auth | - | SMTP password. |
| `GOTRUE_SMTP_PORT` | Auth | 587 | SMTP port. |
| `GOTRUE_SMTP_USER` | Auth | (secret) | SMTP username. |
| `GOTRUE_JWT_ISSUER` | Auth | - | JWT issuer. |
| `GOTRUE_JWT_SECRET` | Auth | (secret) | JWT signing secret (HS256). |
| `GOTRUE_DISABLE_SIGNUP` | Auth | false | Set true to allow only invited/admin-created users. |
| `GOTRUE_URI_ALLOW_LIST` | Auth | - | Comma-separated extra redirect URLs allowed after auth (e.g. http://localhost:3000/**). |
| `GOTRUE_DB_DATABASE_URL` | Auth | - | Auth database connection (private). |
| `GOTRUE_JWT_ADMIN_ROLES` | Auth | service_role | Roles allowed to use the admin API. |
| `GOTRUE_SMS_AUTOCONFIRM` | Auth | false | Auto-confirm phone sign-ups. |
| `GOTRUE_SMTP_ADMIN_EMAIL` | Auth | - | Sender address for auth emails (needed once SMTP is configured). |
| `GOTRUE_SMTP_SENDER_NAME` | Auth | Supabase | Sender display name. |
| `GOTRUE_MAILER_AUTOCONFIRM` | Auth | true | Auto-confirm email sign-ups. Keep true until SMTP is configured, then set false to require email confirmation. |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | Auth | true | Enable email/password sign-in. |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | Auth | false | Phone sign-in (needs an SMS provider; see Supabase docs). |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | Auth | authenticated | Default role for signed-in users. |
| `GOTRUE_MAILER_URLPATHS_INVITE` | Auth | /auth/v1/verify | Invite link path. |
| `GOTRUE_MAILER_URLPATHS_RECOVERY` | Auth | /auth/v1/verify | Recovery link path. |
| `GOTRUE_MAILER_URLPATHS_CONFIRMATION` | Auth | /auth/v1/verify | Confirmation link path. |
| `GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE` | Auth | /auth/v1/verify | Email-change link path. |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | Auth | false | Enable anonymous sign-ins. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Healthcheck:** `/status`
- **Healthcheck:** `/_internal/health`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/platform/profile`
- **Volume:** `/app/snippets`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Healthcheck:** `/`

**Category:** Starters · **Tags:** supabase, postgres, auth, storage, realtime · **Languages:** Shell, PLpgSQL, TypeScript, Dockerfile, Elixir

[View on Railway →](https://railway.com/deploy/supabase-self-hosted-backend)
