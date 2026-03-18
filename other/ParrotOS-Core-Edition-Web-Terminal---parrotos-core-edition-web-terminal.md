# Deploy ParrotOS Core Edition (Web Terminal) on Railway

Instant ParrotOS Core Edition browser terminal powered by ttyd

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parrotos-core-edition-web-terminal)

## About

This template provides a **one-click ParrotOS Core Edition web terminal** running on Railway, giving you instant browser-based access to a clean, minimal Debian-based Linux shell without managing servers or SSH keys. **Parrot Security OS Core Edition** is designed as a lightweight foundation, offering maximum flexibility for custom setups without preinstalled security toolchains.

Deploying ParrotOS Core Edition (Web Terminal) on Railway uses the official Parrot Core Docker image in a lightweight, containerized environment. Railway manages orchestration, networking, and scaling, delivering a minimal ParrotOS base system without server management overhead.

A persistent volume is mounted at `/work` to retain files, configurations, scripts, and installed packages across redeployments and restarts. This setup is ideal for building custom security environments, development stacks, or reproducible Linux workspaces tailored to your exact needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ParrotOS Core Edition (Web Terminal) | [decoge/parrotos-core-edition-webterminal-railway](https://github.com/decoge/parrotos-core-edition-webterminal-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Choose a Password for ttyd web terminal basic authentication. |
| `USERNAME` | (secret) | Choose a Username for ttyd web terminal basic authentication. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/work`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/parrotos-core-edition-web-terminal)
