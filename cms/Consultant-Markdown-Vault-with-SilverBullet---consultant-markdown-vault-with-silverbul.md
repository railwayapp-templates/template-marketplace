# Deploy Consultant Markdown Vault with SilverBullet on Railway

A password-protected Markdown knowledge space with a durable volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/consultant-markdown-vault-with-silverbul)

## About

A password-protected Markdown knowledge space with a durable volume.

Independent consultants maintaining interlinked notes and reusable checklists.

Sign in as operator with VAULT_PASSWORD from Railway variables. Create an index note, link client notes and checklists, and export or back up the Markdown folder. This recipe deliberately launches one authenticated space.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /data | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `ghcr.io/silverbulletmd/silverbullet@sha256:370a3bf2daa37b7dbba62183085c57d5d43862189ea127e0765646d230561d9d` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PORT` | 3000 |
| `SB_PORT` | 3000 |
| `SB_USER` | (secret) |
| `SB_FOLDER` | /data |
| `SB_HOSTNAME` | 0.0.0.0 |
| `SB_RUNTIME_API` | 0 |
| `VAULT_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/sbin/tini -- /docker-entrypoint.sh --single`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/consultant-markdown-vault-with-silverbul)
