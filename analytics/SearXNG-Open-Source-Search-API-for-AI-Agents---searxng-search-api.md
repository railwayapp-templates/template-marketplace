# Deploy SearXNG | Open Source Search API for AI Agents on Railway

Self-Host SearXNG. Open source, AI-ready search, 70+ engines combined

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-search-api)

## About

Self-host SearXNG — the free, open-source metasearch engine that aggregates results from 70+ sources (Google, Bing, DuckDuckGo, and more) without tracking or profiling users. Unlike closed privacy search tools, SearXNG gives you full control: choose your engines, tune your results, and expose a clean JSON API for AI agents and automation workflows.

Deploy SearXNG on Railway in one click with this template. It uses the official `docker.io/searxng/searxng:latest` image, pre-configured with JSON API access enabled and a Redis cache for rate limiting — no Docker knowledge or manual config editing required. The GitHub repo for this template is at [https://github.com/protemplate/searxng](https://github.com/protemplate/searxng).

SearXNG is a privacy-first federated metasearch engine forked from Searx, with 15k+ GitHub stars and active community maintenance. It queries multiple search engines simultaneously and strips tracking from every request before returning results.

Key features:
- **230+ supported engines** — web, images, news, video, maps, science, files, and more
- **JSON API** — structured search results for AI agents, LLMs, and automation pipelines
- **No tracking, no ads, no profiling** — user IPs are never sent to downstream engines
- **Redis-backed rate limiting** — protects public instances from abuse
- **Fully configurable** — tune engines, categories, safe search, and UI via `settings.yml`

This template runs SearXNG (app server) alongside Redis (ephemeral cache for rate limiting and session state). The two services communicate over Railway's private network — Redis is never exposed publicly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| SearXNG | [praveen-ks-2001/searxng-railway-template](https://github.com/praveen-ks-2001/searxng-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `PORT` | SearXNG | 8080 | HTTP server listening port |
| `INSTANCE_NAME` | SearXNG | My SearXNG | Display name of search instance |
| `UWSGI_THREADS` | SearXNG | 4 | Threads per worker process |
| `UWSGI_WORKERS` | SearXNG | 4 | Number of worker processes |
| `SEARXNG_SECRET` | SearXNG | (secret) | Secret key for application security |
| `SEARXNG_BASE_URL` | SearXNG | - | Public base URL for instance |
| `SEARXNG_REDIS_URL` | SearXNG | - | Redis connection string |
| `SEARXNG_VALKEY_URL` | SearXNG | - | Valkey/Redis connection URL |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/searxng-search-api)
