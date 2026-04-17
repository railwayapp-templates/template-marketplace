# Deploy Keycloak Identity Management | Open-Source Alternative to Auth0 on Railway

Self Host Keycloak: SSO, MFA, LDAP federation, OIDC on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keycloak)

## About

Deploy Keycloak on Railway to get a production-ready identity and access management server in minutes. Self-host Keycloak with a pre-configured PostgreSQL database, reverse proxy support, and health monitoring — no Dockerfile or manual infrastructure setup required.

Self Host Keycloak and get two services: **Keycloak** (via `quay.io/keycloak/keycloak:latest`) running in production mode, and a **PostgreSQL** database for persistent storage of realms, users, sessions, and credentials.

Keycloak is an open-source identity and access management (IAM) solution originally developed by Red Hat and now a CNCF incubating project. It solves the problem of implementing authentication and authorization across multiple applications — instead of building login flows, session management, and user directories from scratch for every app, Keycloak provides a centralized identity layer.

Key features:

- **Single Sign-On (SSO)** — users authenticate once and access all connected applications
- **Identity brokering** — delegate login to external providers (Google, GitHub, SAML IdPs, LDAP/Active Directory)
- **Fine-grained authorization** — role-based (RBAC) and attribute-based access control policies
- **Multi-factor authentication** — TOTP, WebAuthn/FIDO2 built in
- **Standards-based** — OpenID Connect, OAuth 2.0, SAML 2.0
- **Admin console** — web UI for managing realms, users, clients, and policies
- **Account console** — self-service portal for users to manage their profile, sessions, and credentials

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Keycloak | `quay.io/keycloak/keycloak:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Keycloak | 8080 | Railway routing port |
| `KC_DB` | Keycloak | postgres | Database vendor selection |
| `KC_DB_URL` | Keycloak | - | JDBC connection string |
| `KC_DB_PASSWORD` | Keycloak | (secret) | Database password |
| `KC_DB_USERNAME` | Keycloak | (secret) | Database username |
| `KC_HTTP_ENABLED` | Keycloak | true | Enable HTTP listener |
| `KC_PROXY_HEADERS` | Keycloak | xforwarded | Trust reverse proxy headers |
| `KC_HEALTH_ENABLED` | Keycloak | true | Expose health check endpoints |
| `KC_HOSTNAME_STRICT` | Keycloak | false | Dynamic hostname from headers |
| `KC_METRICS_ENABLED` | Keycloak | true | Expose metrics endpoint |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | Keycloak | (secret) | Initial admin password (bootstrap only) |
| `KC_BOOTSTRAP_ADMIN_USERNAME` | Keycloak | (secret) | Initial admin username |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Start command:** `/opt/keycloak/bin/kc.sh start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/keycloak)
