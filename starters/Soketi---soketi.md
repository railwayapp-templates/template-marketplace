# Deploy Soketi on Railway

Next-gen, Pusher-compatible, open-source WebSockets server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/soketi)

## About

Soketi is an open-source WebSockets server that implements the Pusher Protocol v7. It provides real-time communication capabilities for applications while maintaining compatibility with existing Pusher clients and libraries.

Hosting Soketi involves deploying a WebSocket server that handles real-time connections and message broadcasting. The server runs as a single process that can manage thousands of concurrent connections and supports both development and production deployments. Soketi requires configuration for app management, authentication keys, and optional database backends for storing connection metadata. The deployment supports scaling from single development instances to multiple production instances handling high traffic loads.

![Soketi Logo](https://raw.githubusercontent.com/soketi/soketi/master/assets/logo.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Soketi | `quay.io/soketi/soketi:1.6.1-16-debian` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | Lets Railway know what port soketi runs on |
| `SOKETI_PUBLIC_HOST` | - | Public host for use in the pusher client as `wsHost` |
| `SOKETI_PUBLIC_PORT` | 443 | Public port for use in the pusher client as `wsPort` |
| `SOKETI_INTERNAL_HOST` | - | Private host for use in the pusher client as `wsHost` |
| `SOKETI_INTERNAL_PORT` | 6001 | Private port for use in the pusher client as `wsPort` |
| `SOKETI_DEFAULT_APP_ID` | - | Default app id |
| `SOKETI_DEFAULT_APP_KEY` | - | Default app key |
| `SOKETI_DEFAULT_APP_SECRET` | (secret) | Default app secret |

## Configuration

- **Start command:** `/bin/sh -c "export AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE=1; node /app/bin/server.js start"`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Tags:** websockets, pusher, javascript

[View on Railway →](https://railway.com/deploy/soketi)
