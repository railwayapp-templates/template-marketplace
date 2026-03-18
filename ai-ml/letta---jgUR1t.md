# Deploy letta on Railway

Deploy a Letta server (uses the latest Letta Docker image)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jgUR1t)

## About

## Letta

👾 Letta is an open source framework for building stateful LLM applications. You can use Letta to build stateful agents with advanced reasoning capabilities and transparent long-term memory. The Letta framework is white box and model-agnostic.

For more information see: https://github.com/letta-ai/letta

## Usage

For a tutorial on how to deploy a Letta server on Railway, see our docs page: https://docs.letta.com/guides/server/railway

1. Deploy the Railway template.
2. To use the Letta ADE, go to https://app.letta.com and connect to a remote development server. Use the IP address exposed by Railway as the server URL, and use the password set in the "Variables" section of your Railway deployment.
3. The Letta server will need to be configured with at least one LLM API provider, to do so set your environment variables (e.g. `OPENAI_API_KEY`) in the "Variables" section.

### Adding additional environment variables

To help you get started, when you deploy the template you have the option to fill in the example environment variables `OPENAI_API_KEY` (to connect your Letta agents to GPT models), `ANTHROPIC_API_KEY` (to connect your Letta agents to Claude models), and `COMPOSIO_API_KEY` (to connect your Letta agents to Composio's library of over 7k pre-made tools).

There are many more providers you can enable on the Letta server via additional environment variables (for example vLLM, Ollama, etc). For more information on available providers, see our documentation: https://docs.letta.com/guides/server/docker

To connect Letta to an additional API provider, you can go to your Railway deployment (after you've deployed the template), click `Variables` to see the current environment variables, then click `+ New Variable` to add a new variable. Once you've saved a new variable, you will need to restart the server for the changes to take effect.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| letta/letta:latest | `letta/letta:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECURE` | true | To enable password protection, set SECURE to true |
| `OPENAI_API_KEY` | (secret) | Your OpenAI API key (optional) |
| `COMPOSIO_API_KEY` | (secret) | Your Composio API key (optional) |
| `ANTHROPIC_API_KEY` | (secret) | Your Anthropic API key (optional) |
| `LETTA_SERVER_PASSWORD` | (secret) | If SECURE is true, the server will use this password |

## Configuration

- **Healthcheck:** `/v1/health/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/postgresql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/jgUR1t)
