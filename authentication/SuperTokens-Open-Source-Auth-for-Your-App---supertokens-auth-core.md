# Deploy SuperTokens — Open Source Auth for Your App on Railway

Self-host SuperTokens — email, social & passwordless auth SDK

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supertokens-auth-core)

## About

SuperTokens is an open-source authentication service for developers — a self-hosted alternative to Auth0, AWS Cognito, and Okta that adds email/password, social, and passwordless login to your own app via an SDK. Run the Core, integrate a backend SDK, and your app gains sign-up, sign-in, and session management without building auth from scratch or paying per active user. This template deploys the Core wired to PostgreSQL, with the connection-string detail that trips most deployments handled correctly.

---

SuperTokens is straightforward to run once one specific detail is right, and understanding its model helps you use it well.

**The database URI must use the `postgresql://` scheme — this is the #1 failure.** SuperTokens Core requires the connection string to start with `postgresql://`. If it starts with `postgres://` — which is exactly what Railway's default Postgres reference variables often produce — the Core fails to start with an error. This template forces the correct `postgresql://` scheme so the Core boots cleanly against Railway's managed Postgres. It's a small detail that causes a lot of failed first deploys, and it's handled here.

**SuperTokens is a backend service you integrate, not a standalone login portal.** Unlike a full identity-provider UI, it gives you a Core plus an SDK for your language. Install the backend SDK (`supertokens-node`, `supertokens-python[fastapi]`, or Go), call `supertokens.init()` with your Railway domain as the `connectionURI` and the generated API key, and your app gains `/auth/signup`, `/auth/signin`, `/auth/signout`, and session-refresh endpoints automatically. It's built for developers adding auth directly into their own application.

**The API key secures the Core.** `API_KEYS` is the credential your backend uses to talk to the Core — generated on deploy, used as the `apiKey` in your SDK config. Verify the Core is healthy any time by hitting `/hello`, which returns `Hello` when the database connection works.

**Postgres only, and the Core is light.** As of release 11.0.0, SuperTokens dropped MySQL and MongoDB — PostgreSQL 13+ is the supported database, which Railway's managed Postgres satisfies. The Core itself is a single lightweight Java process; most resource use is in Postgres.

Typical cost: **~$5–10/month** on Railway for the Core and Postgres. SuperTokens core features are open source and free; some enterprise features require a license key.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SuperTokens | `supertokens/supertokens-postgresql` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_KEYS` | SuperTokens | (secret) | - |
| `SUPERTOKENS_HOST` | SuperTokens | (secret) | - |
| `SUPERTOKENS_PORT` | SuperTokens | (secret) | - |
| `DISABLE_TELEMETRY` | SuperTokens | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/supertokens-auth-core)
