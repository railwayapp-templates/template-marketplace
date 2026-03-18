# Deploy Ragpi Slack Intgration on Railway

A Slack bot for the Ragpi AI Assistant

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/aaWjR4)

## About

# Ragpi Slack Integration

Ragpi is an open-source AI assistant API that answers questions using your documentation, GitHub issues, and READMEs. It combines LLMs with intelligent search to provide relevant, documentation-backed answers through a simple API.

This is a template for the Ragpi Slack integration. You can find out more on how to deploy this integration on railway here: https://docs.ragpi.io/deployment/railway

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ragpi-slack | `ragpi/ragpi-slack` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_ENV` | production |
| `RAGPI_API_KEY` | (secret) |
| `SLACK_APP_TOKEN` | (secret) |
| `SLACK_BOT_TOKEN` | (secret) |

**Category:** AI/ML

[View on Railway →](https://railway.com/template/aaWjR4)
