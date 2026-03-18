# Deploy LLM Council on Railway

Multi-model AI deliberation for higher-quality decisions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/llm-council)

## About

Stop relying on a single AI model. LLM Council orchestrates multiple large language models through a 3-stage deliberation process—parallel responses, anonymised peer review, and chairman synthesis—to produce more reliable, balanced answers than any single model alone.

LLM Council runs as a stateless HTTP server that coordinates queries across AI providers via OpenRouter. Deploy on Railway to get a dedicated API endpoint for integrating AI deliberation into your applications, automation workflows, or development tools.

The server handles:
- **Model coordination** across 4+ LLMs in parallel
- **Response anonymization** to eliminate model favoritism
- **Consensus building** with configurable verdict types
- **Webhook notifications** for async workflow integration

Build time is approximately 2-3 minutes. No database required—fully stateless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| llm-council | [amiable-dev/llm-council](https://github.com/amiable-dev/llm-council) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENROUTER_API_KEY` | (secret) | Your OpenRouter API key from openrouter.ai |
| `LLM_COUNCIL_API_TOKEN` | (secret) | Secure token for API authentication (generate with: openssl rand -hex 16) |

**Category:** AI/ML · **Languages:** Python, Makefile, Dockerfile

[View on Railway →](https://railway.com/template/llm-council)
