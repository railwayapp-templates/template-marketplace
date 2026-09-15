# Deploy Supabase on Railway

The ultimate Postgres development platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase)

## About

Supabase is the open-source Firebase alternative. Supabase gives you a dedicated Postgres database to build your web, mobile, and AI applications. Deploy a fully customizable Supabase deployment in just a few clicks - modify, remove unused services, and customize to fit your exact project's needs.

Hosting Supabase means running multiple interconnected services including the Studio interface, PostgreSQL database, authentication layer, and real-time subscriptions. The platform requires coordinating database connections, managing JWT token configurations, setting up authentication services, and handling real-time WebSocket connections. Production deployment involves configuring service discovery, managing secrets across multiple containers, and ensuring proper networking between components. 

Railway simplifies the multi-service deployment by handling container orchestration, managing environment variable sharing between services, and providing integrated PostgreSQL hosting with the Supabase stack.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Supavisor | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) (root: /pooler) | TCP service |
| Postgres Meta | `supabase/postgres-meta:v0.96.6` | Database |
| Gotrue Auth | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) (root: /auth) | Worker |
| Supabase Storage | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) (root: /storage) | Worker |
| Supabase Studio | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) (root: /studio) | Database |
| Supabase Realtime | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) (root: /realtime) | Worker |
| Imgproxy | `darthsim/imgproxy:v3.30.1` | Worker |
| Postgrest | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) (root: /rest) | Worker |
| Envoy | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) (root: /envoy) | Web service |
| Postgres | `ghcr.io/6ixfalls/supabase-postgres:17.6.1.136` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Supavisor | 4000 | - |
| `REGION` | Supavisor | local | - |
| `ERL_AFLAGS` | Supavisor | -proto_dist inet_tcp | - |
| `ROOT_SECRET` | Supavisor | (secret) | - |
| `DB_POOL_SIZE` | Supavisor | 5 | Pool size for internal metadata storage used by Supavisor; This is separate from client connections and used only by Supavisor itself |
| `SECRET_KEY_BASE` | Supavisor | (secret) | - |
| `CLUSTER_POSTGRES` | Supavisor | true | - |
| `POOLER_POOL_MODE` | Supavisor | transaction | - |
| `POOLER_TENANT_ID` | Supavisor | railway | Unique Supavisor tenant identifier: https://supabase.com/docs/guides/self-hosting/docker#accessing-postgres |
| `POSTGRES_PASSWORD` | Supavisor | (secret) | - |
| `POOLER_MAX_CLIENT_CONN` | Supavisor | 100 | Maximum number of client connections Supavisor accepts per pool |
| `POOLER_DEFAULT_POOL_SIZE` | Supavisor | 20 | Maximum number of PostgreSQL connections Supavisor opens per pool |
| `USE_THIS_POOLER_POSTGRES_URL` | Supavisor | - | Internal Pooler Postgres URL for you to use. |
| `USE_THIS_POOLER_EXTERNAL_POSTGRES_URL` | Supavisor | - | External Pooler Postgres URL for you to use. |
| `PG_META_HOST` | Postgres Meta | :: | - |
| `PG_META_PORT` | Postgres Meta | 8080 | - |
| `PG_META_DB_USER` | Postgres Meta | (secret) | - |
| `PG_META_DB_PASSWORD` | Postgres Meta | (secret) | - |
| `ROOT_SECRET` | Gotrue Auth | (secret) | - |
| `GOTRUE_JWT_AUD` | Gotrue Auth | authenticated | - |
| `GOTRUE_API_HOST` | Gotrue Auth | :: | - |
| `GOTRUE_API_PORT` | Gotrue Auth | 9999 | - |
| `GOTRUE_SITE_URL` | Gotrue Auth | http://localhost:3000 | The base URL your site is located at. Currently used in combination with other settings to construct URLs used in emails. Any URI that shares a host with SITE_URL is a permitted value for redirect_to params (see /authorize etc.). You can set this to `http://localhost:3000` for testing. |
| `GOTRUE_DB_DRIVER` | Gotrue Auth | postgres | - |
| `GOTRUE_JWT_ADMIN_ROLES` | Gotrue Auth | service_role | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | Gotrue Auth | authenticated | - |
| `PORT` | Supabase Storage | 5000 | - |
| `TENANT_ID` | Supabase Storage | railway | - |
| `ROOT_SECRET` | Supabase Storage | (secret) | - |
| `SERVER_HOST` | Supabase Storage | :: | - |
| `STORAGE_BACKEND` | Supabase Storage | s3 | - |
| `AWS_SECRET_ACCESS_KEY` | Supabase Storage | (secret) | - |
| `UPLOAD_FILE_SIZE_LIMIT` | Supabase Storage | 524288000 | - |
| `STORAGE_S3_FORCE_PATH_STYLE` | Supabase Storage | true | - |
| `IMAGE_TRANSFORMATION_ENABLED` | Supabase Storage | true | - |
| `S3_PROTOCOL_ACCESS_KEY_SECRET` | Supabase Storage | (secret) | - |
| `REQUEST_ALLOW_X_FORWARDED_PATH` | Supabase Storage | true | - |
| `UPLOAD_FILE_SIZE_LIMIT_STANDARD` | Supabase Storage | 52428800 | - |
| `PORT` | Supabase Studio | 3000 | - |
| `HOSTNAME` | Supabase Studio | :: | - |
| `ROOT_SECRET` | Supabase Studio | (secret) | The root secret used to seed the rest of Supabase. |
| `OPENAI_API_KEY` | Supabase Studio | (secret) | Add your OpenAI API key to enable AI Assistant |
| `AUTH_JWT_SECRET` | Supabase Studio | (secret) | - |
| `PGRST_DB_SCHEMAS` | Supabase Studio | public,graphql_public | Postgres schemas exposed via the REST API |
| `PGRST_DB_MAX_ROWS` | Supabase Studio | 1000 | Max number of rows returned by a request |
| `POSTGRES_PASSWORD` | Supabase Studio | (secret) | - |
| `DEFAULT_PROJECT_NAME` | Supabase Studio | Default Project | - |
| `NEXT_PUBLIC_ENABLE_LOGS` | Supabase Studio | true | - |
| `POSTGRES_USER_READ_WRITE` | Supabase Studio | postgres | - |
| `DEFAULT_ORGANIZATION_NAME` | Supabase Studio | Default Organization | - |
| `ENABLED_FEATURES_LOGS_ALL` | Supabase Studio | false | - |
| `PGRST_DB_EXTRA_SEARCH_PATH` | Supabase Studio | public | Extra schemas added to the search_path of every request |
| `SNIPPETS_MANAGEMENT_FOLDER` | Supabase Studio | /mnt/data/snippets | - |
| `NEXT_ANALYTICS_BACKEND_PROVIDER` | Supabase Studio | postgres | - |
| `PORT` | Supabase Realtime | 4000 | - |
| `DB_USER` | Supabase Realtime | (secret) | - |
| `APP_NAME` | Supabase Realtime | realtime | - |
| `DNS_NODES` | Supabase Realtime | '' | - |
| `ERL_AFLAGS` | Supabase Realtime | -proto_dist inet6_tcp | - |
| `DB_PASSWORD` | Supabase Realtime | (secret) | - |
| `ROOT_SECRET` | Supabase Realtime | (secret) | - |
| `RUN_JANITOR` | Supabase Realtime | true | - |
| `RLIMIT_NOFILE` | Supabase Realtime | 10000 | - |
| `SEED_SELF_HOST` | Supabase Realtime | true | - |
| `SECRET_KEY_BASE` | Supabase Realtime | (secret) | - |
| `SELF_HOST_TENANT_NAME` | Supabase Realtime | realtime-dev | - |
| `DB_AFTER_CONNECT_QUERY` | Supabase Realtime | SET search_path TO _realtime | - |
| `DISABLE_HEALTHCHECK_LOGGING` | Supabase Realtime | true | - |
| `PORT` | Imgproxy | 5001 | - |
| `IMGPROXY_USE_ETAG` | Imgproxy | true | - |
| `IMGPROXY_AUTO_WEBP` | Imgproxy | true | - |
| `IMGPROXY_MAX_SRC_RESOLUTION` | Imgproxy | 16.8 | - |
| `ROOT_SECRET` | Postgrest | (secret) | - |
| `PGRST_SERVER_HOST` | Postgrest | * | - |
| `PGRST_DB_ANON_ROLE` | Postgrest | anon | - |
| `PGRST_DB_USE_LEGACY_GUCS` | Postgrest | false | - |
| `PGRST_APP_SETTINGS_JWT_EXP` | Postgrest | 3600 | - |
| `PORT` | Envoy | 8000 | - |
| `ROOT_SECRET` | Envoy | (secret) | - |
| `ANALYTICS_HOST` | Envoy | not_present | - |
| `FUNCTIONS_HOST` | Envoy | not_present | - |
| `DASHBOARD_PASSWORD` | Envoy | (secret) | - |
| `DASHBOARD_USERNAME` | Envoy | (secret) | - |
| `POSTGRES_DB` | Postgres | postgres | - |
| `ROOT_SECRET` | Postgres | (secret) | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Healthcheck:** `/api/health`
- **TCP Proxies:** 6543
- **Healthcheck:** `/status`
- **Healthcheck:** `/api/platform/profile`
- **Volume:** `/mnt/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** HTML, Go, PLpgSQL, Shell, Dockerfile, JavaScript, Elixir

[View on Railway →](https://railway.com/deploy/supabase)
