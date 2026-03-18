# Deploy believable-sparkle on Railway

A simple template for host your telegram bots

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/believable-sparkle)

## About

**believable-sparkle** is a flexible, container-based script runner designed to deploy and execute any GitHub repository dynamically. It allows users to clone a repo at runtime and start it using a configurable command, making it ideal for bots, workers, automation scripts, and background services.

Hosting believable-sparkle on Railway involves deploying a lightweight Docker container that includes Python, Node.js, ffmpeg, and common system dependencies. The service dynamically clones a GitHub repository using an environment variable and runs a user-defined start command. Railway handles the infrastructure, restarts, logging, and scaling automatically, allowing you to focus on development instead of server management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Railway | [error403op/Railway](https://github.com/error403op/Railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REPO_URL` | Puthere | Put your GitHub repo link |
| `START_CMD` | Puthere | Put your project start command here |
| `APT_PACKAGES` | git | Put your missing apt packages here |

**Category:** Bots · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/believable-sparkle)
