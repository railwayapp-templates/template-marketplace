# Deploy wikijs:2.5 setup on Railway

Wiki.js + Postgres configured template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mS67ic)

## About

Wiki.js + Postgres configured template.

Configureated based on  offical WikiJS documentation.

About:
Wiki.js is an open source project that has been made possible due to the generous contributions by community backers. 

Wiki.js site: https://js.wiki

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wiki:2.5 | `requarks/wiki:2.5` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_HOST` | wiki:2.5 | - | Hostname or IP of the database |
| `DB_NAME` | wiki:2.5 | - | Database name |
| `DB_PASS` | wiki:2.5 | - | Password to connect to the database |
| `DB_PORT` | wiki:2.5 | - | Port of the database |
| `DB_TYPE ` | wiki:2.5 | postgres | Type of database (mysql, postgres, mariadb, mssql or sqlite) |
| `DB_USER ` | wiki:2.5 | - | Username to connect to the database |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/mS67ic)
