# Deploy Supabase — Open Source Firebase Alternative on Railway

Self-host Supabase — Postgres, auth, storage & REST API in one

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase-firebase-alternative-self-hoste)

## About

Supabase is the open-source Firebase alternative — a complete backend built around a real PostgreSQL database, with authentication, an auto-generated REST API, real-time subscriptions, file storage, and a Studio dashboard. This template deploys a streamlined Supabase stack (without Edge Functions and Logflare) on Railway, wired over private networking with the JWT keys generated correctly, so the auth layer that trips up most self-hosters works on the first deploy.

---

Supabase is a multi-service stack, and one detail determines whether it authenticates at all — this template handles it, and understanding it saves hours.

**The JWT keys must be generated from the JWT secret — or nothing authenticates.** All Supabase services validate requests using JWTs signed with a shared `JWT_SECRET`. The `ANON_KEY` (public, respects row-level security) and `SERVICE_ROLE_KEY` (admin, bypasses RLS — server-side only) are themselves JWTs *signed with that secret*. If they don't match, every request fails with "Invalid API key." This is the number-one self-hosted Supabase failure, and this template generates a matching secret and key set so the stack authenticates on first deploy.

**Only Kong should be public — everything else stays private.** The Kong gateway is the single public entry point; Postgres, GoTrue, PostgREST, Realtime, and Storage all connect over Railway's private network and need no public domain. Use Kong's public domain as your `SUPABASE_URL` in client code, with the `ANON_KEY`.

**Never expose Studio publicly.** The Studio dashboard has full access to your database, auth, and storage. It's protected by basic auth, but keep access restricted and don't hand out its URL.

**Startup order settles itself.** GoTrue and PostgREST need Postgres running with its schemas, so on first deploy they may restart once or twice while Postgres comes up — normal, and Railway's restart policy handles it.

**PostgreSQL holds everything — back it up.** Your data, plus the auth and storage schemas, all live in Postgres — the one thing you can't lose, so persist and back it up. Rotating `JWT_SECRET` later invalidates every key and active session at once, so treat the secret as permanent.

Typical cost: **~$15–25/month** on Railway across the services, plus storage. Supabase is open source and free; the managed Supabase cloud bills per project and usage.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgrest | `postgrest/postgrest:v14.12` | Database |
| Kong | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) | Worker |
| Gotrue Auth | `supabase/gotrue:v2.189.0` | Database |
| Imgproxy | `darthsim/imgproxy:v3.30.1` | Worker |
| Supabase Realtime | `supabase/realtime:v2.102.3` | Database |
| Supabase Storage | `supabase/storage-api:v1.60.4` | Database |
| Supabase Studio | `supabase/studio:2026.07.07-sha-a6a04f2` | Database |
| Supavisor | [6ixfalls/supabase](https://github.com/6ixfalls/supabase) | Worker |
| Postgres Meta | `supabase/postgres-meta:v0.96.6` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGRST_JWT_SECRET` | Postgrest | (secret) | - |
| `PGRST_SERVER_HOST` | Postgrest | * | - |
| `PGRST_DB_ANON_ROLE` | Postgrest | anon | - |
| `PGRST_DB_USE_LEGACY_GUCS` | Postgrest | false | - |
| `PGRST_APP_SETTINGS_JWT_EXP` | Postgrest | 3600 | - |
| `PGRST_APP_SETTINGS_JWT_SECRET` | Postgrest | (secret) | - |
| `PORT` | Kong | 8000 | - |
| `KONG_PLUGINS` | Kong | request-transformer,cors,key-auth,acl,basic-auth,request-termination,ip-restriction,post-function | - |
| `KONG_DATABASE` | Kong | off | - |
| `ANALYTICS_HOST` | Kong | not_present | - |
| `FUNCTIONS_HOST` | Kong | not_present | - |
| `KONG_DNS_ORDER` | Kong | LAST,A,CNAME | - |
| `KONG_PROXY_LISTEN` | Kong | [::]:8000 reuseport backlog=16384, 0.0.0.0:8000 reuseport backlog=16384 | - |
| `DASHBOARD_PASSWORD` | Kong | (secret) | - |
| `DASHBOARD_USERNAME` | Kong | (secret) | - |
| `KONG_DNS_VALID_TTL` | Kong | 5 | - |
| `KONG_ROUTER_FLAVOR` | Kong | expressions | - |
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
| `GOTRUE_SITE_URL` | Gotrue Auth | - | The base URL your site is located at. Currently used in combination with other settings to construct URLs used in emails. Any URI that shares a host with SITE_URL is a permitted value for redirect_to params (see /authorize etc.). You can set this to http://localhost:3000 for testing. |
| `GOTRUE_DB_DRIVER` | Gotrue Auth | postgres | - |
| `GOTRUE_JWT_SECRET` | Gotrue Auth | (secret) | - |
| `GOTRUE_JWT_ADMIN_ROLES` | Gotrue Auth | service_role | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | Gotrue Auth | authenticated | - |
| `PORT` | Imgproxy | 5001 | - |
| `IMGPROXY_USE_ETAG` | Imgproxy | true | - |
| `IMGPROXY_AUTO_WEBP` | Imgproxy | true | - |
| `IMGPROXY_MAX_SRC_RESOLUTION` | Imgproxy | 16.8 | - |
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
| `PORT` | Supavisor | 4000 | - |
| `REGION` | Supavisor | local | - |
| `ERL_AFLAGS` | Supavisor | -proto_dist inet_tcp | - |
| `DB_POOL_SIZE` | Supavisor | 5 | - |
| `API_JWT_SECRET` | Supavisor | (secret) | - |
| `SECRET_KEY_BASE` | Supavisor | (secret) | - |
| `CLUSTER_POSTGRES` | Supavisor | true | - |
| `POOLER_POOL_MODE` | Supavisor | transaction | - |
| `POOLER_TENANT_ID` | Supavisor | railway | - |
| `POSTGRES_PASSWORD` | Supavisor | (secret) | - |
| `METRICS_JWT_SECRET` | Supavisor | (secret) | - |
| `POOLER_MAX_CLIENT_CONN` | Supavisor | 100 | - |
| `POOLER_DEFAULT_POOL_SIZE` | Supavisor | 20 | - |
| `PG_META_HOST` | Postgres Meta | :: | - |
| `PG_META_PORT` | Postgres Meta | 8080 | - |
| `PG_META_DB_USER` | Postgres Meta | (secret) | - |
| `PG_META_DB_PASSWORD` | Postgres Meta | (secret) | - |

**Category:** Storage · **Languages:** HTML, PLpgSQL, Shell, JavaScript, Dockerfile, Elixir

[View on Railway →](https://railway.com/deploy/supabase-firebase-alternative-self-hoste)
