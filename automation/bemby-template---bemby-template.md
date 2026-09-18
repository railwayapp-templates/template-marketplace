# Deploy bemby-template on Railway

One-click Bemby: Emby keep-alive and check-in panel with scheduler

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bemby-template)

## About

Deploying Bemby on Railway provisions a single **bemby** service from this repo's Dockerfile (thin wrapper around the pinned upstream image `liveinaus/bemby:1.0.0`, release 2026-08-04), attaches a persistent volume at `/app/data` for the SQLite database, and exposes the panel on a public Railway domain. Three variables are pre-configured with per-deploy generated values, so the deploy form needs no input: `JWT_SECRET` (`${{secret(64, …)}}`), `ADMIN_PASSWORD` (`${{secret(24, …)}}`), and `ADMIN_DEFAULT_PASSWORD` (reference to `ADMIN_PASSWORD`) — the pairing makes the panel force a password change on first login.

Hosting Bemby yourself means your Emby credentials and job history never leave your own database: everything is stored in SQLite on your private Railway volume at `/app/data`. The service runs one small Node.js container (512 MB–1 GB RAM is plenty), and Railway's proxy terminates TLS in front of the panel (`TRUST_PROXY=1` is baked in). Expected cost is roughly **$3–5/month** on Railway's usage-based pricing. Upgrades are deliberate: bump the image tag in the Dockerfile and redeploy — data survives on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bemby | [lNamelessl/bemby-railway-template](https://github.com/lNamelessl/bemby-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `JWT_SECRET` | (secret) |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_DEFAULT_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/bemby-template)
