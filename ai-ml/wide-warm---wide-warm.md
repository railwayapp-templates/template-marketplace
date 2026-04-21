# Deploy wide-warm on Railway

Deploy and Host CrewForm with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wide-warm)

## About

CrewForm is an open-source AI agent orchestration platform that lets you build, deploy, and manage multi-agent workflows through a visual UI. It's the first platform with native support for all three agentic protocols — MCP, A2A, and AG-UI — with no vendor lock-in or LLM cost markup.

This template deploys the **CrewForm Task Runner** — the Node.js backend that executes AI agent tasks, team pipelines, and webhook dispatches. It connects to your Supabase instance for auth, database, and realtime subscriptions, and communicates with LLM providers (OpenAI, Anthropic, Google, Groq, Ollama, and 12+ more) using your own API keys. The frontend can be hosted separately on Vercel or any static host. After deployment, configure your Supabase credentials and add at least one LLM API key through the Settings UI to start running agents.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CrewForm | [CrewForm/crewform](https://github.com/CrewForm/crewform) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SUPABASE_URL` | - | Supabase project URL (e.g. https://xxxx.supabase.co) |
| `ENCRYPTION_KEY` | - | 32-byte hex string for AES-256-GCM — encrypts stored LLM API keys |
| `OPENAI_API_KEY` | (secret) | Global fallback OpenAI key (most users use per-workspace BYOK instead) |
| `RESEND_API_KEY` | (secret) | For email dispatch via Resend  |
| `WEBHOOK_SECRET` | (secret) | Shared secret for Supabase Database Webhook validation |
| `CREWFORM_EDITION` | - | Set to ce for community edition |
| `ANTHROPIC_API_KEY` | (secret) | Global fallback Anthropic key |
| `SUPABASE_SERVICE_ROLE_KEY` | - | Supabase service role key (from Project Settings → API) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | (secret) | Global fallback Google key |

**Category:** AI/ML · **Languages:** TypeScript, PLpgSQL, CSS, JavaScript, Shell, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/wide-warm)
