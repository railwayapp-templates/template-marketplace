# Deploy pdf-renderer on Railway

Deploy a backend service to render PDFs from supplied html/css.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pdf-renderer)

## About

PDF Renderer runs as a background service with url access via public and or private network. Supporting ipv4 and ipv6. Uses playwright, NPM, and headless chromium to accomplish its task.

Just need to load it into railway, add a token variable, and fire away. Dockerfile takes care of everything else.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pdf-renderer | [protoapostoli/pdf-renderer](https://github.com/protoapostoli/pdf-renderer) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RENDERER_TOKEN` | (secret) | Simple user-provided token (random is good) to provide basic security. |

**Category:** Other · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/pdf-renderer)
