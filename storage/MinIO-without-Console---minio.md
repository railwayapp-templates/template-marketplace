# Deploy MinIO (without Console) on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minio)

## About

MinIO is a high-performance, S3-compatible object storage system that provides enterprise-grade data storage infrastructure. It offers a simple, scalable solution for storing unstructured data like photos, videos, documents, backups, and container images, with full Amazon S3 API compatibility for seamless integration with existing applications and tools.

Hosting MinIO gives you access to a powerful object storage server that handles file uploads, data archiving, content distribution, and backup storage with S3-compatible APIs.

MinIO offers:

- High-performance object storage
- S3-compatible APIs
- Built-in encryption support
- Access control policies
- Multi-tenant storage capabilities
- Reliable persistent storage

This template provisions a lightweight MinIO deployment focused exclusively on object storage without the MinIO Console UI.

Railway provides persistent volume storage, secure networking, automatic deployments, and infrastructure management so you can focus on your applications instead of storage operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bucket | `railwayapp-templates/minio` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | The port the Bucket runs on internally |
| `MINIO_ROOT_USER` | (secret) | Root MinIO user |
| `MINIO_PUBLIC_HOST` | - | Public Bucket host |
| `MINIO_PUBLIC_PORT` | 443 | Public Bucket port |
| `MINIO_PRIVATE_HOST` | - | Private Bucket host |
| `MINIO_PRIVATE_PORT` | 9000 | Private Bucket port |
| `MINIO_ROOT_PASSWORD` | (secret) | Root MinIO password |
| `MINIO_PUBLIC_ENDPOINT` | - | Public Bucket endpoint |
| `MINIO_PRIVATE_ENDPOINT` | - | Private Bucket endpoint |
| `MINIO_BROWSER_REDIRECT_URL` | - | Ensure the browser receives a valid reachable URL |

## Configuration

- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/minio)
