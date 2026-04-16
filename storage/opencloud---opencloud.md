# Deploy opencloud on Railway

secure file sync, sharing, and web access

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencloud)

## About

OpenCloud runs on Railway using the official upstream Docker image, with Railway handling HTTPS ingress and deployment lifecycle. This setup keeps runtime behavior close to upstream while enabling fast template-based provisioning.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencloud | `opencloudeu/opencloud-rolling:6.0.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9200 |
| `PROXY_TLS` | false |
| `OC_INSECURE` | false |
| `IDM_ADMIN_PASSWORD` | (secret) |
| `IDM_ADMIN_USERNAME` | (secret) |

## Configuration

- **Start command:** `sh -c 'opencloud init || true; exec opencloud server'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/opencloud)
