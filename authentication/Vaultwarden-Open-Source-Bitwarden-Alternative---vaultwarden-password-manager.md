# Deploy Vaultwarden | Open Source Bitwarden Alternative on Railway

Self Host Vaultwarden: Encrypted passwords, 2FA, organizations & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-password-manager)

## About

Deploy Vaultwarden on Railway to self-host a lightweight, full-featured password manager compatible with all official Bitwarden clients. Written in Rust, Vaultwarden delivers enterprise-grade credential management — including organizations, collections, 2FA, Send, and emergency access — while consuming under 50 MB of RAM.

This Railway template pre-configures Vaultwarden with a persistent volume for SQLite storage, an admin panel for server-side configuration, and a public HTTPS domain ready for browser extensions and mobile apps. No external database required.

Vaultwarden is an unofficial Bitwarden-compatible server written in Rust by dani-garcia. It implements the full Bitwarden Client API, meaning every official Bitwarden application works seamlessly — desktop, mobile, browser extensions, and CLI.

Key features of self-hosted Vaultwarden:

- **Password Vault** — end-to-end encrypted storage for logins, cards, identities, and secure notes
- **Organizations & Collections** — share credentials across teams with granular access control
- **Bitwarden Send** — securely share text or files with expiring, password-protected links
- **Multi-Factor Authentication** — TOTP, FIDO2 WebAuthn, YubiKey, Duo, and email-based 2FA
- **Emergency Access** — grant trusted contacts access to your vault in emergencies
- **Admin Panel** — web-based server configuration at `/admin`
- **Attachments & Icons** — file attachments on vault items and automatic website favicon fetching

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vaultwarden | `vaultwarden/server:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Railway routing target port |
| `DOMAIN` | - | Public URL for links and U2F |
| `ADMIN_TOKEN` | (secret) | Admin panel password at /admin |
| `ROCKET_PORT` | 80 | Internal server listening port |
| `SIGNUPS_ALLOWED` | true | Allow new user registration |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/vaultwarden-password-manager)
