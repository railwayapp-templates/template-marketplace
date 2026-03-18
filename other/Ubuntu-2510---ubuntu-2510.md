# Deploy Ubuntu 25.10 on Railway

Ubuntu 25.10 with Volume. SSH into for diagnostics, testing, and dev tasks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ubuntu-2510)

## About

Ubuntu 25.10 (Questing Quokka) is a Debian-based Linux operating system.

Deploying Ubuntu 25.10 on Railway uses the official minimal Ubuntu Docker image in a lightweight containerized environment. Railway manages orchestration, networking, and scaling, providing a clean Ubuntu instance without server management overhead. A persistent volume is mounted at `/data` to retain files, configurations, and application data across redeployments and restarts. This setup offers an on-demand, cloud-hosted Ubuntu environment ideal for isolated Linux workloads and experimentation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu 25.10 | `ubuntu:25.10` | Database |

## Configuration

- **Start command:** `sleep infinity`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/ubuntu-2510)
