# Deploy Letta [Updated Mar ’26] (Open-Source AI Agent Framework & Orchestration Platform) on Railway

Letta [Mar ’26] (Build, Deploy & Manage AI Agents Seamlessly) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/letta)

## About

Letta is an open-source, voice and chat AI assistant framework designed for developers and organizations who want to create their own intelligent assistants. Unlike closed-source AI services that store your data on external servers, Letta offers full transparency, self-hosting capabilities, and privacy-first design.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| letta/letta:latest | `letta/letta:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECURE` | true | - |
| `OPENAI_API_KEY` | (secret) | - |
| `COMPOSIO_API_KEY` | (secret) | - |
| `ANTHROPIC_API_KEY` | (secret) | - |
| `LETTA_SERVER_PASSWORD` | (secret) | Password to enter the server |

## Configuration

- **Volume:** `/data/postgresql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/letta)
