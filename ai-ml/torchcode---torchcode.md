# Deploy torchcode on Railway

A self-hosted, JupyterLab-based PyTorch interview practice platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/torchcode)

## About

[TorchCode](https://github.com/duoan/TorchCode) is a self-hosted, JupyterLab-based coding practice platform focused on PyTorch interview questions. It includes 40 curated notebook problems, built-in judging (`torch_judge`), hints, and progress tracking.

TorchCode runs as a single container using the upstream image from GHCR. The app serves JupyterLab over HTTP and stores progress in a JSON file. For Railway hosting, you only need one app service with a persistent volume mounted to `/app/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| torchcode | `ghcr.io/duoan/torchcode:0.1.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8888 |
| `PROGRESS_PATH` | /app/data/progress.json |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/torchcode)
