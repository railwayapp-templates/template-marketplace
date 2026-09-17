# Deploy wacrm + Supabase on Railway

WhatsApp CRM on Meta's official API, with a self-hosted Supabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wacrm-supabase)

## About

wacrm is an open-source CRM for WhatsApp, built on Meta's official WhatsApp Business Platform. A team
works one shared inbox with assignment and notes, keeps contacts and custom fields, moves deals through
Kanban pipelines, sends approved-template broadcasts, and builds no-code automations and flows. An
optional AI assistant drafts or sends replies with your own OpenAI or Anthropic key. This is a
community-maintained template; it is not affiliated with the wacrm project.

wacrm is a Next.js app on Supabase. Upstream expects a Supabase Cloud project, migrations pushed from your
own machine with the Supabase CLI, and an image built with your Supabase URL and key compiled in. This
template runs everything on Railway instead, in one project: a self-hosted Supabase (Postgres, Auth,
PostgREST, Realtime, Storage and the Kong gateway), wacrm itself, and a small scheduler, eight services
in all, with nothing to sign up for first.

The first start does upstream's manual steps for you. It waits for Supabase's own services, applies all of
wacrm's migrations in order, each in its own transaction, runs upstream's schema check, creates your owner
account from the e-mail you enter, writes this deployment's Supabase URL and key into the built app, and
only then starts serving.

It also closes something upstream leaves open. In wacrm, anyone who finds the signup page gets a working
CRM account of their own on your instance. Here signup is by invitation only, enforced in the database
under Supabase Auth, so invited teammates join your account and nobody else gets in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| auth | `supabase/gotrue:v2.196.0` | Database |
| kong | `ghcr.io/youssefsiam38/wacrm-railway-kong:1.0.0` | Web service |
| scheduler | `ghcr.io/youssefsiam38/wacrm-railway-scheduler:1.0.0` | Worker |
| realtime | `supabase/realtime:v2.134.10` | Database |
| rest | `postgrest/postgrest:v14.17` | Database |
| app | `ghcr.io/youssefsiam38/wacrm-railway-app:1.0.0` | Web service |
| db | `ghcr.io/youssefsiam38/wacrm-railway-db:1.0.0` | Database |
| storage | `ghcr.io/youssefsiam38/wacrm-railway-storage:1.0.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | auth | 9999 | - |
| `JWT_SECRET` | auth | (secret) | Signs sessions and the Supabase API keys, generated. Every Supabase service references it. |
| `GOTRUE_JWT_AUD` | auth | authenticated | - |
| `GOTRUE_JWT_EXP` | auth | 3600 | - |
| `GOTRUE_API_HOST` | auth | :: | - |
| `GOTRUE_API_PORT` | auth | 9999 | - |
| `GOTRUE_DB_DRIVER` | auth | postgres | - |
| `GOTRUE_SMTP_HOST` | auth | - | Optional SMTP host for password-reset e-mails. |
| `GOTRUE_SMTP_PASS` | auth | - | Optional SMTP password. |
| `GOTRUE_SMTP_PORT` | auth | - | Optional SMTP port. |
| `GOTRUE_SMTP_USER` | auth | (secret) | Optional SMTP user. |
| `GOTRUE_JWT_SECRET` | auth | (secret) | - |
| `GOTRUE_DISABLE_SIGNUP` | auth | false | - |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | - |
| `GOTRUE_SMTP_ADMIN_EMAIL` | auth | - | Optional sender address for Supabase Auth e-mails. |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | - |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | - |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | - |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | auth | false | - |
| `PORT` | kong | 8000 | - |
| `JWT_SECRET` | kong | (secret) | - |
| `WACRM_CRON_INTERVAL` | scheduler | 60 | Seconds between calls to the automation and flow cron endpoints. |
| `AUTOMATION_CRON_SECRET` | scheduler | (secret) | - |
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
| `PGRST_DB_SCHEMAS` | rest | public,storage,graphql_public | - |
| `PGRST_JWT_SECRET` | rest | (secret) | - |
| `PGRST_DB_MAX_ROWS` | rest | 1000 | - |
| `PGRST_SERVER_HOST` | rest | *6 | - |
| `PGRST_SERVER_PORT` | rest | 3000 | - |
| `PGRST_DB_ANON_ROLE` | rest | anon | - |
| `PGRST_DB_USE_LEGACY_GUCS` | rest | false | - |
| `PGRST_APP_SETTINGS_JWT_EXP` | rest | 3600 | - |
| `PGRST_DB_EXTRA_SEARCH_PATH` | rest | public | - |
| `PORT` | app | 3000 | - |
| `JWT_SECRET` | app | (secret) | - |
| `OWNER_NAME` | app | Owner | The owner's display name. |
| `META_APP_ID` | app | - | Meta app ID. Needed only to create message templates with an image header. |
| `OWNER_EMAIL` | app | - | Your e-mail address. It becomes the owner account you sign in with. |
| `ACCOUNT_NAME` | app | My company | Name of the CRM account your team works in. |
| `ENCRYPTION_KEY` | app | - | AES-256 key for stored WhatsApp tokens and AI keys. Never change it on a running install. |
| `OWNER_PASSWORD` | app | (secret) | The owner's first password, generated. Copy it from here to sign in, then change it in the app. |
| `META_APP_SECRET` | app | (secret) | Meta for Developers → App settings → Basic → App secret. Required before WhatsApp webhooks are accepted; the app runs without it. |
| `WACRM_SIGNUP_MODE` | app | invite-only | invite-only admits only people with an invitation link from your account; open lets anyone sign up and get an account of their own. |
| `AUTOMATION_CRON_SECRET` | app | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | Password of every Supabase database role, generated. |
| `PORT` | storage | 5000 | - |
| `JWT_SECRET` | storage | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/login`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/storage`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/wacrm-supabase)
