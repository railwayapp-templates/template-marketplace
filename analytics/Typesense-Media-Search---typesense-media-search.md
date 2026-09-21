# Deploy Typesense Media Search on Railway

search video, audio, and assets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-media-search)

## About

The first time you watch a producer dig through a media library for "that interview clip, the one with the CEO, it was maybe six minutes long" and come up empty because tags say "executive interview" and the search box demands an exact match, you understand why typo-tolerant faceted search matters. Typesense Media Search is Typesense configured for video, audio, and image assets — titles, descriptions, tags, duration, bitrate, resolution, format, uploader — all indexed for instant, filterable lookup. Deploy it on Railway with the official `typesense/typesense:30.2` image, attach a volume, set one API key, and you have a search engine that returns results in single-digit milliseconds and survives redeploys without losing your index. No Elasticsearch cluster to tune. No Algolia bill that scales with every keystroke.

Typesense is GPL-3.0 open-source software — a single Go binary that builds an in-memory inverted index and serves search queries over a REST API on port 8108. The "media search" part isn't a separate product; it's a schema design pattern. You create a collection where `title`, `description`, and `tags` are searchable text fields, while `duration`, `file_size`, `bitrate`, and `upload_date` are numeric facets, and `format`, `orientation`, `license_type`, and `uploader` are string facets. Users then filter with query parameters like `filter_by=duration:&lt;600&amp;&amp;format:mp4` and get typo-tolerant results instantly.

Hosting it on Railway means running the official Docker image as a service with a persistent volume mounted at `/data`. That volume is the only stateful thing in the whole setup. Typesense writes its on-disk snapshot there periodically, and when Railway restarts or redeploys the container, the index reloads from that snapshot. Skip the volume and every deploy is a full re-ingest of your media catalog. The API key you set at boot is the sole admin credential — Typesense has no user system, no database backend, and no configuration file to manage. Just the binary, the data directory, and the key.

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

[View on Railway →](https://railway.com/deploy/typesense-media-search)
