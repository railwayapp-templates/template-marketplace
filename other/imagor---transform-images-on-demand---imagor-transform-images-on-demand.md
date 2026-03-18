# Deploy imagor - transform images on demand on Railway

Resize, crop, and optimize images on demand via simple URLs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/imagor-transform-images-on-demand)

## About

### What is imagor?

Imagor is a blazing-fast, Go-powered image processing server that lets you resize, crop, optimize, and transform images on demand through simple URLs. It’s built for speed, security, and flexibility - making it perfect for modern apps, SaaS platforms, and APIs that need powerful image handling without external dependencies.

Hosting Imagor on Railway means you can instantly deploy a production-ready image processing service with zero hassle. Railway takes care of scaling, networking, and environment configuration, so you can focus on delivering responsive, media-rich experiences to your users. Imagor supports multiple storage backends (local, S3, GCS, Cloudflare R2) and integrates seamlessly with your stack. With environment variables like `IMAGOR_SECRET` and `SENTRY_DSN`, you get full control over security and observability, while Railway ensures smooth deployments and auto-scaling infrastructure behind the scenes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| shumc/imagor | `shumc/imagor` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | 0 | Enable debug mode. 0, or off by default. |
| `SENTRY_DSN` | - | Sentry DSN to report errors to your Sentry. |
| `SERVER_CORS` | 0 | Enable CORS. 0, or false by default. |
| `IMAGOR_SECRET` | (secret) | Secret for signing URLs. Required unless unsafe mode. |
| `IMAGOR_UNSAFE` | - | (true / false) Unsafe mode (no URL signature). |
| `ERVER_ACCESS_LOG` | 0 | Enable HTTP access logging. 0, or false by default. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/imagor-transform-images-on-demand)
