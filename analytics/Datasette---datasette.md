# Deploy Datasette on Railway

Publishes SQLite databases as a browsable website and JSON API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/datasette)

## About

Datasette turns a SQLite file into a website. Point it at one or more databases and you get browsable tables, faceted filters, full-text search, a SQL console, and a JSON and CSV API for every query — no schema modelling, no dashboards to build, no front-end code. It came out of data journalism and is used by newsrooms, archivists and engineers who need to hand someone a dataset that can be explored rather than a spreadsheet attachment.

Self-host Datasette here and the deploy gives you one `datasette` service, a persistent volume at `/data` holding every SQLite database, and an object-storage bucket that receives compressed snapshots on a schedule. Railway's edge terminates TLS and forwards to the container, which serves the UI and the JSON API from one origin. Sign-in is on out of the box and the instance is private until you say otherwise, so nothing is exposed while you load data.

![Railway diagram of the single Datasette service and its data volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1788511747/datasette-architecture.png)

Datasette generates its interface from whatever the schema contains — tables, columns, foreign keys, indexes and full-text search — so there is no modelling step between "I have a database" and "other people can query it". It suits teams sharing a dataset for exploration rather than maintaining a dashboard, and any dataset that fits on one disk.

- Every table, row and custom query is also JSON and CSV at the same URL
- Faceted browsing, filters, sorting and SQLite full-text search, unconfigured
- A guarded SQL console — `SELECT`s with a time limit and row cap
- Canned queries saved as named, linkable endpoints
- Permissions per instance, per database and per table
- Over 150 plugins for charts, maps, auth, exports and schema editing

This deployment bundles the plugins that turn a read-only viewer into something you can operate: password sign-in, CSV and database upload, schema editing, write queries, a Leaflet cluster map for any table with latitude and longitude, and Jupyter/Pandas export links.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| datasette | [gridalpha/datasette-railway](https://github.com/gridalpha/datasette-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8001 | HTTP port Datasette listens on |
| `S3_BUCKET` | - | Snapshot bucket name |
| `S3_REGION` | - | Bucket placement region |
| `MAX_CSV_MB` | 100 | Largest permitted CSV export |
| `BACKUP_KEEP` | 24 | Snapshots retained per database |
| `S3_ENDPOINT` | - | S3-compatible endpoint URL |
| `HSTS_MAX_AGE` | 31536000 | Strict-Transport-Security max-age seconds |
| `ADMIN_PASSWORD` | (secret) | Sign-in password, hashed at every boot |
| `ADMIN_USERNAME` | (secret) | Sign-in username, mapped to the admin actor |
| `ALLOW_DOWNLOAD` | on | off hides download-database links |
| `BACKUP_ENABLED` | 1 | 0 disables scheduled snapshots |
| `DATASETTE_CORS` | 0 | 1 enables cross-origin reads of the API |
| `SEED_DEMO_DATA` | 1 | Seeds the sample database on first boot |
| `DATASETTE_TITLE` | Datasette | Heading shown on the index page |
| `DATASETTE_PUBLIC` | 0 | 1 lets anonymous visitors browse the data |
| `DATASETTE_SECRET` | (secret) | Signs session cookies, must stay stable |
| `S3_ACCESS_KEY_ID` | - | Bucket access key id |
| `DEFAULT_ALLOW_SQL` | on | off removes the arbitrary-SQL console |
| `MAX_RETURNED_ROWS` | 1000 | Row cap for a single query |
| `SQL_TIME_LIMIT_MS` | 5000 | Per-query execution time limit |
| `FACET_TIME_LIMIT_MS` | 1000 | Facet calculation time budget |
| `S3_SECRET_ACCESS_KEY` | (secret) | Bucket secret access key |
| `DATASETTE_DESCRIPTION` | Explore and publish data as a browsable website and JSON API. | Index page subtitle |
| `BACKUP_INTERVAL_SECONDS` | 3600 | Seconds between database snapshots |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/datasette)
