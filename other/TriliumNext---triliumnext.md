# Deploy TriliumNext on Railway

Securely self-host TriliumNext with persistent notes and tested recovery.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/triliumnext)

## About

Run TriliumNext `v0.105.0` as one authenticated Railway service with a
persistent data volume, immutable linux/amd64 image pin, non-root runtime, and
secure closed-first readiness.

The template generates the owner password, mounts
`/home/node/trilium-data`, and keeps public traffic closed until the database
is initialized, owner authentication works, and first-owner setup is closed.
Retrieve the generated password from Railway Variables, log in, create
synthetic content, and test one restart before importing important data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| triliumnext | [l4time/railway-triliumnext-template](https://github.com/l4time/railway-triliumnext-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Internal HTTP port; fixed at 3000 by the template. |
| `TRILIUM_OWNER_PASSWORD` | (secret) | Auto-generated TriliumNext owner password; save it securely. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/trilium-data`

**Category:** Other · **Languages:** JavaScript, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/triliumnext)
