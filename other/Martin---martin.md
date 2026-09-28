# Deploy Martin on Railway

Martin 1.16: vector tile server for PostGIS, with its own PostGIS 17.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/martin)

## About

Martin is a fast vector tile server from the MapLibre project, written in Rust. It turns PostGIS tables and functions into Mapbox Vector Tiles on the fly and also serves MBTiles and PMTiles files. Web and mobile maps built with MapLibre, Mapbox GL or OpenLayers load its tiles directly.

This template runs `ghcr.io/maplibre/martin:1.16.1` next to a PostGIS 17 database built from `postgis/postgis:17-3.5`. PostGIS installs its spatial extensions on first boot, and the start command skips the old TIGER geocoder, so its empty tables do not clutter the tile catalog. Martin publishes every table with a geometry column when it starts, so redeploy Martin after adding tables. Load data through PostGIS's TCP proxy with `psql` or `ogr2ogr`. Tiles and Martin's web UI are public and read-only. Martin restarts automatically until PostGIS is ready. Both fit the Hobby plan for small datasets.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgis | `postgis/postgis:17-3.5` | Database |
| martin | `ghcr.io/maplibre/martin:1.16.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | postgis | gis |
| `POSTGRES_USER` | postgis | (secret) |
| `POSTGRES_PASSWORD` | postgis | (secret) |
| `PORT` | martin | 3000 |
| `RUST_LOG` | martin | martin=info |

## Configuration

- **Start command:** `sh -c 'sed -i "/fuzzystrmatch\|tiger_geocoder/d" /docker-entrypoint-initdb.d/10_postgis.sh; exec docker-entrypoint.sh postgres'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/usr/local/bin/martin --listen-addresses [::]:3000 --webui enable-for-all --workers 4`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/martin)
