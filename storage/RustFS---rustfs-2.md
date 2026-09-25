# Deploy RustFS on Railway

RustFS 1.0 S3-compatible object storage in Rust with a web console.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustfs-2)

## About

RustFS is a high-performance, S3-compatible object storage server written in Rust. Any AWS SDK, the `aws` CLI, `rclone` or `mc` can create buckets, upload objects and generate presigned URLs against it. It includes a web console for managing buckets, users and policies, and is licensed under Apache 2.0.

This template deploys RustFS v1.0.0 from the official image as a single node, storing objects on a Railway volume at `/data`. The S3 API and the web console each get their own Railway domain. The access key and secret key are generated at deploy time and are also the console login. Anonymous listing is refused. Services on Railway reach the S3 API over the private network on port 9000, and both listeners accept IPv4 and IPv6. Plan storage for your data: the Hobby volume limit is 5 GB, and Pro volumes grow much larger.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustfs | `rustfs/rustfs:1.0.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9000 |
| `RUSTFS_ADDRESS` | [::]:9000 |
| `RUSTFS_VOLUMES` | /data |
| `RUSTFS_SECRET_KEY` | (secret) |
| `RUSTFS_CONSOLE_ENABLE` | true |
| `RUSTFS_CONSOLE_ADDRESS` | [::]:9001 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/rustfs-2)
