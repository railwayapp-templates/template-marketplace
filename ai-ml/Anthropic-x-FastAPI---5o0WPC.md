# Deploy Anthropic x FastAPI on Railway

Starter for your backend AI-powered app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/5o0WPC)

## About

The Anthropic FastAPI Service is a FastAPI-based application that provides a RESTful API interface to the Anthropic Claude AI model, utilizing the anthropic-sdk-python. This setup enables developers to integrate Claude’s conversational AI capabilities into their applications seamlessly.

Key Features:
	•	RESTful API Interface: Facilitates interaction with the Claude AI model through standard HTTP methods, allowing for easy integration into various applications.
	•	FastAPI Framework: Leverages FastAPI for high performance and straightforward API development.
	•	Anthropic SDK Integration: Utilizes anthropic-sdk-python to communicate effectively with the Claude AI model.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| anthropic-fastapi-service | [Chinpeerapat/anthropic-fastapi-service](https://github.com/Chinpeerapat/anthropic-fastapi-service) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GPT_MODEL` | claude-3-5-sonnet-20240620 |
| `MAX_TOKEN` | (secret) |
| `TEMPERATURE` | 0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/anthropic-fastapi`

**Category:** AI/ML · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/template/5o0WPC)
