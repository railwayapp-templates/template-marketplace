# Deploy LocalAI on Railway

Zero Config | One Click | Fully Persisted | Secured UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/localai-1)

## About

LocalAI is an open source, OpenAI-compatible API that allows you to run large language models, embeddings, image generation, and audio processing locally or on your own infrastructure. It acts as a drop-in replacement for OpenAI APIs while supporting multiple model families without requiring specialised hardware.

Hosting LocalAI on Railway enables you to run a fully self-managed AI backend without dealing with infrastructure complexity. Railway handles deployment, networking, and scaling, while LocalAI provides the inference layer for models such as LLMs, embedding models, and multimodal systems. With persistent storage configured, you can cache models, store generated outputs, and maintain configuration across deployments. This setup is ideal for building production-ready AI applications that require full control over data, cost, and performance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LocalAI Docker | `localai/localai:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LOCALAI_ADDRESS` | :8080 |
| `LOCALAI_API_KEY` | (secret) |
| `LOCALAI_LOG_LEVEL` | info |
| `LOCALAI_CONFIG_DIR` | /data/config |
| `LOCALAI_MODELS_PATH` | /data/models |
| `LOCALAI_UPLOAD_PATH` | /data/uploads |
| `LOCALAI_BACKENDS_PATH` | /data/backends |
| `LOCALAI_GENERATED_CONTENT_PATH` | /data/generated |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/localai-1)
