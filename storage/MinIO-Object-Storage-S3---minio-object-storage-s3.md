# Deploy MinIO Object Storage S3 on Railway

Self-hosted S3-compatible object storage with a persistent volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minio-object-storage-s3)

## About

MinIO is a high-performance, open-source object storage server that speaks the Amazon S3 API. Store files, backups, ML datasets, logs, and static assets behind the same API and SDKs you already use for AWS S3 — fully self-hosted, with no per-request or egress bills.

This template runs the official `minio/minio` image wired for Railway. MinIO serves its S3 API on the port given by `PORT` (enter `9000` when deploying — it is the only field you have to fill in) and a web console on 9001, and Railway exposes the S3 API over HTTPS on a generated domain. All buckets and objects live on an attached volume at `/data`, so your data survives redeploys. Both root credentials are generated per deploy (`MINIO_ROOT_USER`, `MINIO_ROOT_PASSWORD`), so the store is never left with the well-known `minioadmin` default on a public URL — read them from the service's Variables tab after deploy. `MINIO_SERVER_URL` is pre-wired to your Railway domain so presigned URLs point at the public endpoint. The start command (`minio server /data --address ":$PORT" --console-address ":9001"`) is preconfigured. MinIO holds metadata in RAM and objects on disk, so size the service and volume to your dataset.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MINIO_ROOT_USER` | (secret) |
| `MINIO_ROOT_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'minio server /data --address ":${PORT:-9000}" --console-address ":9001"'`
- **Healthcheck:** `/minio/health/live`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/minio-object-storage-s3)
