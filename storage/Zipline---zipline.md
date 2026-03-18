# Deploy Zipline on Railway

The next generation ShareX / File upload server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zipline)

## About

Zipline is a powerful, feature-rich file upload and URL shortening server, designed as a modern alternative to ShareX. It offers a beautiful dashboard, file organization capabilities, and extensive customization options for sharing and managing your uploaded content.

Hosting Zipline requires a server environment that can run Docker containers. The application consists of the main Zipline service and a PostgreSQL database for storing file metadata and user information. Zipline features a comprehensive dashboard for easy management, supports various authentication methods (OAuth2, 2FA, Passkeys), and includes customization options. When deployed on Railway, you can quickly set up Zipline without worrying about complex infrastructure configuration, making it accessible through a custom domain with automatic SSL certificates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Zipline | `ghcr.io/diced/zipline:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `CORE_SECRET` | Zipline | (secret) | - |
| `CORE_HOSTNAME` | Zipline | :: | - |
| `DATASOURCE_LOCAL_DIRECTORY` | Zipline | /data | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/zipline)
