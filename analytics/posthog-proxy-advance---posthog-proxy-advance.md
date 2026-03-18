# Deploy posthog-proxy-advance on Railway

Deploy and Host posthog-proxy-advance with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/posthog-proxy-advance)

## About

PostHog nginx proxy routes analytics through your domain to bypass ad blockers, enable cross-subdomain tracking, and maintain data privacy while caching static assets for improved performance.

This lightweight nginx container (256MB RAM) acts as a reverse proxy between your applications and PostHog's analytics services. It's stateless, requires no database, and automatically handles CORS for all subdomains of your base domain. Railway provides automatic SSL, environment management, and health checks, making deployment seamless. Simply set your domain and deploy - Railway handles scaling, restarts, and HTTPS termination.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Posthog reverse proxy with cache and cors | `hiteshjoshi/posthog_reverse_proxy` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTHOG_CLOUD` | us |
| `ALLOWED_DOMAIN` | yourdomain.com |
| `CACHE_STATIC_DAYS` | 1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/posthog-proxy-advance)
