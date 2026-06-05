# Deploy Ubuntu 18.04 Terminal [Jun'26] on Railway

Browser-based Ubuntu 18.04 terminal with persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-1804-terminal-jun26)

## About

Ubuntu 18.04 Terminal gives you a full browser-accessible bash shell running on Ubuntu 18.04 LTS (Bionic Beaver) — no SSH client, no local setup, no configuration needed. Files and packages you install persist across restarts thanks to a built-in volume mounted at /root. Open the URL, enter your credentials, and you're in a live legacy Linux terminal from anywhere.

Hosting Ubuntu 18.04 Terminal on Railway spins up an Ubuntu 18.04 LTS Docker container with a ttyd web terminal exposed over HTTP. Railway handles the HTTPS proxy, domain, and container lifecycle automatically. A persistent volume is mounted at /root, meaning anything you install or create survives redeploys. You simply set your username and password, deploy, and access your terminal via the Railway-provided URL. The container comes pre-installed with a full set of commonly used CLI tools, making it ideal for reproducing legacy environments or testing older package versions without any additional setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu18-railway | [Amritasha/ubuntu18-railway](https://github.com/Amritasha/ubuntu18-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7681 | - |
| `PASSWORD` | (secret) | Provide password |
| `USERNAME` | (secret) | Provide username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-1804-terminal-jun26)
