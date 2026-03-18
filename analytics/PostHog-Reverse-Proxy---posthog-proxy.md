# Deploy PostHog Reverse Proxy on Railway

Capture more usage data in PostHog using a reverse proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/posthog-proxy)

## About

A reverse proxy that routes PostHog analytics events through your own domain, preventing ad blockers and filter lists from interfering with tracking.

This nginx proxy sits between your application and PostHog Cloud. Requests to your domain (e.yourdomain.com or https://your-project-name.up.railway.app/) are forwarded. Your analytics will work normally, but tracking/ad blockers can't tell you're using PostHog.

The proxy handles both analytics events and static assets, routing them to the correct PostHog region (US or EU) based on your configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostHog Reverse Proxy | [PostHog/posthog-nginx-reverse-proxy](https://github.com/PostHog/posthog-nginx-reverse-proxy) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `SERVER_NAME` | Should always be ${{RAILWAY_PUBLIC_DOMAIN}} |
| `POSTHOG_CLOUD_REGION` | Either: us or eu |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Verified:** Yes · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/posthog-proxy)
