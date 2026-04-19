# Deploy Ollama Stack (LLM + Web UI) on Railway

1-click deploy Ollama LLM with Web UI, fast setup, ready to use 🤖

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-stack-llm-web-ui)

## About

Ollama Stack (LLM + Web UI) is a ready-to-deploy AI environment that bundles Ollama as the LLM runtime with a browser-based interface. It enables you to run, manage, and interact with large language models through a simple web UI without complex setup.

Hosting Ollama Stack involves running the Ollama service alongside a Web UI in a single deployable environment. This template is designed for one-click deployment, automatically provisioning the runtime, exposing endpoints, and making the UI accessible via a public URL. You can pull and run models directly from the interface or via API. Scaling depends on available compute resources, especially CPU/GPU and memory, as LLM workloads are resource-intensive. This setup is ideal for rapid prototyping, internal tools, or lightweight production use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open Web UI | `ghcr.io/open-webui/open-webui` | Web service |
| Ollama | `ollama/ollama` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_HOST` | :: |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-stack-llm-web-ui)
