# Deploy Simple Image Service on Railway

An image service that helps store and resize images.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simple-image-service)

## About

Simple Image Service is a high-performance image storage and serving platform built with Dart and Dart Frog, designed primarily for Flutter developers. It provides secure image uploads with API key authentication, on-the-fly image transformation (resize, quality adjustment), temporary single-use upload tokens, and a modern web dashboard for managing your images—all with built-in caching and CORS support.

Deploying Simple Image Service on Railway is incredibly straightforward, especially for Flutter developers looking for a backend image solution. Simply click deploy and the Railway template handles everything automatically—no Dockerfile configuration or manual setup required. Built entirely in Dart, the service compiles to a native executable (~20MB) running on a minimal image for optimal performance and security. The template automatically creates the `SECRET_KEY` environment variable for API authentication, mounts a persistent volume at `/app/data` to preserve uploaded images between deployments, and exposes port 8080 for HTTP traffic. With Railway's automatic HTTPS, you get a production-ready image service in seconds with zero infrastructure complexity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mtwichel/image_service:latest | `ghcr.io/mtwichel/image_service:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECRET_KEY` | (secret) | The API key for sensitive operation. |

## Configuration

- **Healthcheck:** `/dashboard`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/simple-image-service)
