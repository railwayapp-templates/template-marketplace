# Deploy Debian 13 on Railway

Debian 13 with Volume. SSH into for diagnostics, testing, and dev tasks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-13)

## About

Debian 13 is a stable, universal Linux distribution known for reliability, security, and long-term support. It forms the foundation of many popular operating systems and server environments.

Deploying Debian 13 on Railway uses the official minimal Debian Docker image in a lightweight, containerized environment. Railway handles orchestration, networking, and scaling automatically, giving you a clean Debian system without traditional server management. A persistent volume is mounted at `/data` to preserve files, configurations, and application data across redeployments and restarts. This setup provides an on-demand, cloud-hosted Debian environment ideal for experimentation, development, and lightweight production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Debian 13 | `debian:13` | Database |

## Configuration

- **Start command:** `sleep infinity`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/debian-13)
