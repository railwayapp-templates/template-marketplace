# Deploy DeskcommCRM on Railway

WhatsApp sales CRM with AI agents and a self-hosted Supabase, all in one

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deskcommcrm)

## About

DeskcommCRM is an open-source CRM for businesses that sell over WhatsApp. Conversations, contacts and
deals live in one inbox and pipeline, and AI agents answer, qualify leads and follow up inside it, with
a human able to take over at any point. It is a self-hosted alternative to Kommo, Octadesk and
Intercom. This is a community-maintained template; it is not affiliated with the DeskcommCRM project.

DeskcommCRM is built on Supabase, and upstream's own installer expects a Supabase Cloud account for
the database, authentication and file storage, with the CRM, WhatsApp bridge and scheduler on a
separate server. This template runs everything on Railway instead, in one project, with nothing to
sign up for first.

That makes it a large bundle: twelve services. Six are a self-hosted Supabase (Postgres, Auth,
PostgREST, Realtime, Storage and the Kong gateway). Three are DeskcommCRM itself: the web app, the AI
agent worker and a cron scheduler. The rest are WAHA for WhatsApp, Valkey, and a small bridge that lets
the CRM's Upstash client talk to it. Idle, the whole bundle uses about 1.3 GB of memory.

The hard part of hosting it is the first boot, and the template does it for you. The app waits for
Supabase's own services, applies DeskcommCRM's 25,000-line schema, creates your owner account,
organisation and super-admin role, and only then starts serving. Nobody can reach a fresh instance
before it is yours, and self-service signup starts closed, where upstream's default gives every
visitor a tenant of their own.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storage | `ghcr.io/youssefsiam38/deskcommcrm-railway-storage:1.0.1` | Database |
| rest | `postgrest/postgrest:v14.17` | Database |
| worker | `ghcr.io/youssefsiam38/deskcommcrm-railway-worker:1.0.1` | Worker |
| app | `ghcr.io/youssefsiam38/deskcommcrm-railway-app:1.0.1` | Web service |
| realtime | `supabase/realtime:v2.134.10` | Database |
| srh | `ghcr.io/youssefsiam38/deskcommcrm-railway-srh:1.0.1` | Worker |
| auth | `supabase/gotrue:v2.196.0` | Database |
| db | `ghcr.io/youssefsiam38/deskcommcrm-railway-db:1.0.1` | Database |
| scheduler | `ghcr.io/youssefsiam38/deskcommcrm-railway-scheduler:1.0.1` | Worker |
| waha | `devlikeapro/waha:latest-2026.7.2` | Database |
| redis | `valkey/valkey:8.1.10-alpine` | Database |
| kong | `ghcr.io/youssefsiam38/deskcommcrm-railway-kong:1.0.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | storage | 5000 | - |
| `JWT_SECRET` | storage | (secret) | - |
| `PGRST_DB_SCHEMAS` | rest | public,storage,graphql_public | - |
| `PGRST_JWT_SECRET` | rest | (secret) | - |
| `PGRST_DB_MAX_ROWS` | rest | 1000 | - |
| `PGRST_SERVER_HOST` | rest | *6 | - |
| `PGRST_SERVER_PORT` | rest | 3000 | - |
| `PGRST_DB_ANON_ROLE` | rest | anon | - |
| `PGRST_DB_USE_LEGACY_GUCS` | rest | false | - |
| `PGRST_APP_SETTINGS_JWT_EXP` | rest | 3600 | - |
| `PGRST_DB_EXTRA_SEARCH_PATH` | rest | public | - |
| `JWT_SECRET` | worker | (secret) | - |
| `WAHA_API_KEY` | worker | (secret) | - |
| `INTERNAL_SECRET` | worker | (secret) | - |
| `WAHA_HMAC_SECRET` | worker | (secret) | - |
| `INTERNAL_CRON_SECRET` | worker | (secret) | - |
| `UPSTASH_REDIS_REST_TOKEN` | worker | (secret) | - |
| `IMPERSONATE_COOKIE_SECRET` | worker | (secret) | - |
| `PORT` | app | 3000 | - |
| `APP_LOCALE` | app | pt-BR | Language of the app and of the first organisation: pt-BR or es. |
| `JWT_SECRET` | app | (secret) | - |
| `SENTRY_DSN` | app | off | off, or your own Sentry DSN. Upstream sends error reports to its Sentry unless this is set. |
| `OWNER_EMAIL` | app | - | Your e-mail address. It becomes the owner account you sign in with. |
| `SIGNUP_MODE` | app | so_convite | Self-service signup. so_convite is invite-only; the admin screen can open it later. |
| `WAHA_API_KEY` | app | (secret) | - |
| `OWNER_ORG_NAME` | app | Minha Empresa | Name of the first organisation. |
| `OWNER_PASSWORD` | app | (secret) | The owner's first password, generated. Copy it from here to sign in, then change it in the app. |
| `RESEND_API_KEY` | app | (secret) | Optional. Sends invitation and LGPD e-mails through Resend. Without it, invitation links are shown on screen. |
| `AI_CRED_AES_KEY` | app | - | AES-256 key for stored AI provider keys. Never change it on a running install. |
| `INTERNAL_SECRET` | app | (secret) | - |
| `WAHA_HMAC_SECRET` | app | (secret) | - |
| `RESEND_FROM_EMAIL` | app | - | Optional. Sender address on a domain verified in your Resend account. |
| `CPF_ENCRYPTION_KEY` | app | - | AES-256 key for stored CPF numbers. Never change it on a running install. |
| `OPENROUTER_API_KEY` | app | (secret) | Optional. An instance-wide AI key for the agents. Keys can also be added per organisation in the app. |
| `INTERNAL_CRON_SECRET` | app | (secret) | - |
| `WAHA_BYO_ENCRYPTION_KEY` | app | - | AES-256 key for stored WhatsApp connection credentials. Never change it on a running install. |
| `UPSTASH_REDIS_REST_TOKEN` | app | (secret) | - |
| `IMPERSONATE_COOKIE_SECRET` | app | (secret) | - |
| `PORT` | realtime | 4000 | - |
| `DB_NAME` | realtime | postgres | - |
| `DB_PORT` | realtime | 5432 | - |
| `DB_USER` | realtime | (secret) | - |
| `APP_NAME` | realtime | realtime | - |
| `DNS_NODES` | realtime | '' | - |
| `ERL_AFLAGS` | realtime | -proto_dist inet_tcp | - |
| `DB_PASSWORD` | realtime | (secret) | - |
| `RUN_JANITOR` | realtime | true | - |
| `RLIMIT_NOFILE` | realtime | 10000 | - |
| `API_JWT_SECRET` | realtime | (secret) | - |
| `SEED_SELF_HOST` | realtime | true | - |
| `SECRET_KEY_BASE` | realtime | (secret) | - |
| `METRICS_JWT_SECRET` | realtime | (secret) | - |
| `SELF_HOST_TENANT_NAME` | realtime | realtime | - |
| `DB_AFTER_CONNECT_QUERY` | realtime | SET search_path TO _realtime | - |
| `DISABLE_HEALTHCHECK_LOGGING` | realtime | true | - |
| `SRH_TOKEN` | srh | (secret) | - |
| `PORT` | auth | 9999 | - |
| `JWT_SECRET` | auth | (secret) | Signs sessions and the Supabase API keys, generated. Every Supabase service references it. |
| `GOTRUE_JWT_AUD` | auth | authenticated | - |
| `GOTRUE_JWT_EXP` | auth | 3600 | - |
| `GOTRUE_API_HOST` | auth | :: | - |
| `GOTRUE_API_PORT` | auth | 9999 | - |
| `GOTRUE_DB_DRIVER` | auth | postgres | - |
| `GOTRUE_JWT_SECRET` | auth | (secret) | - |
| `GOTRUE_DISABLE_SIGNUP` | auth | false | - |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | - |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | - |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | - |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | - |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | auth | false | - |
| `POSTGRES_PASSWORD` | db | (secret) | Password of every Supabase database role, generated. |
| `TZ` | scheduler | UTC | - |
| `INTERNAL_SECRET` | scheduler | (secret) | - |
| `PORT` | waha | 3000 | - |
| `WAHA_API_KEY` | waha | (secret) | - |
| `WHATSAPP_HOOK_EVENTS` | waha | message.any,message.ack,message.edited,message.revoked,session.status,state.change | - |
| `WAHA_DASHBOARD_ENABLED` | waha | false | - |
| `WAHA_DASHBOARD_PASSWORD` | waha | (secret) | - |
| `WAHA_DASHBOARD_USERNAME` | waha | (secret) | - |
| `WHATSAPP_DEFAULT_ENGINE` | waha | NOWEB | NOWEB connects without a browser, as upstream DeskcommCRM recommends. |
| `WHATSAPP_SWAGGER_ENABLED` | waha | false | - |
| `WHATSAPP_SWAGGER_PASSWORD` | waha | (secret) | - |
| `WHATSAPP_SWAGGER_USERNAME` | waha | (secret) | - |
| `WHATSAPP_RESTART_ALL_SESSIONS` | waha | True | - |
| `REDIS_PASSWORD` | redis | (secret) | - |
| `PORT` | kong | 8000 | - |
| `JWT_SECRET` | kong | (secret) | - |

## Configuration

- **Volume:** `/var/lib/storage`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/.sessions`
- **Start command:** `sh -c 'exec valkey-server --requirepass "$REDIS_PASSWORD"'`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deskcommcrm)
