# Deploy Openinary on Railway

Openinary is a self-hosted Cloudinary alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openinary-1)

## About

Openinary is an open-source, self-hosted media processing platform. It handles on-the-fly image and video transformations via URL, built-in S3-compatible storage with automatic caching, smart optimization with modern codecs like WebP and AVIF, and a simple REST API with an admin dashboard.

Hosting Openinary involves running a Dockerized service that processes and serves media assets on demand. You'll need a persistent volume for caching, public assets, and the internal database. Once deployed, Openinary exposes a REST API that accepts URL-based transformation parameters for images and videos, handles format conversion, resizing, cropping, and compression automatically. Optionally, you can connect any S3-compatible storage backend, such as AWS S3 or Cloudflare R2, to store and serve your original media files at scale.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Openinary App | `openinary/openinary` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | API PORT - Mandatory for healthchecks |
| `IMAGE_TAG` | latest | Openinary Version |
| `STORAGE_REGION` | - | S3-compatible Storage Region |
| `BETTER_AUTH_URL` | https://example.up.railway.app/ | Paste your base URL after deploying |
| `STORAGE_ENDPOINT` | - | S3-compatible Storage Endpoint |
| `BETTER_AUTH_SECRET` | (secret) | 32 characters long secret |
| `STORAGE_BUCKET_NAME` | - | S3-compatible Storage Name |
| `STORAGE_ACCESS_KEY_ID` | - | S3-compatible Storage Key Identifier |
| `STORAGE_SECRET_ACCESS_KEY` | (secret) | S3-compatible Storage Access Key |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/openinary-1)
