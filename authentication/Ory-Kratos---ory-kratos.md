# Deploy Ory Kratos on Railway

Ory Kratos 26.2: headless identity and user management API on Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ory-kratos)

## About

Ory Kratos is an open-source identity and user management server. It provides registration, login, sessions, profile settings and account recovery through an API, and leaves the user interface to you. Apps, single-page apps and mobile clients call its flows directly, so you own the login experience without writing password handling.

This template runs the official `oryd/kratos:v26.2.0` image with a Railway Postgres database. A pre-deploy step runs the SQL migrations and retries until the database is reachable. The public API is on an HTTPS domain, and the admin API stays on the private network, because it has no authentication of its own. Identities use an email and password schema, and a session starts right after registration. Railway blocks outgoing SMTP, so email verification and account recovery are switched off; enable them once you configure a courier. All settings come from environment variables, with the identity schema embedded as base64.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| kratos | `oryd/kratos:v26.2.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | kratos | 4433 |
| `LOG_LEVEL` | kratos | info |
| `SQA_OPT_OUT` | kratos | true |
| `SECRETS_CIPHER_0` | kratos | (secret) |
| `SECRETS_COOKIE_0` | kratos | (secret) |
| `SERVE_ADMIN_HOST` | kratos | [::] |
| `SECRETS_DEFAULT_0` | kratos | (secret) |
| `SERVE_PUBLIC_HOST` | kratos | [::] |
| `IDENTITY_SCHEMAS_0_ID` | kratos | default |
| `IDENTITY_SCHEMAS_0_URL` | kratos | base64://eyIkaWQiOiJodHRwczovL3NjaGVtYXMub3J5LnNoL3ByZXNldHMva3JhdG9zL2lkZW50aXR5LmVtYWlsLnNjaGVtYS5qc29uIiwiJHNjaGVtYSI6Imh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hIyIsInRpdGxlIjoiUGVyc29uIiwidHlwZSI6Im9iamVjdCIsInByb3BlcnRpZXMiOnsidHJhaXRzIjp7InR5cGUiOiJvYmplY3QiLCJwcm9wZXJ0aWVzIjp7ImVtYWlsIjp7InR5cGUiOiJzdHJpbmciLCJmb3JtYXQiOiJlbWFpbCIsInRpdGxlIjoiRS1NYWlsIiwibWF4TGVuZ3RoIjozMjAsIm9yeS5zaC9rcmF0b3MiOnsiY3JlZGVudGlhbHMiOnsicGFzc3dvcmQiOnsiaWRlbnRpZmllciI6dHJ1ZX19LCJyZWNvdmVyeSI6eyJ2aWEiOiJlbWFpbCJ9LCJ2ZXJpZmljYXRpb24iOnsidmlhIjoiZW1haWwifX19LCJuYW1lIjp7InR5cGUiOiJzdHJpbmciLCJ0aXRsZSI6Ik5hbWUiLCJtYXhMZW5ndGgiOjIwMH19LCJyZXF1aXJlZCI6WyJlbWFpbCJdLCJhZGRpdGlvbmFsUHJvcGVydGllcyI6ZmFsc2V9fX0K |
| `IDENTITY_DEFAULT_SCHEMA_ID` | kratos | default |
| `SELFSERVICE_FLOWS_RECOVERY_ENABLED` | kratos | false |
| `SELFSERVICE_METHODS_PASSWORD_ENABLED` | kratos | (secret) |
| `SELFSERVICE_FLOWS_VERIFICATION_ENABLED` | kratos | false |
| `SELFSERVICE_FLOWS_REGISTRATION_AFTER_PASSWORD_HOOKS_0_HOOK` | kratos | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/ory-kratos)
