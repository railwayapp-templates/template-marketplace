# Deploy Rocky Linux Terminal on Railway

RHEL 9-compatible browser terminal with dev tools on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocky-linux-terminal)

## About

Rocky Linux Terminal is a browser-accessible Rocky Linux 9 shell deployed on Railway via [ttyd](https://github.com/tsl0922/ttyd). Binary-compatible with RHEL 9, it gives enterprise developers a Red Hat environment without a subscription — password-protected, persistent storage at `/root`, essential dev tools, and common C/system libraries pre-installed.

Hosting Rocky Linux Terminal on Railway means running a Rocky Linux 9 container with a browser-based terminal exposed via ttyd. Rocky Linux 9 is binary-compatible with RHEL 9, making it ideal for enterprise Linux work without a Red Hat subscription. Railway handles the build, networking, and SSL automatically. EPEL is enabled at build time so you have access to the full RPM ecosystem. The image ships with commonly used C libraries — openssl-devel, zlib-devel, libffi-devel, sqlite-devel, readline-devel, ncurses-devel, libxml2-devel, libxslt-devel, postgresql-devel, mysql-devel, libyaml-devel, libpng-devel, libjpeg-devel, and kernel-headers — so most language runtimes and native extensions compile without extra setup. A persistent volume is mounted at `/root` so your files survive restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rocky-railway | [Amritasha/rocky-railway](https://github.com/Amritasha/rocky-railway) | Web service |

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

[View on Railway →](https://railway.com/deploy/rocky-linux-terminal)
