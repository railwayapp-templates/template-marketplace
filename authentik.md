# Deploy Authentik | Open Source Okta, Auth0 Alternative on Railway on Railway

Self Host Authentik - OAuth2, SAML, LDAP, MFA and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/authentik)

## About

Authentik is an open-source Identity Provider (IdP) built for modern self-hosted environments. It centralises authentication across all your apps with support for OAuth2/OIDC, SAML2, LDAP, RADIUS, SCIM, and proxy auth — giving teams SSO, MFA, user lifecycle management, and granular access policies without paying Okta or Auth0 prices. 

Self-host Authentik on Railway with this one-click template and get the full Authentik  stack — server, worker, and PostgreSQL — pre-wired over private networking, with auto-generated secrets and a production-ready configuration from the first deploy.

![Authentik  Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773839693/Authentik_railway_architecture_lwnuzu.png)

Authentik is a full-featured, self-hosted IAM platform written in Python and maintained by Authentik Security Inc., a public benefit company. It runs as two services from the same Docker image (`ghcr.io/goauthentik/server`): the **server** handles the API, SSO flows, and serves the frontend; the **worker** runs background tasks (certificate rotation, event processing, outpost control) via Celery. Both services connect to a shared PostgreSQL database.

Key features:
- **SSO protocols**: OAuth2, OpenID Connect, SAML2, LDAP, RADIUS, SCIM, and proxy/forward auth
- **MFA options**: TOTP, WebAuthn/FIDO2 (YubiKey, passkeys), push notifications, email, SMS
- **Flow engine**: fully customisable login, enrollment, and recovery flows with drag-and-drop stages
- **Policy engine**: access rules based on group membership, IP, time-of-day, and GeoIP/impossible travel detection
- **Application proxy**: add authentication in front of apps that have no native SSO support
- **Remote access**: browser-based RDP, SSH, and VNC without a VPN (free in open source since 2025.2)
- **Audit log**: every authentication event recorded with full metadata
- **Custom branding**: custom CSS, logos, and login page copy per brand/tenant

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Authentik Worker | `ghcr.io/goauthentik/server:2025.10.4` | Worker |
| Authentik Server | `ghcr.io/goauthentik/server:2025.10.4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `AUTHENTIK_SECRET_KEY` | Authentik Worker | (secret) | Core application secret key |
| `AUTHENTIK_BOOTSTRAP_EMAIL` | Authentik Worker | - | Initial admin email for bootstrap |
| `AUTHENTIK_POSTGRESQL__HOST` | Authentik Worker | - | Postgres database host reference |
| `AUTHENTIK_POSTGRESQL__NAME` | Authentik Worker | - | Postgres database name reference |
| `AUTHENTIK_POSTGRESQL__PORT` | Authentik Worker | - | Postgres database port reference |
| `AUTHENTIK_POSTGRESQL__USER` | Authentik Worker | (secret) | Postgres database username reference |
| `AUTHENTIK_BOOTSTRAP_PASSWORD` | Authentik Worker | (secret) | Initial admin password first boot |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | Authentik Worker | (secret) | Postgres database password reference |
| `AUTHENTIK_ERROR_REPORTING__ENABLED` | Authentik Worker | false | Disable error reporting telemetry |
| `PORT` | Authentik Server | 9000 | HTTP server listening port |
| `AUTHENTIK_SECRET_KEY` | Authentik Server | (secret) | Core application secret key |
| `AUTHENTIK_BOOTSTRAP_EMAIL` | Authentik Server | - | Initial admin email for bootstrap |
| `AUTHENTIK_POSTGRESQL__HOST` | Authentik Server | - | Postgres database host reference |
| `AUTHENTIK_POSTGRESQL__NAME` | Authentik Server | - | Postgres database name reference |
| `AUTHENTIK_POSTGRESQL__PORT` | Authentik Server | - | Postgres database port reference |
| `AUTHENTIK_POSTGRESQL__USER` | Authentik Server | (secret) | Postgres database username reference |
| `AUTHENTIK_BOOTSTRAP_PASSWORD` | Authentik Server | (secret) | Initial admin password first boot |
| `AUTHENTIK_DEFAULT_TOKEN_LENGTH` | Authentik Server | (secret) | Default generated token length |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | Authentik Server | (secret) | Postgres database password reference |
| `AUTHENTIK_ERROR_REPORTING__ENABLED` | Authentik Server | false | Disable error reporting telemetry |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/lifecycle/ak worker`
- **Start command:** `/lifecycle/ak server`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/media`

**Category:** Authentication

[View on Railway →](https://railway.com/template/authentik)
