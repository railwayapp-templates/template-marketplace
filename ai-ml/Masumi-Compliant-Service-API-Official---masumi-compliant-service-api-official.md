# Deploy Masumi Compliant Service API Official on Railway

Deploy Masumi-compliant AI agent wrapper

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/masumi-compliant-service-api-official)

## About

Agentic Service Wrapper is a minimal Python API that transforms any AI service into a Masumi Network-compliant agent. It provides standardized endpoints for job processing, payment integration, and status monitoring, enabling developers to quickly monetize their AI services through blockchain payments.

This wrapper creates a FastAPI service that bridges your custom AI logic with Masumi Payment infrastructure. It handles job queuing, payment verification, status reporting, and provides Swagger documentation. The service connects to your deployed Masumi Payment Service to process transactions and manage agent registrations on the Cardano blockchain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| masumi-service-api | [masumi-network/agentic-service-wrapper](https://github.com/masumi-network/agentic-service-wrapper) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | default:8080 |
| `NETWORK` | Preprod | Preprod or Mainnet |
| `SELLER_VKEY` | - | vkey of a wallet, set as seller for this agent (retrieve from your Masumi Payment Service) |
| `PAYMENT_API_KEY` | (secret) | admin or payment API key (token) for your running Masumi Payment Service |
| `AGENT_IDENTIFIER` | YOUR_AGENT_IDENTIFIER | agent ID which will be assigned after registration of the agentic service via Masumi Payment Service |
| `PAYMENT_SERVICE_URL` | - | valid URL of the payment service of your Masumi Payment Service (include https://... and .../api/v1) |

## Configuration

- **Healthcheck:** `health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/template/masumi-compliant-service-api-official)
