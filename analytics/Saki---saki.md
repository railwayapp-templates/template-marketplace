# Deploy Saki on Railway

Saki is a analytics proxy service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/saki)

## About

Saki is a self-hosted Nginx reverse proxy that routes analytics and tracking traffic through your own domain. It forwards full client headers and simply swaps the hostname, so tools like Google Analytics, GTM, Amplitude, Mixpanel, PostHog, and Microsoft Clarity can bypass adblockers without any SDK changes.

On Railway, Saki runs as a single Docker container listening on port 80 inside the service. You point your analytics script tags to your Saki hostname (for example, `https://analytics.your-domain.com`) and Saki forwards requests to the real analytics providers. This keeps your existing tracking setup intact while improving delivery rates in the presence of adblockers. You can start with the default routes defined in the image and, when needed, override or add Nginx locations via environment variables or a custom image. Railway handles the runtime, scaling, and networking so you only focus on your domain and configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Saki | `rajnandan1/saki` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port |
| `ROUTE_GA` | an | Google Analytics |
| `ROUTE_GTM` | tg | Google Tag Manager |
| `ROUTE_PH_JS` | phj | PostHog JS |
| `ROUTE_PH_API` | pha | PostHog API |
| `ROUTE_AMP_API` | aapi | Amplitude API |
| `ROUTE_AMP_CDN` | acdn | Amplitude CDN |
| `ROUTE_CLARITY` | cla | Microsoft Clarity |
| `ROUTE_MIX_API` | mxa | Mixpanel API |
| `ROUTE_MIX_CDN` | mxc | Mixpanel CDN |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/saki)
