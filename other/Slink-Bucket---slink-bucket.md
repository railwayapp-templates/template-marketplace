# Deploy Slink + Bucket on Railway

Self-hosted image sharing service with a bucket!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/slink-bucket)

## About

> Now with practically unlimited storage!

&gt; **First login note**
&gt; After deployment, Railway will generate an `ADMIN_PASSWORD` environment variable. Copy this value and use it to log in with the admin email you configured during setup. You can rotate this password later from the admin settings panel.

![screenshot](https://i.postimg.cc/vmBWVYrk/Screenshot-2026-01-07-at-00-37-24.png)

Slink is a self-hosted image sharing platform that provides private, secure, and fully controlled image hosting without relying on third-party services. Built with Symfony on the backend and SvelteKit on the frontend, it supports modern image formats, tagging, sharing, and API-driven workflows for individuals and teams.

Hosting Slink involves running a PHP/Symfony application alongside its frontend and storage layer. Railway handles container orchestration, environment configuration, and networking, allowing you to deploy Slink without managing servers manually. You configure storage (local or S3-compatible), database access, and admin credentials via environment variables. Railway’s scaling and observability features make it straightforward to operate Slink in both personal and small-team contexts, while keeping the deployment reproducible and easy to update as new releases are published.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| slink | `anirdev/slink:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | App timezone. |
| `PORT` | 3000 | Server port. |
| `ORIGIN` | - | Host public URL origin. |
| `ADMIN_EMAIL` | - | Administrator email to use to login. |
| `ADMIN_PASSWORD` | (secret) | Administrator email to use to login. |
| `ADMIN_USERNAME` | (secret) | Administrator username to login. |
| `IMAGE_MAX_SIZE` | 15M | Maximum image size per upload. |
| `AMAZON_S3_BUCKET` | - | S3 bucket name. |
| `AMAZON_S3_REGION` | - | S3 bucket region. |
| `STORAGE_PROVIDER` | s3 | Storage provider to point to S3 bucket. |
| `AMAZON_S3_ENDPOINT` | - | Custom S3 endpoint. |
| `USER_APPROVAL_REQUIRED` | false | Require approving user emails to activate to upload. |
| `AMAZON_S3_ACCESS_KEY_ID` | - | S3 access key ID. |
| `AMAZON_S3_SECRET_ACCESS_KEY` | (secret) | S3 secret access key. |
| `AMAZON_S3_USE_CUSTOM_PROVIDER` | true | Enable for Minio or other S3-compatible services. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Other

[View on Railway →](https://railway.com/deploy/slink-bucket)
