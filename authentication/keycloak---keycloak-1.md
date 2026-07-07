# Deploy keycloak on Railway

Keycloak — open-source identity and access management with PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keycloak-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/keycloak)

Keycloak is an open-source identity and access management (IAM) solution developed by Red Hat. It provides single sign-on (SSO), social login, OIDC/OAuth 2.0/SAML authentication, and centralized user management — all in a single Docker container on Railway.

Keycloak gives you enterprise-grade authentication without the complexity of managing a dedicated identity infrastructure:

- **Single Sign-On** — authenticate once across all your applications
- **Protocol Support** — OIDC, OAuth 2.0, SAML 2.0, and LDAP integration
- **Social Login** — built-in support for Google, GitHub, Facebook, and more
- **User Federation** — sync users from LDAP/Active Directory
- **Centralized Management** — admin console for users, roles, and permissions
- **Railway-native** — one-click deploy with auto-generated secrets and PostgreSQL companion

Deploying on Railway means automatic HTTPS, zero-config storage via volume mounts, and a PostgreSQL database provisioned alongside Keycloak — no infrastructure setup required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| keycloak | [INAPP-Mobile/keycloak](https://github.com/INAPP-Mobile/keycloak) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the service listens on inside the container |
| `DB_TYPE` | postgres | Database engine: postgres for production, sqlite for local dev |
| `PG_PORT` | 5432 | Port number for PostgreSQL server. Default: 5432 |
| `KC_PROXY` | edge | Proxy mode: edge (Railway), passthrough, or reencrypt |
| `PG_DATABASE` | railway | Name of PostgreSQL database for Keycloak data storage. |
| `PG_HOSTNAME` | localhost | Hostname or IP address of the PostgreSQL server to connect to. |
| `PG_PASSWORD` | (secret) | Password for PostgreSQL user authentication (required). |
| `PG_USERNAME` | (secret) | Pg Username |
| `KC_HTTP_ENABLED` | false | Enable/Disable plaintext HTTP listener (typically false for Railway) |
| `KEYCLOAK_HOSTNAME` | localhost | Public hostname/URL users access Keycloak at (must match Railway domain) |
| `KEYCLOAK_ADMIN_PASSWORD` | (secret) | Initial password for admin user on first Keycloak startup only. |
| `KEYCLOAK_ADMIN_USERNAME` | (secret) | Initial admin username for master realm. Default: admin |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** HTML, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/keycloak-1)
