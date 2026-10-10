# Deploy Typesense Django on Railway

Django admin and app search on Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-django)

## About

Django admin search that still leans on `icontains` gets painful once catalogs grow — every keystroke can turn into a sequential scan. This listing is Typesense OSS on Railway for Django apps using `django-typesense` (admin live search via `TypesenseSearchAdminMixin`) or the official `typesense` Python client with signals and management-command backfills.

When Django's `icontains` search crawls on big tables, add Typesense—an in-memory search engine on HTTP port 8108. Keep the ORM for writes; Typesense handles typo-tolerant instant search, facets, and geosearch. On Railway, run `typesense/typesense:30.2` with a `/data` volume and `TYPESENSE_API_KEY`. GPL-3.0, no license fee. RAM is the real constraint: the index lives in memory. Persist `/data`; Typesense writes snapshots and a WAL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense-railway | [Shinyduo/typesense-railway](https://github.com/Shinyduo/typesense-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | PORT |
| `TYPESENSE_URL` | - | TYPESENSE_URL |
| `TYPESENSE_API_KEY` | (secret) | TYPESENSE_API_KEY |
| `TYPESENSE_DATA_DIR` | - | TYPESENSE_DATA_DIR |
| `TYPESENSE_PUBLIC_URL` | - | TYPESENSE_PUBLIC_URL |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | TYPESENSE_THREAD_POOL_SIZE |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typesense-django)
