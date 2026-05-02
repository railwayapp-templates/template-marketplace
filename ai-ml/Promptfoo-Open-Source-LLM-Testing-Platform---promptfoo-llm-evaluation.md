# Deploy Promptfoo | Open-Source LLM Testing Platform on Railway

Self host Promptfoo on Railway — evaluate, compare, and red-team LLMs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/promptfoo-llm-evaluation)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/promptfoo-llm-evaluation?referralCode=QXdhdr)

Deploy Promptfoo on Railway to get a self-hosted LLM evaluation and red-teaming platform running in minutes. Promptfoo is the open-source framework used by 25% of Fortune 500 companies to benchmark prompts, compare models, and catch AI vulnerabilities before they reach production.

Self-host Promptfoo on Railway and get a pre-configured instance with persistent SQLite storage, health monitoring, and a public URL — no infrastructure management required. The template deploys the official `ghcr.io/promptfoo/promptfoo` Docker image with a volume for durable eval storage.

Promptfoo is an MIT-licensed LLM evaluation framework (acquired by OpenAI in March 2026) that lets developers systematically test prompts, compare model outputs, and run security audits against AI applications. It supports 50+ LLM providers out of the box — including OpenAI, Anthropic, Google, AWS Bedrock, Ollama, and custom HTTP endpoints.

Key features:

- **Side-by-side model comparison** with YAML-configured test matrices
- **Red teaming and security scanning** aligned with OWASP and NIST AI standards
- **RAG pipeline evaluation** measuring factuality, relevance, and faithfulness
- **CI/CD integration** via GitHub Actions, Jest, and Vitest for automated quality gates
- **Local-first architecture** — API calls go directly to providers, never through intermediaries

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Promptfoo | `ghcr.io/promptfoo/promptfoo:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | HTTP server listening port |
| `PROMPTFOO_DISABLE_UPDATE` | 1 | Disable npm update checks |
| `PROMPTFOO_DISABLE_TELEMETRY` | 1 | Disable usage telemetry |
| `PROMPTFOO_REMOTE_API_BASE_URL` | - | CLI remote API endpoint |
| `PROMPTFOO_REMOTE_APP_BASE_URL` | - | CLI remote app endpoint |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/promptfoo/.promptfoo`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/promptfoo-llm-evaluation)
