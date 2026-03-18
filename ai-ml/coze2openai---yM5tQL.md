# Deploy coze2openai on Railway

Use Coze on your favorite OpenAI client.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yM5tQL)

## About

This project converts the Coze API to the OpenAI API format, giving you access to Coze's LLMs, knowledge base, plugins, and workflows within your preferred OpenAI clients.

Features

- Convert Coze API into an OpenAI API
- Support streaming and blocking
- Support Chatbots API on Coze

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| coze2openai | [fatwang2/coze2openai](https://github.com/fatwang2/coze2openai) (root: /) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Start command:** `pnpm run start`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/yM5tQL)
