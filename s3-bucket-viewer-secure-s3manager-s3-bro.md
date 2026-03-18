# Deploy S3 Bucket Viewer (Secure) - s3manager - S3 Browser on Railway

Secure S3 viewer web with Railway Buckets, Basic Auth, UI explorer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/s3-bucket-viewer-secure-s3manager-s3-bro)

## About

S3 Bucket Viewer (Secure) is a lightweight web UI for browsing an S3-compatible bucket on Railway. It deploys **s3manager** as the file explorer and places **caddy-zero-trust** in front as an authentication gateway, so the viewer can be exposed safely while the S3 browser stays on Railway’s private network.

This template deploys two services: **s3manager** (the S3 web UI) and **caddy-zero-trust** (a Basic Auth reverse proxy). Configure your Railway Bucket credentials (ENDPOINT, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY) and s3manager will connect to your S3-compatible storage. Then caddy-zero-trust publishes a single public URL and forwards authenticated traffic to s3manager over Railway Private Networking. Keep s3manager private (no public domain) so only the proxy is reachable from the internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| s3manager | `cloudlena/s3manager` | Worker |
| caddy-zero-trust | [XavTo/caddy-zero-trust](https://github.com/XavTo/caddy-zero-trust) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | s3manager | 8080 | Port on which the S3 Manager web interface listens. |
| `REGION` | s3manager | auto | Region name for the S3-compatible storage service (often "auto"). |
| `USE_SSL` | s3manager | true | Enable SSL/TLS when connecting to the S3-compatible endpoint. |
| `ENDPOINT` | s3manager | - | Hostname of the S3-compatible storage endpoint (without protocol). exemple : storage.railway.app |
| `ACCESS_KEY_ID` | s3manager | - | Access key ID used to authenticate with the S3-compatible storage. |
| `SECRET_ACCESS_KEY` | s3manager | (secret) | Secret access key used to authenticate with the S3-compatible storage. |
| `AUTH_PASS` | caddy-zero-trust | - | Password required to access the protected web interface. |
| `AUTH_USER` | caddy-zero-trust | (secret) | Username required to access the protected web interface. |
| `DOMAIN_NAME` | caddy-zero-trust | - | Public domain name used to access the secured application. |
| `UPSTREAM_URL` | caddy-zero-trust | - | Internal URL of the S3 Manager service to proxy traffic to. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** CSS, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/template/s3-bucket-viewer-secure-s3manager-s3-bro)
