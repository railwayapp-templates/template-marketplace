# Deploy PDPP Core Template Source on Railway

Deploy a PDPP Core node with Railway Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pdpp-core-template-source)

## About

# PDPP Core reference node

Deploys one public PDPP Core service backed by Railway Postgres.

You will be prompted for `PDPP_OWNER_PASSWORD`; choose a strong password and keep it private. Railway provides the public domain and Postgres connection automatically.

After deploy, open `/dashboard` on the core service domain and sign in with the owner password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `ghcr.io/vana-com/pdpp/railway-core:sha-6581820` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PDPP_OWNER_PASSWORD` | core | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/pdpp-core-template-source)
