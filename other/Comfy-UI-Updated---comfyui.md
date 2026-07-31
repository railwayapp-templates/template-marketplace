# Deploy Comfy UI (Updated) on Railway

Modular node-based AI image generation workspace for Stable Diffusion.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/comfyui)

## About

ComfyUI is a powerful, node-based graphical user interface for Stable Diffusion and other AI diffusion models. It enables users to construct complex AI image generation workflows visually using a graph-based interface. Designed for artists, developers, and AI enthusiasts, ComfyUI offers granular control over latent space operations, prompt conditioning, and model execution.

Hosting ComfyUI on Railway provisions a dedicated cloud environment to run image generation workflows without relying on local hardware resources. Railway automatically builds the container image using the provided Dockerfile and handles the underlying infrastructure, networking, and security.

Persistent storage is backed by a Railway Volume mounted to store models, checkpoints, and embeddings safely across container restarts. Public HTTP networking is exposed with automatic SSL certificates, allowing secure access to the web interface from anywhere. The deployment can run in CPU mode by default or scale up to dedicated GPU instances on Railway for accelerated model inference.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| comfyui | [arloodots/comfyui](https://github.com/arloodots/comfyui) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CLI_ARGS` | --listen 0.0.0.0 --cpu | - |
| `HF_TOKEN` | (secret) | Access huggingface generation models |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/ComfyUI/`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/comfyui)
