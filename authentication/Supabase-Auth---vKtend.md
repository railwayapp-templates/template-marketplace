# Deploy Supabase Auth on Railway

Authentication and User Management by Supabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vKtend)

## About

Auth is a user management and authentication server written in Go that powers Supabase's features such as:

- Issuing JWTs
- Row Level Security with PostgREST
- User management
- Sign in with email, password, magic link, phone number
Sign in with external providers (Google, Apple, Facebook, Discord, ...)

It is originally based on the excellent GoTrue codebase by Netlify, however both have diverged significantly in features and capabilities.

See https://github.com/supabase/auth for a full list of environment variables and the different endpoints of the Auth service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Supabase Auth | `supabase/auth:v2.166.0` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Supabase Auth | 9999 | - |
| `DB_NAMESPACE` | Supabase Auth | public | - |
| `GOTRUE_JWT_AUD` | Supabase Auth | authenticated | - |
| `GOTRUE_JWT_EXP` | Supabase Auth | 3600 | - |
| `GOTRUE_API_HOST` | Supabase Auth | 0.0.0.0 | - |
| `GOTRUE_SITE_URL` | Supabase Auth | - | The base URL your site is located at. Currently used in combination with other settings to construct URLs used in emails. Any URI that shares a host with SITE_URL is a permitted value for redirect_to params (see /authorize etc.). |
| `API_EXTERNAL_URL` | Supabase Auth | http://localhost:9999 | - |
| `GOTRUE_DB_DRIVER` | Supabase Auth | postgres | - |
| `GOTRUE_LOG_LEVEL` | Supabase Auth | debug | - |
| `GOTRUE_SMTP_PORT` | Supabase Auth | 25 | - |
| `GOTRUE_SMTP_USER` | Supabase Auth | (secret) | - |
| `GOTRUE_JWT_SECRET` | Supabase Auth | (secret) | - |
| `GOTRUE_SAML_ENABLED` | Supabase Auth | false | - |
| `GOTRUE_DISABLE_SIGNUP` | Supabase Auth | false | - |
| `GOTRUE_OPERATOR_TOKEN` | Supabase Auth | (secret) | - |
| `GOTRUE_JWT_ADMIN_ROLES` | Supabase Auth | supabase_admin,service_role | - |
| `GOTRUE_MAILER_AUTOCONFIRM` | Supabase Auth | false | - |
| `GOTRUE_MAX_VERIFIED_FACTORS` | Supabase Auth | 10 | - |
| `GOTRUE_RATE_LIMIT_EMAIL_SENT` | Supabase Auth | 5 | - |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | Supabase Auth | true | - |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | Supabase Auth | false | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | Supabase Auth | authenticated | - |
| `GOTRUE_MAILER_SUBJECTS_INVITE` | Supabase Auth | You have been invited | - |
| `GOTRUE_MAILER_SUBJECTS_RECOVERY` | Supabase Auth | Reset Your Password | - |
| `GOTRUE_SECURITY_CAPTCHA_ENABLED` | Supabase Auth | false | - |
| `GOTRUE_MAILER_SUBJECTS_MAGIC_LINK` | Supabase Auth | Your Magic Link | - |
| `GOTRUE_MAILER_SUBJECTS_CONFIRMATION` | Supabase Auth | Confirm Your Email | - |
| `GOTRUE_MAILER_SUBJECTS_EMAIL_CHANGE` | Supabase Auth | Confirm Email Change | - |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | Supabase Auth | false | - |
| `GOTRUE_SECURITY_REFRESH_TOKEN_ROTATION_ENABLED` | Supabase Auth | (secret) | - |
| `GOTRUE_SECURITY_UPDATE_PASSWORD_REQUIRE_REAUTHENTICATION` | Supabase Auth | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/vKtend)
