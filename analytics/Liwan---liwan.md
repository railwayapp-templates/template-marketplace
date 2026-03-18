# Deploy Liwan on Railway

Lightweight Analytics | Posthog, Mixpanel, Google Analytics alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/liwan)

## About

[Liwan](https://liwan.dev/) is an open source web analytics platform that respects your users' privacy. A single binary you can run on your server, no cookies, no cross-site tracking, no persistent identifiers.

On first setup, check the deployment logs for the unique link to create the admin account

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| explodingcamera/liwan | `ghcr.io/explodingcamera/liwan` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9042 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/liwan)
