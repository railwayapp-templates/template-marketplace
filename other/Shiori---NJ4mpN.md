# Deploy Shiori on Railway

Simple bookmark manager built with Go

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/NJ4mpN)

## About

# Shiori

**Notes:**

- Login with the username `shiori` and the password `gopher` and then add a new owner account from within the settings.

- Communication to Postgres is done exclusively over the private network and the database is not exposed externally in any way by default, if you want to enable access from outside of the private network you can go to the databases settings to enable TCP proxying and enter the internal port (5432) the TCP proxy can be again removed at any point to close off external access.

Shiori is a simple bookmarks manager written in the Go language. Intended as a simple clone of Pocket. You can use it as a command line application or as a web application. This application is distributed as a single binary, which means it can be installed and used easily.

<img alt="sample shiori dashboard screenshot" src="https://raw.githubusercontent.com/go-shiori/shiori/master/docs/readme/cover.png" style="border-radius: 5px;">

## Features

- Basic bookmarks management i.e. add, edit, delete and search.
- Import and export bookmarks from and to Netscape Bookmark file.
- Import bookmarks from Pocket.
- Simple and clean command line interface.
- Simple and pretty web interface for those who don't want to use a command line app.
- Portable, thanks to its single binary format.
- Support for sqlite3, PostgreSQL and MySQL as its database.
- Where possible, by default `shiori` will parse the readable content and create an offline archive of the webpage.
- [BETA] [web extension][web-extension] support for Firefox and Chrome.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Shiori | `ghcr.io/go-shiori/shiori:v1.6.0-rc.7` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Shiori | 8080 | Internal port |
| `SHIORI_DIR` | Shiori | - | Storage Directory |
| `SHIORI_DATABASE_URL` | Shiori | - | Private database URL |
| `SHIORI_HTTP_SECRET_KEY` | Shiori | (secret) | Secret key |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/system/liveness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/shiori`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/NJ4mpN)
