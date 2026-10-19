# Deploy SimpleX SMP Server on Railway

Private SimpleX SMP relay with persistent identity and public TCP ingress

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simplex-smp-server)

## About

A SimpleX SMP relay stores and forwards encrypted message queues without user identifiers. This template deploys the official SimpleXMQ SMP server `v7.0.1`, a Railway TCP-port adapter, and a secret-safe status page.

### Upgrading an existing deployment to v7.0.1

v7.0.1 starts on v6.5.2 data in place and keeps the server keys, so existing `smp://` addresses and older clients keep working. To roll back to v6.5.2 later, first rename `/etc/opt/simplex/state/smp-server-stats.log`, which v6.5.2 cannot read (only the cumulative statistics are lost).

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
