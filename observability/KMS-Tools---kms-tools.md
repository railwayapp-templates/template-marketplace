# Deploy KMS Tools on Railway

Manages, monitors, and generates activation scripts for Windows & Office.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kms-tools)

## About

KMS Tools is an all-in-one KMS toolbox that provides KMS server detection and status monitoring, along with activation script generation for Windows, Windows Server, and Office. It includes regular server monitoring and supports English, Simplified Chinese, and Traditional Chinese interfaces.

Hosting KMS Tools on Railway involves deploying the application from its Dockerfile or the `ikxin/kms-tools:latest` Docker image. The application listens on port `3000` and binds to `0.0.0.0` so it can receive Railway traffic. A persistent Railway Volume is required at `/app/.data` to preserve application data across deployments and restarts. The application also uses configurable monitoring variables to define KMS servers and the monitoring interval. Railway's public networking exposes the application through an HTTPS domain, while Docker handles the application build and runtime configuration. No external database service is documented for this deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kms-tools | `ikxin/kms-tools:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 3000 |
| `NUXT_MONITOR_LIST` | kms.org.cn,win.freekms.cn |
| `NUXT_MONITOR_INTERVAL` | 10 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/kms-tools)
