# Deploy Ubuntu Linux | Most Popular Linux Distro on Railway

Self Host Ubuntu on Railway: browser shell, basic auth, one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-linux)

## About

Deploy Ubuntu on Railway with a browser-accessible terminal powered by ttyd — no SSH client, VPN, or local VM required. Self-host Ubuntu 24.04 LTS as a lightweight cloud shell you can access from any device with a web browser, pre-loaded with Python 3, Node.js, curl, wget, and git.

This Railway template provisions a single Ubuntu container running ttyd (a web-based terminal emulator), secured with HTTP Basic Auth via `USERNAME` and `PASSWORD` environment variables. The container uses tini as PID 1 for proper signal handling and zombie process reaping, and exposes a single HTTPS port that Railway routes to automatically.

Ubuntu Web Terminal combines Ubuntu 24.04 LTS with ttyd, an open-source command-line tool that shares a terminal session over HTTP using WebSockets and Xterm.js. It solves the problem of needing shell access to a cloud Linux environment without installing SSH clients, managing keys, or setting up VPNs.

**Key features:**
- Full Ubuntu 24.04 LTS environment with apt package manager
- Browser-based terminal via ttyd — works on desktop, tablet, and mobile
- HTTP Basic Auth built in (`-c username:password`)
- tini init process for proper signal forwarding and zombie reaping
- Multi-architecture support (x86_64 and ARM64)
- Pre-installed: Python 3, pip, curl, wget, git, neofetch
- Xterm.js frontend with CJK/IME support and ZMODEM file transfer

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu | [kayrakryo/ubuntu-linux-railway-template](https://github.com/kayrakryo/ubuntu-linux-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP listening port |
| `PASSWORD` | (secret) | password for access |
| `USERNAME` | (secret) | username for access |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-linux)
