# Deploy adk-starter on Railway

set up to use googles adk

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eVpydG)

## About

🚀 Google ADK Starter Kit on Railway
Launch your AI agent project fast with this plug-and-play starter for Google’s Agent Development Kit (ADK). Built on FastAPI and integrated with LiteLLM, this template gives you a clean, production-ready backend to start experimenting with ADK agents. No MCP or frontend included—just the essentials to get your backend running in seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| adk-starter | `ghcr.io/j-palomino/adk-starter:main` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GOOGLE_API_KEY` | (secret) | ADK-starter agent will not work without this |
| `OPENAI_API_KEY` | (secret) | needed for OpenAI Agents, can be OpenRouter |
| `OPENAI_API_BASE` | - | Set to override OpenAI base for ALL open ai models |
| `OPENROUTER_API_KEY` | (secret) | - |
| `GOOGLE_CLOUD_PROJECT` | - | Used For GCP Agents if Vertex Set to True |
| `GOOGLE_CLOUD_LOCATION` | - | Needed for GCP Vertex Deploys |
| `GOOGLE_VERTEXAI_API_KEY` | (secret) | Needed if Vertex AI gen set to true |
| `GOOGLE_GENAI_USE_VERTEXAI` | False | Set to true to use vertex Ai |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/eVpydG)
