# Deploy ElizaOS on Railway

Deploy your own AI agent that can interact across clients using ElizaOS.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aW47_j)

## About

# ElizaOS Starter

A customizable AI agent framework that lets you create and deploy AI personalities across multiple platforms. Built with TypeScript and powered by your choice of AI models through OpenRouter.

## Features
- 🤖 Multi-platform support (Discord, Twitter)
- 🎭 Customizable AI personalities
- ⚡ Easy deployment and scaling
- 🔒 Secure credentials management
- 🔌 Extensible client system

## Instructions

1. Required Environment Variables:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `OPENROUTER_MODEL`: Your preferred AI model (e.g., "anthropic/claude-3-sonnet")

2. Optional Platform Credentials:
   For Discord:
   - `DISCORD_APPLICATION_ID`
   - `DISCORD_API_TOKEN`

   For Twitter:
   - `TWITTER_USERNAME`
   - `TWITTER_PASSWORD`
   - `TWITTER_EMAIL`

The build process will automatically:
- Set up the necessary dependencies
- Configure your selected platforms
- Deploy your AI agent

Get your OpenRouter API key at: https://openrouter.ai/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg16` | Database |
| eliza-starter | [elizaOS/eliza-starter](https://github.com/elizaOS/eliza-starter) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | pgvector | railway |
| `POSTGRES_USER` | pgvector | (secret) |
| `PGPORT_PRIVATE` | pgvector | 5432 |
| `POSTGRES_PASSWORD` | pgvector | (secret) |
| `RPC_URL` | eliza-starter | https://api.mainnet-beta.solana.com |
| `SLIPPAGE` | eliza-starter | 1 |
| `BASE_MINT` | eliza-starter | So11111111111111111111111111111111111111112 |
| `SERVER_PORT` | eliza-starter | 3000 |
| `SOL_ADDRESS` | eliza-starter | So11111111111111111111111111111111111111112 |
| `DAEMON_PROCESS` | eliza-starter | true |
| `DISCORD_API_TOKEN` | eliza-starter | (secret) |
| `OPENROUTER_API_KEY` | eliza-starter | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/aW47_j)
