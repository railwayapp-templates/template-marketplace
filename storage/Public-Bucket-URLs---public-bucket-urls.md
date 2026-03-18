# Deploy Public Bucket URLs on Railway

Get public bucket URLs and serve files with free egress

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/public-bucket-urls)

## About

Serve files from Railway Buckets using public, static URLs without a proxy. The service redirects to a presigned bucket URL, which then delivers the file to the user. This avoids paying for public egress when serving the file.

Presigned URLs are temporary, signed URLs that grant time-limited access to specific objects in your bucket. This template generates them automatically and redirects requests to them. Users typically don't notice that the URL changed.

With S3-style storage, it’s common to use static URLs that perform an authorization check before redirecting to a presigned URL. This template skips the authentication and redirects to the file immediately.

**Caution: Only use this template if every file in your bucket should be publicly accessible.** If you need private files, use separate buckets or implement your own authenticated redirects. For an example implementation, check out the source code of this template: https://github.com/timomeh/s3-public-presigner

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| s3-public-presigner | [timomeh/s3-public-presigner](https://github.com/timomeh/s3-public-presigner) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_BUCKET` | - | S3-compatible name of your bucket |
| `S3_REGION` | auto | Region of the bucket |
| `S3_ENDPOINT` | - | S3-compatible endpoint where the bucket is hosted |
| `S3_ACCESS_KEY_ID` | - | The bucket's Access Key ID |
| `USE_NICE_NOT_FOUND` | 0 | Set this to 1 to return nice "File not found" messages when a file doesn't exist. Increases latency slightly. |
| `S3_SECRET_ACCESS_KEY` | (secret) | The bucket's Secret Access Key |
| `PRESIGNED_URL_EXPIRATION_SECONDS` | 3600 | How long the presigned redirected URLs should be valid for, in seconds. Defaults to 1 hour. Can be up to 90 days. You only need to change this if you share the presigned URL. You usually do not need to share the presigned URL with users. |

## Configuration

- **Healthcheck:** `/_ah/up`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/public-bucket-urls)
