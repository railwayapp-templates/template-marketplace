# Deploy Debian Bookworm Slim on Railway

[Jun'26] Debian Bookworm Slim with SSH & persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-bookworm-slim)

## About

Debian Bookworm Slim SSH is a lightweight cloud-hosted Debian workspace that can be accessed through Railway SSH. It uses the official `debian:bookworm-slim` image, a smaller Debian 12 Bookworm variant, and supports persistent storage through Railway Volume for storing files, scripts, logs, and project data across restarts.

![Imgur](https://imgur.com/PXl01aE.png)

Hosting Debian Bookworm Slim SSH on Railway involves deploying a minimal containerized Debian 12 Bookworm environment that can be accessed securely using Railway CLI SSH. The `debian:bookworm-slim` image provides a smaller base system compared to the standard Debian image, making it suitable for lightweight Linux workflows, diagnostics, testing, and development tasks. Railway manages the deployment, runtime, networking, environment, and infrastructure layer, so you do not need to provision a VPS manually. After deployment, you can connect to the running Debian container from your local terminal, install only the packages you need with `apt`, run commands, test scripts, inspect the environment, and use a mounted Railway Volume for persistent files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| debian | `debian:bookworm-slim` | Database |

## Configuration

- **Start command:** `bash -lc 'echo "Debian container is running on Railway"; tail -f /dev/null'`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/debian-bookworm-slim)
