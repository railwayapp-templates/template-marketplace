# Deploy nullclaw (OpenClaw compatible) on Railway

Fastest, smallest, and fully autonomous AI assistant infrastructure.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nullclaw)

## About

NullClaw is an AI agent gateway compatible with the OpenClaw. Full-featured: 22+ providers, 11 channels, hybrid memory, tools, voice. In a 678 KB binary with ~1 MB peak memory usage.

NullClaw runs as a persistent gateway that routes incoming messages through your LLM provider of choice. It's a single static binary with no runtime or framework overhead — starts in under 8 ms and runs comfortably on Railway's smallest instances. All you need is a volume for SQLite persistence and an API key from your provider.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nullclaw | [kadumedim/nullclaw](https://github.com/kadumedim/nullclaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | - |
| `NULLCLAW_MODEL` | anthropic/claude-sonnet-4 | Model to use for inference |
| `NULLCLAW_API_KEY` | (secret) | API key for your LLM provider |
| `NULLCLAW_PROVIDER` | openrouter | Provider ID (openrouter, anthropic, openai, groq, mistral, deepseek, gemini, ollama) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nullclaw/`

**Category:** Automation · **Languages:** Zig, Shell, Dockerfile

[View on Railway →](https://railway.com/template/nullclaw)
