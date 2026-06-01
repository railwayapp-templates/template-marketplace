# Deploy Rhino Linux 2026.1 on Railway

Hosted Rhino Linux workspace with SSH access and persistent storage. 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rhino-linux-latest)

## About

Rhino Linux 2026.1 is a rolling-release Linux distribution based on Ubuntu and powered by the Pacstall package manager. This Railway template provides a lightweight Rhino Linux workspace with SSH access and persistent storage, making it useful for diagnostics, testing, development tasks, scripts, and isolated Linux workflows.

Hosted Rhino Linux workspace with SSH access and persistent storage. 🚀

![Imgur](https://imgur.com/uQahYuR.png)

This template deploys a Rhino Linux Docker image on Railway. Railway handles infrastructure, networking, deployment, and runtime management, so you can quickly launch a Rhino Linux-based environment without manually provisioning a VPS.

After deployment, you can connect to the running Rhino Linux container using Railway SSH, inspect the system, install packages, test scripts, run commands, and store persistent files in the mounted Railway Volume.

This template is designed for users who want a cloud-hosted Rhino Linux shell environment that can be accessed directly from their terminal using Railway CLI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rhino-linux | `ghcr.io/rhino-linux/docker:latest` | Database |

## Configuration

- **Start command:** `bash -lc 'echo "Ubuntu 22.04 Railway container is running"; tail -f /dev/null'`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/rhino-linux-latest)
