# Deploy SeaweedFS | (Just Updated) S3 Object Store, Public URL and Keys Set on Railway

SeaweedFS S3 store. Keys set from boot, public URL, data kept on volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seaweedfs-or-just-updated-s3-object-stor)

## About

SeaweedFS is a distributed object and file store with an S3-compatible API. It stores small and
large blobs cheaply, and any S3 client (aws-cli, boto3, rclone, MinIO SDKs) can talk to it.

This template runs SeaweedFS 4.48 as one service from a digest-pinned official image: master,
volume server, filer and S3 gateway together, the S3 API on a public Railway domain, and all data
on a Railway volume.

- **The S3 API needs keys from the first request.** A stock `weed server -s3` container accepts
  anonymous writes: an unauthenticated `PUT /bucket` returned 200. Here an access key and secret
  key are generated per deploy and anonymous requests are rejected with 403.
- **It has a public URL.** The S3 gateway listens on Railway's `PORT` and the template creates the
  domain, so clients outside Railway can connect straight away. Services in the same project use
  the private endpoint.
- **Data survives redeploys.** Objects live on the attached volume, in a subdirectory so the
  volume's `lost+found` never lands in the data directory. An object written before a redeploy was
  read back after it.
- **Many buckets work on a small volume.** SeaweedFS gives each bucket its own volume files and
  works out how many it may create from the free disk divided by the volume-file size (30 GB by
  default). On a 5 GB Railway volume that allowed three, and the first upload after creating a
  bucket failed with `No writable volumes and no free volumes left`. Here files are capped at
  256 MB and the slot count is set explicitly, so buckets and uploads work from the first request.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| seaweedfs | `chrislusf/seaweedfs:4.48@sha256:4e61d15fd35994cb1e43e1e553dff106794841fd9a99ade2fc8c8bfce4d7872d` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `S3_SECRET_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; D=/data/seaweedfs; mkdir -p $D; export AWS_ACCESS_KEY_ID=$S3_ACCESS_KEY AWS_SECRET_ACCESS_KEY=$S3_SECRET_KEY; echo "[railway] s3 on :${PORT:-8080} owner=$(stat -c %u:%g $D) key=${S3_ACCESS_KEY%"${S3_ACCESS_KEY#????}"}..."; exec weed server -dir=$D -ip.bind=0.0.0.0 -s3 -s3.port=${PORT:-8080} -volume.port=8082 -master.volumeSizeLimitMB=256 -volume.max=1000'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/seaweedfs-or-just-updated-s3-object-stor)
