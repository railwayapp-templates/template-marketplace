# Deploy SearXNG Search API — Private Metasearch for AI on Railway

Self-hosted search API for AI agents — JSON, no API keys, Valkey

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-valkey-ai-search)

## About

SearXNG is a privacy-first, open-source metasearch engine — a federated search aggregator that pulls results from Google, Bing, DuckDuckGo, and 200+ other sources without tracking you, logging your queries, or serving ads. With its JSON API enabled, it doubles as a free, unlimited web-search backend for AI agents and automation, so your LLM tools can search the live web without paying for the Google or Bing API.

This template deploys SearXNG with a Valkey cache, JSON API pre-enabled, and the cryptographic secret generated for you.

---

SearXNG proxies your searches across many engines and returns aggregated results with no profiling and no query logging. Self-hosting it means the aggregation happens on infrastructure you control rather than a public instance that could be rate-limited, monitored, or offline when you need it.

The bigger reason to run your own is AI. With `json` added to its output formats, SearXNG becomes a drop-in web-search tool for n8n, LangChain, LiteLLM, Flowise, and custom agents — real-time search for your LLM stack without a per-query bill from a commercial search API. This template enables the JSON API out of the box.

There is one configuration subtlety that trips most deployments: SearXNG reads its config from `settings.yml` baked into the image. If you mount a volume at `/etc/searxng`, it shadows that file and the API returns 403 Forbidden. This template deliberately bakes config into the image and mounts no volume there, so the JSON API works on first deploy.

Typical cost: **~$5/month** on Railway's Hobby plan for both services — flat, with no per-search charges ever.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| SearXNG | [praveen-ks-2001/searxng-railway-template](https://github.com/praveen-ks-2001/searxng-railway-template) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | SearXNG | 8080 | - |
| `INSTANCE_NAME` | SearXNG | My SearXNG | - |
| `UWSGI_THREADS` | SearXNG | 4 | - |
| `UWSGI_WORKERS` | SearXNG | 4 | - |
| `SEARXNG_SECRET` | SearXNG | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/searxng-valkey-ai-search)
