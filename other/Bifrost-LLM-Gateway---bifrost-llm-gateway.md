# Deploy Bifrost LLM Gateway on Railway

High-performance AI gateway for 12+ LLM providers via one OpenAI API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-llm-gateway)

## About

Bifrost is a high-performance AI gateway that unifies access to 12+ providers (OpenAI, Anthropic, AWS Bedrock, Google Vertex, and more) through a single OpenAI-compatible API. It offers automatic failover, load balancing, semantic caching, and a built-in Web UI for easy configuration.

![Bifrost LLM Gateway](https://opengraph.githubassets.com/027231e34679f13d043884e2d69bd69e052e500e3bf7b5b03c72101eda21b724/maximhq/bifrost)

Hosting Bifrost on Railway is simple and requires zero configuration to get started. Deploy the official `maximhq/bifrost` image, attach a persistent volume at `/app/data`, and open the generated domain. The built-in Web UI allows you to add provider API keys, manage models, monitor requests, and enable authentication. All configuration, logs, and cache data are stored in the mounted volume so they survive restarts and redeployments.

> **Tip:** After your first successful deployment, you can protect the Bifrost Dashboard with a username and password.
>
> Navigate to **Bifrost Dashboard → Settings → Security**, then enable **Password protect the dashboard**. Once enabled, you'll be prompted to create a username and password for future access.

![Bifrost AUth](https://imgur.com/R7LpL2k.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bifrost | `maximhq/bifrost:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8081 |
| `APP_HOST` | 0.0.0.0 |
| `APP_PORT` | 8081 |
| `LOG_LEVEL` | info |
| `LOG_STYLE` | json |
| `OPENAI_API_KEY` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/bifrost-llm-gateway)
