# Deploy vaultwarden on Railway

Lightweight self-hosted Bitwarden-compatible password manager in Rust

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-4)

## About

# Vaultwarden

**Vaultwarden** is a lightweight, self-hosted implementation of the Bitwarden server, written in Rust. It is fully compatible with the official Bitwarden clients (browser extensions, desktop, mobile, and CLI) while using a fraction of the resources of the official stack — ideal for a small team or a personal password vault.

This template deploys Vaultwarden wired for Railway: one service, a persistent volume for your data, and a public HTTPS domain. It runs with **zero configuration** — one click and your vault is live.

## What you get

- **Full Bitwarden compatibility** — point any official Bitwarden client at your Railway domain and log in.
- **Web vault** at `/` — create your account and manage passwords from the browser.
- **Persistent volume** at `/data` — the SQLite database, attachments, and keys survive redeploys.
- **Password manager, secrets, TOTP, attachments, Sends, and organizations** — the full Vaultwarden feature set.

## Quick start

1. Deploy the template. When the service is live, open the generated `*.up.railway.app` URL.
2. On the web vault, click **Create account** and register your login.
3. Point your Bitwarden apps/extensions at the same URL (Settings → Server URL) and sign in.

## Lock it down (recommended)

After you have created your account, harden the instance by adding these variables to the service:

| Variable | Value | Purpose |
|---|---|---|
| `SIGNUPS_ALLOWED` | `false` | Stop anyone else from registering on your instance. |
| `ADMIN_TOKEN` | an Argon2 hash | Enables the `/admin` diagnostics panel. Disabled by default for safety — only set this when you need it, and use a hashed token. |
| `DOMAIN` | `https://` | Set to your public URL to enable WebAuthn/FIDO2 and attachment features. |

The `/admin` panel stays disabled until `ADMIN_TOKEN` is set, so the instance is safe to run without it.

## Configuration

- **Image:** `vaultwarden/server:latest`
- **Port:** listens on `80` (Rocket default); the template's public domain targets it automatically.
- **Volume:** mounted at `/data` (5 GB default) — all state lives here.
- **Health:** `GET /alive` returns a timestamp; `GET /` serves the web vault.

See the [Vaultwarden wiki](https://github.com/dani-garcia/vaultwarden/wiki) for the full list of supported settings (SMTP, YubiKey, push notifications, and more).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vaultwarden | `vaultwarden/server:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/vaultwarden-4)
