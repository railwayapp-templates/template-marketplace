# Deploy Debian Linux | Open Source Web Terminal for Railway on Railway

Self Host Debian Linux shell accessible from any browser.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian)

## About

Deploy Debian Linux with a browser-based terminal on Railway in one click. Self-host a full Debian shell accessible from any browser — no SSH keys, no port forwarding, no server management. 

Self host Debian and get a minimal Debian Bookworm container with [ttyd](https://github.com/tsl0922/ttyd) (11.4k+ GitHub stars, MIT licensed) providing secure, authenticated web terminal access. Railway handles orchestration, networking, and persistent storage via a mounted volume at `/data`.

Debian is one of the oldest and most stable Linux distributions, trusted by millions of servers worldwide. Combined with ttyd — a lightweight C-based web terminal built on libwebsockets and xterm.js — this template gives you instant browser-based shell access to a full Linux environment.

Key features of this self-hosted Debian web terminal:

- **Full Debian Bookworm** — stable, minimal base image (~20MB slim variant)
- **ttyd web terminal** — fast, low-latency terminal over WebSocket with xterm.js
- **Basic authentication** — password-protected access via USERNAME/PASSWORD env vars
- **Pre-installed tools** — `git`, `python3`, `pip`, `curl`, `wget` ready out of the box
- **Persistent storage** — `/data` volume survives redeploys and restarts
- **tini init** — proper PID 1 process for clean signal handling and zombie reaping
- **Multi-arch support** — auto-detects x86_64 and ARM64 architectures

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| debian-linux-railway-template | [kayrakryo/debian-linux-railway-template](https://github.com/kayrakryo/debian-linux-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP service listening port |
| `PASSWORD` | (secret) | Provde password for system access |
| `USERNAME` | (secret) | Provde username for system access |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/debian)
