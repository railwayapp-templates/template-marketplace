# Deploy Ubuntu on Railway

Ubuntu in your network for debugging

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ubuntu)

## About

Ubuntu is a lightweight base image for debugging and troubleshooting your Railway environment. It provides a persistent Linux shell you can SSH into for diagnostics, testing, and development tasks.

Deploying Ubuntu on Railway gives you a persistent Linux environment accessible via SSH. This is useful for debugging network connectivity between services, testing environment variables, running one-off scripts, or having a sandbox environment within your Railway project. The container stays online and can be accessed anytime using Railway's SSH command feature.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu | `ubuntu` | Worker |

## Configuration

- **Start command:** `sleep infinity`

**Category:** Observability

[View on Railway →](https://railway.com/template/ubuntu)
