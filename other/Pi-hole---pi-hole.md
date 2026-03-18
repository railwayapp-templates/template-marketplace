# Deploy Pi-hole on Railway

Pi-hole is a DNS sinkhole that protects your devices from unwanted content

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pi-hole)

## About

The Pi-hole® is a DNS sinkhole that protects your devices from unwanted content, advertisements, and trackers — without installing any client-side software. It acts as a network-wide ad blocker that improves privacy and performance across all your devices.

Pi-hole was originally designed to run on small, local devices such as Raspberry Pi or home servers. However, by hosting Pi-hole in the cloud using Railway, you can enjoy its benefits anywhere — without worrying about local uptime, power issues, or limited hardware resources.

When hosted on Railway, Pi-hole can serve as:

- A personal or family-wide DNS filtering solution.
- A remote DNS service for privacy and security.
- A shared service for small teams or internal networks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pi-hole | `pihole/pihole:latest` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | The timezone you would like to use for your server |
| `FTLCONF_webserver_api_password` | (secret) | You administrator password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 53
- **Volume:** `/etc/pihole`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pi-hole)
