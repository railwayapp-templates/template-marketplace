# Deploy vaultwarden on Railway

Self-hosted Bitwarden-compatible password manager.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-3)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/s1i6p9)

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
| vaultwarden | [INAPP-Mobile/vaultwarden](https://github.com/INAPP-Mobile/vaultwarden) | Worker |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/vaultwarden-3)
