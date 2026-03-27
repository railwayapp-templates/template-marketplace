# Deploy NextChat on Railway

An open-source ChatGPT UI alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Mvjjpn)

## About

NextChat (formerly ChatGPT-Next-Web) is an open-source, self-hostable AI chat interface built with Next.js. It supports OpenAI, Azure OpenAI, Google Gemini, Anthropic Claude, and a dozen other LLM providers through a clean, fast web UI — with all conversation data stored locally in the browser by default.

NextChat is a stateless Next.js application — it proxies API requests to your chosen LLM provider and stores all chat history client-side, so no database is required. Hosting your own instance lets you embed a server-side API key (so users don't need their own), restrict access with a shared password via `CODE`, control which models are available, and point the app at a custom API endpoint or self-hosted model backend. This Railway template deploys the official Docker image and exposes NextChat on a Railway-provided HTTPS domain immediately after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NextChat | [Yidadaa/ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CODE` | - | Access passwords, separated by comma. |
| `OPENAI_API_KEY` | (secret) | OpenAI API key |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, SCSS, JavaScript, Rust, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/Mvjjpn)
