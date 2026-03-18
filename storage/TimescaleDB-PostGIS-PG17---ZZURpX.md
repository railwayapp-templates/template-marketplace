# Deploy TimescaleDB + PostGIS (PG17) on Railway

PostgreSQL DB enabled with TimescaleDB and PostGIS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ZZURpX)

## About

### Overview

**A clone of the official Railway TimescaleDB + PostGIS template, but using [Railway's Postgres 17 image](https://github.com/railwayapp-templates/timescale-postgis-ssl/pkgs/container/timescale-postgis-ssl/313948177?tag=pg17-ts2.17) instead of 16.**

PostgreSQL database service with TimescaleDB and PostGIS installed.  Deployed with Railway's [SSL-enabled image](https://github.com/railwayapp-templates/timescale-postgis-ssl).

*Note that postgis is installed but not enabled.  To enable it, simply connect to the DB and execute `CREATE EXTENSION postgis;`*

### Versions
- PostgreSQL 16
- TimescaleDB 2.13
- PostGIS 3.4.1

### Extensions

1. [TimescaleDB](https://www.timescale.com/) 
A time-series database built on top of PostgreSQL. 

  > Engineered to efficiently handle resource-intensive workloads, like time series, event, and analytics data. Built on PostgreSQL, with expert support at no extra charge.

  - [Timescale Documentation](https://docs.timescale.com/)

2. [PostGIS](https://postgis.net/)
Extends PostgreSQL by adding support for storing, indexing, and querying geographic data.

  > PostGIS is an open source software program that adds support for geographic objects to the PostgreSQL object-relational database. PostGIS follows the Simple Features for SQL specification from the Open Geospatial Consortium

  - [PostGIS Documentation](https://postgis.net/documentation/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TimescaleDB | `ghcr.io/railwayapp-templates/timescale-postgis-ssl:pg17-ts2.17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NO_TS_TUNE` | true | Do not run `timescaledb-tune` at Startup. This improves memory usage of the database. |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database over private networking |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | URL to connect to Postgres database over public networking |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/ZZURpX)
