# Deploy RustFS | (Just Updated) S3 Object Store, Public URL and Keys Set on Railway

S3-compatible object store, keys and public URL preset, volume kept

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustfs-or-just-updated-s3-object-store-p)

## About

RustFS is a high-performance, S3-compatible object store written in Rust and licensed Apache-2.0. Point any S3 SDK,
`aws s3`, `rclone` or `mc` at it to keep files, backups and media on your own storage.

This template runs RustFS 1.0.1 as a single service from a digest-pinned official image, with an access key and
secret key generated for you and a persistent volume for the data.

RustFS needs a few things handled for Railway, all done in the start command:

- **Writable volume.** Railway mounts volumes root-owned while the image runs as an unprivileged user, so the volume
  would be read-only. The service runs as root and logs the owner and writability of the data directory at boot.
- **Port follows Railway.** The S3 API listens on `$PORT` so the public domain and the `/health` healthcheck reach it.
- **Generated keys.** `RUSTFS_ACCESS_KEY` and `RUSTFS_SECRET_KEY` are random per deploy, so the well-known default
  credentials are never live on a public URL.
- **Data dir under the mount.** Objects are stored in a subdirectory of `/data`, so the volume's `lost+found` never
  lands in the store.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustfs | `rustfs/rustfs:1.0.1@sha256:1803faef57627e2d9c2e7d89d655d712ddded5389040054987163043fecb6a3c` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `RUSTFS_SECRET_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; D=/data/rustfs_data; mkdir -p $D /logs; export RUSTFS_ADDRESS=0.0.0.0:${PORT:-8080} RUSTFS_CONSOLE_ADDRESS=0.0.0.0:9001 RUSTFS_CONSOLE_ENABLE=true; echo "[railway] s3 on :${PORT:-8080} uid=$(id -u) owner=$(stat -c %u:%g $D) writable=$(test -w $D && echo yes || echo no)"; exec /usr/bin/rustfs $D'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/rustfs-or-just-updated-s3-object-store-p)
