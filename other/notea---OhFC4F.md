# Deploy notea on Railway

Your Self-Hosted Notion-Style Note Taking App

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/OhFC4F)

## About

Notea is a markdown, notion-like note-taking app stored using compatible S3 storage and accessible via any modern web browser. Works great as a Progressive Web App (PWA) on any device, including Android, iOS and iPad.

Deploying with the 2 default parameters assumes you are using https://storj.io as your S3 storage provider. Please change or remove them if that is not the case.

See github for more details:
https://github.com/bamtests/notea

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| notea-main | [bamtests/notea](https://github.com/bamtests/notea) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `PASSWORD` | (secret) | Password for the browser GUI |
| `STORE_BUCKET` | - | S3 bucket for storage |
| `STORE_REGION` | us1.storj.io | - |
| `STORE_END_POINT` | https://gateway.storjshare.io | - |
| `STORE_ACCESS_KEY` | - | S3 access key |
| `STORE_SECRET_KEY` | (secret) | S3 secret key |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/OhFC4F)
