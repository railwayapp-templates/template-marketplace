# Deploy apoia on Railway

Page to receive Pix support for your work, inspired by Buy Me a Coffee

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apoia)

## About

apoia is a self-hosted support page for Brazilian open source maintainers — a Buy Me a Coffee built around Pix. Supporters choose an amount, optionally leave a name and a message, and pay by Pix. No sign-up, no email, no CPF, no phone number is collected.

apoia runs as a single container backed by SQLite on a mounted volume — no external database, cache, or queue to provision. Migrations run automatically on every boot, before the server accepts traffic, so upgrading is just a redeploy. You supply four environment variables: the public URL, a Woovi App ID for Pix, and the Google address plus a session secret for the admin. Everything else — your name, avatar, links, projects, suggested amounts, thank-you message — is configured through the admin UI after your first login, not through environment variables. One manual step remains after deploying: registering the Woovi webhook that confirms payments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valtlfelipe/apoia:latest | `ghcr.io/valtlfelipe/apoia:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PIX_PROVIDER` | woovi | Pix provider to use |
| `WOOVI_APP_ID` | - | Woovi APP ID |
| `APOIA_SITE_URL` | https://${RAILWAY_PUBLIC_DOMAIN} | Public Site URL |
| `APOIA_ADMIN_EMAIL` | - | Admin e-mail |
| `APOIA_ADMIN_SECRET` | (secret) | Admin Cookie Secret |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/apoia)
