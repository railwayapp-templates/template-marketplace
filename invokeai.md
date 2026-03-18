# Deploy InvokeAI on Railway

A powerful creative engine and WebUI for Stable Diffusion image generation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/invokeai)

## About

InvokeAI is a leading creative engine for Stable Diffusion models, empowering professionals and artists to generate and manipulate visual media. It features a streamlined WebUI, a powerful unified canvas for infinite out-painting, and a node-based backend for custom workflows, offering complete ownership and control over the creative process.
![](https://repository-images.githubusercontent.com/525592995/360aff04-be2b-47a6-9417-7e98f2fb55b1)
![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*HnMmMRsV50CeLK5LGR2cWA.png)

Hosting InvokeAI involves deploying a Python-based application that serves a React frontend and a FastAPI backend. Key considerations include managing significant storage requirements for model weights (often several gigabytes) and configuring the environment with necessary libraries like PyTorch and Diffusers. When self-hosting on a cloud platform, you must ensure adequate system resources—specifically RAM and ideally GPU acceleration—to handle image generation tasks efficiently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| invokeai | `ghcr.io/invoke-ai/invokeai:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/invokeai)
