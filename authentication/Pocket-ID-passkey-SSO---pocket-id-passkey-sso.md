# Deploy Pocket ID passkey SSO on Railway

Passkey OIDC identity with guarded setup and persistent SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocket-id-passkey-sso)

## About

Run [Pocket ID](https://pocket-id.org), a passkey-only OpenID Connect provider, with guarded first-owner setup and persistent SQLite. [Pocket ID source](https://github.com/pocket-id/pocket-id) is the main upstream product. **Recipe `1.0.1` is published**, using the immutable [standalone recipe source](https://github.com/tech-progress/pocket-id-passkey-sso/tree/46af3b530450401b0a9b987d9e7ec83942c64cef). Its `v1.0.1` tag and `release-v1` branch resolve to that qualified revision; historical `v1.0.0` remains unchanged. Release-source documents record the pre-live snapshot; this marketplace overview records the subsequent October 6 qualification and publication.

This recipe pins Pocket ID 2.17.0 and exact runtime APKs, with one service, one replica and one dedicated 1000 MB volume at `/app/data`. Its public gateway keeps application routes operator-only by default with `GATE_FORCE_LOCK=true`; the backend and actor listeners stay loopback-only. Owner setup is manual over the final verified HTTPS issuer, requires two separately verified credentials and explicit activation. Setting the force lock to `false` after activation exposes permitted login/application/OIDC routes; upstream authorization then enforces user privileges.

Marketplace description: **Passkey OIDC identity with guarded setup and persistent SQLite.**

Product icon: [Pocket ID logo](https://raw.githubusercontent.com/pocket-id/pocket-id/v2.17.0/frontend/static/img/static-logo.svg). This description, product icon and upstream links match the template metadata.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pocket ID | [tech-progress/pocket-id-passkey-sso](https://github.com/tech-progress/pocket-id-passkey-sso) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Public gate HTTP port; Railway terminates HTTPS. Backend remains on 127.0.0.1:1411. |
| `APP_URL` | - | Stable canonical HTTPS issuer/passkey origin; choose the final domain before enrolling. |
| `ENCRYPTION_KEY` | - | Generated stable encryption key. Back up separately with the volume; never regenerate on restart. |
| `GATE_FORCE_LOCK` | true | true keeps ALL application routes operator-only. Set false only after two owner passkeys and signed activation; missing activation still locks. |
| `GATE_ADMIN_TOKEN` | (secret) | Generated independent operator gate token. Secret; not a Pocket ID API key or login credential. |

## Configuration

- **Start command:** `sh /opt/pocket-gate/entrypoint.sh python3 /opt/pocket-gate/gateway.py`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Authentication · **Languages:** JavaScript, Python, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/pocket-id-passkey-sso)
