# Deploy Zitadel on Railway

Zitadel 4.19: identity platform with OIDC, SAML, passkeys and multitenancy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zitadel-2)

## About

Zitadel is an open-source identity and access management platform built for multi-tenancy. It provides OpenID Connect, OAuth2 and SAML, passkeys and MFA, organizations with their own users and branding, service accounts, actions and a full API. It is an alternative to Auth0, Keycloak and Okta.

This template runs the official `ghcr.io/zitadel/zitadel:v4.19.1` image with Railway Postgres; Zitadel keeps all state in the database, so the service has no volume. The first instance, an organization and an admin user are created on first boot from Railway variables with a generated password and masterkey. Zitadel 4 normally uses a separate login container that shares a token file with the API; Railway services cannot share volumes, so this template keeps the built-in login UI. The instance domain is fixed at first boot from the Railway domain. It fits the Hobby plan for small user bases.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zitadel | `ghcr.io/zitadel/zitadel:v4.19.1` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | zitadel | 8080 |
| `ZITADEL_PORT` | zitadel | 8080 |
| `ZITADEL_EXTERNALPORT` | zitadel | 443 |
| `ZITADEL_FIRSTINSTANCE_ORG_NAME` | zitadel | My Organization |
| `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORD` | zitadel | (secret) |
| `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_USERNAME` | zitadel | (secret) |
| `ZITADEL_DEFAULTINSTANCE_FEATURES_LOGINV2_REQUIRED` | zitadel | (secret) |
| `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORDCHANGEREQUIRED` | zitadel | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/app/zitadel start-from-init --masterkeyFromEnv --tlsMode external`
- **Healthcheck:** `/debug/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/zitadel-2)
