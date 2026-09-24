# Deploy SuperTokens on Railway

Self-hosted SuperTokens 12.2 auth core with Postgres, private API key.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supertokens-1)

## About

SuperTokens is an open-source authentication platform and a self-hosted alternative to Auth0, Firebase Auth and Cognito. It provides email/password, passwordless, social login, passkeys, multi-factor authentication and session management. Your backend talks to the SuperTokens core through official SDKs for Node.js, Python and Go, while frontend SDKs handle login screens.

This template deploys the SuperTokens core, pinned to v12.2.0, alongside a Railway Postgres database that stores users, sessions and signing keys. The core has no public domain. It listens on Railway's private network, and every request must carry the API key generated at deploy time. Database tables are created automatically on first start. Nothing is stored on disk, and memory use is modest, so the Hobby plan is enough. Your backend service (on Railway) connects using the `SUPERTOKENS_CONNECTION_URI` and `API_KEYS` variables. Login screens and the user management dashboard are served by the SuperTokens SDK inside your own backend and frontend.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| supertokens | `supertokens/supertokens-postgresql:12.2.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | supertokens | 3567 |
| `API_KEYS` | supertokens | (secret) |
| `SUPERTOKENS_PORT` | supertokens | (secret) |
| `SUPERTOKENS_CONNECTION_URI` | supertokens | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `docker-entrypoint.sh supertokens start --host=::`
- **Healthcheck:** `/hello`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/supertokens-1)
