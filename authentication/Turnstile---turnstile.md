# Deploy Turnstile on Railway

A reverse proxy that authenticates users via Railway's OAuth flow.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/turnstile)

## About

Turnstile is a reverse proxy that authenticates requests via Railway's OAuth flow. It sits in front of your Railway web services and gates access using your Railway workspace's access controls.

This is similar to Vercel or Netlify password protection, but integrated with Railway.

Turnstile is a Go service that deploys to Railway. When a request comes in, Turnstile intercepts it and redirects unauthenticated users through Railway's OAuth flow. Once authenticated, Turnstile ensures they have `project:viewer` access to your project. If they do, the user is proxied through to your backend service using Railway's private networking.

The service handles session management, WebSocket and SSE upgrades, and all OAuth token exchange automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Turnstile | [TinyboxSoftware/turnstile](https://github.com/TinyboxSoftware/turnstile) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port to listen on. |
| `TURNSTILE_PUBLIC_URL` | - | The public URL Turnstile itself is served from. should be set to https://${{RAILWAY_PUBLIC_DOMAIN}}. |
| `TURNSTILE_BACKEND_URL` | - | Internal URL of the service to proxy to including port and protocol |

## Configuration

- **Healthcheck:** `/_turnstile/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** Go

[View on Railway →](https://railway.com/template/turnstile)
