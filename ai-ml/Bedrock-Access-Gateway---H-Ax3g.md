# Deploy Bedrock Access Gateway on Railway

OpenAI-Compatible RESTful APIs for Amazon Bedrock

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/H-Ax3g)

## About

# OpenAI-compatible RESTful APIs for Amazon Bedrock

This template sets up a gateway that allows you to access Amazon Bedrock models seamlessly through OpenAI APIs and SDKs. Perfect for testing Bedrock's foundation models without modifying your existing OpenAI-based applications.

Key Features:

- Support for Claude 3.7 Sonnet and DeepSeek R1 reasoning
- Streaming responses via SSE
- Model, Chat Completion, and Embedding APIs
- Tool Call and Multimodal API support
- Cross-Region Inference
- Flexible deployment: ALB + Lambda or ALB + Fargate

Requirements:

- AWS account with access to Amazon Bedrock foundation models
- Available in regions supporting Amazon Bedrock (e.g., us-west-2)

Ideal for AI developers looking to expand their model options without extensive code changes. 

[Learn more](https://github.com/aws-samples/bedrock-access-gateway)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bedrock-access-gateway | [aws-samples/bedrock-access-gateway](https://github.com/aws-samples/bedrock-access-gateway) (root: /src) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 8080 |
| `API_KEY` | (secret) |
| `AWS_SECRET_ACCESS_KEY` | (secret) |

## Configuration

- **Start command:** `sh -c 'uvicorn api.app:app --host $HOST --port $PORT'`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/H-Ax3g)
