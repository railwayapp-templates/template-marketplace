# Deploy Teleproxy on Railway

Self-hosted Telegram MTProxy with advanced Fake-TLS and anti-DPI features

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teleproxy)

## About

High-performance Telegram MTProto proxy with Fake-TLS, dynamic record sizing, and strong DPI resistance. A modern self-hosted alternative to the official MTProxy.

![Telegrm proxy](https://opengraph.githubassets.com/027231e34679f13d043884e2d69bd69e052e500e3bf7b5b03c72101eda21b724/teleproxy/teleproxy)

Teleproxy is a modern, high-performance implementation of Telegram's MTProto proxy protocol. Unlike the official MTProxy, Teleproxy offers significantly better resistance against Deep Packet Inspection (DPI) through its advanced Fake-TLS implementation, dynamic record sizing, and anti-replay protection.

This Railway template deploys Teleproxy as a lightweight container with sensible defaults. It supports automatic secret generation, Fake-TLS camouflage using a chosen domain, advertisement tags via @MTProxybot, and multiple worker processes for better performance. The container also includes built-in Prometheus metrics for monitoring.

Hosting Teleproxy on Railway allows you to run a private, censorship-resistant Telegram proxy without managing a VPS or dealing with complex server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| teleproxy | `ghcr.io/teleproxy/teleproxy:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET` | (secret) |
| `WORKERS` | 4 |
| `EE_DOMAIN` | www.microsoft.com |
| `DIRECT_MODE` | false |

## Configuration

- **Volume:** `/opt/teleproxy/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/teleproxy)
