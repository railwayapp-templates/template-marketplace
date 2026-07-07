# Deploy vaultwarden on Railway

Vaultwarden — self-hosted password manager, Bitwarden-compatible.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-3)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/vaultwarden-3)

Vaultwarden is an alternative, open-source implementation of Bitwarden's server API — a self-hosted password manager compatible with all official Bitwarden clients. One-click deploy on Railway, no separate database needed (SQLite).

Vaultwarden (formerly Bitwarden.rs) provides the same functionality as Bitwarden's official servers while staying lightweight and self-hostable. It supports:

- Full password and identity storage
- Bitwarden's native encryption
- Compatible with all official Bitwarden apps (desktop, mobile, browser extensions, CLI)
- Secure Sharing for family/team plans
- Two-factor authentication
- Vault monitoring (integration with Have I Been Pwned)
- Self-hosted web vault portal

Deploying on Railway means you get automatic HTTPS, zero-config SQLite storage in the data volume, and continuous updates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vaultwarden | [INAPP-Mobile/vaultwarden](https://github.com/INAPP-Mobile/vaultwarden) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Vaultwarden listens on |
| `DB_URL` | - | Database connection string. Leave empty to use SQLite. |
| `ADMIN_TOKEN` | (secret) | Token to access the admin panel at /admin. Auto-generated. |
| `DATA_FOLDER` | data | Folder for database and data files |
| `HIBP_API_KEY` | (secret) | Have I Been Pwned API key for breach checking. Optional — leave empty to skip checks. |
| `ADMIN_ENABLED` | false | Enable admin panel UI (set to true to enable) |
| `LISTEN_ADDRESS` | 0.0.0.0 | Bind address (0.0.0.0 to listen on all interfaces) |
| `SIGNUPS_VERIFY` | false | Require email verification on signup. Default is false for one-click deployment. |
| `IP_HEADER_OPTIONAL` | false | Show or hide user IP in sessions (true/false) |

## Configuration

- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/vaultwarden-3)
