# Deploy Vaultwarden on Railway

Private self-hosted Bitwarden compatible password manager backend.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-3)

## About

Vaultwarden is a lightweight, self-hosted server that works with the official Bitwarden apps and browser extensions. Host your own password manager as a private alternative to LastPass, 1Password, or Bitwarden's cloud — storing passwords, secure notes, cards, identities, and shared vaults on infrastructure you control.

Hosting Vaultwarden gives you a private, Bitwarden-compatible backend for your credentials. Your vault data is encrypted by the client before it ever reaches the server, so the server only ever stores encrypted data — and it runs entirely on your own server with no telemetry.

This template is ready to run: Railway handles the infrastructure, and the app starts with sensible defaults so you can create your first account and start connecting the Bitwarden clients you already use. Because it uses Vaultwarden's built-in SQLite storage, it runs comfortably as a single lightweight service.

Vaultwarden is one piece of **[My Own Suite](https://myownsuite.org/)** — an all-in-one, self-hosted private cloud that also covers files, documents, photos, calendars, and more, so you can move your whole digital life onto infrastructure you own.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vaultwarden | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/vaultwarden) | Web service |
| Vaultwarden-Postgres | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/vaultwarden) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ADMIN_TOKEN` | Vaultwarden | (secret) |
| `ROCKET_PORT` | Vaultwarden | 80 |
| `SMTP_PASSWORD` | Vaultwarden | (secret) |
| `SMTP_USERNAME` | Vaultwarden | (secret) |
| `WEBSOCKET_ENABLED` | Vaultwarden | true |
| `POSTGRES_DB` | Vaultwarden-Postgres | vaultwarden |
| `POSTGRES_USER` | Vaultwarden-Postgres | (secret) |
| `POSTGRES_PASSWORD` | Vaultwarden-Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** JavaScript, TypeScript, CSS, Astro, MDX, Shell, PowerShell, Dockerfile, HTML, Standard ML

[View on Railway →](https://railway.com/deploy/vaultwarden-3)
