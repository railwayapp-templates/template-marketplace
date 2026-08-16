# Deploy No-Code Architects Toolkit on Railway

NCA Toolkit with CPU-only PyTorch, FFmpeg, Whisper, Chromium, API auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/no-code-architects-toolkit)

## About

No-Code Architects Toolkit is an open-source API for media processing and automation workflows. It exposes ready-to-use endpoints for working with video, audio, images, files, transcription, web content, and other automation tasks, making it easy to connect powerful media operations to no-code tools, AI agents, and custom applications.

Hosting No-Code Architects Toolkit requires a Python application runtime, system-level media dependencies such as FFmpeg, and object storage for generated files. This Railway template packages the application into a production-ready deployment and automatically connects it to a private Railway Bucket using its S3-compatible API.

The deployment includes API-key authentication, health checks, CPU-compatible media and AI dependencies, persistent object storage, and presigned download URLs for generated files. The template is configured for a single application replica by default to remain compatible with the toolkit's in-process job queue.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nca-toolkit | [hallcyn/no-code-architects-toolkit](https://github.com/hallcyn/no-code-architects-toolkit) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEY` | (secret) | Secret API key used to authenticate requests through the X-API-Key header. Keep this value private. |
| `S3_REGION` | - | S3 region used by the attached Railway Bucket. Automatically provided by the bucket service. |
| `S3_ACCESS_KEY` | - | Access key used to authenticate with the attached Railway Bucket. Automatically provided by the bucket service. |
| `S3_SECRET_KEY` | (secret) | Secret access key used to authenticate with the attached Railway Bucket. Keep this value private. |
| `S3_BUCKET_NAME` | - | Name of the attached Railway Bucket used to store generated files. |
| `S3_ENDPOINT_URL` | - | S3-compatible endpoint of the attached Railway Bucket. Automatically provided by Railway. |
| `S3_ADDRESSING_STYLE` | virtual | S3 URL addressing mode. Keep set to virtual for current Railway Buckets. |
| `S3_PRESIGNED_URL_EXPIRY` | 604800 | Lifetime in seconds of signed download URLs returned for files stored in the private bucket. |
| `S3_RETURN_PRESIGNED_URL` | true | When enabled, generated files are returned as temporary presigned URLs instead of public bucket URLs. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Python, Shell, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/no-code-architects-toolkit)
