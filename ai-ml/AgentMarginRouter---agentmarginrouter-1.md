# Deploy AgentMarginRouter on Railway

Agent Margin Router – x402 Data API for AI Agents and Automations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentmarginrouter-1)

## About

AgentMarginRouter is a production-ready x402 data API for AI agents and automations. It bundles market, on-chain, gas, content, and open-data endpoints and can process paid calls via USDC-based x402 payments.

This template deploys the API router, a strategy worker, and Redis. Railway builds both applications directly from the public GitHub repository and connects the cache via internal reference variables. Before going live, you must configure the payment network, recipient wallet, and desired data providers. Optional API keys unlock additional providers. Live execution is disabled by default and should only be enabled after careful risk assessment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7-alpine` | Database |
| agent-margin-router | [AgentMarginRouter/AgentMarginRouter](https://github.com/AgentMarginRouter/AgentMarginRouter) | Web service |

## Configuration

- **Start command:** `redis-server --appendonly yes --dir /data`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Solidity, JavaScript, Dockerfile, Shell, Procfile

[View on Railway →](https://railway.com/deploy/agentmarginrouter-1)
