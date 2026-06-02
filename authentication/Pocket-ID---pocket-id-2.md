# Deploy Pocket ID on Railway

A simple, self-hosted OIDC provider with passkey-only authentication.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocket-id-2)

## About

Pocket ID is a lightweight, self-hosted OIDC provider that uses passkey-only
authentication — no passwords. It lets you add single sign-on to your
self-hosted services using WebAuthn passkeys or hardware keys like YubiKey,
making it a simple alternative to heavier solutions like Keycloak.

Pocket ID runs as a single container backed by SQLite, so there are no
external database dependencies to manage. All data — the database, uploads,
and GeoLite2 IP database — is stored under a single `/app/data` volume mount.
The app listens on port 1411 and requires HTTPS, which Railway provides
automatically via its public domain. On first deploy, visit `/setup` to
register your admin passkey before anyone else can. Configuration is minimal:
set your public URL and an encryption key, and you're running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocket-id | `ghcr.io/pocket-id/pocket-id:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 1411 | The port on which Pocket ID should listen |
| `APP_URL` | - | The URL where you will access the app |
| `TRUST_PROXY` | true | Whether the app is behind a reverse proxy |
| `ENCRYPTION_KEY` | - | Key used to encrypt data, including the private keys |
| `ANALYTICS_DISABLED` | true | Disables the daily heartbeat request to the analytics server |
| `VERSION_CHECK_DISABLED` | true | Disables the automatic version check against GitHub |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/pocket-id-2)
