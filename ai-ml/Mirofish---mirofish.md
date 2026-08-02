# Deploy Mirofish on Railway

A Simple and Universal Swarm Intelligence Engine, Predicting Anything.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mirofish)

## About

MiroFish is an open-source AI prediction engine powered by multi-agent simulation. By combining OpenAI-compatible large language models with long-term agent memory, it creates an interactive digital world where autonomous AI agents simulate future scenarios, analyze complex events, and generate detailed prediction reports from real-world seed materials.

Railway makes deploying MiroFish simple by running the official Docker image while managing infrastructure, networking, HTTPS, and deployments automatically. MiroFish consists of a frontend and backend that work together to process uploaded documents, generate agent simulations, and present interactive prediction results through a web interface. The application requires API credentials for an OpenAI-compatible LLM provider and Zep Cloud for long-term memory. A Railway Volume mounted at `/app/backend/uploads` is required to persist uploaded files and datasets across deployments. Railway also simplifies environment variable management, logging, and scaling, allowing you to focus on running AI simulations instead of maintaining infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mirofish | `ghcr.io/666ghj/mirofish:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port exposed by the application container |
| `FLASK_DEBUG` | false | Disable Flask debug mode for production deployment |
| `LLM_API_KEY` | (secret) | API key for your OpenAI-compatible LLM provider (e.g., OpenAI, DashScope, Zeabur AI Hub) |
| `ZEP_API_KEY` | (secret) | API key from Zep Cloud for agent long-term memory & knowledge graph construction (https://app.getzep.com/) |
| `LLM_BASE_URL` | https://dashscope.aliyuncs.com/compatible-mode/v1 | Base API endpoint URL for your primary LLM service provider |
| `LLM_MODEL_NAME` | qwen-plus | Model identifier for the primary LLM (e.g., qwen-plus, gpt-4.1-mini, gpt-4o) |
| `OASIS_DEFAULT_MAX_ROUNDS` | 10 | Maximum simulation rounds for OASIS agent engine (higher = more tokens used; 10 is recommended for tests) |

## Configuration

- **Start command:** `sh -c 'sed -i "s/server: {/server: { allowedHosts: true,/" /app/frontend/vite.config.js && npm run dev'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/uploads`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mirofish)
