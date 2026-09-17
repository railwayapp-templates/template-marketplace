# Deploy Nominatim on Railway

OpenStreetMap geocoder turning addresses into coordinates and back

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nominatim)

## About

Nominatim is the geocoder behind search on openstreetmap.org. It turns a written address into coordinates and a pair of coordinates back into an address, using nothing but OpenStreetMap data and a PostgreSQL database you control. Mapping teams, logistics platforms and anyone tired of per-request billing from Google or Mapbox self-host Nominatim for unmetered geocoding with no API quota and no user addresses leaving their infrastructure.

Deploy Nominatim on Railway as a single `nominatim` service. It packages the Nominatim 5.3 API, the OSM importer and a PostgreSQL 16 database with PostGIS in one container, with the cluster on a Railway volume at `/var/lib/postgresql/16/main`. A Caddy front door serves nominatim-ui at `/ui/`, proxies every API route, and protects both with HTTP basic auth, because Nominatim ships no authentication of its own. The first deployment imports the extract named by `PBF_URL`; every later one finds the finished database on the volume and serves in seconds.

![Diagram of the single Nominatim service and its database volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789572163/nominatim-architecture.webp)

Nominatim is a search engine built for OpenStreetMap's data model. Importing an extract is not a copy: `osm2pgsql` loads the raw OSM objects, then Nominatim derives a place hierarchy — country, state, county, city, suburb, street, house number — computes address interpolations, normalises names through an ICU tokenizer, and builds the indexes that let a free-text query resolve to one building.

Key capabilities:

- Forward geocoding, structured address search, and reverse geocoding from coordinates
- Polygons, bounding boxes, address breakdowns and per-language name variants
- Continuous replication of OpenStreetMap's own diffs, so your data stays current
- JSON, GeoJSON, GeoCodeJSON and XML output, compatible with existing Nominatim clients

The service holds three cooperating parts. PostgreSQL 16 with PostGIS stores the place table and its indexes on the volume. The Nominatim API runs under Gunicorn with uvicorn workers sized from the container's CPU quota. Caddy sits in front, serving nominatim-ui, proxying the API, and applying basic auth so the deployment is not an open geocoder for strangers. One caveat worth knowing: the optional Wikipedia and Wikidata importance tables are not imported, so forward search may prefer a less prominent match among identically named places. Reverse geocoding is unaffected.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nominatim | [gridalpha/nominatim-railway](https://github.com/gridalpha/nominatim-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Caddy front-door listening port |
| `PBF_URL` | https://download.geofabrik.de/europe/monaco-latest.osm.pbf | OSM extract imported on first boot |
| `API_AUTH` | enabled | Basic auth on the UI and API |
| `UPDATE_MODE` | continuous | Background replication mode |
| `API_PASSWORD` | (secret) | Basic auth password |
| `API_USERNAME` | (secret) | Basic auth username |
| `UI_PAGE_TITLE` | Nominatim | Title shown in nominatim-ui |
| `UI_DEFAULT_LAT` | 43.7311 | Latitude the UI map opens on |
| `UI_DEFAULT_LON` | 7.4197 | Longitude the UI map opens on |
| `REPLICATION_URL` | https://download.geofabrik.de/europe/monaco-updates/ | OSM diff directory for updates |
| `UI_DEFAULT_ZOOM` | 13 | Zoom level the UI map opens on |
| `WARMUP_ON_STARTUP` | false | Warm query caches before serving |
| `NOMINATIM_PASSWORD` | (secret) | Internal PostgreSQL role password |
| `REPLICATION_UPDATE_INTERVAL` | 86400 | Seconds between diff runs |

## Configuration

- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/16/main`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nominatim)
