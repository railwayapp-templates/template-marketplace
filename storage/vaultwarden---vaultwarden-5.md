# Deploy vaultwarden on Railway

Vaultwarden — self-hosted password manager, Bitwarden-compatible.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-5)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/vaultwarden-5)

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
| vaultwarden | [INAPP-Mobile/vaultwarden](https://github.com/INAPP-Mobile/vaultwarden) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Vaultwarden listens on (Railway-injected, keep at 8080) |
| `IP_HEADER` | - | HTTP header used to determine the client IP (e.g. X-Real-IP). Leave empty to use the connection IP. |
| `ADMIN_TOKEN` | (secret) | Token to access the admin panel at /admin. Auto-generated on deploy. |
| `DATA_FOLDER` | /data | Folder for the database and data files. Must match the volume mount path (/data) so data persists. |
| `DATABASE_URL` | - | Database connection string. Leave empty to use the bundled SQLite database. |
| `HIBP_API_KEY` | (secret) | Have I Been Pwned API key for breach checking. Optional — leave empty to skip checks. |
| `ROCKET_ADDRESS` | 0.0.0.0 | Bind address for the web server (0.0.0.0 = all interfaces) |
| `SIGNUPS_VERIFY` | false | Require email verification on signup. Default false for one-click deployment. |
| `DISABLE_ADMIN_TOKEN` | (secret) | Set to true to disable the admin panel. Default false = admin panel enabled. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/vaultwarden-5)
