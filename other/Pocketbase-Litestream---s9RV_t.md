# Deploy Pocketbase + Litestream on Railway

Pocketbase with Litestream Streaming Replication

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/s9RV_t)

## About

# Pocketbase

Open Source backend for your next SaaS and Mobile app in 1 file.

After deploying, go to `https://your_railway_app/_/` to register your admin account and access the admin interface.

## Streaming SQLite replication

This version comes with streaming SQLite replication and restoration to a S3 bucket.

If you are using Railway's MINIO template, set the region to the default of `us-east-1`. Your endpoint will be the URL to your MINIO bucket and will look something like this: `https://bucket-production-XXXX.up.railway.app`

## Realtime Database

Embedded performant database with schema builder, data validations, realtime subscriptions and easy to use REST api.

## Authentication

Manage your app users and handle email/password and OAuth2 sign ups (Google, Facebook, GitHub, GitLab) without the hassle.

## File Storage

Sanely store files locally or in a S3 storage. Easily attach media to your database records and generate thumbs on the fly.

## Extendable

Use as a standalone app or as Go framework, that you can extend via hooks to create your own custom portable backend. Provides official client SDKs for painless integration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase-litestream | [ju-li/pocketbase-litestream](https://github.com/ju-li/pocketbase-litestream) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8090 |
| `LITESTREAM_SECRET_ACCESS_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb/pb_data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/s9RV_t)
