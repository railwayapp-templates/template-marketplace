# Deploy Debian 12 Terminal on Railway

Lightweight Debian 12 browser terminal. No setup needed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-12-terminal)

## About

Debian 12 (Bookworm) is a stable, lightweight Linux distribution. This template gives you a full Debian 12 shell accessible from any browser — no local installation, no SSH client needed. Powered by ttyd with password protection and a persistent volume at `/root`.

Hosting Debian 12 Terminal on Railway deploys a Debian 12 container with ttyd serving a browser-based shell. Railway handles the build, networking, and uptime automatically. The container includes Python 3, Git, build tools (gcc, make), vim, nano, htop, jq, and common network utilities. A persistent volume mounted at `/root` ensures your files and projects survive restarts. Simply set your PORT, USERNAME, and PASSWORD and you have a private Linux terminal in the cloud within minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| debian12-railway | [Amritasha/debian12-railway](https://github.com/Amritasha/debian12-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 7681 |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/debian-12-terminal)
