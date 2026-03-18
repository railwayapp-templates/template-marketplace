# Deploy Ragpi Discord Integration on Railway

A Discord bot for the Ragpi AI Assistant

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cgiAdr)

## About

# Ragpi Discord Integration

Ragpi is an open-source AI assistant API that answers questions using your documentation, GitHub issues, and READMEs. It combines LLMs with intelligent search to provide relevant, documentation-backed answers through a simple API.

This is a template for the Ragpi Discord integration. You can find out more on how to deploy this integration on railway here: https://docs.ragpi.io/deployment/railway

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ragpi-discord | `ragpi/ragpi-discord` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_ENV` | production |
| `DISCORD_TOKEN` | (secret) |
| `RAGPI_API_KEY` | (secret) |

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/cgiAdr)
