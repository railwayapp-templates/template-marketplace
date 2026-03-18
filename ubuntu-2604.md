# Deploy Ubuntu 26.04 on Railway

Ubuntu 26.04 with Volume. SSH into for diagnostics, testing, and dev tasks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ubuntu-2604)

## About

Ubuntu 26.04 (Resolute Raccoon) is a Debian-based Linux operating system.

Deploying Ubuntu 26.04 on Railway uses the official minimal Ubuntu Docker image in a lightweight containerized environment. Railway manages orchestration, networking, and scaling, providing a clean Ubuntu instance without server management overhead. A persistent volume is mounted at `/data` to retain files, configurations, and application data across redeployments and restarts. This setup offers an on-demand, cloud-hosted Ubuntu environment ideal for isolated Linux workloads and experimentation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu 26.04 | `ubuntu:26.04` | Database |

## Configuration

- **Start command:** `sleep infinity`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/ubuntu-2604)
