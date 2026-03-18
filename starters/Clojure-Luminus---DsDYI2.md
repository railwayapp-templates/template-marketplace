# Deploy Clojure Luminus on Railway

A simple Clojure Luminus app connected to Postgres database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/DsDYI2)

## About

# Clojure Luminus Starter

This is a [Luminus](https://luminusweb.com) starter app that connects to a Postgres database on Railway.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/DsDYI2)

## ✨ Features

- Clojure
- Luminus
- Postgres

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Clojure Luminus | [railwayapp-templates/clojure-luminus](https://github.com/railwayapp-templates/clojure-luminus) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Clojure, HTML, CSS

[View on Railway →](https://railway.com/deploy/DsDYI2)
