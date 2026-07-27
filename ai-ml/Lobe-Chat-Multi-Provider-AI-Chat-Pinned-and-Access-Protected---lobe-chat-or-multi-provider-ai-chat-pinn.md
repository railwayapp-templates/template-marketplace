# Deploy Lobe Chat | Multi-Provider AI Chat, Pinned and Access-Protected on Railway

Lobe Chat on Railway: pinned release, access code set, no key prompts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lobe-chat-or-multi-provider-ai-chat-pinn)

## About

Lobe Chat is a chat interface that speaks to many model providers at once - OpenAI, Anthropic, Google, Ollama, OpenRouter and others - with conversation branching, plugins and a visual settings screen instead of a config file.

This template runs the official image pinned to a release, with an access code generated for you, and it asks for nothing before you deploy.

Each of those is a fix. The template most people copy builds from the GitHub repository rather than using the published image, which is why it fails as often as it succeeds. It also declares ACCESS_CODE and several provider API keys with empty values, and Railway treats an empty value as a required field - so before you can press Deploy you are asked to paste API keys you may not have yet.

Here the access code is generated at deploy time, so the instance is not open to anyone who finds the URL, and model providers are configured inside the app afterwards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LobeChat | `lobehub/lobe-chat:1.143.3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3210 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/lobe-chat-or-multi-provider-ai-chat-pinn)
