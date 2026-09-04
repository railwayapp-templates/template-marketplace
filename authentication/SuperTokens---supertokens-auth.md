# Deploy SuperTokens on Railway

Authentication server for user accounts, logins and sessions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supertokens-auth)

## About

Deploy SuperTokens to run your own authentication server instead of renting one. It is an open-source auth core covering email/password and passwordless sign-in, social and enterprise login, sessions with rotating refresh tokens, MFA, roles and multi-tenancy. Your backend keeps its own database and calls the core over HTTP through a first-party SDK, so users, credentials and sessions live on infrastructure you control rather than in an Auth0 or Cognito tenant. Teams self-host SuperTokens when per-monthly-active-user pricing stops making sense, or when data residency rules out a hosted tenant.

This template is a complete self-host SuperTokens setup in one deploy. Three services come up together: `supertokens` is the core, on port 3567 with an API key already generated; `Postgres` is the managed database holding every user, session, role and tenant; and `dashboard` runs SuperTokens' own user management UI, normally available only to teams who wire the SDK into an app themselves. The dashboard reaches the core privately, the core reaches Postgres privately, and both public URLs are HTTPS from the first request.

![SuperTokens core, dashboard and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788471294/supertokens-architecture.png)

SuperTokens splits authentication into three pieces: a stateless core, a backend SDK you import into your API, and an optional frontend SDK that renders pre-built login UI. Only the core needs hosting; it owns its Postgres schema and migrates it forward on boot.

Key features:

- Email/password, passwordless (magic link or OTP), social login and enterprise SSO
- Sessions with rotating refresh tokens and token-theft detection
- Multi-factor auth including TOTP, and account linking across login methods
- Roles and permissions, user metadata, and multi-tenancy with per-tenant config
- Pre-built React/Vue/Angular login UI, or headless APIs; SDKs for Node, Python, Go, PHP and Java

The `supertokens` service answers a JSON API and nothing else — no HTML, no admin screens. `Postgres` is the only stateful component. `dashboard` exists because SuperTokens ships its admin UI as a module of the backend SDK, so a self-hosted core has no browser surface until a backend mounts it. This one does that and nothing more: every public end-user route on it is off.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| supertokens | `supertokens/supertokens-postgresql:latest` | Database |
| dashboard | [gridalpha/supertokens-railway](https://github.com/gridalpha/supertokens-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | supertokens | 3567 | Port Railway health-checks |
| `API_KEYS` | supertokens | (secret) | Required on every core route but /hello |
| `LOG_LEVEL` | supertokens | INFO | DEBUG floods the log stream |
| `SUPERTOKENS_PORT` | supertokens | (secret) | Core HTTP listening port |
| `DISABLE_TELEMETRY` | supertokens | true | No anonymous usage reporting |
| `MAX_SERVER_POOL_SIZE` | supertokens | 20 | HTTP worker threads |
| `POSTGRESQL_CONNECTION_URI` | supertokens | - | Postgres connection string |
| `BULK_MIGRATION_PARALLELISM` | supertokens | 4 | Default reads the host core count |
| `POSTGRESQL_CONNECTION_POOL_SIZE` | supertokens | 15 | Max database connections |
| `POSTGRESQL_IDLE_CONNECTION_TIMEOUT` | supertokens | 60000 | Idle connection timeout, ms |
| `POSTGRESQL_MINIMUM_IDLE_CONNECTIONS` | supertokens | 3 | Warm pool floor |
| `PORT` | dashboard | 3000 | HTTP listening port |
| `APP_NAME` | dashboard | SuperTokens on Railway | Shown in the dashboard |
| `NODE_OPTIONS` | dashboard | --max-old-space-size=512 | Node sizes its heap from host RAM |
| `SUPERTOKENS_API_KEY` | dashboard | (secret) | Must match the core key |
| `DASHBOARD_ADMIN_EMAIL` | dashboard | admin@example.com | First dashboard user, seeded at boot |
| `SUPERTOKENS_PUBLIC_URI` | dashboard | (secret) | Fallback when private fails |
| `DASHBOARD_ADMIN_PASSWORD` | dashboard | (secret) | Password for that user |
| `SUPERTOKENS_CONNECTION_URI` | dashboard | (secret) | Core over private network |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/hello`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`

**Category:** Authentication · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/supertokens-auth)
