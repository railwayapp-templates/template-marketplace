# Deploy SERP API for AI, SEO & automation | OpenSERP on Railway

Browser-rendered Google, Bing, Yandex, Baidu, DuckDuckGo and Ecosia search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openserp)

## About

OpenSERP is a free, open-source SERP API and CLI built in Go that provides live search data from Google, Yandex, Baidu, Bing, DuckDuckGo, and Ecosia. It features megasearch deduplication, markdown/text target-page URL extraction, and built-in SERP elements like AI summaries, serving as an ideal search tool for LLMs and SEO pipelines.

Hosting and deploying OpenSERP involves running its Go-based API server inside a containerized environment. On Railway, this process is streamlined through a Dockerfile or a prebuilt Docker image (`karust/openserp:latest`). The deployment maps the server's internal port (typically 7000) to a public URL and handles runtime configuration via environment variables. To operationalize the service effectively, developers configure application settings such as custom scrapers, proxies to bypass search engine rate limits, and caching layers. Once live, Railway continuously monitors the instance and provides interactive Swagger UI documentation directly at the root path for immediate integration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openserp | [iqbalexperience/openserp](https://github.com/iqbalexperience/openserp) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Go, JavaScript, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/openserp)
