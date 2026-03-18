# Deploy OwlBrain on Railway

OwlBrain Railway Deployment Template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/owlbrain)

## About

OwlBrain is a multi-LLM debate platform that pits five specialized AI agents against each other in structured, multi-round debates. Each agent can run on a different model — Claude, GPT, or Gemini — while an independent judge scores consensus across five dimensions. The result is a synthesized verdict backed by adversarial reasoning, not single-model bias.

Hosting OwlBrain requires a Node.js server, a SQLite database for persistence, and API keys from at least one LLM provider (Anthropic, OpenAI, or Google). The app runs as a single service with a persistent volume for the database. On deploy, Railway builds the TypeScript backend and React frontend automatically via nixpacks. No external databases or additional services are needed — SQLite handles all storage on a mounted volume. For public demos, set `DEMO_MODE=true` to activate built-in rate limiting, token caps, and model locking to protect your API spend.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OwlBrain | [nasserDev/OwlBrain](https://github.com/nasserDev/OwlBrain) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5000 | Your Node.js server port (Default: 5000) |
| `NODE_ENV` | production | Node environment (values: dev / production) |
| `DEMO_MODE` | false | Enable or Disable demo mode (value: true / false) |
| `GEMINI_API_KEY` | (secret) | Your Gemini API Key |
| `OPENAI_API_KEY` | (secret) | Your OpenAI API Key |
| `ANTHROPIC_API_KEY` | (secret) | Your Claude API Key |
| `DEMO_IP_HASH_SALT` | - | Hash Salt Key to encrypt the IPs stored in the DB for demo mode IP limitation feature |
| `DEMO_ADMIN_PASSWORD` | (secret) | The password for your admin control room in demo mode |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** TypeScript, CSS, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/owlbrain)
