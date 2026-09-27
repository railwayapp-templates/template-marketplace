# Deploy Turborepo Remote Cache on Railway

Self-hosted Turborepo remote cache with a generated token and a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tRFTHR)

## About

Turborepo can share build and test outputs between machines through a remote cache: what your laptop built, CI does not build again. Vercel hosts one; this template hosts your own, using the open source `ducktors/turborepo-remote-cache` server with a generated token, artifacts on a Railway volume and a public HTTPS endpoint, so a monorepo gets shared caching in a few minutes.

The service runs the `ducktors/turborepo-remote-cache` image on a public domain. `TURBO_TOKEN` is generated at deploy time and is the credential every client presents. `STORAGE_PROVIDER=local` with `STORAGE_PATH=/app/storage` stores artifacts on the volume mounted there; the container runs as root so it can write to the volume. `TURBO_API_URL` is set to the public domain, which is the value your projects use.

The server also supports S3, DigitalOcean Spaces, Google Cloud Storage, Azure Blob Storage and MinIO as backends; switch `STORAGE_PROVIDER` and add the provider's credentials to move artifacts off the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Turborepo Remote Cache | `ducktors/turborepo-remote-cache` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TURBO_TOKEN` | (secret) | Your authentication token |
| `STORAGE_PATH` | /app/storage | Where the cache will be saved |
| `TURBO_API_URL` | - | The URL of the remote cache |
| `STORAGE_PROVIDER` | local | The type of storage. Possible values are `local`, `s3`, `google-cloud-storage` or `azure-blob-storage` |
| `STORAGE_PATH_USE_TMP_FOLDER` | false | Uses the system tmp folder as a prefix to `STORAGE_PATH` |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tRFTHR)
