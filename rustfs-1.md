# Deploy RustFS on Railway

High-performance, S3 compatible, secure and reliable storage system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rustfs-1)

## About

RustFS is a high-performance, distributed object storage software developed using Rust, the world's most popular memory-safe language. RustFS combines simplicity and efficiency, and is an efficient, open-source, free object storage solution that can be deployed locally as a private cloud. RustFS is 100% compatible with the S3 protocol and is open-source software released under the Apache2 license.

RustFS provides an easy way to host an S3 compatible object storage with high efficiency.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustfs | `rustfs/rustfs` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `RUSTFS_SECRET_KEY` | (secret) |
| `RUSTFS_CONSOLE_ENABLE` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/rustfs-1)
