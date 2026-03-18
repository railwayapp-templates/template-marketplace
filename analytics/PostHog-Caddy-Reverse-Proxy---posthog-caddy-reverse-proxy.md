# Deploy PostHog Caddy Reverse Proxy on Railway

A Caddy reverse proxy for PostHog

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/posthog-caddy-reverse-proxy)

## About

PostHog works best with a [reverse proxy](https://posthog.com/docs/advanced/proxy/caddy).
This template gives you a fully-configured Caddy proxy for PostHog in 10 seconds or less (probably).

For US PostHog users, the only configuration needed is to [set an appropriate public domain](https://docs.railway.com/reference/public-domains) for the proxy.

For EU users, you will also need to update the PostHog hosts that will receive your proxied traffic.
I.e., update your app variables to match:
```
POSTHOG_API_HOST=eu.i.posthog.com
POSTHOG_ASSETS_HOST=eu-assets.i.posthog.com
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| posthog-reverse-proxy | [jayhale/railway-posthog-caddy-reverse-proxy](https://github.com/jayhale/railway-posthog-caddy-reverse-proxy) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTHOG_API_HOST` | us.i.posthog.com | The host to receive proxied analytics API requests, either `us.i.posthog.com` or `eu.i.posthog.com` |
| `POSTHOG_ASSETS_HOST` | us-assets.i.posthog.com | The host to receive proxied assets (JS, CSS) requests, either `us-assets.i.posthog.com` or `eu-assets.i.posthog.com` |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/posthog-caddy-reverse-proxy)
