# Deploy ParrotOS Security Edition (Web Terminal) on Railway

Instant ParrotOS Security Edition browser terminal powered by ttyd

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/parrotos-security-edition-web-terminal)

## About

This template provides a **one-click ParrotOS Security Edition web terminal** running on Railway, giving you instant browser-based access to a powerful security-focused Linux shell without managing servers or SSH keys. **Parrot Security OS** is a Debian-based distribution designed for penetration testing, digital forensics, privacy, and cybersecurity research.

Deploying ParrotOS Security Edition (Web Terminal) on Railway uses the official Parrot Security Docker image in a lightweight, containerized environment. Railway handles orchestration, networking, and scaling, delivering a ready-to-use ParrotOS instance without server management overhead.

A persistent volume is mounted at `/work` to retain tools, configurations, scripts, and collected artifacts across redeployments and restarts. This setup provides an on-demand, cloud-hosted ParrotOS environment ideal for penetration testing, security research, and isolated experimentation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ParrotOS Security Edition (Web Terminal) | [decoge/parrotos-security-edition-webterminal-railway](https://github.com/decoge/parrotos-security-edition-webterminal-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Choose a Password for ttyd web terminal basic authentication. |
| `USERNAME` | (secret) | Choose a Username for ttyd web terminal basic authentication. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/work`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/parrotos-security-edition-web-terminal)
