# Deploy Mail-Archiver on Railway

Archive, search, and export emails from multiple accounts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mail-archiver)

## About

Mail-Archiver is a comprehensive solution for archiving, searching, and exporting emails. It supports multiple email providers, allows advanced search and filtering, and enables exporting emails as mbox or EML files. The platform features a responsive multilingual UI, mobile and desktop optimization, and user-specific access controls for secure usage.

Hosting Mail-Archiver involves running an automated service that archives, stores, and organizes email content from multiple accounts. The platform manages synchronization of emails and attachments, offers searchable storage, and provides a dashboard for statistics and activity monitoring. Hosting requirements include managing a PostgreSQL database, setting up authentication, and configuring a secure environment (typically using Docker and a reverse proxy for HTTPS). Railway’s infrastructure makes the process straightforward by automating server, storage, and database management—reducing configuration overhead and simplifying horizontal and vertical scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| s1t5/mailarchiver:latest | `s1t5/mailarchiver:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `Authentication__Password` | s1t5/mailarchiver:latest | (secret) | - |
| `Authentication__Username` | s1t5/mailarchiver:latest | (secret) | - |
| `TimeZone__DisplayTimeZoneId` | s1t5/mailarchiver:latest | Etc/UCT | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/DataProtection-Keys`

**Category:** Other

[View on Railway →](https://railway.com/template/mail-archiver)
