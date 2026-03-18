# Deploy Ubuntu | Linux Terminal in Your Browser on Railway

Self-host a secure Ubuntu shell accessible from any browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-ubuntu)

## About

Get a fully functional Ubuntu 22.04 environment running in the cloud in under a minute. This Railway template deploys Ubuntu with a browser-accessible terminal via [ttyd](https://github.com/tsl0922/ttyd), pre-loaded with Python 3, pip, curl, wget, and git — no SSH client or local setup required.

Ubuntu is the world's most popular open-source Linux distribution, powering everything from developer workstations to production servers. This template wraps Ubuntu 22.04 LTS in a Docker container and exposes a web-based terminal (ttyd v1.7.3), so you get a full bash shell accessible from any browser.

**Key features:**
- Ubuntu 22.04 LTS base — stable, widely supported, 5-year security updates
- Persistent `/data` volume — files stored here survive redeploys
- Browser terminal via ttyd — no SSH needed
- Pre-installed: `python3`, `pip`, `curl`, `wget`, `git`, `neofetch`
- Password-protected access with configurable credentials

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu | [praveen-ks-2001/linux-ubuntu](https://github.com/praveen-ks-2001/linux-ubuntu) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP service listening port |
| `PASSWORD` | (secret) | Provide password for system access |
| `USERNAME` | (secret) | Provide username for system access |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/deploy-ubuntu)
