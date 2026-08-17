# Deploy Pocket-Id on Railway

Auth0 alternative. OpenID Connect provider with passkey authentication

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketid)

## About

Pocket ID is an OpenID Connect Certified™ identity provider with exactly one login factor: a passkey. People sign in with Touch ID, Windows Hello, an Android phone or a YubiKey, and every app behind it inherits phishing-resistant single sign-on — no passwords, no TOTP codes. It suits teams for whom Keycloak or Authentik is more identity platform than the job needs, but one login across Grafana, Immich, Nextcloud, Proxmox and eighty-odd other OIDC clients is still worth having.

Deploy Pocket ID on Railway as a single Go binary from `ghcr.io/pocket-id/pocket-id:v2`, serving port 1411 behind an HTTPS domain with a health check on `/healthz`. This template self-hosts Pocket ID on managed state instead of the default SQLite file: **Postgres** holds users, groups, OIDC clients, signing keys and the audit log, and the **`pocket-id-files`** bucket holds uploaded logos, background images and profile pictures. A volume at `/app/data` lets Railway swap containers cleanly on redeploy.

![Pocket ID Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786896836/57ad2ffd-2812-4cb9-9df3-1988c2baed36.png)

Self-hosting your identity provider keeps the credential that opens every internal app on infrastructure you control, and passkeys make it unphishable by construction.

- **Certified OIDC and OAuth 2.0** — discovery document, authorization code flow, refresh tokens, RS256 ID tokens and a published JWKS, with **PKCE** enforced when a client enables it.
- **Groups in the `groups` claim** — define a group once and every downstream app reads it for role mapping.
- **Per-client access control** — new clients are restricted until a group is attached, so access is opt-in.
- **LDAP and SCIM** — sync users and groups in from Active Directory or OpenLDAP, and provision them out to connected apps.
- **API keys and an audit log** — script administration with an `X-API-KEY` header, and keep a global and per-user event history.

Postgres is the system of record; the bucket holds uploaded imagery, so branding survives a container replacement. With `TRUST_PROXY` set, the audit log and login rate limiter see the real caller, not Railway's edge.

Run Pocket ID at **one replica, always** — upstream does not yet support two instances against the same database, and a second one detects the first and exits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| pocket-id | `ghcr.io/pocket-id/pocket-id:v2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | pocket-id | 1411 | HTTP listening port |
| `APP_URL` | pocket-id | - | Public URL and WebAuthn relying party |
| `LOG_LEVEL` | pocket-id | info | Application log verbosity |
| `S3_BUCKET` | pocket-id | - | Bucket name for uploaded images |
| `S3_REGION` | pocket-id | - | Object storage region |
| `S3_ENDPOINT` | pocket-id | - | Object storage endpoint |
| `TRUST_PROXY` | pocket-id | true | Read client IPs from proxy headers |
| `FILE_BACKEND` | pocket-id | s3 | Store uploads in object storage |
| `ENCRYPTION_KEY` | pocket-id | - | Master key for encrypted data |
| `S3_ACCESS_KEY_ID` | pocket-id | - | Object storage access key |
| `DB_CONNECTION_STRING` | pocket-id | - | Postgres connection string |
| `S3_SECRET_ACCESS_KEY` | pocket-id | (secret) | Object storage secret key |
| `VERSION_CHECK_DISABLED` | pocket-id | false | Check for new releases |
| `AUDIT_LOG_RETENTION_DAYS` | pocket-id | 90 | Days audit events are kept |
| `ALLOW_INSECURE_CALLBACK_URLS` | pocket-id | false | Reject plain-HTTP client callbacks |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/pocketid)
