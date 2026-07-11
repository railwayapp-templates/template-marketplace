# Deploy Ubuntu 24.04 Terminal [Jun'26] on Railway

Browser-based Ubuntu 24.04 terminal with persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-2404-terminal-jun26)

## About

Hosting Ubuntu 24.04 Terminal on Railway spins up an **Ubuntu 24.04 LTS Docker container** with a **ttyd web terminal** exposed over HTTP. Railway handles the HTTPS proxy, domain, and container lifecycle automatically. A **persistent volume** is mounted at `/root`, meaning anything you install or create survives redeploys. You simply set your username and password, deploy, and access your terminal via the Railway-provided URL. The container comes pre-installed with a full set of commonly used CLI tools, making it ready for immediate use without any additional setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu24-railway | [Amritasha/ubuntu24-railway](https://github.com/Amritasha/ubuntu24-railway) | Web service |

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

[View on Railway →](https://railway.com/deploy/ubuntu-2404-terminal-jun26)
