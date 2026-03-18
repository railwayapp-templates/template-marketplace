# Deploy Trilium on Railway

Build your personal knowledge base with Trilium Notes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jsMnJe)

## About

This template deploys a Trilium docker image and mounts the required volume for it to run properly.
It listens by default on port 8080 and should be accessible instantly (after deployment) without further configuration, just set up a password using it's web interface and you should be golden.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Trilium | `zadam/trilium` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Default port of trilium |
| `TRILIUM_DATA_DIR` | /home/node/trilium-data | Path of the mounted volume |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/trilium-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/jsMnJe)
