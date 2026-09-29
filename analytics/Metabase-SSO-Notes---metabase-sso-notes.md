# Deploy Metabase SSO Notes on Railway

SSO expectations on Metabase OSS vs Pro

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-sso-notes)

## About

Metabase SSO Notes is the part of a deployment nobody brags about until someone gets locked out at 2am. This guide covers what Google, GitHub, LDAP, SAML, and JWT actually do in OSS versus Pro, plus the MB_SITE_URL and redirect URI traps on Railway that turn a ten-minute setup into two hours of debugging.

Every Metabase instance hits the same fork: who logs in, and how much friction sits between a data consumer and a dashboard. The OSS build ships Google OAuth and LDAP out of the box; SAML and most third-party OAuth providers are Pro/Enterprise only. That gap surprises teams expecting one-click GitHub SSO and finding no such button in the admin panel.

Railway makes hosting boring—you run the official metabase/metabase image on port 3000, point it at a companion Postgres service for the app database, and set MB_SITE_URL to your public HTTPS URL. The interesting decisions are all identity: do you start with email/password and layer Google later? Need SAML for Okta or Entra ID? Those answers determine if OSS fits or you're pricing Pro.

A common mistake is treating the Metabase app database as your analytics warehouse. It isn't. The Postgres you attach stores Metabase's own metadata—users, permissions, saved questions, dashboards. Your actual data warehouses get connected after first boot via Admin → Databases. Keep those roles separate and half your deployment problems vanish.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase/metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | metabase/metabase | 3000 | PORT |
| `MB_DB_HOST` | metabase/metabase | - | MB_DB_HOST |
| `MB_DB_PASS` | metabase/metabase | - | MB_DB_PASS |
| `MB_DB_PORT` | metabase/metabase | - | MB_DB_PORT |
| `MB_DB_TYPE` | metabase/metabase | postgres | MB_DB_TYPE |
| `MB_DB_USER` | metabase/metabase | (secret) | MB_DB_USER |
| `MB_SITE_URL` | metabase/metabase | - | MB_SITE_URL |
| `MB_DB_DBNAME` | metabase/metabase | - | MB_DB_DBNAME |
| `MB_PASSWORD_COMPLEXITY` | metabase/metabase | (secret) | MB_PASSWORD_COMPLEXITY |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | metabase/metabase | true | ENABLE_ALPINE_PRIVATE_NETWORKING |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-sso-notes)
