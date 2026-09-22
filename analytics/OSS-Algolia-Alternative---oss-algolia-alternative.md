# Deploy OSS Algolia Alternative on Railway

open-source Algolia alternative on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oss-algolia-alternative)

## About

You're looking at a $400 Algolia invoice for a side project that gets maybe 3,000 searches a month. The per-request math made sense at 500 searches. It doesn't at 50,000. That's the moment teams start typing "open source Algolia alternative" into a search bar — and land on Typesense. This Railway template wraps the Typesense engine as **OSS Algolia Alternative**, a GPL-3.0 instant search server you run on your own infrastructure, with your own RAM, your own data directory, and no metered search-request billing. You get typo tolerance, faceted filtering, and an InstantSearch.js adapter that drops into existing Algolia frontends with surprisingly little surgery. The tradeoff is you become the operator. The upside is your invoice stops scaling with your traffic.

OSS Algolia Alternative is the Typesense engine under a marketplace name that says what it does. Typesense is a search server written in C++ — not a Lucene fork, not an Elasticsearch wrapper — built for one job: return relevant results in under 100 milliseconds. It stores documents in memory, which is why RAM sizing matters more than disk speed. On Railway, this template runs the official `typesense/typesense:30.2` Docker image with a persistent volume mounted at `/data`. The API listens on port 8108. You set a `TYPESENSE_API_KEY` environment variable before the container starts, because Typesense refuses to boot without one. That key is the only thing standing between your index and anyone who can reach the port, so don't treat it like a throwaway dev secret.

The GPL-3.0 license is the part that actually matters for teams leaving Algolia. Algolia is SaaS-only — there is no self-hosted Algolia. You can't download it, you can't run it in a VPC, you can't pin a version. Typesense gives you the full engine, the same code that powers Typesense Cloud, under a copyleft license that lets you modify it as long as you share modifications. For most teams, that's the whole point.

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

[View on Railway →](https://railway.com/deploy/oss-algolia-alternative)
