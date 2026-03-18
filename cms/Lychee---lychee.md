# Deploy Lychee on Railway

A stunning and user-friendly photo management system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lychee)

## About

Lychee is a free, open-source photo-management tool. With Lychee, you can upload, manage, and share your photos seamlessly, just like using a native application. It comes with all the essential features you need, ensuring your photos are stored securely. Read more on our website.

⚠️**It may take a while for this template to deploy, so please be patient**⚠️

[lychee.electerious.com](https://lychee.electerious.com)

With this template, you can deploy and host Lychee with one click. The first time you visit the webpage, you can setup an admin account which you can then later login with.
All the files you upload (as well as the configs) are persistent and stored in the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Lychee | `linuxserver/lychee` | Web service |
| Lychee-DB | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Lychee | 80 | - |
| `DB_PASSWORD` | Lychee | (secret) | - |
| `DB_USERNAME` | Lychee | (secret) | - |
| `DB_CONNECTION` | Lychee | pgsql | - |
| `APP_FORCE_HTTPS` | Lychee | true | - |
| `POSTGRES_DB` | Lychee-DB | railway | Default database created when image is started. |
| `DATABASE_URL` | Lychee-DB | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Lychee-DB | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Lychee-DB | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Lychee-DB | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `sh -c 'mkdir -p /config/pictures /config/uploads; [ -d /pictures ] && mv /pictures/* /config/pictures/ 2>/dev/null || true; [ -d /uploads ] && mv /uploads/* /config/uploads/ 2>/dev/null || true; ln -sf /config/pictures /pictures; ln -sf /config/uploads /uploads; mkdir -p /config/nginx; echo "resolver 1.1.1.1;" > /config/nginx/resolver.conf; exec /init'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/lychee)
