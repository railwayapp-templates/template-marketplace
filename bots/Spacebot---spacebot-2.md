# Deploy Spacebot on Railway

An AI agent for teams, communities, and multi-user environments.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spacebot-2)

## About

Spacebot is an AI-powered agent platform designed to interact with users across messaging platforms such as Discord, Slack, and Telegram. It allows developers to build assistants that can reason, run tasks, and maintain memory across conversations. Spacebot is designed to be extensible, scalable, and self-hostable, making it suitable for both personal projects and production deployments.

Hosting Spacebot involves running the Spacebot service alongside the components required for AI interactions and persistent storage. The application connects to a language model provider (such as an OpenAI-compatible API) and optionally stores memory or state in a database.

When deployed on Railway, Spacebot runs as a containerized service with environment variables for API keys and configuration. Railway handles networking, logging, and scaling so the bot can reliably process messages, execute background tasks, and respond to users in real time. After deployment, you can use the automatically generated Railway domain to configure providers and connect external services to your Spacebot instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Spacebot | `ghcr.io/spacedriveapp/spacebot:v0.3.2` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/spacebot-2)
