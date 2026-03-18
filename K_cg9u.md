# Deploy Logto: Identity and Access Management (IAM) on Railway

The better auth and identity infrastructure

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/K_cg9u)

## About

Logto is an open-source alternative to Auth0 and an OIDC (OAuth 2.0) provider designed for modern applications and SaaS products, supporting both authentication and authorization. SAML is also supported.

Homepage: https://logto.io/
Repository: https://github.com/logto-io/logto

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| svhd/logto | `svhd/logto` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | svhd/logto | 3001 | [Automated] Port |
| `DB_URL` | svhd/logto | - | [Automated] Database URL |
| `ENDPOINT` | svhd/logto | - | Custom Domain |
| `ADMIN_PORT` | svhd/logto | 3002 | [Automated] Admin Port |
| `ADMIN_ENDPOINT` | svhd/logto | - | Custom Admin domain |
| `TRUST_PROXY_HEADER` | svhd/logto | 1 | [Automated] Using a HTTPS proxy |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "npm run cli db seed -- --swe; npm start"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/template/K_cg9u)
