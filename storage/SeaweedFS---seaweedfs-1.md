# Deploy SeaweedFS on Railway

SeaweedFS 4.47: S3-compatible object storage with an admin UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seaweedfs-1)

## About

SeaweedFS is a fast distributed storage system for blobs, objects and files. It stores billions of files with constant-time lookups, and exposes an S3-compatible API, a filer with directories, WebDAV and FUSE mounts. It works on one small server and scales out to many volume servers later.

This template runs the official `chrislusf/seaweedfs:4.47` image in `weed mini` mode: master, volume server, filer, S3 gateway, WebDAV and the admin UI in one service. The S3 API is on the first Railway domain with generated access keys, and the admin UI is on a second domain behind a generated password; anonymous and wrong-key requests get 403. The filer, master and WebDAV ports have no auth and are only reachable on the private network. Data lives on a Railway volume at `/data`, so objects survive redeploys. It fits the Hobby plan; size the volume for your data. Telemetry is off.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| seaweedfs | `chrislusf/seaweedfs:4.47` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8333 |
| `SEAWEEDFS_ADMIN_USER` | (secret) |
| `AWS_SECRET_ACCESS_KEY` | (secret) |
| `SEAWEEDFS_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `sh -c 'exec /entrypoint.sh mini "-ip.bind=[::]" -master.telemetry=false -admin.user="$SEAWEEDFS_ADMIN_USER" -admin.password="$SEAWEEDFS_ADMIN_PASSWORD"'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/seaweedfs-1)
