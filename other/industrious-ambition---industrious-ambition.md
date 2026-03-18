# Deploy industrious-ambition on Railway

olika whatsapp integration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/industrious-ambition)

## About

industrious-ambition is a Node.js service designed for building intelligent automation systems that combine WhatsApp message handling, voice transcription, and OpenAI-based responses.
It can process text or audio messages, interpret user intent, and generate smart replies in real time.
Each deployment runs independently, making it ideal for multi-tenant SaaS or customer-specific environments.

Hosting industrious-ambition on Railway is simple, scalable, and ideal for automation use cases.
This service runs on Node.js and integrates directly with OpenAI for intelligent text and voice processing.
When deployed, each instance operates independently and can communicate with external systems—such as Laravel APIs—for authentication, logging, and client management.
Railway handles all infrastructure needs including build, deployment, logs, and scaling, so developers can focus entirely on functionality.
Deployments can easily be cloned per client, creating a fully isolated environment for each user or business without complex server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SistemaIntegradoDaOlika | [Uiramaral/SistemaIntegradoDaOlika](https://github.com/Uiramaral/SistemaIntegradoDaOlika) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | America/Sao_Paulo |
| `NODE_ENV` | production |
| `API_TOKEN` | (secret) |
| `CLIENT_ID` | 1 |
| `LOG_LEVEL` | info |
| `API_SECRET` | (secret) |
| `OPENAI_MODEL` | gpt-5-nano |
| `WH_API_TOKEN` | (secret) |
| `AI_STATUS_URL` | https://devpedido.menuolika.com.br |
| `CRON_TIMEZONE` | America/Sao_Paulo |
| `WEBHOOK_TOKEN` | (secret) |
| `OPENAI_API_KEY` | (secret) |
| `OPENAI_TIMEOUT` | 30 |
| `SESSION_FOLDER` | ./session |
| `LARAVEL_API_URL` | https://devdashboard.menuolika.com.br |
| `DEFAULT_COUNTRY_CODE` | 55 |
| `FORCE_CLEAR_AUTH_STATE` | true |

**Category:** Other · **Languages:** Blade, PHP, CSS, JavaScript, PowerShell, Batchfile

[View on Railway →](https://railway.com/template/industrious-ambition)
