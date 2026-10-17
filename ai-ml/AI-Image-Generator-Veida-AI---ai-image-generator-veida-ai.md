# Deploy AI Image Generator (Veida AI) on Railway

One-page text-to-image app on the Veida AI API, free with no key

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-image-generator-veida-ai)

## About

AI Image Generator (Veida AI) is a one-page text-to-image web app: type a prompt, pick an aspect ratio and get the finished picture back in about a minute. Images come from the API of [Veida AI](https://veida.ai/?utm_source=railway&amp;utm_medium=template), an unlimited free AI image generator, so it runs with no API key.

The app is one Node.js file with no npm dependencies. It serves the page and two small routes: one submits the prompt to the Veida AI API, the other polls until the image is ready. Nothing needs configuring: without a key each generation is one free run on Veida AI Image v1, about seven a day per server. Set `VEIDA_API_KEY` (create one at [veida.ai/settings/apikeys](https://veida.ai/settings/apikeys?utm_source=railway&amp;utm_medium=template)) to run on your own account, and `VEIDA_MODEL` to pick another model such as `gpt-image-2`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| veida-image-starter | [hanshs474/veida-image-starter](https://github.com/hanshs474/veida-image-starter) | Worker |

**Category:** AI/ML · **Languages:** JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/ai-image-generator-veida-ai)
