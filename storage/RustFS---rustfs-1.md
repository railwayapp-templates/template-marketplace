# Deploy RustFS on Railway

High-performance, S3 compatible, secure and reliable storage system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustfs-1)

## About

RustFS is a high-performance, distributed object storage software developed using Rust, the world's most popular memory-safe language. RustFS combines simplicity and efficiency, and is an efficient, open-source, free object storage solution that can be deployed locally as a private cloud. RustFS is 100% compatible with the S3 protocol and is open-source software released under the Apache2 license.

RustFS provides an easy way to host an S3 compatible object storage with high efficiency.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustfs | `rustfs/rustfs` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9000 | Explicitly defined API port for Railway health-checks |
| `RUSTFS_ADDRESS` | - | Port on which RustFS exposes the API |
| `RUSTFS_ACCESS_KEY` | - | Console username and S3 Access Key ID |
| `RUSTFS_SECRET_KEY` | (secret) | Console password and S3 Secret Access key |
| `RUSTFS_CONSOLE_ENABLE` | true | Enable or disable console |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/rustfs-1)
