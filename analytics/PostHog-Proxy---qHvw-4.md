# Deploy PostHog Proxy on Railway

Allows you to send events to PostHog Cloud using your own domain.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/qHvw-4)

## About

PostHog Reverse Proxy

https://posthog.com/docs/advanced/proxy

It's recommend that you associate this service to a custom domain. If your frontend service is yourdomain.com, make this service e.yourdomain.com.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostHog Proxy | [paulocsanz/posthog-proxy](https://github.com/paulocsanz/posthog-proxy) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port through which Railway will contact this service. |
| `SERVER_NAME` | - | Public domain of this service |
| `POSTHOG_HOST` | us.i.posthog.com | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/qHvw-4)
