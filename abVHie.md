# Deploy Bolt.diy NEW on Railway

official open source version of Bolt.new

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/abVHie)

## About

Features
- AI-powered full-stack web development for NodeJS based applications directly in your browser.
- Support for multiple LLMs with an extensible architecture to integrate additional models.
- Attach images to prompts for better contextual understanding.
- Integrated terminal to view output of LLM-run commands.
- Revert code to earlier versions for easier debugging and quicker changes.
- Download projects as ZIP for easy portability.

add Features env:

- NODE_ENV=development
- VITE_HMR_PROTOCOL=ws
- VITE_HMR_HOST=localhost
- VITE_HMR_PORT=5173
- CHOKIDAR_USEPOLLING=true
- WATCHPACK_POLLING=true
- PORT=5173
- GROQ_API_KEY=${GROQ_API_KEY}
- HuggingFace_API_KEY=${HuggingFace_API_KEY}
- OPENAI_API_KEY=${OPENAI_API_KEY}
- ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
- OPEN_ROUTER_API_KEY=${OPEN_ROUTER_API_KEY}
- XAI_API_KEY=${XAI_API_KEY}
GOOGLE_GENERATIVE_AI_API_KEY=${GOOGLE_GENERATIVE_AI_API_KEY}
- OLLAMA_API_BASE_URL=${OLLAMA_API_BASE_URL}
- TOGETHER_API_KEY=${TOGETHER_API_KEY}
- TOGETHER_API_BASE_URL=${TOGETHER_API_BASE_URL}
- AWS_BEDROCK_CONFIG=${AWS_BEDROCK_CONFIG}
- VITE_LOG_LEVEL=${VITE_LOG_LEVEL:-debug}
- RUNNING_IN_DOCKER=true
- DEFAULT_NUM_CTX=${DEFAULT_NUM_CTX:-32768}

DEFAULT_NUM_CTX=32768 # Consumes 36GB of VRAM
DEFAULT_NUM_CTX=24576 # Consumes 32GB of VRAM
DEFAULT_NUM_CTX=12288 # Consumes 26GB of VRAM
DEFAULT_NUM_CTX=6144 # Consumes 24GB of VRAM

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bolt.diy NEW | `ghcr.io/stackblitz-labs/bolt.diy:6a8449e` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5173 |
| `NODE_ENV` | development |
| `XAI_API_KEY` | (secret) |
| `GROQ_API_KEY` | (secret) |
| `VITE_HMR_HOST` | localhost |
| `VITE_HMR_PORT` | 5173 |
| `OPENAI_API_KEY` | (secret) |
| `VITE_LOG_LEVEL` | ${VITE_LOG_LEVEL:-debug} |
| `DEFAULT_NUM_CTX` | ${DEFAULT_NUM_CTX:-32768} |
| `TOGETHER_API_KEY` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |
| `RUNNING_IN_DOCKER` | true |
| `VITE_HMR_PROTOCOL` | ws |
| `WATCHPACK_POLLING` | true |
| `AWS_BEDROCK_CONFIG` | ${AWS_BEDROCK_CONFIG} |
| `CHOKIDAR_USEPOLLING` | true |
| `HuggingFace_API_KEY` | (secret) |
| `OLLAMA_API_BASE_URL` | ${OLLAMA_API_BASE_URL} |
| `OPEN_ROUTER_API_KEY` | (secret) |
| `TOGETHER_API_BASE_URL` | ${TOGETHER_API_BASE_URL} |
| `GOOGLE_GENERATIVE_AI_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/abVHie)
