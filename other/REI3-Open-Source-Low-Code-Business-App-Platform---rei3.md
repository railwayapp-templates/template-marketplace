# Deploy REI3 | Open-Source Low-Code Business App Platform on Railway

Low-code platform for business apps: CRM, tickets, time, assets. Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rei3)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rei3?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=rei3)

[REI3](https://rei3.de) is an open-source low-code platform for business applications. You install ready-made apps from its free repository (time tracking, absences, projects and tasks, tickets, IT assets, a password safe, contracts, CRM-style contact lists and more), or build your own in the browser with forms, lists, calendars, Gantt charts, roles and workflows, then adjust them to fit. It is MIT licensed, written in Go, and developed in Germany since 2019.

This template runs REI3 3.13 against Railway Postgres:

| Service | What it does |
|---|---|
| **REI3** | The REI3 server (web app, API, scheduler), built from the official release package. Its volume holds uploaded files, the config file and integrated backups. |
| **Postgres** | PostgreSQL 17 on a volume. |

REI3 has no official container image, and its example Docker setup is marked "development and testing only" because it keeps the default login and hard-codes database credentials. This template fixes both:

- **No `admin` / `admin`.** REI3 creates an `admin` account with password `admin` on first start, so anyone who finds a fresh instance can take it over. Here the start script replaces that password with the generated `R3_ADMIN_PASSWORD` as soon as the account exists, and only while it still has the default.
- **Database settings from Railway variables.** The config file is rewritten from the `PG*` variables on every boot, so credentials are never baked into the image.
- **Behind Railway's HTTPS.** REI3 serves plain HTTP inside the container and Railway terminates TLS, so there are no self-signed certificate warnings.
- **Thumbnails and backups work.** ImageMagick and Ghostscript are installed for image and PDF previews, and `pg_dump` 17 for REI3's integrated backups.
- **Links point to your domain.** REI3's public host name, used in emails, calendar feeds and client downloads, is set to the Railway domain on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| REI3 | [nomideusz/rei3-railway](https://github.com/nomideusz/rei3-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | REI3 | 8080 | HTTP port REI3 listens on behind Railway's HTTPS - leave as is. |
| `R3_VERSION` | REI3 | 3.13 | REI3 release to build (see github.com/r3-team/r3/releases). Raise it and redeploy to upgrade; the database is migrated on start and cannot be downgraded. |
| `R3_PUBLIC_HOST` | REI3 | - | Public host name REI3 uses in links (mails, calendars, client config). Applied once on first boot; change it later in Admin -> System. |
| `R3_ADMIN_PASSWORD` | REI3 | (secret) | Password for the 'admin' account, set on first boot in place of REI3's default admin/admin. Change it in REI3 afterwards; this variable is not used again. |
| `POSTGRES_DB` | Postgres | rei3 | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/r3/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rei3)
