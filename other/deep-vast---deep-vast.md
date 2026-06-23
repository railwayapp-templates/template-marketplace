# Deploy deep-vast on Railway

Deploy and Host deep-vast with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deep-vast)

## About

The Finding Hidden Customers Agent by Cannonball GTM identifies pain-based market segments from publicly available compliance data — the buyers your competitors can't see. Enter a brand, and the agent researches it, ranks pain segments, and produces an execution roadmap.

This template deploys your own private instance. You provide an Anthropic API key and a password. Railway handles hosting. Each analysis costs roughly $3 in Anthropic API usage, billed to your own account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Finding-Hidden-Customers-Public-Agent | [marketadvocate-sudo/Finding-Hidden-Customers-Public-Agent](https://github.com/marketadvocate-sudo/Finding-Hidden-Customers-Public-Agent) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ANTHROPIC_API_KEY` | (secret) |
| `CANNONBALL_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/deep-vast)
