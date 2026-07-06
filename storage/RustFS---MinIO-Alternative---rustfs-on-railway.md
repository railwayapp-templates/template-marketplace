# Deploy RustFS - MinIO Alternative on Railway

[Jul'26] Self-hosted S3-compatible MinIO alternative powered by Rust.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustfs-on-railway)

## About

RustFS is a high-performance, open-source, S3-compatible object storage system built with Rust. It is designed as a modern alternative to MinIO for developers who need self-hosted object storage for application uploads, static assets, backups, data pipelines, and S3-compatible integrations.

Hosting RustFS on Railway gives you a ready-to-use S3-compatible object storage service without manually managing servers, Docker networking, reverse proxies, or storage configuration. This template deploys RustFS with persistent storage and enables the built-in web console, so you can manage buckets, credentials, and objects directly from your browser after deployment.

RustFS works with S3-compatible clients and tools, making it useful as a storage backend for applications that support AWS S3, MinIO, or custom S3 endpoints. It can be used for app file uploads, private object storage, development environments, backup targets, and self-hosted infrastructure stacks.

This template is designed as a complete setup for Railway. After deployment succeeds, open the generated Railway URL and log in using the generated credentials from the RustFS service variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustfs | `rustfs/rustfs:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9001 |
| `ACCOUNT` | rustfsadmin |
| `RUSTFS_ADDRESS` | 0.0.0.0:9000 |
| `RUSTFS_SECRET_KEY` | (secret) |
| `RUSTFS_CONSOLE_ENABLE` | true |
| `RUSTFS_CONSOLE_ADDRESS` | 0.0.0.0:9001 |
| `RUSTFS_CORS_ALLOWED_ORIGINS` | * |
| `RUSTFS_CONSOLE_CORS_ALLOWED_ORIGINS` | * |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rustfs-data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/rustfs-on-railway)
