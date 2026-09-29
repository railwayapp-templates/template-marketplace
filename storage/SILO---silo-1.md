# Deploy SILO on Railway

S3 Interface Libre Object | PGSTY SILO is a MinIO fork maintained by PGSTY

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/silo-1)

## About

SILO (S3 Interface Libre Object) is an S3-compatible object storage server maintained by PGSTY. It is a fork of MinIO and provides an S3-compatible API for storing files and application data. This template runs SILO on Railway with a persistent volume, an S3 endpoint on port `9000`, and a web console on port `9001`.

This template runs SILO as a single Railway service using the PGSTY distroless Docker image. Railway mounts a persistent volume at `/data`, and SILO stores its objects there.

The S3-compatible API listens on port `9000`. The SILO web console listens on port `9001`. Railway exposes both ports through HTTP networking.

The template sets `MINIO_ROOT_USER` to `silo-admin` and generates `MINIO_ROOT_PASSWORD` with a Railway secret. SILO does not require a database or another Railway service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SILO | `pgsty/silo:RELEASE.2026-09-16T00-00-00Z-distroless` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MINIO_ROOT_USER` | (secret) | Root Username |
| `MINIO_ROOT_PASSWORD` | (secret) | Root Password |

## Configuration

- **Start command:** `silo server /data --console-address :9001`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/silo-1)
