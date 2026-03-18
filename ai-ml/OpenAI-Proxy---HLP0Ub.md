# Deploy OpenAI-Proxy on Railway

OpenAI Proxy (100+ LLMs) - OpenAI, Azure, Bedrock, Anthropic, HuggingFace

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/HLP0Ub)

## About

A fast, and lightweight OpenAI-compatible server to call 100+ LLM APIs.

Call all LLM APIs using the OpenAI format. Use Azure, OpenAI, Cohere, Anthropic, Ollama, VLLM, Sagemaker, HuggingFace, Replicate (100+ LLMs)

Test your deployed proxy: 

```
import openai
client = openai.OpenAI(
    api_key="your-master-key",
    base_url="your-proxy-url"
)

# request sent to model set on litellm proxy, `litellm --model`
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages = [
        {
            "role": "user",
            "content": "this is a test request, write a short poem"
        }
    ]
)

print(response)
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| litellm | `ghcr.io/berriai/litellm:main-stable` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4000 |
| `STORE_MODEL_IN_DB` | True |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/HLP0Ub)
