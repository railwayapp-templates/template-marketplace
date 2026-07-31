# Deploy Firefox on Railway

Deploy & Run Cloud Based Firefox Browser on web

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firefox)

## About

Firefox is a free, open-source web browser developed by the Mozilla Foundation. Running Firefox inside a Docker container enables users to access a full desktop browser environment directly through any modern web browser via WebRTC/vnc streaming. It provides privacy-focused, isolated browsing capabilities accessible from anywhere on any device.

Hosting Firefox on Railway deploys a containerized desktop browser powered by the [linuxserver/firefox](https://hub.docker.com/r/linuxserver/firefox) Docker image. Railway handles the underlying container execution, routing HTTP traffic to the WebRTC/noVNC web interface. Persistent storage via a Railway Volume mounted at `/config` ensures browser profiles, user settings, extensions, and cached data remain intact across container restarts or redeployments. Railway automatically manages SSL/TLS termination, exposing a secure HTTPS URL for safe remote browser access. No dedicated database services are required for hosting this browser instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Firefox | `linuxserver/firefox:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Asia/Shanghai | - |
| `HOST` | 0.0.0.0 | - |
| `PGID` | 1000 | - |
| `PORT` | 3000 | - |
| `PUID` | 1000 | - |
| `PASSWORD` | (secret) | Passward to login i.e admin123 |
| `CUSTOM_USER` | (secret) | name to login i.e admin |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/firefox)
