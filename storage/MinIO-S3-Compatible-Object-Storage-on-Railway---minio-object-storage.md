# Deploy MinIO | S3-Compatible Object Storage on Railway on Railway

Self Host MinIO. High performance obect storage, web UI, and full S3 API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minio-object-storage)

## About

Deploy MinIO on Railway to get S3-compatible object storage running in minutes. Self-host MinIO as a drop-in replacement for Amazon S3 with full API compatibility, a built-in web console, and persistent volume-backed storage.

This Railway template deploys MinIO with a pre-configured volume at `/data`, admin credentials, and a public domain pointing to the MinIO Console UI. The S3 API runs on port 9000 for programmatic access, while the web console on port 9001 lets you manage buckets, objects, and access policies visually.

MinIO is a high-performance, S3-compatible object storage server released under the GNU AGPLv3 license. Built in Go, it implements the full Amazon S3 API, meaning any application, SDK, or tool designed for S3 works with MinIO without code changes.

Key features:

- **Full S3 API compatibility** — works with AWS SDKs, `aws-cli`, Terraform S3 backends, and any S3-native tool
- **Built-in web console** — manage buckets, objects, users, policies, and access keys from a browser
- **Erasure coding** — data protection across drives without RAID, with configurable parity
- **Bucket notifications** — trigger webhooks, AMQP, Kafka, or NATS events on object changes
- **Server-side encryption** — SSE-S3 and SSE-KMS with Vault integration
- **Identity management** — built-in IAM with users, groups, and policies, plus LDAP/OIDC federation

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO | `minio/minio:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9001 | Railway domain routing port |
| `MINIO_ROOT_USER` | (secret) | Admin console and API username |
| `MINIO_ROOT_PASSWORD` | (secret) | Admin console and API password |
| `MINIO_BROWSER_REDIRECT_URL` | - | Console redirect URL |

## Configuration

- **Start command:** `minio server /data --console-address :9001`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/minio-object-storage)
