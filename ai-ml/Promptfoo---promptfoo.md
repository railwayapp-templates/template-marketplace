# Deploy Promptfoo on Railway

An open-source tool for testing, evaluating, and red-teaming LLM apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/promptfoo)

## About

Promptfoo is an open-source tool for testing, evaluating, and red-teaming LLM applications. The self-hosted version provides a shared web UI and API server for storing and comparing eval results — making it easy to run evals in CI/CD pipelines, aggregate results across runs, and keep sensitive prompt and output data off third-party services.

The self-hosted Promptfoo image is an Express server that serves the web UI and stores eval results in a SQLite database. This Railway template deploys the official Docker image with a persistent volume so eval history survives restarts and redeploys. It is designed for individual or small-team use — it does not support horizontal scaling, multi-team access control, or SSO. For production enterprise use, see [Promptfoo Enterprise](https://www.promptfoo.dev/docs/enterprise/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| promptfoo | `ghcr.io/promptfoo/promptfoo:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOME` | /tmp | Home directory |
| `PORT` | 3000 | Port number |
| `OPENAI_API_KEY` | (secret) | OpenAI API key |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/promptfoo/.promptfoo`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/promptfoo)
