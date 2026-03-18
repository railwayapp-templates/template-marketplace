# Deploy SuperTokens on Railway

SuperTokens — User Authentication

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/i1xFfT)

## About

Add secure login and session management to your apps. SDKs available for popular languages and front-end frameworks e.g. Node.js, Go, Python, React.js, React Native, Vanilla JS, etc.

### Three building blocks of SuperTokens architecture

1. **Frontend SDK:** Manages session tokens and renders login UI widgets
2. **Backend SDK:** Provides APIs for sign-up, sign-in, signout, session refreshing, etc. Your Frontend will talk to these APIs
3. **SuperTokens Core:** The HTTP service for the core auth logic and database operations. This service is used by the Backend SDK

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| supertokens-core | `supertokens/supertokens-postgresql` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `POSTGRESQL_CONNECTION_URI` | supertokens-core | - | DB connection URL |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/i1xFfT)
