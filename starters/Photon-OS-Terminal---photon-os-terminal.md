# Deploy Photon OS Terminal on Railway

Minimal Photon OS 5.0 browser terminal with dev tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/photon-os-terminal)

## About

Photon OS Terminal is a browser-accessible VMware Photon OS 5.0 shell deployed on Railway via [ttyd](https://github.com/tsl0922/ttyd). Ultra-minimal container-optimized Linux from VMware/Broadcom — password-protected, persistent storage at `/root`, and essential dev tools and C libraries pre-installed.

Hosting Photon OS Terminal on Railway means running a Photon OS 5.0 container with a browser-based terminal exposed via ttyd. Photon OS is VMware's open-source container-optimized Linux — RPM-based with a minimal footprint, using `tdnf` (tiny dnf) as its package manager. Railway handles the build, networking, and SSL automatically. The image ships with commonly used C libraries — openssl-devel, zlib-devel, libffi-devel, readline-devel, ncurses-devel, libxml2-devel, libxslt-devel, sqlite-devel, and linux-api-headers — so most language runtimes and native extensions compile without extra setup. A persistent volume is mounted at `/root` so your files survive restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| photon-railway | [Amritasha/photon-railway](https://github.com/Amritasha/photon-railway) | Web service |

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

[View on Railway →](https://railway.com/deploy/photon-os-terminal)
