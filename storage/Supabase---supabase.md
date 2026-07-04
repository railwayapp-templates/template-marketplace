# Deploy Supabase on Railway

Supabase without Functions and Logflare

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase)

## About

Supabase is the open source Firebase alternative. Supabase gives you a dedicated Postgres database to build your web, mobile, and AI applications.

Hosting Supabase means running multiple interconnected services including the Studio interface, PostgreSQL database, authentication layer, and real-time subscriptions. The platform requires coordinating database connections, managing JWT token configurations, setting up authentication services, and handling real-time WebSocket connections. Production deployment involves configuring service discovery, managing secrets across multiple containers, and ensuring proper networking between components. 

Railway simplifies the multi-service deployment by handling container orchestration, managing environment variable sharing between services, and providing integrated PostgreSQL hosting with the Supabase stack.

![Supabase Logo](https://github.com/supabase.png)

**Not a complete Supabase deployment!**

This template contains Supabase Studio, Postgrest, Supabase Auth, Supabase Realtime, PostgreSQL, and Storage features. Features that require logs or edge functions will not work with this deployment. These features are not compatible with Railway yet and will be added in a future release. Some core Supabase functions may require these features, and errors may appear in Supabase Studio when trying to access these. Use in production at your own risk - this deployment is based on the examples in the Supabase GitHub repository.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres Meta | `supabase/postgres-meta:v0.96.6` | Database |
| Postgrest | `postgrest/postgrest:v14.12` | Database |
| Supabase Realtime | `supabase/realtime:v2.102.3` | Database |
| Supabase Storage | `supabase/storage-api:v1.60.4` | Database |
| Imgproxy | `darthsim/imgproxy:v3.8.0` | Worker |
| Kong | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) (root: /kong) | Web service |
| Gotrue Auth | `supabase/gotrue:v2.180.0` | Database |
| Supabase Studio | `supabase/studio:2026.06.03-sha-0bca601` | Database |
| Postgres | `ghcr.io/6ixfalls/supabase-postgres:17.6.1.136` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PG_META_HOST` | Postgres Meta | :: | - |
| `PG_META_PORT` | Postgres Meta | 8080 | - |
| `PG_META_DB_USER` | Postgres Meta | (secret) | - |
| `PG_META_DB_PASSWORD` | Postgres Meta | (secret) | - |
| `PGRST_DB_SCHEMAS` | Postgrest | public,storage,graphql_public | - |
| `PGRST_JWT_SECRET` | Postgrest | (secret) | - |
| `PGRST_SERVER_HOST` | Postgrest | !6 | - |
| `PGRST_DB_ANON_ROLE` | Postgrest | anon | - |
| `PGRST_DB_USE_LEGACY_GUCS` | Postgrest | false | - |
| `PGRST_APP_SETTINGS_JWT_EXP` | Postgrest | 3600 | - |
| `PGRST_APP_SETTINGS_JWT_SECRET` | Postgrest | (secret) | - |
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
| `SELF_HOST_TENANT_NAME` | Supabase Realtime | supabase-realtime | - |
| `DB_AFTER_CONNECT_QUERY` | Supabase Realtime | SET search_path TO _realtime | - |
| `DISABLE_HEALTHCHECK_LOGGING` | Supabase Realtime | true | - |
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
| `PORT` | Imgproxy | 5001 | - |
| `IMGPROXY_USE_ETAG` | Imgproxy | true | - |
| `IMGPROXY_ENABLE_WEBP_DETECTION` | Imgproxy | true | - |
| `PORT` | Kong | 8000 | - |
| `KONG_PLUGINS` | Kong | request-transformer,cors,key-auth,acl,basic-auth,request-termination,ip-restriction,post-function | - |
| `KONG_DATABASE` | Kong | off | - |
| `ANALYTICS_HOST` | Kong | not_present | - |
| `FUNCTIONS_HOST` | Kong | not_present | - |
| `KONG_DNS_ORDER` | Kong | LAST,A,CNAME | - |
| `KONG_PROXY_LISTEN` | Kong | [::]:8000 reuseport backlog=16384, 0.0.0.0:8000 reuseport backlog=16384 | - |
| `DASHBOARD_PASSWORD` | Kong | (secret) | - |
| `DASHBOARD_USERNAME` | Kong | (secret) | - |
| `SUPABASE_SECRET_KEY` | Kong | (secret) | - |
| `KONG_PROXY_ACCESS_LOG` | Kong | /dev/stdout combined | - |
| `KONG_DNS_NOT_FOUND_TTL` | Kong | 1 | - |
| `KONG_DECLARATIVE_CONFIG` | Kong | /usr/local/kong/kong.yml | - |
| `KONG_NGINX_WORKER_PROCESSES` | Kong | 2 | - |
| `KONG_NGINX_PROXY_PROXY_BUFFERS` | Kong | 64 160k | - |
| `KONG_NGINX_PROXY_PROXY_BUFFER_SIZE` | Kong | 160k | - |
| `GOTRUE_JWT_AUD` | Gotrue Auth | authenticated | - |
| `GOTRUE_API_HOST` | Gotrue Auth | :: | - |
| `GOTRUE_API_PORT` | Gotrue Auth | 9999 | - |
| `GOTRUE_SITE_URL` | Gotrue Auth | - | The base URL your site is located at. Currently used in combination with other settings to construct URLs used in emails. Any URI that shares a host with SITE_URL is a permitted value for redirect_to params (see /authorize etc.). You can set this to `http://localhost:3000` for testing. |
| `GOTRUE_DB_DRIVER` | Gotrue Auth | postgres | - |
| `GOTRUE_JWT_SECRET` | Gotrue Auth | (secret) | - |
| `GOTRUE_JWT_ADMIN_ROLES` | Gotrue Auth | service_role | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | Gotrue Auth | authenticated | - |
| `PORT` | Supabase Studio | 3000 | - |
| `HOSTNAME` | Supabase Studio | :: | - |
| `JWT_SECRET` | Supabase Studio | (secret) | - |
| `AUTH_JWT_SECRET` | Supabase Studio | (secret) | - |
| `POSTGRES_PASSWORD` | Supabase Studio | (secret) | - |
| `SUPABASE_SECRET_KEY` | Supabase Studio | (secret) | - |
| `DEFAULT_PROJECT_NAME` | Supabase Studio | Default Project | - |
| `AAAA_IMPORTANT_READ_ME` | Supabase Studio | - | READ THIS! To setup Supabase, you need to generate a JWT Secret and the respective secrets. Either copy the secrets one by one, or deploy the template and paste the entire ENV block into the bottom of Supabase Studio > Environment > Raw Editor (don't touch the existing variables!) This value can be set to anything to proceed. http://6ixfalls.github.io/supabase |
| `NEXT_PUBLIC_ENABLE_LOGS` | Supabase Studio | true | - |
| `DEFAULT_ORGANIZATION_NAME` | Supabase Studio | Default Organization | - |
| `NEXT_ANALYTICS_BACKEND_PROVIDER` | Supabase Studio | postgres | - |
| `JWT_SECRET` | Postgres | (secret) | - |
| `POSTGRES_DB` | Postgres | postgres | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `postgrest`
- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** HTML, PLpgSQL, Shell, Elixir, Dockerfile

[View on Railway →](https://railway.com/deploy/supabase)
