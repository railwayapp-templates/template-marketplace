# Deploy Kali Linux (Web Terminal) on Railway

Instant Kali Linux browser terminal powered by ttyd

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kali-linux-web-terminal)

## About

This template provides a **one-click Kali Linux web terminal** running on Railway, giving you instant browser-based access to the world’s most popular penetration testing distribution, without managing servers or SSH keys. **Kali Linux** is a Debian-based operating system built for penetration testing, ethical hacking, digital forensics, and security research.

Deploying Kali Linux (Web Terminal) on Railway uses the official `kalilinux/kali-rolling` Docker image in a lightweight, containerized environment. Railway handles orchestration, networking, and scaling, delivering a ready-to-use Kali Linux shell with minimal setup.

A persistent volume is mounted at `/data` to retain installed tools, scripts, configurations, and collected artifacts across redeployments and restarts. This provides an on-demand, cloud-hosted Kali Linux environment ideal for security testing, labs, and isolated experimentation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kali Linux (Web Terminal) | [decoge/kali-linux-webterminal-railway](https://github.com/decoge/kali-linux-webterminal-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Choose a Password for ttyd web terminal basic authentication. |
| `USERNAME` | (secret) | Choose a Username for ttyd web terminal basic authentication. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/kali-linux-web-terminal)
