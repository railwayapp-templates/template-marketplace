# Deploy Ubuntu 25.10 (Web Terminal) on Railway

Instant Ubuntu 25.10 browser terminal powered by ttyd

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ubuntu-2510-web-terminal)

## About

This template provides a **one-click Ubuntu 25.10 web terminal** running on Railway, giving you instant browser-based access to a full Linux shell without managing servers or SSH keys. Ubuntu 25.10 (Questing Quokka) is a Debian-based Linux operating system.

Deploying Ubuntu 25.10 (Web Terminal) on Railway uses the official minimal Ubuntu Docker image in a lightweight containerized environment. Railway manages orchestration, networking, and scaling, providing a clean Ubuntu instance without server management overhead. A persistent volume is mounted at `/data` to retain files, configurations, and application data across redeployments and restarts. This setup offers an on-demand, cloud-hosted Ubuntu environment ideal for isolated Linux workloads and experimentation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu 25.10 (Web Terminal) | [decoge/ubuntu-2510-webterminal-railway](https://github.com/decoge/ubuntu-2510-webterminal-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Password for ttyd web terminal basic authentication. |
| `USERNAME` | (secret) | Username for ttyd web terminal basic authentication. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/ubuntu-2510-web-terminal)
