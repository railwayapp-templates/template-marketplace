# Deploy InvokeAI — Self-Hosted Stable Diffusion Studio on Railway

Self-host InvokeAI — canvas, node workflows & custom SD models

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/invokeai-stable-diffusion-studio)

## About

InvokeAI is a leading open-source creative engine for Stable Diffusion — a professional-grade platform for generating and editing visual media, built around a streamlined WebUI, a unified canvas for infinite out-painting and inpainting, and a node-based backend for custom generation workflows. It gives artists and teams complete ownership of the creative process on infrastructure they control. This template deploys InvokeAI with a persistent volume for your models, images, and configuration.

---

InvokeAI is a full Stable Diffusion creative suite, and there are a few things worth knowing to run it well.

**Stable Diffusion is compute-intensive, and hardware determines the experience.** Image generation is a heavy workload — model checkpoints are large (SDXL models are several gigabytes) and each generation runs many diffusion steps. For responsive, production-grade generation, InvokeAI is designed to run against a GPU backend; performance scales directly with the compute available to it. Plan your deployment's resources and model choices around the throughput you need, and connect the compute backend appropriate to your setup.

**The model directory is essential and belongs on a volume.** InvokeAI stores its models, generated images, and settings under its root directory. Checkpoints are multiple gigabytes each, so a persistent volume is required — without it, models re-download and generated work is lost on every redeploy. This template mounts it.

**The unified canvas and node workflows are the differentiators.** Beyond text-to-image, InvokeAI's canvas supports infinite out-painting, inpainting, and iterative editing on one surface, and its node-based backend lets you build and reuse custom generation pipelines. These are what set it apart from simpler Stable Diffusion frontends.

**Secure the interface.** InvokeAI's WebUI has no built-in authentication, so on a public deployment protect it — Railway's automatic HTTPS encrypts traffic, and you should keep the instance access-controlled rather than openly reachable.

Typical cost: **infrastructure-based** on Railway for the service and model storage, plus whatever compute backend you connect for generation. InvokeAI is Apache-2.0 and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| invokeai | `ghcr.io/invoke-ai/invokeai` | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/invokeai-stable-diffusion-studio)
