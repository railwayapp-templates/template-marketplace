# Deploy OneClickSupabase on Railway

A self-hosted Supabase stack built specifically for Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oneclicksupabase)

## About

OneClickSupabase is a production-ready, self-hosted Supabase stack built specifically for Railway. It deploys the complete Supabase platform — Postgres, Auth, REST API, Realtime, Storage, and Studio — with 100% reliability. JWT keys are auto-generated, all secrets are shared automatically, and every image is pinned for stability.

OneClickSupabase runs 8 services inside a single Railway project: Postgres 15, GoTrue (Auth), PostgREST (REST API), Realtime (WebSockets), Storage, Studio (dashboard), Kong (API gateway), and an init-jwt service that auto-generates your JWT keys on first deploy. All services communicate over Railway's private network. Only Kong gets a public domain. No manual JWT setup, no floating image tags, no secret mismatches — just a working Supabase instance in one click.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DB | [pagetree/OneClickSupabase](https://github.com/pagetree/OneClickSupabase) (root: /db) | Worker |
| Auth | [pagetree/OneClickSupabase](https://github.com/pagetree/OneClickSupabase) (root: /auth) | Worker |
| Studio | [pagetree/OneClickSupabase](https://github.com/pagetree/OneClickSupabase) (root: /studio) | Worker |
| Kong | [pagetree/OneClickSupabase](https://github.com/pagetree/OneClickSupabase) (root: /kong) | Web service |
| Storage | [pagetree/OneClickSupabase](https://github.com/pagetree/OneClickSupabase) (root: /storage) | Worker |
| Init-JWT | [pagetree/OneClickSupabase](https://github.com/pagetree/OneClickSupabase) (root: /init-jwt) | Worker |
| Rest | [pagetree/OneClickSupabase](https://github.com/pagetree/OneClickSupabase) (root: /rest) | Worker |
| Realtime | [pagetree/OneClickSupabase](https://github.com/pagetree/OneClickSupabase) (root: /realtime) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `JWT_SECRET` | DB | (secret) |
| `POSTGRES_PASSWORD` | DB | (secret) |
| `DASHBOARD_PASSWORD` | DB | (secret) |
| `DASHBOARD_USERNAME` | DB | (secret) |
| `SMTP_PORT` | Auth | 587 |
| `SMTP_USER` | Auth | (secret) |
| `JWT_SECRET` | Auth | (secret) |
| `GOTRUE_JWT_AUD` | Auth | authenticated |
| `GOTRUE_JWT_EXP` | Auth | 3600 |
| `GOTRUE_API_HOST` | Auth | 0.0.0.0 |
| `GOTRUE_DB_DRIVER` | Auth | postgres |
| `SMTP_SENDER_NAME` | Auth | Supabase |
| `GOTRUE_JWT_SECRET` | Auth | (secret) |
| `POSTGRES_PASSWORD` | Auth | (secret) |
| `GOTRUE_DISABLE_SIGNUP` | Auth | false |
| `GOTRUE_URI_ALLOW_LIST` | Auth | * |
| `GOTRUE_JWT_ADMIN_ROLES` | Auth | service_role |
| `GOTRUE_MAILER_AUTOCONFIRM` | Auth | true |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | Auth | true |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | Auth | authenticated |
| `JWT_SECRET` | Studio | (secret) |
| `POSTGRES_PASSWORD` | Studio | (secret) |
| `DEFAULT_PROJECT_NAME` | Studio | My Project |
| `NEXT_PUBLIC_ENABLE_LOGS` | Studio | false |
| `DEFAULT_ORGANIZATION_NAME` | Studio | My Organization |
| `NEXT_ANALYTICS_BACKEND_PROVIDER` | Studio | postgres |
| `JWT_SECRET` | Kong | (secret) |
| `PGRST_PORT` | Kong | 3000 |
| `GOTRUE_PORT` | Kong | 9999 |
| `KONG_PLUGINS` | Kong | request-transformer,cors,key-auth,acl |
| `STORAGE_PORT` | Kong | 5000 |
| `KONG_DATABASE` | Kong | off |
| `REALTIME_PORT` | Kong | 4000 |
| `KONG_DNS_ORDER` | Kong | LAST,A,CNAME |
| `POSTGRES_PASSWORD` | Kong | (secret) |
| `KONG_DECLARATIVE_CONFIG` | Kong | /home/kong/kong.yml |
| `KONG_NGINX_PROXY_PROXY_BUFFERS` | Kong | 64 160k |
| `KONG_NGINX_PROXY_PROXY_BUFFER_SIZE` | Kong | 160k |
| `JWT_SECRET` | Storage | (secret) |
| `FILE_SIZE_LIMIT` | Storage | 52428800 |
| `STORAGE_BACKEND` | Storage | file |
| `PGRST_JWT_SECRET` | Storage | (secret) |
| `POSTGRES_PASSWORD` | Storage | (secret) |
| `FILE_STORAGE_BACKEND_PATH` | Storage | /var/lib/storage |
| `JWT_SECRET` | Init-JWT | (secret) |
| `POSTGRES_PASSWORD` | Init-JWT | (secret) |
| `JWT_SECRET` | Rest | (secret) |
| `PGRST_DB_SCHEMAS` | Rest | public,storage,graphql_public |
| `PGRST_JWT_SECRET` | Rest | (secret) |
| `POSTGRES_PASSWORD` | Rest | (secret) |
| `PGRST_DB_ANON_ROLE` | Rest | anon |
| `PGRST_DB_USE_LEGACY_GUCS` | Rest | false |
| `PGRST_DB_EXTRA_SEARCH_PATH` | Rest | public,extensions |
| `DB_NAME` | Realtime | postgres |
| `DB_PORT` | Realtime | 5432 |
| `DB_USER` | Realtime | (secret) |
| `DB_ENC_KEY` | Realtime | supabaserealtime |
| `ERL_AFLAGS` | Realtime | -proto_dist inet_tcp |
| `JWT_SECRET` | Realtime | (secret) |
| `DB_PASSWORD` | Realtime | (secret) |
| `FLY_ALLOC_ID` | Realtime | fly123 |
| `FLY_APP_NAME` | Realtime | realtime |
| `API_JWT_SECRET` | Realtime | (secret) |
| `SECRET_KEY_BASE` | Realtime | (secret) |
| `ENABLE_TAILSCALE` | Realtime | false |
| `POSTGRES_PASSWORD` | Realtime | (secret) |
| `DB_AFTER_CONNECT_QUERY` | Realtime | SET search_path TO _realtime |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/oneclicksupabase)
