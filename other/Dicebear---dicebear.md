# Deploy Dicebear on Railway

Create avatars for your profiles, designs, websites or apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dicebear)

## About

Dicebear is an open-source avatar generator used to create personalized avatars for modern web applications. With its API-based structure, it can generate random or user-based SVG avatars. It’s simple to use, flexible, and performance-focused.

Hosting Dicebear on your own infrastructure gives you more flexibility and faster response times. By deploying it on Railway, you can easily run a Node.js server with minimal setup. This allows you to generate avatars through your own domain, control caching and security layers, and reduce external service dependencies. Railway’s container-based deployment makes it simple to scale horizontally and vertically with little to no configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dicebear | [dicebear/api](https://github.com/dicebear/api) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PNG` | 1 | Enable the PNG endpoint. Defaults to 1 (true) |
| `AVIF` | 1 | Enable the AVIF endpoint. Defaults to 1 (true) |
| `HOST` | 0.0.0.0 | The host on which the HTTP API should listen. Defaults to 0.0.0.0 (all IPv4 addresses). See https://fastify.dev/docs/latest/Reference/Server#listentextresolver |
| `JPEG` | 1 | Enable the JPEG endpoint. Defaults to 1 (true) |
| `PORT` | 3000 | The port on which the HTTP API should listen. Defaults to 3000 |
| `WEBP` | 1 | Enable the WebP endpoint. Defaults to 1 (true) |
| `LOGGER` | 0 | Enable the logger. Defaults to 0 (false) |
| `WORKERS` | 1 | The number of node worker threads to use. Defaults to 1 |
| `PNG_EXIF` | 1 | Enable EXIF data for the PNG endpoint. Defaults to 1 (true) |
| `VERSIONS` | 5,6,7,8,9 | Comma separated specification of desired DiceBear Major versions. Default to 5,6,7,8,9 |
| `AVIF_EXIF` | 1 | Enable EXIF data for the AVIF endpoint. Defaults to 1 (true) |
| `JPEG_EXIF` | 1 | Enable EXIF data for the JPEG endpoint. Defaults to 1 (true) |
| `WEBP_EXIF` | 1 | Enable EXIF data for the WebP endpoint. Defaults to 1 (true) |
| `PNG_SIZE_MAX` | 128 | The maximum size for the PNG endpoint. Defaults to 128 |
| `PNG_SIZE_MIN` | 1 | The minimum size for the PNG endpoint. Defaults to 1 |
| `AVIF_SIZE_MAX` | 128 | The maximum size for the AVIF endpoint. Defaults to 128 |
| `AVIF_SIZE_MIN` | 1 | The minimum size for the AVIF endpoint. Defaults to 1 |
| `JPEG_SIZE_MAX` | 128 | The maximum size for the JPEG endpoint. Defaults to 128 |
| `JPEG_SIZE_MIN` | 1 | The minimum size for the JPEG endpoint. Defaults to 1 |
| `WEBP_SIZE_MAX` | 128 | The maximum size for the WebP endpoint. Defaults to 128 |
| `WEBP_SIZE_MIN` | 1 | The minimum size for the WebP endpoint. Defaults to 1 |
| `PNG_SIZE_DEFAULT` | 128 | The default size for the PNG endpoint. Defaults to 128 |
| `AVIF_SIZE_DEFAULT` | 128 | The default size for the AVIF endpoint. Defaults to 128 |
| `JPEG_SIZE_DEFAULT` | 128 | The default size for the JPEG endpoint. Defaults to 128 |
| `WEBP_SIZE_DEFAULT` | 128 | The default size for the WebP endpoint. Defaults to 128 |
| `CACHE_CONTROL_AVATARS` | 31536000 | Cache duration for the avatars endpoint in seconds. Defaults to 31536000 (1 year) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/dicebear)
