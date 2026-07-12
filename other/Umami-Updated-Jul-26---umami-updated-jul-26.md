# Deploy Umami [Updated Jul '26] on Railway

Umami [Jul '26] (Privacy-First Google Analytics Alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-updated-jul-26)

## About

Umami is an open-source analytics platform that respects user privacy. It replaces Google Analytics without cookies, trackers, or storing data on third-party servers. Deploy it on Railway in under five minutes with PostgreSQL included.

Self-hosting Umami means your visitor data never leaves your infrastructure. Google Analytics sends data to Google's servers; Umami keeps it local. You own your analytics database completely. Railway handles the complexity - automatic backups, SSL certificates, scaling - so you focus on understanding your visitors. No monthly subscription, no per-event billing, no surprise costs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| uptime-kuma-railway | [shruti060701/uptime-kuma-railway](https://github.com/shruti060701/uptime-kuma-railway) | Web service |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/umami-updated-jul-26)
