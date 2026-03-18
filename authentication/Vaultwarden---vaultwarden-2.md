# Deploy Vaultwarden on Railway

Vaultwarden, an open source, self-hostable Bitwarden backend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vaultwarden-2)

## About

Vaultwarden is an unofficial, lightweight Bitwarden-compatible server written in Rust. It provides a self-hosted password management solution fully compatible with official Bitwarden clients while consuming significantly fewer resources than the official server—ideal for personal use or small teams.

Hosting Vaultwarden requires persistent storage for the SQLite database (default) or an external database like PostgreSQL. HTTPS is mandatory since Bitwarden clients require secure connections for API communication. Key configuration involves setting environment variables for the admin panel, domain settings, and optionally SMTP for email notifications (password resets, 2FA). Railway handles HTTPS termination automatically via its proxy, simplifying deployment. The container runs as a single service, making it straightforward to deploy, though you'll want to configure backups for the data volume containing your encrypted vault.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vaultwarden | [javdl/vaultwarden](https://github.com/javdl/vaultwarden) | Worker |

**Category:** Authentication · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/vaultwarden-2)
