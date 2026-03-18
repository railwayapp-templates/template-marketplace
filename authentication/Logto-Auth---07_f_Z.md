# Deploy Logto (Auth) on Railway

🧑‍🚀 The better identity infrastructure for developers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/07_f_Z)

## About

🧑‍🚀 The better identity infrastructure for developers and the open-source alternative to Auth0.

Homepage URL: https://logto.io/
Repository: https://github.com/logto-io/logto

This auth app allows registering arbitrary many OAuth 2 applications even in free OSS version

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:14` | Database |
| Logto | `svhd/logto` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | Automatic |
| `DATABASE_URL` | Postgres | - | Automatic |
| `POSTGRES_USER` | Postgres | (secret) | Automatic |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Automatic |
| `DATABASE_PUBLIC_URL` | Postgres | - | Automatic |
| `DB_URL` | Logto | - | The database URL for logto service. |
| `ENDPOINT` | Logto | - | The user-facing URL. The value should include 'https://' and should not include trailing '/'. |
| `ADMIN_ENDPOINT` | Logto | - | The URL for admin menu.  The value should include 'https://' and should not include trailing '/'. |
| `TRUST_PROXY_HEADER` | Logto | 1 | Should be `1` |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "npm run cli db seed -- --swe; npm start"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/template/07_f_Z)
