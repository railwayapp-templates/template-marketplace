# Deploy Bichon on Railway

End-to-end encrypted email storage & management server with Web UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bichon-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/bichon-1)

![Bichon OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-bichon/main/og-image.svg)

Bichon is an end-to-end encrypted email storage and management server with a modern Web UI. Connect any number of IMAP email accounts and have all mail archived, searchable, and exportable — with credentials encrypted at rest by your own key. Deploy it on Railway in minutes.

Bichon runs as a single Docker container on port `15630`. Railway provides compute, TLS at the edge, and a public URL. All persistent data lives at `/data` — mount a Railway Volume there so your archived mail survives restarts. No external database or S3 bucket required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bichon | [INAPP-Mobile/railway-bichon](https://github.com/INAPP-Mobile/railway-bichon) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 15630 | HTTP port Railway routes to. Must match BICHON_HTTP_PORT. |
| `BICHON_ROOT_DIR` | /data | Absolute path for all persistent data. Mounted as a Railway volume at /data. |
| `BICHON_HTTP_PORT` | 15630 | Internal HTTP port the Bichon server listens on. Must match PORT. |
| `BICHON_PUBLIC_URL` | - | Public URL for OAuth redirects and docs links. Auto-resolves to your Railway domain. Override for custom domains. |
| `BICHON_ENCRYPT_PASSWORD` | (secret) | REQUIRED. Password used to encrypt stored credentials (IMAP passwords, OAuth tokens). Auto-generated a random 32-char secret per deployment — keep it to access stored accounts later; changing it locks out stored accounts. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/bichon-1)
