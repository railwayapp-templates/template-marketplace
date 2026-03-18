# Deploy PG 17 + PostGIS 3.5 on Railway

This is a PostgreSQL version 17 with PostGIS support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgis-17)

## About

PostGIS extends the capabilities of the PostgreSQL relational database by adding support for storing, indexing, and querying geospatial data.

You can find the documentation for PostGIS [HERE](https://postgis.net/)

You can host it the same way you do with a normal PG 17 database, no other configuration is necessary

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostGIS 17 | `postgis/postgis:17-master` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |
| `POSTGRES_INITDB_ARGS` | -c ssl=on -c ssl_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem -c ssl_key_file=/etc/ssl/private/ssl-cert-snakeoil.key |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/postgis-17)
