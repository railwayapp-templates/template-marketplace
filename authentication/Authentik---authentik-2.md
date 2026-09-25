# Deploy Authentik on Railway

authentik 2026.8: identity provider with SSO, OIDC, SAML, LDAP and MFA.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/authentik-2)

## About

authentik is an open-source identity provider for single sign-on. It supports OAuth2 and OpenID Connect, SAML, LDAP, RADIUS and SCIM, proxy authentication for apps without login, MFA with TOTP, WebAuthn and passkeys, and customizable login flows. It is a self-hosted alternative to Okta, Auth0 and Keycloak.

This template runs the official `authentik/server:2026.8.3` image as a server and a worker with Railway Postgres; current authentik versions no longer need Redis. The admin `akadmin` is bootstrapped from `AUTHENTIK_BOOTSTRAP_EMAIL`, a generated password and a generated API token, so the initial-setup flow is locked. Default login flows appear about a minute after the first boot, once the worker applies its blueprints. Uploaded media such as icons live on a Railway volume on the server. Both services together need about 1 GB of RAM, so the Hobby plan works for small setups. Add your own domain to use it for production SSO.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | `authentik/server:2026.8.3` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| authentik | `authentik/server:2026.8.3` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `AUTHENTIK_SECRET_KEY` | worker | (secret) |
| `AUTHENTIK_BOOTSTRAP_TOKEN` | worker | (secret) |
| `AUTHENTIK_POSTGRESQL__USER` | worker | (secret) |
| `AUTHENTIK_BOOTSTRAP_PASSWORD` | worker | (secret) |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | worker | (secret) |
| `AUTHENTIK_ERROR_REPORTING__ENABLED` | worker | false |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | authentik | 9000 |
| `AUTHENTIK_SECRET_KEY` | authentik | (secret) |
| `AUTHENTIK_BOOTSTRAP_EMAIL` | authentik | admin@example.com |
| `AUTHENTIK_BOOTSTRAP_TOKEN` | authentik | (secret) |
| `AUTHENTIK_POSTGRESQL__USER` | authentik | (secret) |
| `AUTHENTIK_BOOTSTRAP_PASSWORD` | authentik | (secret) |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | authentik | (secret) |
| `AUTHENTIK_ERROR_REPORTING__ENABLED` | authentik | false |

## Configuration

- **Start command:** `dumb-init -- ak worker`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `dumb-init -- ak server`
- **Healthcheck:** `/api/v3/root/config/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/authentik-2)
