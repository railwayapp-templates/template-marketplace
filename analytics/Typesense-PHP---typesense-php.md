# Deploy Typesense PHP on Railway

official PHP client against Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-php)

## About

The Typesense PHP package is a Composer library that talks to a Typesense server over HTTP on port 8108. The server runs on Railway behind a persistent volume and an API key you must not lose. The PHP client only needs the node URL and that key.

A common gotcha is forgetting that every request must carry the `X-TYPESENSE-API-KEY` header, which the client handles once you pass the key. Collection schema drift also bites: changing a field type requires dropping and recreating the collection. Inside Railway, your PHP app can reach the service at `http://typesense:8108` without exposing the API port publicly.

Railway’s Typesense template runs the official Docker image `typesense/typesense:30.2`, not a fork. The container starts with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`, and `/data` is mounted on a volume so indexes survive restarts. The PHP client isn’t a separate service; you add it to your app via Composer with `typesense/typesense-php`.

The client is just an HTTP wrapper, so it needs PHP 7.4+, Composer 2, and network access to the Railway service. The server is RAM-hungry because Typesense keeps the entire index in memory. A 50,000-record catalog fits in 512 MB; a million records with long text may need 2 GB or more.

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

[View on Railway →](https://railway.com/deploy/typesense-php)
