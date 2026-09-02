# Deploy ParadeDB on Railway

ParadeDB: Postgres with BM25 full-text search, vector retrieval & analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paradedb-railway)

## About

ParadeDB is a PostgreSQL distribution that puts a real search engine inside the database. It ships `pg_search`, an index built on the Rust Tantivy library, giving Postgres BM25 relevance scoring, phrase and fuzzy matching, snippet highlighting and faceted aggregations — what teams normally add an Elasticsearch cluster for. The index is maintained by Postgres transactions: no ETL job, no lag between a write and its appearance in results, no second system to secure and upgrade. It also bundles `pgvector`, `pg_ivm`, PostGIS and `pg_cron`, so hybrid keyword-and-vector retrieval is one SQL query.

Deploy ParadeDB on Railway and you get PostgreSQL 18 with those extensions preloaded, a persistent volume, TLS on the wire, and a public TCP endpoint for `psql`, an ORM or a migration job. Backups come wired: every WAL segment is archived to a Railway object storage bucket as it closes and a base backup is taken daily, through the Barman Cloud tooling ParadeDB ships in its image. Self-host ParadeDB without that plumbing and you configure `archive_command`, memory and certificates by hand.

![The ParadeDB service online with its Postgres data volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1788268394/paradedb-architecture.png)

Postgres has had full-text search for years, but `tsvector` ranking is not BM25: no term-frequency saturation, no document-length normalization, poor behaviour on large corpora. That gap is why so many applications run Postgres *and* Elasticsearch.

- **BM25 relevance** with tokenizers, stemming, token filters and snippet highlighting
- **Hybrid search** — BM25 rankings fused with `pgvector` similarity in one query
- **Filtered search** — a match predicate beside ordinary `WHERE`, `JOIN` and `GROUP BY`
- **Aggregations and facets** over columnar storage, for counts by category or date bucket
- **PostGIS and `pg_cron`** included, so geospatial filters and scheduled reindexing need nothing extra

The deployment is one service: the container holds the cluster on a volume at `/var/lib/postgresql`, exposes 5432 through a TCP proxy, and serves an internal health endpoint that runs a real query rather than checking the process exists. A bucket holds the WAL archive and base backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paradedb | [gridalpha/paradedb-railway](https://github.com/gridalpha/paradedb-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Health responder port, not the database port |
| `S3_BUCKET` | - | Backup bucket name |
| `APP_DB_USER` | (secret) | Least-privilege application role |
| `POSTGRES_DB` | paradedb | Database created on first boot |
| `S3_ENDPOINT` | - | Backup bucket endpoint |
| `DATABASE_URL` | - | Private connection string |
| `POSTGRES_USER` | (secret) | Superuser created on first boot |
| `APP_DB_PASSWORD` | (secret) | Application role password |
| `AWS_ACCESS_KEY_ID` | - | Backup bucket access key |
| `POSTGRES_PASSWORD` | (secret) | Superuser password, read by initdb |
| `AWS_DEFAULT_REGION` | - | Backup bucket region |
| `DATABASE_ADMIN_URL` | - | Private superuser connection string |
| `DATABASE_PUBLIC_URL` | - | Public connection string |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Backup bucket secret key |
| `BACKUP_INTERVAL_HOURS` | 24 | Hours between base backups |
| `BACKUP_RETENTION_DAYS` | 7 | Recovery window in days |

## Configuration

- **Healthcheck:** `/healthz`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/paradedb-railway)
