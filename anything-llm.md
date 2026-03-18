# Deploy AnythingLLM [Updated Mar ’26] on Railway

AnythingLLM [Mar ’26] (Chat, RAG & Local AI Assistants) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/anything-llm)

## About

AnythingLLM is an open-source AI-powered document and chat management platform designed to let you interact intelligently with your private data. Available on GitHub, it integrates powerful Large Language Models (LLMs) such as OpenAI’s GPT and local models like Ollama or LM Studio.

Self-hosting AnythingLLM gives you full control over your data, configurations, and integrations. Unlike third-party AI chat solutions that store your data on external servers, hosting AnythingLLM on Railway means everything stays private and secure under your own environment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mintplexlabs/anythingllm | `mintplexlabs/anythingllm` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3001 |
| `SERVER_PORT` | 3001 |
| `STORAGE_DIR` | /storage |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/anything-llm)
