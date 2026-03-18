# Deploy Public Bucket Image Proxy on Railway

Public proxy for images in a bucket, with image optimization using imgproxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/public-bucket-image-proxy)

## About

A lightweight, high-performance image proxy that publicly serves images from a private bucket. It dynamically resizes and optimizes images on the fly using [imgproxy](https://imgproxy.net/), reducing bandwidth and improving load times without exposing your storage endpoints.

Deploy a production-ready instance with zero configuration. It connects seamlessly to an S3-compatible Railway Bucket, giving you on-demand image transformations via simple URL parameters. Once deployed, it automatically handles proxying, optimizing and delivering images for websites, applications, and APIs. imgproxy is lightweight and resource-efficient, so it doesn't cost a lot to host on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| public imgproxy | `ghcr.io/imgproxy/imgproxy:v3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `IMGPROXY_USE_S3` | true | enables image fetching from Amazon S3 buckets |
| `AWS_ACCESS_KEY_ID` | - | the S3 bucket's access key id |
| `IMGPROXY_AUTO_AVIF` | true | enables AVIF support detection. When the file extension is omitted in the imgproxy URL and browser supports AVIF, imgproxy will use it as the resulting format |
| `IMGPROXY_AUTO_WEBP` | true | enables WebP support detection. When the file extension is omitted in the imgproxy URL and browser supports WebP, imgproxy will use it as the resulting format |
| `IMGPROXY_S3_REGION` | - | the S3 bucket's region |
| `IMGPROXY_S3_ENDPOINT` | - | the S3 endpoint imgproxy should use |
| `AWS_SECRET_ACCESS_KEY` | (secret) | the S3 bucket's secret access key |
| `IMGPROXY_ALLOWED_SOURCES` | - | an allowlist of source image URL prefixes divided by comma |
| `IMGPROXY_MAX_RESULT_DIMENSION` | - | maximum width or height the resultant image can have, in pixels |
| `IMGPROXY_SKIP_PROCESSING_FORMATS` | gif | a list of formats that imgproxy shouldn't process, comma divided |
| `IMGPROXY_S3_ENDPOINT_USE_PATH_STYLE` | true | controls to access the S3 bucket constructed using the path style |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/template/public-bucket-image-proxy)
