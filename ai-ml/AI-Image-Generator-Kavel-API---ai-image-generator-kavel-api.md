# Deploy AI Image Generator (Kavel API) on Railway

One-page text-to-image web app on the Kavel API, zero dependencies

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-image-generator-kavel-api)

## About

A one-page text-to-image web app: type a prompt, pick 1:1, 16:9 or 9:16, and get the picture back in about a minute. One file of Node server code with no dependencies. Images come from the [Kavel](https://www.kavel.ai/?utm_source=railway&amp;utm_medium=template) HTTP API.

The service is a single Node 18+ process that serves the page and proxies two calls to Kavel: submit a prompt, then poll the task until the image is ready. It works with nothing configured on Kavel's free anonymous tier (watermarked, a couple of images a day per server IP). Add `KAVEL_API_KEY` to run on your own account, and `KAVEL_MODEL` to pick a model your plan includes. Railway provides `PORT`, and `/health` is the health check.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kavel-image-starter | [hanshs474/kavel-image-starter](https://github.com/hanshs474/kavel-image-starter) | Worker |

**Category:** AI/ML · **Languages:** JavaScript, HTML

[View on Railway →](https://railway.com/deploy/ai-image-generator-kavel-api)
