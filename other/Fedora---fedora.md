# Deploy Fedora on Railway

Fedora with storage and SSH for testing, diagnostics, and dev tasks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fedora)

## About

Fedora is a modern, community-driven Linux distribution sponsored by Red Hat. It focuses on up-to-date open-source technologies, developer-friendly tooling, and a clean Linux experience for cloud, container, and development workflows. This template provides Fedora on Railway with persistent storage and SSH access for testing, diagnostics, and dev tasks.

Deploying Fedora on Railway uses the official Fedora Docker image in a lightweight containerized environment. Railway manages infrastructure, networking, deployments, and scaling, so you can run Fedora without manually configuring a server. A Railway Volume can be mounted at `/data` to provide persistent storage for files, logs, scripts, configuration, and generated artifacts across restarts and redeployments. SSH access through Railway lets you inspect the running container, install packages with `dnf`, run commands, debug issues, test tools, and use Fedora as a simple cloud-hosted Linux workspace.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fedora | `fedora:latest` | Database |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fedora)
