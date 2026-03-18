# Deploy MinIO - Single Service on Railway

Lightweight MinIO with console and S3 API in one service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/minio-single-service)

## About

### About Hosting MinIO — Single Service

MinIO is an open-source, high-performance, S3-compatible object storage system designed for cloud-native workloads.

This **Single Service** template deploys MinIO as one service on Railway, exposing both the S3 API and Web Console through a single public domain. It is ideal for development, internal tooling, and lightweight production use cases where simplicity is preferred over strict separation.

You can control security-sensitive settings such as STS token duration and persist data using Railway volumes.

### Common Use Cases

* Object storage for web and backend applications
* Storage backend for AI/ML pipelines
* File storage for internal tools and automation
* S3-compatible replacement for development and testing
* Lightweight production workloads with minimal operational overhead

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO | `minio/minio` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MINIO_ROOT_USER` | (secret) |
| `MINIO_PUBLIC_PORT` | 443 |
| `MINIO_PRIVATE_PORT` | 9000 |
| `MINIO_STS_DURATION` | 1h |
| `MINIO_ROOT_PASSWORD` | (secret) |

## Configuration

- **Start command:** `minio server /data --address :9001 --console-address :9000`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/minio-single-service)
