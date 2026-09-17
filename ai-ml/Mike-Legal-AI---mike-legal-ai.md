# Deploy Mike Legal AI on Railway

Open-source legal AI for document review and drafting, fully self-hosted

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mike-legal-ai)

## About

Mike (MikeOSS) is an open-source legal AI platform. Lawyers chat with contracts and filings, review
documents and apply suggested edits, run drafting and tabular-review workflows across many documents,
verify citations and research US case law, and organise matters into projects, folders and a shared
library. It works with Anthropic, OpenAI, Gemini, routers or a local Ollama model. This is a
community-maintained template; it is not affiliated with the Mike project.

Mike is a Next.js web app and an Express API on Supabase Auth and Postgres, with S3-compatible storage for
documents, Redis for its job queues and LibreOffice for document conversion. Upstream's Docker Compose
stack runs all of it on one machine with demo credentials and open registration.

This template runs the same stack on Railway, in one project, eight services with every secret generated:
a self-hosted Supabase (Postgres, Auth, PostgREST and its gateway), RustFS object storage, Valkey, and
Mike's API and web app, built from a pinned upstream commit. No Supabase account and no external bucket.

The first start does upstream's one-shot steps for you: it builds the database from upstream's schema (or
applies only the new migrations on an existing install), creates your owner account from the e-mail you
enter, creates the storage bucket with an upload policy for your web app's origin, imports Mike's workflow
catalogue, and only then starts the API. Signup is closed by default and enforced in the database: only
the owner, the addresses or domains you list, and colleagues invited to your organisations get accounts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | `ghcr.io/youssefsiam38/mike-railway-backend:1.0.0` | Worker |
| redis | `valkey/valkey:8.1.10-alpine` | Database |
| auth | `supabase/gotrue:v2.196.0` | Database |
| storage | `ghcr.io/youssefsiam38/mike-railway-storage:1.0.0` | Web service |
| frontend | `ghcr.io/youssefsiam38/mike-railway-frontend:1.0.0` | Web service |
| db | `ghcr.io/youssefsiam38/mike-railway-db:1.0.0` | Database |
| kong | `ghcr.io/youssefsiam38/mike-railway-kong:1.0.0` | Worker |
| rest | `postgrest/postgrest:v14.17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | backend | 3001 | - |
| `JWT_SECRET` | backend | (secret) | - |
| `OWNER_NAME` | backend | - | The owner's display name. |
| `OWNER_EMAIL` | backend | - | Your e-mail address. It becomes the owner account you sign in with. |
| `GEMINI_API_KEY` | backend | (secret) | Google Gemini API key for all users. |
| `OPENAI_API_KEY` | backend | (secret) | OpenAI API key for all users. |
| `OWNER_PASSWORD` | backend | (secret) | The owner's first password, generated. Copy it from here to sign in, then change it in Settings. |
| `R2_BUCKET_NAME` | backend | mike | - |
| `MIKE_SIGNUP_MODE` | backend | closed | closed admits only the owner, MIKE_ALLOWED_SIGNUPS and invited colleagues; open lets anyone sign up. |
| `ANTHROPIC_API_KEY` | backend | (secret) | Anthropic API key for all users. Users can also add their own in Settings. |
| `MIKE_WORKFLOWS_REF` | backend | ce62e6a2d3f47e1d3567a4f2edc61898cfe9e78a | Commit of Open-Legal-Products/mike-workflows imported on start. |
| `OPENROUTER_API_KEY` | backend | (secret) | OpenRouter key for all users. |
| `MIKE_ALLOWED_SIGNUPS` | backend | - | Comma-separated e-mail addresses and @domain entries that may create accounts. |
| `R2_SECRET_ACCESS_KEY` | backend | (secret) | - |
| `COURTLISTENER_API_TOKEN` | backend | (secret) | CourtListener token for higher-rate US case-law lookups. |
| `DOWNLOAD_SIGNING_SECRET` | backend | (secret) | - |
| `USER_API_KEYS_ENCRYPTION_SECRET` | backend | (secret) | Encrypts the model keys users save, generated. Never change it on a running install. |
| `REDIS_PASSWORD` | redis | (secret) | Valkey password, generated. |
| `PORT` | auth | 9999 | - |
| `JWT_SECRET` | auth | (secret) | Signs sessions and the Supabase API keys, generated. |
| `GOTRUE_JWT_AUD` | auth | authenticated | - |
| `GOTRUE_JWT_EXP` | auth | 3600 | - |
| `GOTRUE_API_HOST` | auth | :: | - |
| `GOTRUE_API_PORT` | auth | 9999 | - |
| `GOTRUE_DB_DRIVER` | auth | postgres | - |
| `GOTRUE_SMTP_HOST` | auth | - | SMTP host for account e-mails (also give kong a public domain; see the README). |
| `GOTRUE_SMTP_PASS` | auth | - | SMTP password. |
| `GOTRUE_SMTP_PORT` | auth | - | SMTP port. |
| `GOTRUE_SMTP_USER` | auth | (secret) | SMTP user. |
| `GOTRUE_JWT_SECRET` | auth | (secret) | - |
| `GOTRUE_DISABLE_SIGNUP` | auth | false | - |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | - |
| `GOTRUE_SMTP_ADMIN_EMAIL` | auth | - | Sender address for account e-mails. |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | - |
| `GOTRUE_PASSWORD_MIN_LENGTH` | auth | (secret) | - |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | - |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | - |
| `GOTRUE_MAILER_URLPATHS_INVITE` | auth | /auth/v1/verify | - |
| `GOTRUE_MAILER_URLPATHS_RECOVERY` | auth | /auth/v1/verify | - |
| `GOTRUE_MAILER_URLPATHS_CONFIRMATION` | auth | /auth/v1/verify | - |
| `GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE` | auth | /auth/v1/verify | - |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | auth | false | - |
| `PORT` | storage | 9000 | - |
| `RUSTFS_ACCESS_KEY` | storage | - | S3 access key for the document store, generated. |
| `RUSTFS_SECRET_KEY` | storage | (secret) | S3 secret key for the document store, generated. |
| `PORT` | frontend | 3000 | - |
| `POSTGRES_PASSWORD` | db | (secret) | Password of the Supabase database roles, generated. |
| `PORT` | kong | 8000 | - |
| `JWT_SECRET` | kong | (secret) | - |
| `PGRST_DB_SCHEMAS` | rest | public | - |
| `PGRST_JWT_SECRET` | rest | (secret) | - |
| `PGRST_SERVER_HOST` | rest | *6 | - |
| `PGRST_SERVER_PORT` | rest | 3000 | - |
| `PGRST_DB_ANON_ROLE` | rest | anon | - |
| `PGRST_DB_USE_LEGACY_GUCS` | rest | false | - |

## Configuration

- **Healthcheck:** `/health`
- **Start command:** `sh -c 'exec valkey-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind :: 0.0.0.0'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/login`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mike-legal-ai)
