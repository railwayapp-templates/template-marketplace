# Deploy LibreTranslate on Railway

One-Click deployment of Free and Open Source Machine Translation API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/libretranslate-1)

## About

Here is the description formatted as requested, including the One-Click Deployment details.

Hosting LibreTranslate involves deploying a Docker container that serves the API and web interface. The core challenge in hosting is managing the language models (approx. 10GB for all languages). These must either be downloaded to a persistent volume upon startup or "baked" directly into the Docker image during the build process for faster boot times. On Railway, this requires a standard Docker environment with sufficient RAM (minimum 2GB recommended) and environment variables to control which languages are loaded into memory to optimize performance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| libretranslate | [iqbalexperience/libretranslate](https://github.com/iqbalexperience/libretranslate) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LT_LOAD_ONLY` | sv,de,es,fr,pt,da,en | Load only selected model in RAM. https://docs.libretranslate.com/guides/supported_languages/ |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/libretranslate-1)
