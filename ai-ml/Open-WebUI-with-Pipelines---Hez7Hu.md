# Deploy Open WebUI with Pipelines on Railway

Open WebUI + Pipelines is an extendable, user friendly self-hosted LLM UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Hez7Hu)

## About

Open WebUI with Pipelines provides a powerful, self-hosted interface for interacting with large language models. It combines a responsive web interface with modular, customizable workflows that support OpenAI API specs, enabling versatile AI interactions with complete privacy and control.

Hosting Open WebUI with Pipelines gives you a centralized platform to manage different models, customize their behavior, and expose them through a clean web interface. The Pipelines framework adds modular workflows with custom logic and Python libraries, enabling advanced features like function calling, rate limiting, usage monitoring, live translation, and toxic message filtering. With Docker deployment support and role-based access control, you can create a scalable AI gateway tailored to your specific needs while maintaining complete data privacy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pipelines | `ghcr.io/open-webui/pipelines:main` | Web service |
| open-webui | `ghcr.io/open-webui/open-webui:main` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | pipelines | 9099 | The application port. |
| `PIPELINES_API_KEY` | pipelines | (secret) | The API key to connect to pipelines. |
| `PORT` | open-webui | 3000 | The application port. |
| `ENABLE_SIGNUP` | open-webui | True | Toggles user account creation. |
| `OPENAI_API_KEY` | open-webui | (secret) | Sets the OpenAI API key. |
| `OPENAI_API_KEYS` | open-webui | (secret) | Supports multiple OpenAI API keys, semicolon-separated. |
| `ENABLE_LOGIN_FORM` | open-webui | (secret) | Toggles email, password, sign in and "or" (only when ENABLE_OAUTH_SIGNUP is set to True) elements. |
| `ENABLE_OLLAMA_API` | open-webui | False | Enables the Ollama connection. This can be changed in the admin panel. |
| `ENABLE_SEARCH_QUERY` | open-webui | True | Enables the generation of search queries from prompts. |
| `OPENAI_API_BASE_URL` | open-webui | https://api.openai.com/v1 | Configures the OpenAI base API URL. |
| `OPENAI_API_BASE_URLS` | open-webui | - | Supports balanced OpenAI base API URLs, semicolon-separated. |
| `ENABLE_RAG_WEB_SEARCH` | open-webui | True | Enable web search toggle. |
| `RAG_WEB_SEARCH_ENGINE` | open-webui | duckduckgo | Select engine for performing searches. |
| `ENABLE_IMAGE_GENERATION` | open-webui | True | Enables or disables image generation features. |
| `IMAGE_GENERATION_ENGINE` | open-webui | openai | Specifies the engine to use for image generation. |
| `ENABLE_REALTIME_CHAT_SAVE` | open-webui | False | Enables real-time saving, while disabling reduces delays but risks data loss. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/pipelines`
- **Healthcheck:** `/health`
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/Hez7Hu)
