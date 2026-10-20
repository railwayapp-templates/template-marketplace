# Deploy PostGIS 3.6 Spatial Database on Postgres 18 on Railway

Drop-in Postgres with PostGIS for maps, geofencing and spatial queries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgis-36-spatial-database-on-postgres-)

## About

PostGIS adds geometry and geography types, spatial indexes and hundreds of spatial functions to PostgreSQL. This template deploys PostgreSQL 18 with PostGIS 3.6 on Railway's own SSL-enabled Postgres image, with the same connection variables as Railway Postgres, automatic tuning, daily backups to a Railway Bucket and an optional public TCP proxy.

PostGIS runs inside Postgres, so hosting it means a well-run Postgres server with the PostGIS packages installed and the extensions enabled. This community template builds on `ghcr.io/railwayapp-templates/postgres-ssl:18`, the image behind Railway's Postgres template, and adds PostGIS 3.6 from the PostgreSQL apt repository, the same packages the official `postgis/postgis` image uses. First boot enables PostGIS, topology, fuzzy string matching and query statistics and creates `template_postgis`. Every boot sizes memory and parallel-query settings from the service's limits. A nightly cron job writes compressed `pg_dump` backups of every database to a Railway Bucket and prunes old ones only after a successful run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostGIS Backup | [baranberkay96/postgis-railway](https://github.com/baranberkay96/postgis-railway) (branch: main) (root: /services/backup) | Worker |
| PostGIS | [baranberkay96/postgis-railway](https://github.com/baranberkay96/postgis-railway) (branch: main) (root: /services/postgis) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BACKUP_PREFIX` | PostGIS Backup | postgis | Folder in the bucket; each run writes {prefix}/{YYYYMMDDTHHMMSSZ}/ plus {prefix}/LATEST. |
| `BACKUP_PING_URL` | PostGIS Backup | - | Optional URL requested after each successful run (e.g. a healthchecks.io check) to alert on missed backups. |
| `BACKUP_DATABASES` | PostGIS Backup | - | Optional comma-separated databases to dump. Empty = every non-template database. |
| `BACKUP_S3_BUCKET` | PostGIS Backup | - | S3 name of the Railway Bucket. |
| `BACKUP_S3_REGION` | PostGIS Backup | - | Bucket region. |
| `BACKUP_COMPRESSION` | PostGIS Backup | zstd:6 | pg_dump --compress value (zstd:N, gzip:N, lz4 or none). |
| `BACKUP_S3_ENDPOINT` | PostGIS Backup | - | S3 endpoint of the Railway Bucket. |
| `BACKUP_RETENTION_DAYS` | PostGIS Backup | 14 | Backups older than this are deleted after a fully successful run. 0 keeps everything. |
| `BACKUP_S3_ACCESS_KEY_ID` | PostGIS Backup | - | Bucket access key. |
| `BACKUP_S3_FORCE_PATH_STYLE` | PostGIS Backup | false | Railway Buckets use virtual-hosted URLs; true only if the Bucket's Credentials tab says path-style. |
| `BACKUP_S3_SECRET_ACCESS_KEY` | PostGIS Backup | (secret) | Bucket secret key. |
| `PG_TUNE` | PostGIS | true | true: size shared_buffers, work_mem, parallel workers etc. from the container's memory/CPU limits at every boot. false: Postgres defaults. |
| `POSTGRES_DB` | PostGIS | railway | Database created on first boot, with PostGIS, postgis_topology, fuzzystrmatch and pg_stat_statements enabled. |
| `DATABASE_URL` | PostGIS | - | Private connection URL for services in this project (reference PostGIS.DATABASE_URL from your app's variables). |
| `PG_TUNE_CPUS` | PostGIS | - | Optional CPU count for parallel-query settings. Empty = the service CPU quota, capped at 8. |
| `POSTGRES_USER` | PostGIS | (secret) | Superuser created on first boot (Railway Postgres default). |
| `PG_REQUIRE_TLS` | PostGIS | false | true: every non-local login must use TLS (pg_hba hostssl), including private-network apps. Keep false for drop-in compatibility. |
| `PG_TUNE_MEMORY_MB` | PostGIS | - | Optional memory budget in MiB for the tuning. Empty = the service memory limit, capped at 16384. |
| `POSTGRES_PASSWORD` | PostGIS | (secret) | Superuser password, generated at deploy (32 letters, URL-safe). Changing it later needs ALTER USER as well. |
| `DATABASE_PUBLIC_URL` | PostGIS | - | Public URL through the TCP proxy (QGIS, psql, apps outside Railway). TLS is offered; add ?sslmode=require for libpq clients. Empty host if the TCP proxy is removed. |
| `POSTGIS_AUTO_UPDATE` | PostGIS | true | Apply PostGIS patch updates (3.6.x) to existing databases after an image rebuild. Minor upgrades are never automatic. |
| `POSTGIS_TIGER_GEOCODER` | PostGIS | false | First boot only: also create the legacy US TIGER geocoder (removed in PostGIS 3.7). |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Tags:** postgis, postgres, postgresql, gis, geospatial · **Languages:** Shell, Dockerfile, PLpgSQL

[View on Railway →](https://railway.com/deploy/postgis-36-spatial-database-on-postgres-)
