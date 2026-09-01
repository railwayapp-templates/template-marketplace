# Deploy Garage S3 | (Just Updated) Object Store That Uses The Key You Set on Railway

S3-compatible object store. The access key you set is the one that works.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/garage-s3-or-just-updated-object-store-t)

## About

Garage is a lightweight, S3-compatible object store. This template runs it as a single service
on a single volume, with the S3 API published on your Railway domain, a real healthcheck, and
one important difference from the other Garage templates: **the access key and secret you set on
the deploy form are the credentials that actually work** — on the first boot and on every boot
after it.

The service runs the official Garage v2.2.0 binary, pinned and verified by checksum at image
build time, on Alpine. Metadata uses the LMDB engine (upstream's recommendation for a single
node) and both metadata and object data live on one Railway volume mounted at `/data`. An
in-container nginx gateway listens on Railway's injected `$PORT` and proxies the S3 API, with
request buffering turned off so large multipart uploads stream rather than being spooled to
disk, and `/healthz` proxied to Garage's own cluster-health endpoint so a broken boot fails the
deploy instead of reporting success.

Boot is idempotent: the credential format is validated before the server starts, the RPC secret
and admin token are persisted to the volume, the cluster layout is assigned with a capacity read
from the mounted volume, and the access key is imported and granted ownership of the bucket
whenever that key id is not already present.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| garage | `ghcr.io/bon5co/garage-railway:v2.2.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GARAGE_RPC_SECRET` | (secret) |
| `GARAGE_SECRET_KEY` | (secret) |
| `GARAGE_ADMIN_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/garage-s3-or-just-updated-object-store-t)
