# Deploy Rustic on Railway

Self-hosted agentic code editor you can use from any browser or phone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustic)

## About

Rustic is an open-source, agentic code editor written in Rust. Rustic Server runs the same Rust core as the desktop app headlessly and serves the full IDE — editor, terminals, file tree, git and a first-class AI agent — to any browser, including a purpose-built phone layout.

This template deploys a single `rustic-server` service built from the [avijitbhuin21/Rustic](https://github.com/avijitbhuin21/Rustic) Dockerfile. The image bundles the Rust server, the web UI, git, node/npx and uv/uvx (for MCP servers), headless Chromium for the agent's browser, and Go/Rust/Bun/TypeScript toolchains. A persistent volume is mounted at `/data` so projects, chats, settings and browser logins survive redeploys, and a public HTTPS domain is generated for you.

A strong login password (`RUSTIC_AUTH_PASSWORD`) and session secret (`RUSTIC_SESSION_SECRET`) are generated fresh for every deploy — find the password in the service's **Variables** tab, then open your domain and log in. Add your AI provider API keys (Anthropic, OpenAI, Gemini, OpenRouter or any OpenAI-compatible endpoint) in Rustic's Settings; they stay on your server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustic-server | [avijitbhuin21/Rustic](https://github.com/avijitbhuin21/Rustic) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `RUSTIC_AUTH_PASSWORD` | (secret) |
| `RUSTIC_SESSION_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Rust, JavaScript, CSS, HTML, PowerShell, Dockerfile, Tree-sitter Query

[View on Railway →](https://railway.com/deploy/rustic)
