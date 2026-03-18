# Deploy PostGIS on Railway

PostgreSQL DB enabled with PostGIS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgis)

## About

## PostgreSQL DB enabled with the PostGIS extension

The image used in this template can be found in Docker Hub, published by the team at PostGIS.
- [postgis/postgis](https://hub.docker.com/r/postgis/postgis)

### Versions
- PostgreSQL 16
- PostGIS 3.4.0

### [PostGIS](https://postgis.net/)
Extends PostgreSQL by adding support for storing, indexing, and querying geographic data.

> PostGIS is an open source software program that adds support for geographic objects to the PostgreSQL object-relational database. PostGIS follows the Simple Features for SQL specification from the Open Geospatial Consortium

- [PostGIS Documentation](https://postgis.net/documentation/)

### SSL certificates
This template initializes postgres using the self-signed Snakeoil certificate that is available in Debian/Ubuntu systems.  This is controlled by the `POSTGRES_INITDB_ARGS` environment variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostGIS | `postgis/postgis:16-master` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when container is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database over public networking |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | - | URL to connect to Postgres database over private network |
| `POSTGRES_INITDB_ARGS` | -c ssl=on -c ssl_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem -c ssl_key_file=/etc/ssl/private/ssl-cert-snakeoil.key | Additional arguments to pass to postgresql initdb, enables SSL |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgis)
