# Deploy SearXNG on Railway

A free internet metasearch engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng)

## About

[SearXNG](https://github.com/searxng/searxng) is a free internet metasearch engine which aggregates results from up to 245 [search services](https://docs.searxng.org/user/configured_engines.html#configured-engines). Users are neither tracked nor profiled. Additionally, SearXNG can be used over Tor for online anonymity.

This template allows you to host SearXNG on Railway out-of-the-box using its official image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SearXNG | `searxng/searxng:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SEARXNG_SECRET` | (secret) | Used for cryptography purpose. It's highly recommended to randomly generate a strong key for this! |
| `SEARXNG_LIMITER` | false | Requires [`SEARXNG_VALKEY_URL`](https://docs.searxng.org/admin/settings/settings_valkey.html) |
| `SEARXNG_BASE_URL` | - | Handled by Railway, don't change unless you know what you're doing |
| `SEARXNG_VALKEY_URL` |   | See SearXNG's [`valkey:`](https://docs.searxng.org/admin/settings/settings_valkey.html) documentation for the formatting |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/cache/searxng/`

**Category:** Other

[View on Railway →](https://railway.com/deploy/searxng)
