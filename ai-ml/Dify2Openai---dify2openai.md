# Deploy Dify2Openai on Railway

Convert Dify API into an OpenAI API,streaming,blocking,chat,agent & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify2openai)

## About

D2O (Dify2OpenAI) is an open-source gateway that converts Dify applications into OpenAI-compatible APIs. It allows any OpenAI-compatible client, SDK, or application to seamlessly interact with Dify Chat, Completion, Agent, and Workflow applications without requiring code changes.

Railway makes deploying D2O simple by automatically building the application from the included Dockerfile or deploying the official Docker image. Once deployed, D2O exposes an OpenAI-compatible API endpoint that forwards requests to your Dify application. Railway handles HTTPS, networking, deployments, and environment variables automatically, allowing you to focus on integrating AI applications. Since D2O is a stateless API gateway, no database or persistent storage is required, making deployments lightweight, scalable, and easy to maintain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dify2Openai | `fatwang2/dify2openai:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Optional. HTTP port the application listens on. Railway sets this automatically. |
| `BOT_TYPE` | Chat | Required. Type of Dify application. Supported: Chat, Completion, Agent, Workflow |
| `MODELS_NAME` | dify | Optional. Model name returned by GET /v1/models. Default: dify |
| `DIFY_API_URL` | - | Required. Your Dify API endpoint. For self-hosted Dify use https://your-domain/v1 |
| `INPUT_VARIABLE` | query | Optional. Only for Workflow bots. Name of the workflow input variable (e.g. query, text) |
| `OUTPUT_VARIABLE` | text | Optional. Only for Workflow bots. Name of the workflow output variable returned to the client (e.g. text) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/dify2openai)
