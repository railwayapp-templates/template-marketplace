# Deploy PostGIS | (Just Updated) Spatial Database With Routing, H3 and pgvector on Railway

Spatial Postgres with pgRouting, H3 and pgvector, tuned to your plan size

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgis-or-just-updated-spatial-database)

## About

PostGIS turns PostgreSQL into a spatial database: geometry and geography columns, GiST
indexes, `ST_Intersects` / `ST_DWithin` / `ST_Distance`, raster, topology, and the tiger
geocoder. This template runs **PostgreSQL 18.4 with PostGIS 3.6.4**, and adds the three
extensions a real spatial project reaches for next — **pgRouting 4.0.1** for shortest
path and driving distance, **H3 4.2.3** for hexagonal indexing, and **pgvector 0.8.6**
for embeddings — already installed and already enabled in your database.

The database is exposed over a Railway **TCP proxy**, so any client — psql, QGIS, GDAL,
Prisma, PostgREST, a GIS worker in another project — connects with an ordinary
`postgresql://` URL. The `DATABASE_URL` and `DATABASE_PRIVATE_URL` variables are filled
in for you, the password is generated per deploy, and everything durable lives on a
volume mounted at `/var/lib/postgresql`, the parent of the data directory, so a redeploy
keeps your data.

Three things are handled that a stock `postgis/postgis` container does not handle on
Railway:

- **The server is sized from the container's own cgroup limits at boot.** PostgreSQL
  ships 128 MB `shared_buffers`, 4 MB `work_mem`, 64 MB `maintenance_work_mem` and a
  4 GB `effective_cache_size` that describes no container in particular. Those are the
  settings a spatial workload feels first: GiST index builds are
  `maintenance_work_mem`-bound and spatial joins spill to disk on 4 MB. On an 8 GB
  instance this deploy comes up with 1907 MB `shared_buffers` and 119 MB `work_mem`
  instead; measured on the same 5-million-point `ST_Intersects` join in a 2 GB / 2 vCPU
  container, 2.20 s becomes 1.23 s. Every value is passed as a start-up argument, so
  your own `ALTER SYSTEM` still overrides it.
- **TLS uses a key pair generated for your deploy, on your volume.** The usual shortcut
  is to point `ssl_key_file` at Debian's `ssl-cert-snakeoil` files, which are created
  when the image is built — so every container started from that public image shares one
  private key that anybody can pull and read. This deploy generates its own on first
  boot and keeps it across redeploys.
- **The listener is pinned to 5432.** Railway injects `PORT` into every service and
  PostgreSQL reads it, which would move the server off the port the TCP proxy dials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgis | `ghcr.io/bon5co/postgis-railway:18-3.6` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgis-or-just-updated-spatial-database)
