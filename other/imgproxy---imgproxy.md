# Deploy imgproxy on Railway

Fast and secure on the fly image processing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/imgproxy)

## About

imgproxy is a fast and secure standalone image processing server that resizes, transforms, and optimizes images on the fly. It offloads heavy image work from your application, generates derived images on demand, and is built to handle modern production traffic efficiently.

Hosting imgproxy on Railway gives you a dedicated, production-ready image processing service with minimal setup. This template deploys the official `ghcr.io/imgproxy/imgproxy` container and lets you configure URL signing, allowed image sources, and CORS via environment variables. Railway manages deployments, logs, and scaling so imgproxy can focus on transforming and delivering images. You can point imgproxy at existing HTTPS image sources, plug it into your frontend or backend, and pair it with a CDN to cache transformed images close to your users.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| imgproxy/imgproxy | `ghcr.io/imgproxy/imgproxy` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `IMGPROXY_KEY` | - | Hex encoded key used for generating URL signatures. |
| `IMGPROXY_TTL` | 31536000 | Duration in seconds used for the Cache-Control max-age directive. Default: 31536000. |
| `IMGPROXY_SALT` | - | Hex encoded salt used for generating URL signatures. |
| `IMGPROXY_USE_ETAG` | true | Enables generation of the ETag header for HTTP cache control. |
| `IMGPROXY_ALLOW_ORIGIN` | - | Enables CORS headers for the specified origin. Default: not set. |
| `IMGPROXY_ALLOWED_SOURCES` | - | Comma separated list of allowed source image URL prefixes with optional * wildcards. When not set, all source image URLs are allowed. Default: not set. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/imgproxy)
