# Deploy repix on Railway

Image transformation alternative to cloudinary, imgix, twicpics, imagekit

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/repix)

## About

Open-source Image transformation  service. Alternative to cloudinary, imgix, twicpics, imagekit, vercel images and cloudflare images

**[Full documentation](https://repix.bansal.io)**

The high-performance image transformation service. Transform, optimize, and deliver images at lightning speed with Repix's powerful URL-based API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| repix | `ghcr.io/bansal/repix:1.0.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CORS_ORIGIN` | * |
| `ALLOW_PRESETS` | true |
| `CACHE_CONTROL` | public, max-age=31536000, immutable |
| `FETCH_TIMEOUT` | 10000 |
| `SOURCE_PREFIX` | https:// |
| `IMAGE_MAX_WIDTH` | 2048 |
| `CORS_CREDENTIALS` | (secret) |
| `IMAGE_MAX_HEIGHT` | 2048 |
| `ALLOW_ORIGINAL_IMAGE` | true |
| `IMAGE_DEFAULT_QUALITY` | 85 |
| `ALLOW_CUSTOM_TRANSFORMS` | true |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/template/repix)
