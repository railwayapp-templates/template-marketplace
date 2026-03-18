# Deploy SuperTokens | Open Source Auth0, AWS Cognito, Okta Alternative on Railway

Self Host SuperTokens. Email, Social & Passwordless Authentication

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/supertokens)

## About

Self-host SuperTokens on Railway — the open-source alternative to Auth0, Firebase Auth, and AWS Cognito that gives you production-grade authentication with zero vendor lock-in and no per-user fees. SuperTokens handles email/password login, social OAuth, passwordless magic links, session management, and MFA, all through a lightweight HTTP microservice that your backend SDK calls directly.

This Railway template deploys the full SuperTokens stack in one click: the SuperTokens Core service (`https://hub.docker.com/r/supertokens/supertokens-postgresql`) pre-wired to a Railway-managed PostgreSQL database over private networking. Your API key is auto-generated on deploy — no manual secret setup required.

SuperTokens is an open-source authentication platform built around a stateless HTTP core microservice. Unlike Auth0 or Cognito, your backend sits between your frontend and SuperTokens — this architecture lets you customize every auth flow in your own language and framework without writing Java or navigating an admin console.

Key features:
- Email/password, social login (Google, GitHub, Apple, etc.), and passwordless (magic links / OTP) out of the box
- Secure session management with rotating refresh tokens and built-in anti-CSRF and anti-session-fixation protection
- Pre-built frontend UI components for React, with headless support for Vue, Angular, and mobile
- Backend SDKs for Node.js, Python, and Go
- Multi-tenancy and MFA available via paid add-ons or license keys
- User management dashboard at `/auth/dashboard`
- SOC 2 and GDPR certified

On Railway, SuperTokens Core communicates with PostgreSQL over Railway's private network — no traffic leaves Railway's internal infrastructure between the two services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SuperTokens | `supertokens/supertokens-postgresql` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_KEYS` | SuperTokens | (secret) | API keys for service authentication |
| `SUPERTOKENS_HOST` | SuperTokens | (secret) | Bind server to all interfaces |
| `SUPERTOKENS_PORT` | SuperTokens | (secret) | Supertokens API server port |
| `DISABLE_TELEMETRY` | SuperTokens | true | Disable anonymous usage telemetry |
| `POSTGRESQL_CONNECTION_URI` | SuperTokens | - | Postgres database connection string |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/template/supertokens)
