# Deploy Mercure on Railway

Mercure 1.0 real-time SSE hub for pushing updates to browsers and apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mercure)

## About

Mercure is an open protocol and hub for pushing real-time updates from servers to browsers and apps over Server-Sent Events. Your backend publishes an update to a topic with a signed token, and subscribed clients receive it instantly, with automatic reconnection, history replay and authorization built into the protocol.

This template deploys the Mercure.rocks hub v1.0.0, the first stable release, on Caddy with the bolt transport stored on a Railway volume so history survives restarts. Publishers and subscribers authenticate with OAuth 2.0-style access tokens signed with the two generated keys. The token issuer and audience are pinned to your Railway domain, which avoids the `http` versus `https` mismatch behind Railway's proxy. The safe debugger UI is enabled; the insecure playground is not. Add your frontend origin to `cors_origins` before subscribing from another domain. Everything runs in one small service that fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mercure | `dunglas/mercure:v1.0.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `SERVER_NAME` | :80 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/mercure)
