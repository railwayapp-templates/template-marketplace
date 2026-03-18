# Deploy S3 Pre-signed URL Generator on Railway

Create short-lived or permanent pre-signed image URLs for Railway Bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/s3-pre-signed-url-generator)

## About

The S3 Pre-signed URL Generator is a lightweight microservice that generates secure, time-limited upload and download URLs for S3-compatible object storage. It enables direct file uploads and previews without exposing credentials, making it ideal for workflows, automations, and backend services.

Hosting the S3 Pre-signed URL Generator on Railway provides a simple, production-ready way to securely handle file uploads and downloads. The service runs as a stateless HTTP API and uses environment variables to configure the storage endpoint, region, bucket, and credentials. Once deployed, it can be consumed by tools like n8n, frontend applications, or internal services to generate pre-signed PUT and GET URLs on demand, without requiring direct access to your storage credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-aws-presigned-url-generator | [Granite-Marketing/railway-aws-presigned-url-generator](https://github.com/Granite-Marketing/railway-aws-presigned-url-generator) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_BUCKET` | your-bucket-name | The name of your railway bucket. |
| `S3_REGION` | eu-west-1 | The region of your bucket. |
| `S3_ENDPOINT` | https://t3.storageapi.dev | Your Railway bucket S3 URL. |
| `S3_KEY_PREFIX` | uploads | Your S3_BUCKET prefix (defaults to uploads) |
| `S3_ACCESS_KEY_ID` | your-access-key-id | Your Railway bucket access key ID. |
| `S3_SECRET_ACCESS_KEY` | (secret) | Your Railway Bucket Secret Access Key ID. |

## Configuration

- **Healthcheck:** `health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/template/s3-pre-signed-url-generator)
