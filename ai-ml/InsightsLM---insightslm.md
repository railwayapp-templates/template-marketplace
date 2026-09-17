# Deploy InsightsLM on Railway

Open-source NotebookLM: chat with sources, audio overviews; Supabase + n8n

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/insightslm)

## About

InsightsLM is an open-source alternative to Google's NotebookLM. Create notebooks, add PDFs, pasted text and
websites as sources, chat with them and get answers with citations back to the passages they came from, keep
notes, and generate a two-host audio overview of your sources. This is a community-maintained template; it is
not affiliated with the InsightsLM or n8n projects.

InsightsLM is a React web app on Supabase: Postgres with pgvector for its notebooks and embeddings, Auth,
Realtime, Storage for uploaded files and audio, and nine Edge Functions. Its processing (text extraction,
summaries, embeddings, chat, podcast scripts and speech) runs in six n8n workflows. Upstream's guide sets all of
this up by hand across Supabase Cloud, an n8n server with ffmpeg, and a static host.

This template runs the whole stack on Railway, in one project, nine services with every secret generated: a
self-hosted Supabase including Edge Functions, n8n (its official image, private), and the web app. At the first
start it applies the database migration, creates your owner account, and creates and publishes the six
workflows in n8n with their credentials, through n8n's API. Audio overviews work without ffmpeg.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rest | `postgrest/postgrest:v14.17` | Database |
| db | `ghcr.io/youssefsiam38/insightslm-railway-db:1.0.0` | Database |
| app | `ghcr.io/youssefsiam38/insightslm-railway-app:1.0.0` | Web service |
| functions | `ghcr.io/youssefsiam38/insightslm-railway-functions:1.0.0` | Worker |
| realtime | `supabase/realtime:v2.134.10` | Database |
| auth | `supabase/gotrue:v2.197.0` | Database |
| storage | `ghcr.io/youssefsiam38/insightslm-railway-storage:1.0.0` | Database |
| kong | `ghcr.io/youssefsiam38/insightslm-railway-kong:1.0.0` | Web service |
| n8n | `n8nio/n8n:2.39.6` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGRST_DB_SCHEMAS` | rest | public,storage,graphql_public | - |
| `PGRST_JWT_SECRET` | rest | (secret) | - |
| `PGRST_DB_MAX_ROWS` | rest | 1000 | - |
| `PGRST_SERVER_HOST` | rest | *6 | - |
| `PGRST_SERVER_PORT` | rest | 3000 | - |
| `PGRST_DB_ANON_ROLE` | rest | anon | - |
| `PGRST_DB_USE_LEGACY_GUCS` | rest | false | - |
| `PGRST_APP_SETTINGS_JWT_EXP` | rest | 3600 | - |
| `PGRST_DB_EXTRA_SEARCH_PATH` | rest | public | - |
| `POSTGRES_PASSWORD` | db | (secret) | Password of every Supabase database role, generated. |
| `PORT` | app | 3000 | - |
| `JWT_SECRET` | app | (secret) | - |
| `OWNER_EMAIL` | app | - | Your e-mail address. It becomes the owner account you sign in with. |
| `GEMINI_API_KEY` | app | (secret) | Google Gemini API key. Required for audio overviews (text to speech). |
| `OPENAI_API_KEY` | app | (secret) | OpenAI API key. Required for adding sources, chat and notebook generation. |
| `OWNER_PASSWORD` | app | (secret) | The owner's first password, generated. Copy it from here to sign in. |
| `OPENAI_BASE_URL` | app | - | An OpenAI-compatible endpoint instead of api.openai.com (default https://api.openai.com/v1). |
| `N8N_OWNER_PASSWORD` | app | (secret) | Password of n8n's owner account (same e-mail), generated. Only needed if you give n8n a domain. |
| `INSIGHTSLM_SIGNUP_MODE` | app | closed | closed admits only the owner and INSIGHTSLM_ALLOWED_SIGNUPS; open lets anyone sign up. |
| `INSIGHTSLM_ALLOWED_SIGNUPS` | app | - | Comma-separated e-mail addresses and @domain entries that may create accounts. |
| `PORT` | functions | 9000 | - |
| `JWT_SECRET` | functions | (secret) | - |
| `OPENAI_API_KEY` | functions | (secret) | - |
| `NOTEBOOK_GENERATION_AUTH` | functions | - | Secret the edge functions send to n8n's webhooks, generated. |
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
| `GOTRUE_SMTP_ADMIN_EMAIL` | auth | - | Optional sender address. |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | - |
| `GOTRUE_PASSWORD_MIN_LENGTH` | auth | (secret) | - |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | - |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | - |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | auth | false | - |
| `PORT` | storage | 5000 | - |
| `JWT_SECRET` | storage | (secret) | - |
| `PORT` | kong | 8000 | - |
| `JWT_SECRET` | kong | (secret) | - |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_PORT` | n8n | 5678 | - |
| `GENERIC_TIMEZONE` | n8n | UTC | - |
| `DB_POSTGRESDB_PORT` | n8n | 5432 | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8n | - | Encrypts the credentials n8n stores, generated. Never change it on a running install. |
| `N8N_LISTEN_ADDRESS` | n8n | :: | - |
| `N8N_RUNNERS_ENABLED` | n8n | true | - |
| `N8N_TEMPLATES_ENABLED` | n8n | false | - |
| `DB_POSTGRESDB_DATABASE` | n8n | n8n | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | - |
| `N8N_PERSONALIZATION_ENABLED` | n8n | false | - |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | n8n | true | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n | default | - |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | n8n | false | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/storage`
- **Healthcheck:** `/healthz/readiness`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/insightslm)
