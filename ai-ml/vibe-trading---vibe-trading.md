# Deploy vibe-trading on Railway

AI trading workspace with web UI, backtesting, and multi-agent analysis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vibe-trading)

## About

Vibe-Trading is an AI-native trading research workspace that combines strategy ideation, backtesting, and report generation in one web app. Hosting it on Railway provides managed container runtime, simple networking, and fast iteration with image-based deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vibe-trading | `xiaosong233/vibe-trading-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8899 |
| `MAX_RETRIES` | 2 |
| `TUSHARE_TOKEN` | (secret) |
| `TIMEOUT_SECONDS` | 1200 |
| `LANGCHAIN_PROVIDER` | openrouter |
| `OPENROUTER_API_KEY` | (secret) |
| `OPENROUTER_BASE_URL` | https://openrouter.ai/api/v1 |
| `LANGCHAIN_MODEL_NAME` | deepseek/deepseek-v3.2 |
| `LANGCHAIN_TEMPERATURE` | 0.0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/vibe-trading)
