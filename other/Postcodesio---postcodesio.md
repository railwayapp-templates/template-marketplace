# Deploy Postcodes.io on Railway

Self hosted postcodes.io using the official Docker containers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postcodesio)

## About

Postcodes.io is a free, open-source HTTP API for UK postcode and geolocation lookups, maintained by Ideal Postcodes. It returns latitude, longitude, electoral wards, parliamentary constituencies, NHS regions, census areas, and dozens of other fields for every UK postcode, drawing from the ONS Postcode Directory (ONSPD) dataset.

This template deploys two services: a PostgreSQL + PostGIS database preloaded with the full ONSPD dataset, and the Node.js HTTP API that queries it. The database image restores its preloaded dump on first boot — expect 60–90 seconds before the API starts returning real data. The dataset is persisted on a Railway volume so subsequent deploys skip the restore. The API service is exposed on a public domain; the database stays on Railway's private network. ONSPD is updated quarterly by the ONS, and the upstream Docker image is rebuilt whenever a new release lands.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postcodes-db | `idealpostcodes/postcodes.io.db:latest` | Database |
| postcodes-api | `idealpostcodes/postcodes.io:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postcodes-db | postcodesiodb | Name of the database the ONS postcode dataset is loaded into. The api connects to this database |
| `POSTGRES_USER` | postcodes-db | (secret) | Postgres role that owns the database. The api authenticates as this user. |
| `POSTGRES_PASSWORD` | postcodes-db | (secret) | Auto-generated password for the Postgres role. Do not edit after the database has been initialized — it would break authentication and require wiping the volume |
| `PORT` | postcodes-api | 8000 | HTTP port the postcodes.io api listens on. Must match the target port on the public domain. |
| `POSTGRES_HOST` | postcodes-api | - | Private hostname of the postcodes-db service. Resolved automatically via Railway's private networking — do not edit. |
| `POSTGRES_PORT` | postcodes-api | 5432 | Port the postcodes-db service listens on. Postgres default (5432). |
| `POSTGRES_USER` | postcodes-api | (secret) | Postgres user the api authenticates as. Mirrors POSTGRES_USER on postcodes-db. |
| `POSTGRES_DATABASE` | postcodes-api | - | Name of the postcodes database. Mirrors POSTGRES_DB on postcodes-db (note: postcodes.io reads POSTGRES_DATABASE, the postgres image exposes POSTGRES_DB — the names intentionally differ). |
| `POSTGRES_PASSWORD` | postcodes-api | (secret) | Password used to authenticate with postcodes-db. Mirrors POSTGRES_PASSWORD on the db service. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/postcodesio)
