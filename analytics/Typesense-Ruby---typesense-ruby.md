# Deploy Typesense Ruby on Railway

official Ruby client against Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-ruby)

## About

Typesense Ruby on this Railway listing is official `typesense/typesense:30.2` on port `8108` with a `/data` volume, `TYPESENSE_API_KEY`, and `--enable-cors`, so InstantSearch clients can query the node.

The image runs `typesense/typesense:30.2`, listens on `8108`, and stores snapshots in `/data`. Pass `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`. Pin `30.2`; future majors may change snapshot format. CORS is only for browser InstantSearch; proxy through Ruby to keep the key private.

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

[View on Railway →](https://railway.com/deploy/typesense-ruby)
