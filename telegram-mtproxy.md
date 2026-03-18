# Deploy Telegram MTProxy on Railway

The MTProto proxy is a container that automatically sets up a proxy server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/telegram-mtproxy)

## About

Telegram MTProxy is an official proxy server that speaks Telegram's native MTProto protocol. It allows users to access Telegram in regions where the service is restricted or throttled, acting as a lightweight relay between clients and Telegram's core servers — all without decrypting or inspecting user traffic.

Hosting Telegram MTProxy involves running a Docker container that automatically connects to Telegram's core infrastructure and relays client traffic using the MTProto protocol. The server requires minimal configuration — at its simplest, you only need to expose a single port and provide a persistent volume for storing connection secrets. For production use, you may configure custom secrets for DNS load balancing across multiple instances, set worker counts to handle higher connection volumes, and register your proxy with Telegram's [@MTProxybot](https://t.me/MTProxybot) for usage analytics and monetization. The container auto-detects its external IP and fetches Telegram server addresses at startup, though daily restarts are recommended to keep those addresses current.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MTProxy | `telegrammessenger/proxy` | Database |

## Configuration

- **TCP Proxies:** 443
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/telegram-mtproxy)
