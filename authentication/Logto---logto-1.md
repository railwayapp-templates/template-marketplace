# Deploy Logto on Railway

Logto — open-source auth for SaaS. OIDC, OAuth 2.1, SSO, RBAC.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/logto-1)

## About

Logto is the modern, open-source auth infrastructure for SaaS and AI apps. It takes the pain out of OIDC and OAuth 2.1 and makes it easy to build secure, production-ready auth with multi-tenancy, enterprise SSO, and RBAC.

This template deploys Logto with a PostgreSQL database on Railway. The Logto service runs both the Core API (port 3001) and Admin Console (port 3002) from a single process.

### Features

- **Authentication & Authorization** — OIDC, OAuth 2.1, SAML support
- **Multi-tenancy** — Built-in organization and tenant management
- **Enterprise SSO** — Connect with Azure AD, Okta, Google, and more
- **RBAC** — Role-based access control with fine-grained permissions
- **Admin Console** — Built-in admin UI for user and configuration management
- **30+ SDKs** — React, Next.js, Angular, Vue, Flutter, Go, Python, and more

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Logto Admin | `svhd/logto:latest` | Web service |
| Postgres | `postgres:17-alpine` | Database |
| Logto Core | `svhd/logto:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_URL` | Logto Admin | postgresql://postgres:postgres@postgres.railway.internal:5432/logto | PostgreSQL connection string for Logto Admin. Points at the sibling Postgres service (POSTGRES_DB=logto). Password must match POSTGRES_PASSWORD on the Postgres service. |
| `ENDPOINT` | Logto Admin | - | Public URL for the Logto core API (e.g. https://logto-auth.up.railway.app). Auto-detected from Railway domain  |
| `ADMIN_PORT` | Logto Admin | 3002 | Port for the Logto Admin Console. Logto starts the admin console on this port when ADMIN_PORT is set. |
| `ADMIN_ENDPOINT` | Logto Admin | - | Public URL for this Admin Console service. Auto-detected from Railway domain |
| `TRUST_PROXY_HEADER` | Logto Admin | 1 | Set to '1' when behind HTTPS proxy (default on Railway). |
| `POSTGRES_DB` | Postgres | logto | Initial database created on first boot. Must match the database name in Logto's DB_URL. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name. Logto connects with these credentials. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres password. Default literal 'postgres' so a fresh template deploy authenticates out of the box. Rotate this in the dashboard AND update the Logto DB_URL to match before production. |
| `PORT` | Logto Core | 3001 | Port for the Logto core API. |
| `DB_URL` | Logto Core | postgresql://postgres:postgres@postgres.railway.internal:5432/logto | PostgreSQL connection string for Logto. Points at the sibling Postgres service (POSTGRES_DB=logto). Password must match POSTGRES_PASSWORD on the Postgres service. |
| `ENDPOINT` | Logto Core | - | Public URL for the Logto core API (e.g. https://logto-auth.up.railway.app). Auto-detected from Railway domain. |
| `ADMIN_ENDPOINT` | Logto Core | - | Public URL for the Admin Console service (e.g. https://logto-admin.up.railway.app). Required for admin console to load correctly. |
| `TRUST_PROXY_HEADER` | Logto Core | 1 | Set to '1' when behind HTTPS proxy (default on Railway). |
| `ADMIN_DISABLE_LOCALHOST` | Logto Core | 1 | Set to '1' to disable localhost-only admin access (required when Admin Console is on a separate public domain). |

## Configuration

- **Start command:** `sh -c "npm run cli db seed -- --swe; npm run alteration deploy latest; npm start"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/logto-1)
