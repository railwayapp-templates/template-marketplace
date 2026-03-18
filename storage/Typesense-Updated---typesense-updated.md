# Deploy Typesense (Updated) on Railway

Typesense 30 (RC) – fast, typo-tolerant search, easy stable upgrade

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-updated)

## About

Typesense is a fast, open-source search engine designed for instant, typo-tolerant search. It offers a simple API, predictable performance, and real-time indexing, making it ideal for powering search features in modern applications without the operational complexity of traditional search stacks.

Hosting Typesense involves running a persistent, stateful service that stores indexed data on disk, exposes a search API, and delivers low-latency query performance. This template packages Typesense with Railway-safe defaults, startup scripts, and optional reverse proxy support.

Persistent volumes are used to ensure indexed data survives restarts and redeploys, while environment variables control API keys, ports, and performance tuning. The setup is designed to run reliably on Railway without requiring manual container or system-level configuration, making it suitable for both development and production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Typesense (Updated) | [BigDaddyAman/Typesense-Railway](https://github.com/BigDaddyAman/Typesense-Railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `TYPESENSE_API_KEY` | (secret) | - |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | Set this value according to your plan.Recommended max values: Trial = 8, Hobby = 64, Pro = 200  |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | Set this value according to your plan.Recommended max values: Trial = 4, Hobby = 32, Pro = 128  |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typesense-updated)
