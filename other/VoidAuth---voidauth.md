# Deploy VoidAuth on Railway

Self-hosted SSO and OpenID Connect with passkeys, MFA and Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/voidauth)

## About

VoidAuth is an open-source identity provider for self-hosted applications, with OpenID Connect, users and groups, MFA and passkeys.

This template deploys VoidAuth v1.15.1 with private Postgres 18 and persistent configuration storage. Its compatibility image adds a tested host-only cookie fix to the pinned official image, required for internal OIDC login on Railway subdomains. It generates database and encryption secrets automatically. No external account or email provider is needed to set up the initial administrator.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:18.3` | Database |
| VoidAuth | `ghcr.io/hmseeb/voidauth-railway:1.15.1-r1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | voidauth |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | VoidAuth | 3000 |
| `DB_SSL` | VoidAuth | false |
| `SIGNUP` | VoidAuth | false |
| `DB_PORT` | VoidAuth | 5432 |
| `DB_USER` | VoidAuth | (secret) |
| `APP_PORT` | VoidAuth | 3000 |
| `DB_ADAPTER` | VoidAuth | postgres |
| `DB_PASSWORD` | VoidAuth | (secret) |
| `LDAP_ENABLED` | VoidAuth | false |
| `SESSION_DOMAIN` | VoidAuth | null |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/voidauth)
