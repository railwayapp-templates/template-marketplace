# Deploy Imagor on Railway

imagor 1.9: fast image resizing and conversion with signed URLs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/imagor-1)

## About

imagor is a fast image processing server written in Go on top of libvips. It resizes, crops, converts and filters images on the fly from a URL, using the same URL syntax as Thumbor. Apps put it in front of their image storage to serve responsive, WebP or AVIF images without preprocessing.

This template runs the official `shumc/imagor:1.9.6` image as one public service. Every request must be signed with `IMAGOR_SECRET`, so strangers cannot use your server to process arbitrary images, and unsigned or `unsafe` URLs are refused. Images are fetched over HTTP from any source by default; restrict `HTTP_LOADER_ALLOWED_SOURCES` to your own buckets if you like. Processed results are cached on a Railway volume for seven days and survive redeploys. libvips concurrency is capped at two threads to stay within Railway's container limits and keep memory use predictable. The server runs as the unprivileged `nobody` user.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| imagor | `shumc/imagor:1.9.6` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `IMAGOR_SECRET` | (secret) |
| `IMAGOR_UNSAFE` | 0 |
| `VIPS_CONCURRENCY` | 2 |
| `HTTP_LOADER_ALLOWED_SOURCES` | * |
| `FILE_RESULT_STORAGE_BASE_DIR` | /data/result |
| `FILE_RESULT_STORAGE_EXPIRATION` | 168h |

## Configuration

- **Start command:** `sh -c 'mkdir -p /data/result; chown nobody:nogroup /data /data/result; exec setpriv --reuid=nobody --regid=nogroup --clear-groups /usr/local/bin/imagor'`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/imagor-1)
