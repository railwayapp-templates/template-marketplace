# Deploy SearXNG | (Just Updated) AI Agent Search API, 16x Concurrent Searches on Railway

Search API for agents: JSON results answer on the first deploy, not 403

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-v202683-or-ai-agent-search-api-1)

## About

SearXNG is a free, open-source **metasearch engine**: it forwards a query to dozens of upstream search services, merges and re-ranks the results, and returns them without logging the query or building a profile. This template ships it as a **working JSON search API** — the endpoint an LLM agent, RAG pipeline or Open WebUI web-search backend actually calls — on **one service**, with the concurrency ceiling raised off its stock value of four.

Two things decide whether a self-hosted SearXNG is usable as an API, and neither is visible until after the deploy.

**The JSON API is off by default.** SearXNG's own defaults set `search.formats: [html]`, so `/search?q=…&amp;format=json` answers **403 Forbidden** on a stock instance — the exact call every agent framework makes. There is no environment variable for it: `searx/settings_loader.py` reads only `SEARXNG_SETTINGS_PATH`, so the format list can only be widened inside `settings.yml`. This template's image bakes `formats: [html, json, csv, rss]` into the settings file, and repairs the list in place if a volume from an earlier deploy still carries the stock value.

**A stock instance serves exactly four concurrent searches, on any plan.** The server is Granian, whose `--workers` defaults to `1`, and the upstream image bakes `GRANIAN_BLOCKING_THREADS=4`. Four slots is the whole capacity; the fifth caller queues. A SearXNG request spends nearly all its time blocked on upstream engines, so the fix is threads rather than worker processes — measured on a 4-vCPU container against a deterministic 2-second search, 64 concurrent requests took **32082 ms** stock and **2392 ms** at 64 blocking threads, for **+11 MiB** of RSS. Reaching the same capacity with four worker *processes* instead cost 3.2× the memory (95.6 MiB → 307.9 MiB) and was no faster.

This template's entrypoint sizes the thread count from the container's own `/sys/fs/cgroup/cpu.max` rather than from `nproc`, which inside a container reports the host's core count. The reference deploy logs `cpu=8 blocking_threads=64` — 16× the stock ceiling.

It also hands Railway's injected `$PORT` to the server, which the upstream entrypoint does not do (it maps only `SEARXNG_PORT`), and pins the upstream image to `2026.8.3-aa059419f` instead of tracking a `:latest` tag that changes daily.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| searxng | `ghcr.io/bon5co/searxng-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SEARXNG_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/searxng`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/searxng-v202683-or-ai-agent-search-api-1)
