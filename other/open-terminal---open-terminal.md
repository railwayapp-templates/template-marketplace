# Deploy open-terminal on Railway

A computer you can curl ⚡

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-terminal)

## About

Open Terminal is a lightweight, self-hosted terminal environment for AI agents and automation tools. It gives models a real operating-system workspace to run commands, manage files, install packages, and execute code through a simple API. When paired with Open WebUI, it adds terminal access and file browsing directly inside the chat experience.

Hosting open-terminal on Railway means deploying the official container image as an HTTP service, exposing its API, setting an API key for authentication, and optionally attaching persistent storage so files survive redeployments. Open Terminal’s Docker setup is the recommended mode and stores user files under `/home/user`, which makes a mounted volume especially useful for ongoing workspaces. Railway supports public container image deployments and persistent volumes, making it a strong fit for running Open Terminal without managing servers, reverse proxies, or infrastructure by hand.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-terminal | [open-webui/open-terminal](https://github.com/open-webui/open-terminal) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPEN_TERMINAL_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/user`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/open-terminal)
