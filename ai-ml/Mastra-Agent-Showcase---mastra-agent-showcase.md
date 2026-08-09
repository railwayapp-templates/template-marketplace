# Deploy Mastra Agent Showcase on Railway

The Mastra kitchen sink: agents, workflows, MCP, guardrails, HITL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastra-agent-showcase)

## About

[Mastra](https://mastra.ai) is the open-source TypeScript framework for building AI agents and workflows. This template deploys the Mastra "kitchen sink" example: dozens of agents (chef, gateway, code-mode, clinic supervisor and specialists, billing, dynamic tools, human-in-the-loop approvals), ten workflows, MCP servers, input/output guardrail processors (PII redaction, moderation, toxicity), a pluggable auth matrix — all on one server.

The server exposes every agent and workflow through the standard Mastra REST API on one service, and the public domain also serves Mastra Studio, so you can chat with any agent and run any workflow in the browser. LibSQL and DuckDB state persists on an attached volume. Auth defaults to open; set `AUTH_PROVIDER` and the matching provider variables to enable WorkOS, Clerk, Auth0, Okta, better-auth, or simple token auth. The demo cron schedules are off by default because they fire every minute; set `DEMO_SCHEDULES=true` to turn them on. Set your OpenAI API key and deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastra Server | [leoisadev1/mastra-template-agent](https://github.com/leoisadev1/mastra-template-agent) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/mastra-agent-showcase)
