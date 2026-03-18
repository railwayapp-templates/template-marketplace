# Deploy LibreTranslate on Railway

LibreTranslate is a Free and Open Source Machine Translation API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/libretranslate)

## About

**LibreTranslate** is a free, open-source machine translation API you can self-host. It exposes simple REST endpoints (e.g., `/translate`, `/detect`, `/languages`) and includes an optional web UI. No external cloud required: you run the service and control models, limits, and access policies yourself.

LibreTranslate ships as a containerized web service, so hosting is straightforward: run the Docker image, bind the HTTP server, and (optionally) mount storage to persist models and settings. By default it listens on **port 5000**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| libretranslate/libretranslate | `libretranslate/libretranslate` | Worker |

**Category:** Other

[View on Railway →](https://railway.com/template/libretranslate)
