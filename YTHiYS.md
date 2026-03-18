# Deploy openai-proxy on Railway

OpenAI Proxy (100+ LLMs) - OpenAI, Azure, Bedrock, Anthropic, HuggingFace

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/YTHiYS)

## About

A fast, and lightweight OpenAI-compatible server to call 100+ LLM APIs.

Call all LLM APIs using the OpenAI format. Use Azure, OpenAI, Cohere, Anthropic, Ollama, VLLM, Sagemaker, HuggingFace, Replicate (100+ LLMs)

Test your deployed proxy
import openai 
openai.api_base = "http://0.0.0.0:8000"

print(openai.ChatCompletion.create(model="test", messages=[{"role":"user", "content":"Hey!"}]))

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openai-proxy | [BerriAI/litellm](https://github.com/BerriAI/litellm) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/template/YTHiYS)
