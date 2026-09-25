# Deploy RisingWave on Railway

RisingWave 3.1 Postgres-compatible streaming database with a root password.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/risingwave-1)

## About

RisingWave is a Postgres-compatible streaming database. You ingest events from Kafka, Postgres CDC, webhooks or plain inserts, define materialized views in SQL, and RisingWave keeps them incrementally up to date in real time. Any Postgres driver, `psql` or BI tool can query the results with low latency.

This template deploys RisingWave v3.1.0 in single-node mode from a small public wrapper image that builds on the official one, pinned by digest. The wrapper sets a generated password on the `root` user at every start, and only loopback connections inside the container are trusted, so every other client needs the password. State is stored on a Railway volume. Services connect over the private network on port 4566, and external clients use the Railway TCP proxy. RisingWave needs memory: give it at least 2 GB and consider the Pro plan for real workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| risingwave | [aalfath/risingwave-railway-template](https://github.com/aalfath/risingwave-railway-template) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5691 |
| `RW_ROOT_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/`
- **TCP Proxies:** 4566
- **Volume:** `/risingwave/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/risingwave-1)
