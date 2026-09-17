# Deploy GeoServer on Railway

Publishes maps and geospatial data as OGC web services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/geoserver)

## About

GeoServer is the open-source server that turns spatial data into web services. Point it at a PostGIS table, a GeoTIFF, a Shapefile or a GeoPackage and it publishes that data as OGC-standard endpoints — WMS and WMTS for rendered maps and tiles, WFS for raw features, WCS for coverages, WPS for geoprocessing — which QGIS, ArcGIS, OpenLayers and MapLibre already consume. Mapping agencies, utilities and researchers run it between their geodatabase and everything that needs a map.

Deploy GeoServer 3.0.1 on Tomcat 11 and JDK 21 in the `geoserver` service, with a `postgis` service beside it running PostgreSQL 18 and PostGIS 3.6. Requests arrive at the public GeoServer domain; GeoServer reads and writes spatial tables over a pooled JNDI connection on the private network, so the database is never exposed. Each service keeps a volume — GeoServer's holds the catalog, styles, uploads and the tile cache. Self-host GeoServer and the whole stack sits behind one URL.

![Diagram of the GeoServer and PostGIS services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789575587/geoserver-architecture.webp)

GeoServer solves a specific problem: your spatial data lives in a database or a pile of files, and everything that wants to draw it — a web map, a desktop GIS, a partner agency — speaks OGC standards instead. Publish once and the standards do the integration. Teams self-host it when the data cannot leave their infrastructure, when per-request pricing stops adding up, or when they need styling a tile product does not offer.

- **Standards** — WMS 1.1.1/1.3.0, WMTS, TMS, WFS 1.0/1.1/2.0 with WFS-T, WCS 2.0.1, WPS 1.0.0, CSW 2.0.2
- **Data sources** — PostGIS, GeoPackage, Shapefile, GeoTIFF, image mosaics
- **Styling** — SLD plus the CSS, YSLD and MapBox Style languages
- **Vector tiles** — MVT, GeoJSON and TopoJSON for MapLibre and OpenLayers
- **Tile cache** — GeoWebCache serves pre-rendered tiles from the volume
- **Security** — per-layer and per-service rules, plus API-key auth via `authkey`

Two services do the work. `geoserver` renders maps, answers feature requests, runs the admin UI at `/geoserver/web` and the REST API, and caches tiles on its volume. `postgis` is the spatial database: it adds geometry types, spatial indexes and hundreds of spatial functions to PostgreSQL, and holds your vector data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgis | `postgis/postgis:18-3.6` | Database |
| geoserver | [gridalpha/geoserver-railway](https://github.com/gridalpha/geoserver-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgis | gis | Database created on first boot |
| `POSTGRES_USER` | postgis | (secret) | Role created on first boot |
| `POSTGRES_PASSWORD` | postgis | (secret) | Password for that role |
| `POSTGRES_INITDB_ARGS` | postgis | --data-checksums | Enable page checksums at initdb |
| `PORT` | geoserver | 8080 | Tomcat HTTP port, also the health-check port |
| `POSTGRES_DB` | geoserver | - | Database the JNDI pool opens |
| `CORS_ENABLED` | geoserver | true | Allow cross-origin browser map clients |
| `POSTGRES_HOST` | geoserver | - | Private hostname of the database |
| `POSTGRES_PORT` | geoserver | 5432 | Database port |
| `PROXY_BASE_URL` | geoserver | - | Base URL in capabilities documents |
| `SKIP_DEMO_DATA` | geoserver | false | Keep the bundled sample workspaces |
| `RUN_UNPRIVILEGED` | geoserver | true | Run Tomcat as a non-root user |
| `POSTGRES_PASSWORD` | geoserver | (secret) | Password for that role |
| `POSTGRES_USERNAME` | geoserver | (secret) | Role the JNDI pool connects as |
| `RUN_WITH_USER_UID` | geoserver | 999 | Uid Tomcat drops to |
| `GEOSERVER_ADMIN_USER` | geoserver | (secret) | Web UI administrator username |
| `ROOT_WEBAPP_REDIRECT` | geoserver | true | Redirect / to the web interface |
| `POSTGRES_JNDI_ENABLED` | geoserver | true | Publish the pooled JNDI datasource |
| `GEOSERVER_ADMIN_PASSWORD` | geoserver | (secret) | Administrator password, applied on change only |
| `GEOSERVER_MASTER_PASSWORD` | geoserver | (secret) | The `root` account; replaces GeoServer's published default |

## Configuration

- **Start command:** `/bin/sh -c 'M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null); case "$M" in ""|max|*[!0-9]*) M=2147483648;; esac; SB=$((M/4/1048576)); EC=$((M*3/5/1048576)); MW=$((M/16/1048576)); [ "$MW" -gt 1024 ] && MW=1024; [ "$SB" -lt 128 ] && SB=128; echo "[railway] shared_buffers=${SB}MB effective_cache_size=${EC}MB maintenance_work_mem=${MW}MB"; exec docker-entrypoint.sh postgres -c shared_buffers=${SB}MB -c effective_cache_size=${EC}MB -c maintenance_work_mem=${MW}MB -c work_mem=16MB -c dynamic_shared_memory_type=mmap -c random_page_cost=1.1 -c effective_io_concurrency=200 -c wal_compression=on -c max_connections=100'`
- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/geoserver/gwc`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/geoserver_data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/geoserver)
