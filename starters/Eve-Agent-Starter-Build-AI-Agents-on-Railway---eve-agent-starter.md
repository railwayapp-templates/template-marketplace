# Deploy Eve Agent Starter — Build AI Agents on Railway on Railway

Production-ready starter for AI agents with Vercel Eve. One-key deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eve-agent-starter)

## About

Eve Agent Starter is a production-ready boilerplate for building conversational AI agents with
Vercel's Eve framework. Skip the scaffolding — this template ships a working support-agent example
that answers questions from a knowledge base and escalates to a ticket when it can't, so you start
from a running agent instead of an empty repo. Node 24, pnpm, and Railpack are pre-configured; add
your OpenAI key and deploy.

Self-host on Railway for ~$5/month plus your OpenAI usage — a clean starting point for building and
shipping custom AI agents on infrastructure you own, with no boilerplate to write first.

---

Building a conversational AI agent usually starts with days of boilerplate — wiring the framework,
the LLM connection, a message loop, and a deployment pipeline before you write a line of your own
agent logic. This starter removes that: it's a working Eve agent you deploy first and customize
second, with the runtime, package manager, and build already configured for Railway.

Railway builds and serves it automatically with HTTPS and zero config beyond your OpenAI key. The
included support-agent example shows the framework's patterns — knowledge-base retrieval and ticket
escalation — which you replace with your own domain logic.

Typical cost: **~$5/month** on Railway's Hobby plan for the agent service, plus OpenAI API usage.
It's an open starter — you pay only compute and your own tokens, with full control over the code.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Eve Agent Starter | [tresdoce/eve-agent-starter](https://github.com/tresdoce/eve-agent-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 2000 |
| `APP_STAGE` | production |
| `OPENAI_MODEL` | gpt-4o |
| `OPENAI_API_KEY` | (secret) |
| `RAILPACK_NODE_VERSION` | 24 |
| `OPENAI_REASONING_EFFORT` | medium |
| `ROUTE_AUTH_BASIC_PASSWORD` | (secret) |
| `ROUTE_AUTH_BASIC_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/eve-agent-starter)
