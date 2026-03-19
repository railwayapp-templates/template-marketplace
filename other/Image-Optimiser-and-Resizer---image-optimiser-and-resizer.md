# Deploy Image Optimiser and Resizer on Railway

Self-hosted image optimizer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/image-optimiser-and-resizer)

## About

Image Optimiser and Resizer is a lightweight, self-hosted image optimization tool built with Bun and Sharp.js. Upload any image through a clean, mobile-responsive web UI and convert it to WebP, resize it, or do both in one step — with instant downloads and a built-in history panel.

Hosting Image Optimiser and Resizer requires a runtime that supports Bun and the Sharp native image processing library. The app runs as a single containerized service using an Alpine-based Docker image with `vips` for native image manipulation. It serves a static frontend alongside a Bun-powered API server that handles uploads, processing, and file delivery. No database or external services are required — optimization history is stored in a local JSON file, and processed images are saved to disk with automatic cleanup every 24 hours. Built-in rate limiting prevents abuse, making it production-ready out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| image-resizer-railway | [rohit-gh/image-resizer-railway](https://github.com/rohit-gh/image-resizer-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/image-optimiser-and-resizer)
