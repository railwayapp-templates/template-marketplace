# Deploy Code Server on Railway

Run full VS Code in the browser anytime, anywhere

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/code-server-railway-template)

## About

Code Server lets you run a full Visual Studio Code environment directly in your browser. Powered by the official linuxserver/code-server image, it provides a secure, persistent remote development workspace accessible from any device—no local installation required.

![Code Server by LinuxServer](https://raw.githubusercontent.com/linuxserver/docker-templates/master/linuxserver.io/img/linuxserver_medium.png)

Hosting Code Server on Railway is straightforward. Simply set your desired PASSWORD (the only required input) and deploy. Railway automatically generates the SUDO_PASSWORD and handles networking, HTTPS, and persistent storage. A volume is mounted at `/config` so your workspace files, extensions, settings, and configurations survive restarts. The container runs with sensible defaults (PUID/PGID 1000, UTC timezone) and opens the workspace folder by default, giving you a ready-to-use browser-based IDE in minutes.

![Code Server](https://raw.githubusercontent.com/linuxserver/docker-templates/master/linuxserver.io/img/code-server-banner.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | `linuxserver/code-server:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PGID` | 1000 |
| `PUID` | 1000 |
| `PASSWORD` | (secret) |
| `SUDO_PASSWORD` | (secret) |
| `DEFAULT_WORKSPACE` | /config/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/code-server-railway-template)
