# Deploy Nx Custom Cache | Open Source Nx Cloud Alternative for Monorepos on Railway

Self-hosted Nx remote cache on your own bucket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-bmO7p)

## About

Nx Custom Cache is a self-hosted remote cache for Nx monorepos. Tasks built on one machine are reused on every other machine and in CI — the same acceleration Nx Cloud sells, backed by your own S3 bucket and priced like storage.

A single small service implementing the Nx remote cache API, with artifacts stored in a Railway bucket rather than on a volume. Nx clients authenticate with a generated access token and read and write cache entries over HTTPS.

Since Nx 21 the remote cache is an official plugin interface, so this needs no patched Nx and no wrapper around your build commands.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nx-cache-server | `ghcr.io/ikatsuba/nx-cache-server:1.2.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AWS_REGION` | - | Region of the Railway bucket that stores the cache artifacts. |
| `S3_BUCKET_NAME` | - | Name of the S3 bucket the cache is written to. Filled from the Railway bucket in this project. |
| `S3_ENDPOINT_URL` | - | S3 endpoint of the Railway bucket. Point it elsewhere to use your own S3-compatible storage. |
| `AWS_ACCESS_KEY_ID` | - | Access key for the bucket, issued by Railway. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Secret key for the bucket, issued by Railway. |
| `NX_CACHE_ACCESS_TOKEN` | (secret) | Bearer token every Nx client must send. Put it in NX_SELF_HOSTED_REMOTE_CACHE_ACCESS_TOKEN on your machines and in CI. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/-bmO7p)
