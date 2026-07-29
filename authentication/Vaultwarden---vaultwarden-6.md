# Deploy Vaultwarden on Railway

Self-hosted Bitwarden-compatible password manager server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-6)

## About

Vaultwarden is an unofficial, lightweight Bitwarden-compatible server written in Rust. It lets you self-host your end-to-end encrypted password vault while staying compatible with most official Bitwarden clients — web vault, browser extensions, desktop, and mobile apps.

Hosting Vaultwarden means running a single Rust container that serves the Bitwarden web vault and client API over HTTPS. All vault data lives in an embedded SQLite database plus file attachments, so a persistent volume mounted at `/data` is the only storage requirement — no external database service is needed. HTTPS is mandatory: modern Bitwarden clients and WebAuthn/passkeys reject plain HTTP, and the `DOMAIN` variable must match the public URL for invite links and passkeys to work. On Railway, TLS is terminated automatically on the generated public domain, and the volume keeps the database and attachments durable across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vaultwarden | `vaultwarden/server:1.36.0` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/vaultwarden-6)
