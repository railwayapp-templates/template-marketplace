# Deploy Mini S3 Manager on Railway

A smooth S3 GUI for managing your bucket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mini-s3-manager)

## About

Mini S3 Manager is a lightweight, full-stack application for managing files in any S3-compatible storage. Built with Bun, Hono, and React (Shadcn UI + TanStack Query), it provides a clean, modern interface to upload, browse, organize, and delete files in your buckets.

Hosting Mini S3 Manager is straightforward as it's packaged as a single Bun application that serves both the API and the static frontend assets. Deployment involves providing your S3 credentials (access key, secret key, bucket name, region, and endpoint) as environment variables. The application is stateless, making it easy to scale horizontally if needed, though a single instance is sufficient for most use cases.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mini S3 Manager | `ghcr.io/lassejlv/mini-s3-manager:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `S3_REGION` | auto |
| `S3_SECRET_ACCESS_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/mini-s3-manager)
