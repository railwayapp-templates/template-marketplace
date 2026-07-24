# Deploy Open WebUI (Private AI Chat + RAG) on Railway

Private ChatGPT alternative: multi-user auth, RAG, bring your own API keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-private-ai-chat-rag)

## About

Open WebUI is the most popular open-source AI chat interface — a private, self-hosted ChatGPT alternative with multi-user authentication, model management, and built-in RAG (chat with your documents). This template deploys the official image with secure defaults, persistent storage, and bring-your-own-API-key support for OpenAI, Anthropic, and any OpenAI-compatible endpoint.

Hosting Open WebUI means running the official `ghcr.io/open-webui/open-webui` container with a persistent volume for user accounts, chat history, and uploaded documents. This template pins a stable release (v0.10.2), mounts a volume at `/app/backend/data`, generates a strong `WEBUI_SECRET_KEY` automatically, disables all telemetry, and passes Railway's healthcheck at `/health`. The first account created becomes the admin; further signups are held in a pending state until approved, so your instance is never open to strangers. Connect any model provider by pasting an API key in Admin Settings — no redeploys needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `ghcr.io/open-webui/open-webui:v0.10.2` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind address. Keep 0.0.0.0 so the Railway edge can reach the app. |
| `DO_NOT_TRACK` | true | Disable tracking. |
| `ENABLE_SIGNUP` | true | Allow signups; new users require admin approval (see DEFAULT_USER_ROLE). |
| `JWT_EXPIRES_IN` | 1w | Session token lifetime. |
| `OPENAI_API_KEY` | (secret) | Optional: OpenAI-compatible API key (OpenAI, OpenRouter, Groq, etc). You can also add providers in Admin Settings after deploy. |
| `WEBUI_SECRET_KEY` | (secret) | Auto-generated secret for signing auth tokens. |
| `DEFAULT_USER_ROLE` | pending | New signups wait for admin approval - your instance is never open to strangers. |
| `SCARF_NO_ANALYTICS` | true | Disable analytics. |
| `OPENAI_API_BASE_URL` | https://api.openai.com/v1 | Base URL for the OpenAI-compatible provider (change for OpenRouter/Groq/etc). |
| `ANONYMIZED_TELEMETRY` | false | Disable Chroma telemetry. |
| `ENABLE_COMMUNITY_SHARING` | false | Disable community sharing. |
| `ENABLE_VERSION_UPDATE_CHECK` | false | Disable update checks. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-private-ai-chat-rag)
