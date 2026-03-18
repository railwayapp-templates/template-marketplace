# Deploy Linkding on Railway

🔖 Bookmark manager designed be to be minimal, fast, and easy to set up.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/EG6_cW)

## About

**Linkding** is a lightweight, self-hosted bookmark manager designed for speed, simplicity, and privacy.  

It lets you save, organize, and search your favorite links — like a personal archive or “read later” list — accessible from any device.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| App | `sissbruecker/linkding:latest-plus` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `LD_DB_USER` | App | (secret) | - |
| `LD_DB_ENGINE` | App | postgres | - |
| `LD_SUPERUSER_NAME` | App | - | Username of the Superuser |
| `LD_SUPERUSER_PASSWORD` | App | (secret) | Password of the Superuser |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/linkding/data`

**Category:** Other

[View on Railway →](https://railway.com/template/EG6_cW)
