# Deploy Valhalla on Railway

Self-hosted OSM routing: routes, matrices, isochrones, map matching

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/valhalla)

## About

Valhalla is an open-source routing engine for OpenStreetMap data. This template runs it on Railway backed by a persistent volume, serving turn-by-turn routes, time and distance matrices, isochrones and map matching over any region you point it at.

Valhalla first builds routing tiles from an OpenStreetMap extract, then serves them over HTTP. Doing that on Railway takes three adjustments, all handled here: the service binds Railway's $PORT rather than the hardcoded 8002; a dual-stack listener fronts the router, because Valhalla's zmq socket cannot bind IPv6 while Railway's private network is IPv6-only; and worker threads default to 1, since a container reads the host core count and would otherwise spawn 32+ tile-caching workers and run out of memory. Tiles live on a volume at /custom_files, so they survive redeploys instead of being rebuilt each time.

First boot builds tiles before accepting traffic - about a minute for Monaco, tens of minutes for a country, hours for a continent. The deployment log is the progress bar. Leave the healthcheck path empty; any healthcheck window is shorter than a real first build.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valhalla | `ghcr.io/kolebjak/railway-valhalla:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `tile_urls` | https://download.openstreetmap.fr/extracts/europe/monaco-latest.osm.pbf | One or more .osm.pbf URLs, space separated. Pick your region at https://download.openstreetmap.fr/extracts/ - larger regions take longer to build on first deploy. Geofabrik URLs do not work: Railway cannot reach that host. |
| `server_threads` | 1 | Worker threads. Memory scales with this - raise in small steps and watch the memory graph. |
| `VALHALLA_MAX_LOCATIONS` | 500 | Max locations per matrix request, applied to every costing. Stock Valhalla caps this at 50, and at 20 for truck. |
| `VALHALLA_MAX_MATRIX_PAIRS` | 250000 | Max source x target pairs per matrix request. Keep it at VALHALLA_MAX_LOCATIONS squared. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/custom_files`

**Category:** Other

[View on Railway →](https://railway.com/deploy/valhalla)
