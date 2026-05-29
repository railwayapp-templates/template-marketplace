# Deploy PicFlow: On-the-fly Image Processing on Railway

High-performance, streaming image optimization built with Sharp+Bun.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/picflow-on-the-fly-image-processing)

## About

PicFlow is a high-performance image transformation server built with Bun, Sharp, and S3-compatible object storage. It streams images directly from storage and applies real-time transformations like resizing, rotation, optimization, and format conversion with support for AVIF, WebP, PNG, and JPEG.

Hosting PicFlow on Railway provides a scalable and production-ready image processing service without managing infrastructure manually. PicFlow connects to any S3-compatible storage provider and transforms images on demand using Sharp’s high-performance streaming pipeline.

The service supports resizing, cropping, rotation, filters, automatic format negotiation, and image optimization while minimizing memory usage through stream-based processing. Railway simplifies deployment with automatic builds, environment variable management, networking, observability, and horizontal scaling, making it easy to integrate PicFlow into modern web applications, CDNs, CMS platforms, and media-heavy services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PicFlow Image Server | [dane-stevens/image-optimization](https://github.com/dane-stevens/image-optimization) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `S3_SECRET_ACCESS_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/picflow-on-the-fly-image-processing)
