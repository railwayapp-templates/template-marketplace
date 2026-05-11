# Deploy Supabase | Open Source Firebase Alternative on Railway

Self Host Supabase. Auth, APIs, Functions, Subs, Vector embeddings & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase-firebase-alternative)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase-firebase-alternative?referralCode=QXdhdr)

Supabase is an open-source Firebase alternative that gives you a hosted PostgreSQL database, authentication, file storage, real-time subscriptions, auto-generated REST and GraphQL APIs, and edge functions — all behind a single API gateway. Self-host Supabase on Railway when you want the full Firebase developer experience without vendor lock-in, and the freedom to run on your own infrastructure with a single click.

This Railway template deploys the complete twelve-service Supabase stack — `postgres`, `kong` (API gateway), `auth` (GoTrue), `rest` (PostgREST), `realtime`, `storage`, `imgproxy`, `meta` (postgres-meta), `functions` (edge-runtime), `analytics` (Logflare), `studio` (the dashboard), and `supavisor` (connection pooler) — pre-wired with cross-service references, JWT keys, and a public domain pointing at Kong. The Vector log shipper is intentionally omitted because it requires `docker.sock` access that Railway does not expose; Railway's own logging serves the same purpose.

![Supabase Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1778332723/bc1ad0e0-aff4-4fd5-930f-6078321f0c94.png)

Supabase wraps a vanilla PostgreSQL 15 database with a constellation of microservices that turn it into a complete backend-as-a-service. Every feature is just SQL underneath, which means you keep the predictability and tooling of a relational database while getting Firebase-style ergonomics on top.

Key features:
- PostgreSQL 15 with `pgvector`, `pg_graphql`, `pgsodium`, `pg_net`, `pgjwt` extensions for AI embeddings, GraphQL, encryption, HTTP calls, and JWT minting
- Email and OAuth authentication via GoTrue, including Apple, Google, GitHub, Discord, Slack, and SAML SSO
- Auto-generated REST and GraphQL APIs from your schema via PostgREST
- Real-time subscriptions over WebSocket via Phoenix
- S3-compatible object storage with on-the-fly image transformations
- Deno-based edge functions for server-side logic
- Built-in Studio UI for table editing, SQL queries, log inspection, and storage management

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kong | [praveen-ks-2001/supabase-kong-railway](https://github.com/praveen-ks-2001/supabase-kong-railway) | Web service |
| postgres | [praveen-ks-2001/supabase-postgres-railway](https://github.com/praveen-ks-2001/supabase-postgres-railway) | Database |
| studio | `supabase/studio:2026.04.27-sha-5f60601` | Database |
| supavisor | [praveen-ks-2001/supabase-supavisor-railway](https://github.com/praveen-ks-2001/supabase-supavisor-railway) | Worker |
| storage | `supabase/storage-api:v1.48.26` | Database |
| meta | `supabase/postgres-meta:v0.96.3` | Database |
| functions | `supabase/edge-runtime:v1.71.2` | Database |
| realtime | `supabase/realtime:v2.76.5` | Database |
| rest | `postgrest/postgrest:v14.8` | Database |
| imgproxy | `darthsim/imgproxy:v3.30.1` | Worker |
| analytics | `supabase/logflare:1.36.1` | Database |
| auth | `supabase/gotrue:v2.186.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | kong | 8000 | Kong listening port |
| `KONG_PLUGINS` | kong | request-transformer,cors,key-auth,acl,basic-auth,request-termination,ip-restriction,post-function | Loaded plugins |
| `KONG_DATABASE` | kong | off | DB-less declarative mode |
| `KONG_DNS_ORDER` | kong | LAST,A,CNAME | DNS resolution order |
| `KONG_PROXY_LISTEN` | kong | 0.0.0.0:8000 | Listen address |
| `SUPABASE_ANON_KEY` | kong | - | Anon role JWT |
| `DASHBOARD_PASSWORD` | kong | (secret) | Studio basic auth pass |
| `DASHBOARD_USERNAME` | kong | (secret) | Studio basic auth user |
| `SUPABASE_AUTH_HOST` | kong | - | Auth service hostname |
| `SUPABASE_META_HOST` | kong | - | Meta service hostname |
| `SUPABASE_REST_HOST` | kong | - | REST service hostname |
| `SUPABASE_SERVICE_KEY` | kong | - | Service role JWT |
| `SUPABASE_STUDIO_HOST` | kong | - | Studio service hostname |
| `SUPABASE_STORAGE_HOST` | kong | - | Storage service hostname |
| `SUPABASE_REALTIME_HOST` | kong | - | Realtime service hostname |
| `KONG_DECLARATIVE_CONFIG` | kong | /tmp/kong.yml | Rendered config path |
| `SUPABASE_FUNCTIONS_HOST` | kong | - | Functions service hostname |
| `KONG_NGINX_PROXY_PROXY_BUFFER_SIZE` | kong | 160k | Proxy buffer size |
| `JWT_EXP` | postgres | 3600 | JWT expiry seconds |
| `JWT_SECRET` | postgres | (secret) | Shared JWT signing key |
| `POSTGRES_DB` | postgres | postgres | Default database |
| `POSTGRES_PORT` | postgres | 5432 | Postgres listening port |
| `POSTGRES_USER` | postgres | (secret) | MUST be supabase_admin (image expectation) |
| `POSTGRES_PASSWORD` | postgres | (secret) | DB master password |
| `PORT` | studio | 3000 | Listening port |
| `HOSTNAME` | studio | 0.0.0.0 | Bind address |
| `POSTGRES_DB` | studio | postgres | Database name |
| `LOGFLARE_URL` | studio | - | Logflare internal URL |
| `SUPABASE_URL` | studio | - | Internal Kong URL |
| `POSTGRES_HOST` | studio | - | Postgres hostname |
| `POSTGRES_PORT` | studio | 5432 | Postgres port |
| `AUTH_JWT_SECRET` | studio | (secret) | JWT validation key |
| `LOGFLARE_API_KEY` | studio | (secret) | Logflare ingest token |
| `POSTGRES_PASSWORD` | studio | (secret) | DB password |
| `SUPABASE_ANON_KEY` | studio | - | Anon JWT |
| `DASHBOARD_PASSWORD` | studio | (secret) | Studio basic auth pass |
| `DASHBOARD_USERNAME` | studio | (secret) | Studio basic auth user |
| `STUDIO_PG_META_URL` | studio | - | postgres-meta internal URL |
| `SUPABASE_PUBLIC_URL` | studio | - | Public Kong URL |
| `DEFAULT_PROJECT_NAME` | studio | Default Project | Initial project |
| `SUPABASE_SERVICE_KEY` | studio | - | Service role JWT |
| `NEXT_PUBLIC_ENABLE_LOGS` | studio | true | Enable Logs tab |
| `DEFAULT_ORGANIZATION_NAME` | studio | Default Organization | Initial org |
| `NEXT_ANALYTICS_BACKEND_PROVIDER` | studio | postgres | Analytics backend |
| `PORT` | supavisor | 4000 | Listening port |
| `REGION` | supavisor | railway | Cluster region tag |
| `NODE_NAME` | supavisor | supavisor | Node identifier |
| `ERL_AFLAGS` | supavisor | -proto_dist inet_tcp | Erlang TCP only |
| `POSTGRES_DB` | supavisor | _supabase | Supavisor metadata DB name |
| `DATABASE_URL` | supavisor | - | Supavisor metadata DB |
| `RELEASE_NODE` | supavisor | supavisor@127.0.0.1 | Erlang node name |
| `POSTGRES_HOST` | supavisor | - | Backend Postgres host |
| `POSTGRES_PORT` | supavisor | 5432 | Backend Postgres port |
| `VAULT_ENC_KEY` | supavisor | - | Vault encryption key |
| `API_JWT_SECRET` | supavisor | (secret) | API JWT signing key |
| `RELEASE_COOKIE` | supavisor | cookie | Erlang release cookie |
| `SECRET_KEY_BASE` | supavisor | (secret) | Phoenix session key |
| `CLUSTER_POSTGRES` | supavisor | true | Enable Postgres clustering |
| `POOLER_POOL_MODE` | supavisor | transaction | Pooling mode |
| `POOLER_TENANT_ID` | supavisor | supabase-railway | Tenant identifier |
| `POSTGRES_PASSWORD` | supavisor | (secret) | Backend DB password |
| `METRICS_JWT_SECRET` | supavisor | (secret) | Metrics JWT signing key |
| `POOLER_DB_POOL_SIZE` | supavisor | 5 | DB connections per pool |
| `POOLER_MAX_CLIENT_CONN` | supavisor | 200 | Max client connections |
| `POOLER_DEFAULT_POOL_SIZE` | supavisor | 20 | Default pool size |
| `POOLER_PROXY_PORT_TRANSACTION` | supavisor | 6543 | Transaction pool port |
| `PORT` | storage | 5000 | Listening port |
| `REGION` | storage | stub | S3 region placeholder |
| `ANON_KEY` | storage | - | Anon JWT |
| `TENANT_ID` | storage | stub | S3 tenant placeholder |
| `SERVICE_KEY` | storage | - | Service role JWT |
| `DATABASE_URL` | storage | - | Storage DB connection |
| `IMGPROXY_URL` | storage | - | Imgproxy internal URL |
| `POSTGREST_URL` | storage | - | PostgREST internal URL |
| `AUTH_JWT_SECRET` | storage | (secret) | Auth JWT validation |
| `FILE_SIZE_LIMIT` | storage | 52428800 | 50 MB upload cap |
| `STORAGE_BACKEND` | storage | file | Local filesystem backend |
| `GLOBAL_S3_BUCKET` | storage | stub | S3 bucket placeholder |
| `PGRST_JWT_SECRET` | storage | (secret) | JWT validation key |
| `STORAGE_PUBLIC_URL` | storage | - | Public storage URL |
| `FILE_STORAGE_BACKEND_PATH` | storage | /var/lib/storage | Volume mount path |
| `ENABLE_IMAGE_TRANSFORMATION` | storage | true | Enable imgproxy |
| `PORT` | meta | 8080 | Railway port var |
| `CRYPTO_KEY` | meta | - | Schema encryption key |
| `PG_META_PORT` | meta | 8080 | Listening port |
| `PG_META_DB_HOST` | meta | - | Postgres hostname |
| `PG_META_DB_NAME` | meta | postgres | Database name |
| `PG_META_DB_PORT` | meta | 5432 | Postgres port |
| `PG_META_DB_USER` | meta | (secret) | DB user |
| `PG_META_DB_PASSWORD` | meta | (secret) | DB password |
| `PORT` | functions | 9000 | Listening port |
| `JWT_SECRET` | functions | (secret) | JWT validation key |
| `VERIFY_JWT` | functions | false | Skip JWT validation |
| `SUPABASE_URL` | functions | - | Internal Kong URL |
| `SUPABASE_DB_URL` | functions | - | Functions DB connection |
| `SUPABASE_ANON_KEY` | functions | - | Anon JWT |
| `SUPABASE_PUBLIC_URL` | functions | - | Public Kong URL |
| `SUPABASE_SERVICE_ROLE_KEY` | functions | - | Service role JWT |
| `PORT` | realtime | 4000 | Listening port |
| `DB_HOST` | realtime | - | Postgres hostname |
| `DB_NAME` | realtime | postgres | Database name |
| `DB_PORT` | realtime | 5432 | Postgres port |
| `DB_USER` | realtime | (secret) | DB user |
| `APP_NAME` | realtime | realtime | App identifier |
| `DB_ENC_KEY` | realtime | supabaserealtime | Realtime encryption key |
| `ERL_AFLAGS` | realtime | -proto_dist inet_tcp | Erlang TCP only |
| `DB_PASSWORD` | realtime | (secret) | DB password |
| `RUN_JANITOR` | realtime | true | Run cleanup janitor |
| `RLIMIT_NOFILE` | realtime | 10000 | File descriptor limit |
| `API_JWT_SECRET` | realtime | (secret) | JWT validation key |
| `SEED_SELF_HOST` | realtime | true | Seed default tenant |
| `SECRET_KEY_BASE` | realtime | (secret) | Phoenix session key |
| `DB_AFTER_CONNECT_QUERY` | realtime | SET search_path TO _realtime | Schema search path |
| `PORT` | rest | 3000 | Railway port var |
| `PGRST_DB_URI` | rest | - | PostgREST DB connection |
| `PGRST_DB_SCHEMAS` | rest | public,storage,graphql_public | Exposed schemas |
| `PGRST_JWT_SECRET` | rest | (secret) | JWT validation key |
| `PGRST_DB_MAX_ROWS` | rest | 1000 | Max rows per query |
| `PGRST_SERVER_PORT` | rest | 3000 | PostgREST port |
| `PGRST_DB_ANON_ROLE` | rest | anon | Anon DB role |
| `PGRST_DB_USE_LEGACY_GUCS` | rest | false | Use modern GUC format |
| `PGRST_APP_SETTINGS_JWT_EXP` | rest | 3600 | JWT expiry seconds |
| `PGRST_APP_SETTINGS_JWT_SECRET` | rest | (secret) | App-level JWT secret |
| `IMGPROXY_BIND` | imgproxy | :5001 | Bind address |
| `IMGPROXY_USE_ETAG` | imgproxy | true | Enable ETag headers |
| `IMGPROXY_MAX_SRC_RESOLUTION` | imgproxy | 16.8 | Max source megapixels |
| `IMGPROXY_ENABLE_WEBP_DETECTION` | imgproxy | true | Auto WebP serving |
| `IMGPROXY_LOCAL_FILESYSTEM_ROOT` | imgproxy | / | Filesystem root |
| `PORT` | analytics | 4000 | Listening port |
| `DB_PORT` | analytics | 5432 | Postgres port |
| `DB_SCHEMA` | analytics | _analytics | Analytics schema |
| `DB_DATABASE` | analytics | _supabase | Internal supabase DB |
| `DB_HOSTNAME` | analytics | - | Postgres hostname |
| `DB_PASSWORD` | analytics | (secret) | DB password |
| `DB_USERNAME` | analytics | (secret) | DB user |
| `RELEASE_COOKIE` | analytics | cookie | Erlang release cookie |
| `LOGFLARE_NODE_HOST` | analytics | 127.0.0.1 | Erlang node host |
| `POSTGRES_BACKEND_URL` | analytics | - | Logflare DB connection |
| `LOGFLARE_SINGLE_TENANT` | analytics | true | Single-tenant mode |
| `LOGFLARE_SUPABASE_MODE` | analytics | true | Supabase integration mode |
| `POSTGRES_BACKEND_SCHEMA` | analytics | _analytics | Logflare schema |
| `LOGFLARE_MIN_CLUSTER_SIZE` | analytics | 1 | Single-node cluster |
| `LOGFLARE_PUBLIC_ACCESS_TOKEN` | analytics | (secret) | Public ingest token |
| `LOGFLARE_PRIVATE_ACCESS_TOKEN` | analytics | (secret) | Admin token |
| `LOGFLARE_FEATURE_FLAG_OVERRIDE` | analytics | multibackend=true | Multi-backend support |
| `PORT` | auth | 9999 | Railway port var |
| `GOTRUE_JWT_AUD` | auth | authenticated | JWT audience |
| `GOTRUE_JWT_EXP` | auth | 3600 | JWT expiry |
| `GOTRUE_API_HOST` | auth | 0.0.0.0 | Bind address |
| `GOTRUE_API_PORT` | auth | 9999 | Listening port |
| `GOTRUE_SITE_URL` | auth | - | Public site URL |
| `API_EXTERNAL_URL` | auth | - | External API URL |
| `GOTRUE_DB_DRIVER` | auth | postgres | DB driver |
| `GOTRUE_JWT_SECRET` | auth | (secret) | JWT signing key |
| `GOTRUE_DISABLE_SIGNUP` | auth | false | Allow new signups |
| `GOTRUE_URI_ALLOW_LIST` | auth | * | Allowed redirect URIs |
| `GOTRUE_DB_DATABASE_URL` | auth | - | Auth DB connection |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | Admin role names |
| `GOTRUE_SMS_AUTOCONFIRM` | auth | false | SMS verify off |
| `GOTRUE_SMTP_ADMIN_EMAIL` | auth | admin@example.com | Admin sender |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | Skip email verify |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | Email auth on |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | Phone auth off |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | Default role |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/bash -c "rm -rf /var/lib/postgresql/data/pgdata && mkdir -p /var/lib/postgresql/data/pgdata && chown -R postgres:postgres /var/lib/postgresql/data && export PGDATA=/var/lib/postgresql/data/pgdata && exec docker-entrypoint.sh postgres -c config_file=/etc/postgresql/postgresql.conf -c data_directory=/var/lib/postgresql/data/pgdata -c log_min_messages=fatal"`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/storage`

**Category:** Other · **Languages:** Shell, Dockerfile, PLpgSQL, Elixir

[View on Railway →](https://railway.com/deploy/supabase-firebase-alternative)
