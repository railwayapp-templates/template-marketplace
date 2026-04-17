# Deploy PostGIS | Open-Source Spatial Database on Railway on Railway

Self Host PostGIS: Spatial queries, topology, raster, routing ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgis-spatial-database)

## About

Deploy PostGIS on Railway to get a production-ready spatial database in minutes. PostGIS extends PostgreSQL with geographic object support, enabling spatial queries, coordinate transformations, topology analysis, and geometry processing — the foundation for any location-aware application.

This Railway template pre-configures a `postgis/postgis:17-3.5` Docker container with PostgreSQL 17 and PostGIS 3.5, persistent volume storage, and a TCP proxy for external client connections.

PostGIS is the most widely used open-source spatial database extension, adding hundreds of spatial functions to PostgreSQL. It implements the OGC Simple Features for SQL specification and is trusted by organizations from startups to government agencies for managing geographic data.

Key features:

- **Spatial indexing** — GiST and SP-GiST indexes for fast geographic queries on millions of records
- **Geometry &amp; geography types** — Store points, lines, polygons, and complex geometries in native data types
- **Coordinate reference systems** — Built-in PROJ support for transformations between 8,000+ CRS definitions
- **Topology support** — Model shared boundaries and connectivity between spatial features
- **Raster processing** — Analyze gridded data (elevation, satellite imagery) alongside vector geometries
- **Routing** — Combine with pgRouting for shortest-path and network analysis
- **Standards-compliant** — OGC SFS, SQL/MM, GeoJSON, KML, WKT/WKB output formats

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostGIS | `postgis/postgis:17-3.5` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | postgis_db | Default database name |
| `DATABASE_URL` | - | Internal connection string |
| `POSTGRES_USER` | (secret) | Database superuser name |
| `POSTGRES_PASSWORD` | (secret) | Database password (generated hex) |
| `DATABASE_PUBLIC_URL` | - | External connection string |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgis-spatial-database)
