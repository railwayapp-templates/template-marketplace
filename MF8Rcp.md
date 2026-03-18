# Deploy Image Service on Railway

Upload, serve, and process images. On-the-fly image optimization and more. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/MF8Rcp)

## About

# Image Processing Service for Railway

A self-hosted alternative to services like Cloudinary, Imgix, and others that helps you
move faster and pay less when you need to manage image content.

Upload, serve, and process images on Railways. Includes on-the-fly image resizing, cropping, automatic AVIF/WebP, and more.

## Features

- [x] On-the-fly image processing (resize, crop, etc.) from any allowlisted domain or Railway volume
- [x] Automatic AVIF/WebP conversion
- [x] Uses [libvips](https://libvips.github.io/libvips/) for fast image processing
- [x] S3-ish blob storage (PUT, GET, DELETE) protected by an API key
- [x] Secure image serving with URLs protected by SHA256-HMAC signatures
- [x] [React components](https://github.com/jaredLunde/railway-image-service/tree/main/js#react-api), [Node.js client](https://github.com/jaredLunde/railway-image-service/tree/main/js#node-sdk), [URL builder](https://github.com/jaredLunde/railway-image-service/tree/main/js#imageurlbuilder), and [Go client](https://github.com/jaredLunde/railway-image-service/tree/main/client/) for easy integration

## Examples
- [**Astro site**](https://github.com/jaredLunde/railway-image-service/tree/main/web) A web demo using the [Astro](https://astro.build/) web framework

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| image-service | [jaredLunde/railway-image-service](https://github.com/jaredLunde/railway-image-service) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind to TCPv4 host |
| `SECRET_KEY` | (secret) | The secret key used to for accessing the key/value API |
| `SIGNATURE_SECRET_KEY` | (secret) | The secret key used to sign and secure URLs. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Storage · **Languages:** Go, TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/MF8Rcp)
