# Deploy Kortix + Supabase on Railway

AI agent platform with cloud sandboxes and a self-hosted Supabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kortix-supabase)

## About

Kortix (formerly Suna) is an open-source platform for AI agents that do real work. Agents run in cloud
sandboxes where they browse, write and run code, and edit files; you organise them into projects with
skills, scheduled triggers and connectors, share them with your team, and bring your own model keys. This
is a community-maintained template; it is not affiliated with Kortix.

Kortix is a Bun API, a Next.js web app and an LLM gateway on top of Supabase. Upstream self-hosts it with
its own CLI on a VPS you manage, alongside the official Supabase distribution under Docker Compose. This
template runs the same stack on Railway, in one project: a self-hosted Supabase (Postgres, Auth,
PostgREST, Storage and the Kong gateway), the Kortix API, its LLM gateway and the web app, eight services
in all, with no Supabase account and no server to maintain.

The first start does what upstream's CLI does for you. It waits for Supabase's services, applies Kortix's
migrations with upstream's own runner, creates your owner account with platform-admin rights from the
e-mail you enter, and only then starts the API.

It also closes two things a public deployment leaves open. A fresh Kortix install is claimed by whoever
calls its setup endpoint first; here the owner exists before the API listens. And Kortix's signup switch
is checked in the web app while Supabase Auth underneath accepts signups posted to it directly; here
Kortix's own policy (closed by default, with invitations and an allowlist) is enforced in the database for
every new user.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kong | `ghcr.io/youssefsiam38/kortix-railway-kong:1.0.0` | Web service |
| auth | `supabase/gotrue:v2.196.0` | Database |
| api | `ghcr.io/youssefsiam38/kortix-railway-api:1.0.0` | Web service |
| gateway | `kortix/kortix-gateway:0.13.19` | Worker |
| frontend | `ghcr.io/youssefsiam38/kortix-railway-frontend:1.0.0` | Web service |
| storage | `ghcr.io/youssefsiam38/kortix-railway-storage:1.0.0` | Database |
| rest | `postgrest/postgrest:v14.17` | Database |
| db | `ghcr.io/youssefsiam38/kortix-railway-db:1.0.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | kong | 8000 | - |
| `JWT_SECRET` | kong | (secret) | - |
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
| `PORT` | api | 8008 | - |
| `EMAIL_URL` | api | - | Optional e-mail transport for invitations, e.g. smtp://user:pass@smtp.example.com:587. |
| `JWT_SECRET` | api | (secret) | - |
| `E2B_API_KEY` | api | (secret) | E2B API key, if you add e2b to ALLOWED_SANDBOX_PROVIDERS. |
| `OWNER_EMAIL` | api | - | Your e-mail address. It becomes the owner account and platform admin you sign in with. |
| `API_KEY_SECRET` | api | (secret) | Kortix hashes its API keys with this, generated. Never change it on a running install. |
| `DAYTONA_TARGET` | api | us | - |
| `OWNER_PASSWORD` | api | (secret) | The owner's first password, generated. Copy it from here to sign in. |
| `DAYTONA_API_KEY` | api | (secret) | Daytona API key. Agent sessions run in Daytona sandboxes and cannot start without a sandbox provider key. |
| `PLATINUM_API_KEY` | api | (secret) | Platinum API key, if you add platinum to ALLOWED_SANDBOX_PROVIDERS. |
| `DAYTONA_SERVER_URL` | api | https://app.daytona.io/api | - |
| `KORTIX_SIGNUP_MODE` | api | invite-only | invite-only admits only invited or allowlisted addresses; open lets anyone sign up and get an account of their own. |
| `OPENROUTER_API_KEY` | api | (secret) | Optional instance-wide OpenRouter key for Kortix's managed model route. Without it, accounts use the model keys they connect in the app. |
| `LLM_GATEWAY_ENABLED` | api | true | - |
| `TUNNEL_SIGNING_SECRET` | api | (secret) | - |
| `GATEWAY_INTERNAL_TOKEN` | api | (secret) | - |
| `ALLOWED_SANDBOX_PROVIDERS` | api | daytona | Comma-separated sandbox providers agents may use: daytona, e2b, platinum. |
| `PORT` | gateway | 8090 | - |
| `GATEWAY_INTERNAL_TOKEN` | gateway | (secret) | - |
| `PORT` | frontend | 3000 | - |
| `JWT_SECRET` | frontend | (secret) | - |
| `NODE_OPTIONS` | frontend | --max-http-header-size=131072 | - |
| `KORTIX_PUBLIC_AUTH_METHODS` | frontend | password | - |
| `KORTIX_PUBLIC_BILLING_ENABLED` | frontend | false | - |
| `KORTIX_PUBLIC_CONNECTORS_ENABLED` | frontend | false | - |
| `KORTIX_PUBLIC_DISABLE_LANDING_PAGE` | frontend | true | - |
| `KORTIX_PUBLIC_RESTRICT_ACCOUNT_CREATION` | frontend | true | - |
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
| `POSTGRES_PASSWORD` | db | (secret) | Password of every Supabase database role, generated. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/v1/health`
- **Healthcheck:** `/auth`
- **Volume:** `/var/lib/storage`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/kortix-supabase)
