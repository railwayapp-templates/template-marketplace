# Deploy Ragpi Recaptcha Gateway on Railway

A Web Widget for the Ragpi AI Assistant

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/scntIP)

## About

# Ragpi Web Widget Integration

Ragpi is an open-source AI assistant API that answers questions using your documentation, GitHub issues, and READMEs. It combines LLMs with intelligent search to provide relevant, documentation-backed answers through a simple API.

This is a template for the Ragpi Web Widget integration. You can find out more on how to deploy this integration on railway here: https://docs.ragpi.io/deployment/railway

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ragpi-recaptcha-gateway | `ragpi/ragpi-recaptcha-gateway` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_ENV` | production |
| `CORS_ORIGINS` | * |
| `RAGPI_API_KEY` | (secret) |
| `RECAPTCHA_SECRET_KEY` | (secret) |
| `RECAPTCHA_SCORE_THRESHOLD` | 0.5 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/scntIP)
