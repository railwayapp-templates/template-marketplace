# Deploy Ubuntu 26.04 Terminal [Jun'26] on Railway

Ubuntu 26.04 LTS browser terminal with dev tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-2604-1)

## About

Ubuntu Terminal is a browser-accessible Ubuntu 26.04 LTS shell deployed on Railway via [ttyd](https://github.com/tsl0922/ttyd). The most widely used Linux distribution in the cloud — password-protected, persistent storage at `/root`, essential dev tools, and common C/system libraries pre-installed so most language runtimes and native extensions compile out of the box.

Hosting Ubuntu Terminal on Railway means running an Ubuntu 26.04 LTS container with a browser-based terminal exposed via ttyd. Ubuntu 26.04 is a long-term support release, giving you a stable, well-documented environment with the full apt ecosystem. Railway handles the build, networking, and SSL automatically. The image ships with commonly used C libraries — libssl-dev, zlib1g-dev, libffi-dev, libsqlite3-dev, libreadline-dev, libncurses-dev, libxml2-dev, libxslt1-dev, libpq-dev, libmysqlclient-dev, libyaml-dev, libpng-dev, libjpeg-dev, and linux-libc-dev — so most language runtimes and native extensions compile without extra setup. A persistent volume is mounted at `/root` so your files survive restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu-railway | [Amritasha/ubuntu-railway](https://github.com/Amritasha/ubuntu-railway) | Web service |

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

[View on Railway →](https://railway.com/deploy/ubuntu-2604-1)
