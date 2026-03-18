# Deploy Librechat with RAG on Railway

Librechat.ai with RAG enabled

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cnhjS_)

## About

LibreChat is a versatile, open-source AI communications platform that integrates multiple AI models and offers extensive customization options. With the integration of Retrieval-Augmented Generation (RAG) functionality, LibreChat enhances its capabilities by combining large language models (LLMs) with external knowledge bases to provide more accurate and contextually relevant responses. This integration allows the platform to retrieve real-time data and incorporate it into the generation process, ensuring that the chatbot's responses are up-to-date and domain-specific.

###Key Features of LibreChat with RAG:

####Multiple Language Models
Users can choose from various advanced AI models, including OpenAI, Bing, and Azure, ensuring access to the latest technologies.
Customizable Internal Settings: Fine-tune model responses by adjusting parameters such as temperature and tone, and set prompt prefixes for specific roles.

####Search and Filter Functionality
Efficiently reference previous AI conversations with built-in search and filter options.

####Plugin System
Extend chatbot capabilities by interacting with external data sources and environment through a robust plugin system.

####Conversation Branching
Explore different conversational paths by editing and resubmitting messages, enhancing contextual understanding.
Function Agents: Utilize predefined functions to complete specific tasks, adding a new dimension to chatbot capabilities.

####User Authentication
Secure and scalable user authentication system supporting email and social logins.

####Extensive Documentation
Comprehensive guides and documentation facilitate community involvement and plugin contributions.

###Benefits of RAG Integration

####Enhanced Accuracy
By grounding responses in external, up-to-date information, RAG reduces the likelihood of generating inaccurate or outdated answers.

####Cost-Effective
Avoid the high costs of retraining models by using RAG to provide relevant data as part of the prompt.

####Improved User Trust
Responses can include citations or references to sources, increasing transparency and reliability.

####Versatility
Applicable to various natural language processing tasks, including dialogue systems, content generation, and information retrieval.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibreChat | `ghcr.io/danny-avila/librechat-dev:latest` | Web service |
| MongoDB | `mongo` | Database |
| VectorDB | `ankane/pgvector:latest` | Worker |
| Ragapi | [molcsan/rag_api](https://github.com/molcsan/rag_api) | Database |
| 🔎 meilisearch | `getmeili/meilisearch:v1.7.3` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `HOST` | LibreChat | 0.0.0.0 |
| `SEARCH` | LibreChat | true |
| `CREDS_IV` | LibreChat | e2341419ec3dd3d19b13a1a87fafcbfb |
| `NO_INDEX` | LibreChat | true |
| `APP_TITLE` | LibreChat | AiChat |
| `CREDS_KEY` | LibreChat | f34be427ebb29de8d88c107a71546019685ed8b241d8f2ed00c3df97ad2566f0 |
| `ENDPOINTS` | LibreChat | perplexity,google,openAI,assistants |
| `LOGIN_MAX` | LibreChat | (secret) |
| `GOOGLE_KEY` | LibreChat | user_provided |
| `JWT_SECRET` | LibreChat | (secret) |
| `CONFIG_PATH` | LibreChat | https://raw.githubusercontent.com/molcsan/LibreChat/3295fa5cc6516efb871e25cdaf955f3596ba0362/librechat-rw.yaml |
| `TITLE_CONVO` | LibreChat | true |
| `BAN_DURATION` | LibreChat | 1000 * 60 * 60 * 2 |
| `BAN_INTERVAL` | LibreChat | 20 |
| `BINGAI_TOKEN` | LibreChat | (secret) |
| `DEBUG_OPENAI` | LibreChat | false |
| `GROQ_API_KEY` | LibreChat | (secret) |
| `LOGIN_WINDOW` | LibreChat | (secret) |
| `REGISTER_MAX` | LibreChat | 5 |
| `CHECK_BALANCE` | LibreChat | false |
| `DEBUG_CONSOLE` | LibreChat | false |
| `DEBUG_LOGGING` | LibreChat | true |
| `DEBUG_PLUGINS` | LibreChat | true |
| `OPENAI_MODELS` | LibreChat | gpt-4-turbo,gpt-4-vision-preview,gpt-4o,gpt-3.5-turbo |
| `BAN_VIOLATIONS` | LibreChat | true |
| `MESSAGE_IP_MAX` | LibreChat | 40 |
| `OPENAI_API_KEY` | LibreChat | (secret) |
| `OPENROUTER_KEY` | LibreChat | user_provided |
| `SESSION_EXPIRY` | LibreChat | 1000 * 60 * 15 |
| `MISTRAL_API_KEY` | LibreChat | (secret) |
| `REGISTER_WINDOW` | LibreChat | 60 |
| `ANYSCALE_API_KEY` | LibreChat | (secret) |
| `LIMIT_MESSAGE_IP` | LibreChat | true |
| `MEILI_MASTER_KEY` | LibreChat | secret(43, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') |
| `MESSAGE_USER_MAX` | LibreChat | 50 |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) |
| `ASSISTANTS_MODELS` | LibreChat | gpt-4-turbo,gpt-3.5-turbo |
| `FIREWORKS_API_KEY` | LibreChat | (secret) |
| `MESSAGE_IP_WINDOW` | LibreChat | 1 |
| `OPENAI_MODERATION` | LibreChat | false |
| `SHUTTLEAI_API_KEY` | LibreChat | (secret) |
| `ALLOW_REGISTRATION` | LibreChat | true |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) |
| `ASSISTANTS_API_KEY` | LibreChat | (secret) |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) |
| `LIMIT_MESSAGE_USER` | LibreChat | (secret) |
| `MEILI_NO_ANALYTICS` | LibreChat | true |
| `OPENAI_TITLE_MODEL` | LibreChat | gpt-3.5-turbo |
| `PERPLEXITY_API_KEY` | LibreChat | (secret) |
| `RAG_OPENAI_API_KEY` | LibreChat | (secret) |
| `TOGETHERAI_API_KEY` | LibreChat | (secret) |
| `AZURE_OPENAI_MODELS` | LibreChat | gpt-3.5-turbo,gpt-4 |
| `GITHUB_CALLBACK_URL` | LibreChat | /oauth/github/callback |
| `GOOGLE_CALLBACK_URL` | LibreChat | /oauth/google/callback |
| `MESSAGE_USER_WINDOW` | LibreChat | 1 |
| `DISCORD_CALLBACK_URL` | LibreChat | /oauth/discord/callback |
| `REFRESH_TOKEN_EXPIRY` | LibreChat | (secret) |
| `FACEBOOK_CALLBACK_URL` | LibreChat | /oauth/facebook/callback |
| `LOGIN_VIOLATION_SCORE` | LibreChat | (secret) |
| `CONCURRENT_MESSAGE_MAX` | LibreChat | 2 |
| `MESSAGE_VIOLATION_SCORE` | LibreChat | 1 |
| `ALLOW_SOCIAL_REGISTRATION` | LibreChat | false |
| `LIMIT_CONCURRENT_MESSAGES` | LibreChat | true |
| `CONCURRENT_VIOLATION_SCORE` | LibreChat | 1 |
| `NON_BROWSER_VIOLATION_SCORE` | LibreChat | 20 |
| `REGISTRATION_VIOLATION_SCORE` | LibreChat | 1 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |
| `POSTGRES_DB` | VectorDB | mydatabase |
| `POSTGRES_USER` | VectorDB | (secret) |
| `POSTGRES_PASSWORD` | VectorDB | (secret) |
| `JWT_SECRET` | Ragapi | (secret) |
| `CONSOLE_JSON` | Ragapi | true |
| `DEBUG_RAG_API` | Ragapi | true |
| `JWT_REFRESH_SECRET` | Ragapi | (secret) |
| `RAG_OPENAI_API_KEY` | Ragapi | (secret) |
| `PORT` | 🔎 meilisearch | 3331 |
| `MEILI_ENV` | 🔎 meilisearch | production |
| `MEILI_HOST` | 🔎 meilisearch | 0.0.0.0 |
| `MEILI_DB_PATH` | 🔎 meilisearch | /meili_data/data.ms |
| `MEILI_HTTP_ADDR` | 🔎 meilisearch | :::3331 |
| `MEILI_NO_ANALYTICS` | 🔎 meilisearch | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27021
- **Volume:** `/data/db`
- **TCP Proxies:** 8000
- **Volume:** `/vectordata`
- **Volume:** `/meili_data`

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/template/cnhjS_)
