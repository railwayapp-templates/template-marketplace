# Deploy Kali Linux Terminal on Railway

Kali Rolling browser terminal with pentesting tools on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kali-linux-terminal)

## About

**Kali Linux Terminal** is a browser-accessible **Kali Linux Rolling** shell deployed on Railway via [ttyd](https://github.com/tsl0922/ttyd). Pre-loaded with popular **pentesting and CTF tools**, common C/system dev libraries, password-protected access, and persistent storage at `/root` that survives restarts. No local VM required.

Hosting Kali Linux Terminal on Railway means running a **Kali Linux Rolling container** with a **browser-based terminal** exposed via ttyd. Kali Rolling pulls from the latest Kali repositories, keeping your security tools up to date on every redeploy. Railway handles the build, networking, and SSL automatically. The image ships with commonly used C libraries — libssl-dev, zlib1g-dev, libffi-dev, libsqlite3-dev, libreadline-dev, libncurses5-dev, libxml2-dev, libxslt1-dev, libpq-dev, default-libmysqlclient-dev, libyaml-dev, libpng-dev, libjpeg-dev, and linux-headers — so language runtimes and native extensions compile without extra setup. A **persistent volume** is mounted at `/root` so your wordlists, scripts, and notes survive restarts. Expect build times of 3–5 minutes due to the size of the security toolset.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kali-railway | [Amritasha/kali-railway](https://github.com/Amritasha/kali-railway) | Web service |

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

[View on Railway →](https://railway.com/deploy/kali-linux-terminal)
