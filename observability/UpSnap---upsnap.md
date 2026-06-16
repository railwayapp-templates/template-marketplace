# Deploy UpSnap on Railway

Simple network device monitor and dashboard built on PocketBase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/upsnap)

## About

UpSnap is a self-hosted Wake-on-LAN dashboard for managing and waking devices from a web interface. It helps you organize devices, monitor availability, trigger wake actions, and schedule automated wake-up jobs. It is useful for homelabs, remote machines, media servers, workstations, and internal infrastructure that should not run 24/7.

Hosting UpSnap gives you a centralized dashboard to manage devices that support Wake-on-LAN. After deployment, you can access UpSnap from your Railway public URL, create the first superuser account, and start adding devices by name, MAC address, IP address, and related network details. UpSnap stores its data persistently, so your device list, settings, and schedules remain available after redeployments. Railway makes the deployment simple by handling hosting, networking, service restarts, and application availability, so you can focus on using the dashboard instead of managing server infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| upsnap | `ghcr.io/seriousm4x/upsnap` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PORT` | 8090 |
| `DATA_DIR` | /data |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/upsnap)
