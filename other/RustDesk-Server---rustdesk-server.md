# Deploy RustDesk Server on Railway

RustDesk Server OSS self-hosted: hbbs (ID server) + hbbr (relay).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustdesk-server)

## About

RustDesk Server OSS is the self-hosted backend of the open-source RustDesk remote desktop app. It ships two tiny services: `hbbs`, the ID/rendezvous server where your devices register, and `hbbr`, the relay that carries session traffic when peers cannot connect directly. Your own TeamViewer-style server — no third-party accounts involved.

Hosting RustDesk Server means running both components side by side. `hbbs` holds the Ed25519 encryption key and the device registry on a persistent volume; `hbbr` re-emits encrypted session traffic between peers. Each service gets a public TCP proxy on Railway (ports 21116 and 21117). Because Railway does not expose UDP, all sessions flow through the relay over TCP — fully functional, slightly less efficient than direct P2P. Keys are generated automatically on first boot, printed in the logs, and shared between services over Railway's private network, so setup is just three values pasted into your RustDesk clients.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hbbs | [BURNI80/rustdesk-railway-template](https://github.com/BURNI80/rustdesk-railway-template) | Database |
| hbbr | [BURNI80/rustdesk-railway-template](https://github.com/BURNI80/rustdesk-railway-template) | TCP service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `RELAY_ADDR` | RELAY_ADDR |

## Configuration

- **TCP Proxies:** 21116
- **Volume:** `/root`
- **TCP Proxies:** 21117

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rustdesk-server)
