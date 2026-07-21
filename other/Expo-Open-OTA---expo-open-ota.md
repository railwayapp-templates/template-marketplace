# Deploy Expo-Open-OTA on Railway

An open-source Go implementation of the Expo Updates protocol

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/expo-open-ota)

## About

Expo Open OTA is an open-source, self-hosted server for over-the-air updates in Expo apps, implementing the official Expo Updates protocol. It brings a web dashboard, multi-app support, progressive rollouts, instant rollbacks and one-command publishing, and serves update files from your own storage bucket, optionally behind your own CDN.

This template deploys the update server in control plane mode together with a PostgreSQL database. On first boot the server runs its migrations, seeds your admin account from the `ADMIN_EMAIL` and `ADMIN_PASSWORD` variables, and the dashboard becomes available on your Railway domain. Secrets like the JWT secret and the database master key are generated automatically at deploy time. You connect a storage bucket (S3, Google Cloud Storage, Cloudflare R2, MinIO or DigitalOcean Spaces) for the update artifacts, then publish from your terminal or CI with the eoas CLI. The server is stateless, so it scales horizontally on Railway without extra configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Expo-Open-OTA | `ghcr.io/axelmarciano/expo-open-ota` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Expo-Open-OTA | 3000 | Port used by the API |
| `DB_URL` | Expo-Open-OTA | - | Postgres DB Url |
| `BASE_URL` | Expo-Open-OTA | - | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#core |
| `AWS_REGION` | Expo-Open-OTA | - | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#storage |
| `JWT_SECRET` | Expo-Open-OTA | (secret) | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#core |
| `ADMIN_EMAIL` | Expo-Open-OTA | - | Email address for dashboard access |
| `STORAGE_MODE` | Expo-Open-OTA | s3 | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#storage |
| `USE_DASHBOARD` | Expo-Open-OTA | true | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#dashboard |
| `ADMIN_PASSWORD` | Expo-Open-OTA | (secret) | Password for the first dashboard admin account, used together with ADMIN_EMAIL to sign in. At least 8 characters, including an uppercase letter, a lowercase letter, a digit and a special character. |
| `S3_BUCKET_NAME` | Expo-Open-OTA | - | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#storage |
| `AWS_ACCESS_KEY_ID` | Expo-Open-OTA | - | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#storage |
| `AWS_BASE_ENDPOINT` | Expo-Open-OTA | - | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#storage |
| `KEYS_STORAGE_TYPE` | Expo-Open-OTA | environment | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#app-configuration |
| `AWS_SECRET_ACCESS_KEY` | Expo-Open-OTA | (secret) | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#storage |
| `DB_KEYS_MASTER_KEY_B64` | Expo-Open-OTA | - | https://mercure-technologies.gitbook.io/expo-open-ota/references/environment-variables#storage |
| `POSTGRES_DB` | Postgres | expo-open-ota | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/hc`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/expo-open-ota)
