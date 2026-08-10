# Deploy SimpleX SMP Server on Railway

Private SimpleX SMP relay with persistent identity and public TCP ingress

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simplex-smp-server)

## About

A SimpleX SMP relay stores and forwards encrypted message queues without user identifiers. This template deploys the official SimpleXMQ SMP server `v6.5.0`, a Railway TCP-port adapter, and a secret-safe status page.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| simplex | [monotykamary/railway-template-simplex-chat](https://github.com/monotykamary/railway-template-simplex-chat) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP status and Railway health-check port. Keep this at 8080. |
| `SIMPLEX_CREATE_PASSWORD` | (secret) | Password required to create new SMP queues. Generated for every deployment. |

## Configuration

- **Healthcheck:** `/cgi-bin/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5223
- **Volume:** `/etc/opt/simplex`

**Category:** Queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/simplex-smp-server)
