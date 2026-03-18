# Deploy Plano AI on Railway

An open-source AI proxy for routing, guardrails & observability

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plano-ai)

## About

Plano is an AI-native proxy built on Envoy that provides a unified, OpenAI-compatible gateway for routing requests across multiple LLM providers. It supports intelligent model selection based on prompt intent, built-in guardrails for safety filtering and jailbreak detection, and automatic OpenTelemetry tracing for observability across all requests.
<img src="https://github.com/katanemo/plano/raw/main/docs/source/_static/img/PlanoTagline.svg" alt="Plano">
<img src="https://github.com/katanemo/plano/raw/main/docs/source/_static/img/plano_network_diagram_high_level.png" alt="Plano">

Deploying Plano requires a containerized environment with network access to external LLM provider APIs. The service is stateless and needs no persistent storage or database — configuration is generated at startup from environment variables. You provide API keys for one or more LLM providers (OpenAI, Anthropic, Google, Groq, Mistral, DeepSeek, xAI, Together AI), and Plano auto-generates its Envoy proxy configuration. The service exposes a single HTTP port for its OpenAI-compatible gateway endpoint. For advanced setups involving intelligent routing between multiple providers, you can supply a full YAML configuration directly via environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Plano | [protemplate/plano-railway](https://github.com/protemplate/plano-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 12000 |
| `LOG_LEVEL` | info |
| `XAI_API_KEY` | (secret) |
| `GROQ_API_KEY` | (secret) |
| `PLANO_TIMEOUT` | 30s |
| `GOOGLE_API_KEY` | (secret) |
| `OPENAI_API_KEY` | (secret) |
| `MISTRAL_API_KEY` | (secret) |
| `PLANO_XAI_MODEL` | xai/grok-3 |
| `DEEPSEEK_API_KEY` | (secret) |
| `PLANO_GROQ_MODEL` | groq/llama-3.3-70b-versatile |
| `TOGETHER_API_KEY` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |
| `PLANO_GOOGLE_MODEL` | gemini/gemini-2.5-flash |
| `PLANO_OPENAI_MODEL` | openai/gpt-4o |
| `PLANO_MISTRAL_MODEL` | mistral/mistral-large-latest |
| `PLANO_ROUTING_MODEL` | Arch-Router |
| `PLANO_DEEPSEEK_MODEL` | deepseek/deepseek-chat |
| `PLANO_TOGETHER_MODEL` | together_ai/meta-llama/Llama-3.3-70B-Instruct-Turbo |
| `PLANO_TRACE_SAMPLING` | 0 |
| `PLANO_ANTHROPIC_MODEL` | anthropic/claude-sonnet-4-5 |
| `PLANO_ROUTING_PROVIDER` | arch-router |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Shell, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/plano-ai)
