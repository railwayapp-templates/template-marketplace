# Deploy Alpine Terminal [Jun'26] on Railway

Alpine Linux browser terminal — password-protected, persistent /root.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alpine-terminal)

## About

Alpine Terminal is a browser-accessible Alpine Linux shell running on Railway via [ttyd](https://github.com/tsl0922/ttyd). Access a full Linux environment from any browser — no local setup required. Comes with essential dev tools pre-installed, password-protected access, and persistent storage at `/root` that survives restarts.

Hosting Alpine Terminal on Railway means spinning up a minimal Alpine 3.19 container with a browser-based terminal exposed via ttyd. Railway handles the build, networking, and SSL automatically. You provide a username and password, and Railway injects the `PORT` env var for ttyd to bind to. A persistent volume is mounted at `/root` so your files survive restarts. The entire image builds in under 30 seconds due to Alpine's minimal footprint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| alpine-railway | [Amritasha/alpine-railway](https://github.com/Amritasha/alpine-railway) | Web service |

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

[View on Railway →](https://railway.com/deploy/alpine-terminal)
