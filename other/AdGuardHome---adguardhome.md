# Deploy AdGuardHome on Railway

Network-wide software for blocking ads and tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adguardhome)

## About

AdGuard Home is a network-wide, open-source software for blocking ads and trackers. Once set up, it covers all your devices without needing client-side software. This template deploys the official AdGuard Home Docker image on Railway with persistent configuration and work directories, and exposes the web admin interface on a public HTTPS domain.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/adguardhome)

Hosting AdGuard Home on Railway runs a single container using the official image `adguard/adguardhome:v0.107.79`. Two persistent volumes store configuration (`/opt/adguardhome/conf`) and runtime data (`/opt/adguardhome/work`). The start command forces the web UI to listen on `0.0.0.0:3000` so Railway can proxy HTTPS traffic to it. Auto-updates are disabled (`--no-check-update`) for stability.

**Important Railway limitation:** Railway public domains are HTTP/HTTPS-oriented. Classic DNS on port 53 (UDP/TCP) is not exposed by this template. Use the web UI for management, and configure DNS-over-HTTPS (DoH), DNS-over-TLS (DoT), or point individual devices / a local forwarder at the instance if you need DNS resolution. For full LAN-wide DNS + DHCP you typically need a VPS or home server with host networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AdGuardHome | `adguard/adguardhome:v0.107.79` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | The internal HTTP port used by AdGuard Home. Set to 3000 so Railway can route web traffic to the AdGuard Home web interface. |
| `DOMAIN` | - | The public Railway domain automatically assigned to the service. Used by AdGuard Home as its externally accessible domain. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/adguardhome/conf`

**Category:** Other

[View on Railway →](https://railway.com/deploy/adguardhome)
