# Deploy Tolgee on Railway

Tolgee 3.224: localization platform with REST API, SDKs and in-context UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tolgee-1)

## About

Tolgee is an open-source localization platform for web and mobile apps. Developers push translation keys through its REST API, CLI or SDKs, and translators edit them in a web editor with machine translation suggestions. Its in-context mode lets you change text right inside your running app, and it exports to common file formats.

This template runs the official `tolgee/tolgee:v3.224.8` image with a Railway Postgres database. The image's built-in Postgres is switched off, since Tolgee 4 removes it anyway. On first boot, Tolgee creates an `admin` user with a generated password, and sign-up is closed, so only people you invite can join. Uploaded screenshots and import files are kept on a Railway volume. Railway blocks outgoing SMTP, so invitation and password-reset emails need an SMTP relay that works on Railway, or you share invite links yourself. The Java server takes about a minute to start.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| tolgee | `tolgee/tolgee:v3.224.8` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | tolgee | 8080 |
| `SERVER_ADDRESS` | tolgee | :: |
| `TOLGEE_TELEMETRY_ENABLED` | tolgee | false |
| `SPRING_DATASOURCE_PASSWORD` | tolgee | (secret) |
| `SPRING_DATASOURCE_USERNAME` | tolgee | (secret) |
| `TOLGEE_AUTHENTICATION_ENABLED` | tolgee | true |
| `TOLGEE_AUTHENTICATION_JWT_SECRET` | tolgee | (secret) |
| `TOLGEE_FILE_STORAGE_FS_DATA_PATH` | tolgee | /data |
| `TOLGEE_POSTGRES_AUTOSTART_ENABLED` | tolgee | false |
| `TOLGEE_AUTHENTICATION_INITIAL_PASSWORD` | tolgee | (secret) |
| `TOLGEE_AUTHENTICATION_INITIAL_USERNAME` | tolgee | (secret) |
| `TOLGEE_AUTHENTICATION_REGISTRATIONS_ALLOWED` | tolgee | false |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tolgee-1)
