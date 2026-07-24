# Deploy Comfy UI on Railway

Self-hosted node-based UI for Stable Diffusion image generation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/comfy-ui)

## About

ComfyUI is a free, open-source node-based UI for Stable Diffusion image generation. It lets you build and run advanced AI image workflows using a visual graph editor, with support for ControlNet, LoRA, custom nodes, FLUX, and more — giving you full control over your image generation pipeline.

Hosting ComfyUI requires running its Python-based server alongside persistent storage for model checkpoints. Models for Stable Diffusion, FLUX, and LoRA typically range from 2–7 GB each and must be available on the filesystem at startup. Railway provisions a persistent volume for model storage and exposes ComfyUI's web interface over a public HTTPS URL automatically. No GPU is required to run ComfyUI on Railway — CPU mode is supported out of the box, though generation will be slower than on a GPU-enabled instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| comfyui-railway | [Amritasha/comfyui-railway](https://github.com/Amritasha/comfyui-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CLI_ARGS` | --listen 0.0.0.0 --cpu |
| `HF_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/ComfyUI/models`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/comfy-ui)
