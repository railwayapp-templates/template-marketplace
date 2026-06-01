# Deploy OpenClaw with Ollama on Railway

Launch OpenClaw in minutes with open models powered by Ollama.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-ollama)

## About

OpenClaw is an open-source personal AI assistant and agent gateway that connects chat apps, automation workflows, and AI models in one self-hosted environment. This template deploys OpenClaw with a separate Ollama service, so you can run open models on Railway and get started in minutes.

![Imgur](https://imgur.com/ABF346N.png)

Hosting OpenClaw with Ollama gives you a self-hosted AI automation workspace powered by open models. OpenClaw runs as the main gateway for setup, admin access, device pairing, workflows, and agent execution. Ollama runs as a separate Railway service in the same project and provides the local model runtime over Railway's private network.

This two-service setup keeps OpenClaw and Ollama separated, easier to manage, and easier to debug. OpenClaw handles the app and automation layer, while Ollama handles model inference. After deployment, you can open the setup wizard, connect to Ollama, choose or download a supported model, and start running AI-powered tasks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ollama | `ollama/ollama` | Database |
| openclaw | [praveen-ks-2001/openclaw-railway](https://github.com/praveen-ks-2001/openclaw-railway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `OLLAMA_HOST` | ollama | :: |
| `OLLAMA_DEFAULT_MODELS` | ollama | llama3.2:1b |
| `PORT` | openclaw | 8080 |
| `OPENCLAW_VERSION` | openclaw | 2026.5.20 |
| `OPENCLAW_GATEWAY_TOKEN` | openclaw | (secret) |
| `WRAPPER_ADMIN_PASSWORD` | openclaw | (secret) |

## Configuration

- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-ollama)
