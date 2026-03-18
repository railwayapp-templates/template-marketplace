# Deploy typesense on Railway

Fast, typo-tolerant open source search engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/DXBDVS)

## About

Typesense is a fast, typo-tolerant search engine for building delightful search experiences. It's an open source alternative to Algolia and an easier-to-use alternative to Elasticsearch.

Hosting Typesense involves deploying a single binary search engine with no runtime dependencies that you can run with a single command. Typesense is simple to set up, integrate with, operate and scale. Built for blazing fast performance with low-latency searches under 50ms, it works with standard web protocols and requires public url access when deployed on Railway. Version upgrades are seamless - simply swap out the binary and restart Typesense.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense | [railwayapp-templates/typesense](https://github.com/railwayapp-templates/typesense) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Private Port |
| `TYPESENSE_URL` | - | Private URL to access Typesense |
| `TYPESENSE_API_KEY` | (secret) | Secret API Key |
| `TYPESENSE_DATA_DIR` | - | The location to store persistent data |
| `TYPESENSE_PUBLIC_URL` | - | Public URL to access Typesense |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | Set this value according to your plan.<br/>Recommended max values: Trial = 8, Hobby = 64, Pro = 200 **(Absolute Max)** |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | Set this value according to your plan.<br/>Recommended max values: Trial = 4, Hobby = 32, Pro = 128 **(Absolute Max)** |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/DXBDVS)
