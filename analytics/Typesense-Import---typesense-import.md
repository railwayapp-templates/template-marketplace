# Deploy Typesense Import on Railway

bulk import JSON into Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-import)

## About

Typesense Import runs Typesense on Railway as a single container with a persistent `/data` volume, `TYPESENSE_API_KEY`, and CORS on port 8108. Use this listing when you want that stack wired for this workflow—not a generic search node with no import or tenancy story.

The first time you push a 2 GB JSON file into a search engine, you meet every rough edge. Rate limits. Schema mismatches. Dropped connections with no idea which records landed. Typesense Import is the discipline around that first bulk load: a repeatable way to stream JSON documents into Typesense collections, batch them without hammering the API, and align schema before indexing.

On Railway you run the official Typesense Docker image with a volume on `/data`, an API key in an environment variable, and CORS enabled. The import workflow is JSON documents hitting port 8108 — via curl, a small script, or any HTTP client that respects batching. Hosting it as a template means the node stays up, the volume survives restarts, and your scripts have a stable URL.

Most teams overthink this. They spin up a managed service, then realize their data is already sitting in JSON exports from Postgres, MongoDB, or a scraper. Typesense Import is for that moment: you have a pile of JSON and need it searchable by lunchtime.

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

[View on Railway →](https://railway.com/deploy/typesense-import)
