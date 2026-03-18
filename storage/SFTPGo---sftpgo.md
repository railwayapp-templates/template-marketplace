# Deploy SFTPGo on Railway

SFTPGo is an event-driven SFTP, FTP/S, HTTP/S and WebDAV server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sftpgo)

## About

SFTPGo is an event-driven SFTP, FTP/S, HTTP/S and WebDAV server.

With SFTPGo you can leverage local and cloud storage backends for exchanging and storing files internally or with business partners using the same tools and processes you are already familiar with.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sftpgo-railway | [leonardochappuis/sftpgo-railway](https://github.com/leonardochappuis/sftpgo-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SFTPGO_DATA_PROVIDER__DRIVER` | sftpgo-railway | postgresql | - |
| `SFTPGO_DATA_PROVIDER__SSLMODE` | sftpgo-railway | 1 | - |
| `SFTPGO_DEFAULT_ADMIN_PASSWORD` | sftpgo-railway | (secret) | - |
| `SFTPGO_DEFAULT_ADMIN_USERNAME` | sftpgo-railway | (secret) | - |
| `SFTPGO_DATA_PROVIDER__PASSWORD` | sftpgo-railway | (secret) | - |
| `SFTPGO_DATA_PROVIDER__USERNAME` | sftpgo-railway | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/sftpgo`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/sftpgo)
