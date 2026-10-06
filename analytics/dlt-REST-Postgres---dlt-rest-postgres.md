# Deploy dlt REST Postgres on Railway

Paginated REST ingestion with merge loading and PostgreSQL state.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dlt-rest-postgres)

## About

Paginated REST ingestion with merge loading and PostgreSQL state.

This copy describes an unpublished marketplace candidate; publication requires the independent gates below.

Template release **v1.0.1**; [VERSION](VERSION) is authoritative. A source release does not prove marketplace publication or live Railway qualification. This release must be qualified independently. Historical local evidence for v1.0.0 (2026-10-02) used authenticated synthetic orders and does not establish current live qualification or observed hourly Railway scheduler firing.

Two private repo-backed services: an exiting `dlt Loader` and a least-privilege `Postgres` wrapper. Both select `tech-progress/dlt-rest-postgres`, branch `release-v1`, root `/`; verify real source access before deployment. Postgres alone has one 5000 MB mount at `/var/lib/postgresql/data`. The loader uses `python pipeline.py`, hourly UTC `0 * * * *`, one replica, and restart policy `NEVER`. No public domains/TCP proxies, loader volume, web UI, or default fixture is included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | [tech-progress/dlt-rest-postgres](https://github.com/tech-progress/dlt-rest-postgres) (branch: release-v1) (root: /) | Database |
| dlt Loader | [tech-progress/dlt-rest-postgres](https://github.com/tech-progress/dlt-rest-postgres) (branch: release-v1) (root: /) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Postgres | 5432 | Private PostgreSQL port. Do not create a public TCP proxy. |
| `POSTGRES_DB` | Postgres | warehouse | Database containing both warehouse tables and dlt destination state. |
| `POSTGRES_USER` | Postgres | (secret) | Image initialization administrator; never used by the ingestion process. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password; changing this variable alone does not rotate existing database roles. |
| `DLT_LOADER_PASSWORD` | Postgres | (secret) | Separate generated password for the schema-scoped nonsuperuser dlt_loader role; initialized only on an empty volume. |
| `PGSSLMODE` | dlt Loader | prefer | libpq SSL mode; prefer on Railway private networking, verify-full for external TLS databases. |
| `DATASET_NAME` | dlt Loader | rest_warehouse | Stable lowercase destination schema name; changing creates a separate dataset. |
| `PIPELINES_DIR` | dlt Loader | /tmp/dlt-pipelines | Ephemeral extraction/load scratch directory. Completed state restores from destination, not unfinished local packages. |
| `PIPELINE_NAME` | dlt Loader | rest_orders | Stable lowercase pipeline identity; keep unchanged during replacement and upgrades. |
| `SOURCE_BASE_URL` | dlt Loader | - | Required operator-supplied HTTPS REST API base URL; no embedded credentials. |
| `SOURCE_ENDPOINT` | dlt Loader | orders | Relative orders endpoint; returns data array and total_pages. |
| `SOURCE_API_TOKEN` | dlt Loader | (secret) | Required operator-supplied read-only API bearer token; not a generated token your upstream would recognize. |
| `SOURCE_PAGE_SIZE` | dlt Loader | 50 | page_size query parameter, integer 1..1000; API must support page-number pagination. |
| `ALLOW_INSECURE_SOURCE` | dlt Loader | false | Keep false in deployments. true allows the private HTTP test fixture only. |
| `SOURCE_INITIAL_CURSOR` | dlt Loader | 0 | Initial updated_at Unix-second watermark, nonnegative integer. Changing it does not reset existing state. |
| `SOURCE_LOOKBACK_SECONDS` | dlt Loader | 3600 | Nonnegative cursor overlap for bounded late changes; does not capture old deletions or arbitrary backdated updates. |
| `RUNTIME__DLTHUB_TELEMETRY` | dlt Loader | false | Disable upstream dlt anonymous telemetry. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** JavaScript, Python, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/dlt-rest-postgres)
