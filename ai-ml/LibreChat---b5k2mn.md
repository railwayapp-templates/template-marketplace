# Deploy LibreChat on Railway

Open-source ChatGPT clone: multi-model, agents, search, multi-user auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b5k2mn)

## About

# LibreChat on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b5k2mn?referralCode=HI9hWz&utm_medium=integration&utm_source=template&utm_campaign=generic)

## ⚠️ BEFORE DEPLOYMENT

Make sure to review and correctly configure your `.env` file using the official guide:
👉 [LibreChat Configuration Guide](https://www.librechat.ai/docs/configuration/dotenv)

---

## 💡 What is LibreChat?

LibreChat is an **open-source, ChatGPT-style AI chat platform** built for flexibility, privacy, and full customization. It supports multiple AI providers (OpenAI, Anthropic, Azure, Google, Ollama, Bedrock, etc.) and includes advanced tools such as a code interpreter, file handling, agent builder, and multimodal AI interactions—all in a modern web UI.

---

## ☁️ About Hosting LibreChat

Hosting LibreChat on Railway provides a seamless cloud environment for full-stack AI applications. Deployment takes minutes and requires minimal setup. Railway automatically provisions your backend, database, and static frontend while allowing scalable infrastructure with no manual configuration.
You can connect your environment variables from LibreChat’s `.env` configuration and instantly deploy a production-ready AI platform, complete with authentication, model selection, agents, and more.

---

## 🔧 Common Use Cases

* Build a **private ChatGPT alternative** with multiple AI backends.
* Host a **multi-user AI workspace** with authentication and moderation tools.
* Deploy a **custom AI assistant or agent platform** with no-code tools.
* Integrate **local or remote AI models** (Ollama, vLLM, Groq, Bedrock).
* Run **secure AI file processing and code execution** environments.

---

## 📦 Dependencies for LibreChat Hosting

* **Node.js** 18+ (recommended 20.x)
* **MongoDB** (use Railway’s built-in database or connect an external instance)
* **Redis** *(optional but recommended)* for caching and session handling

### Deployment Dependencies

* Environment configuration: [`.env` setup guide](https://www.librechat.ai/docs/configuration/dotenv)
* AI endpoints setup: [librechat.yaml reference](https://www.librechat.ai/docs/configuration/librechat_yaml/ai_endpoints)
* Custom endpoints: [OpenAI-compatible APIs](https://www.librechat.ai/docs/quick_start/custom_endpoints)

---

## ⚙️ Implementation Details

LibreChat’s Railway template automatically deploys the backend (Express + MongoDB) and serves the production frontend built with React + Vite.
After deployment:

1. Go to Railway’s dashboard → Variables → Add `.env` keys from the [config guide](https://www.librechat.ai/docs/configuration/dotenv).
2. Redeploy the service.
3. Access your hosted LibreChat instance from the Railway-generated domain.

Optional integrations include:

* File uploads (S3-compatible storage)
* OpenAI, Azure, or Anthropic API keys
* OAuth2 / Email login

---

## 🚀 Why Deploy LibreChat on Railway?

Railway is a unified deployment platform that eliminates infrastructure complexity. It automatically handles build, configuration, and scaling for your stack, allowing you to focus on development.

By deploying **LibreChat** on Railway, you instantly get:

* Automated deployment with a single click
* Built-in database hosting
* Scalable, containerized services
* Simplified `.env` management
* CI/CD integration and logs out of the box

You’re one click away from running a complete, production-ready AI platform with support for multiple models, agents, and tools—all in one place.

---

## 🌐 Project Links

* 🔗 **Project Repository:** [github.com/danny-avila/LibreChat](https://github.com/danny-avila/LibreChat)
* 📘 **Documentation:** [www.librechat.ai/docs](https://www.librechat.ai/docs)
* 💬 **Community Discord:** [discord.librechat.ai](https://discord.librechat.ai)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VectorDB | `pgvector/pgvector:pg16` | Database |
| RAG API | `ghcr.io/danny-avila/librechat-rag-api-dev-lite:latest` | Web service |
| LibreChat | `ghcr.io/danny-avila/librechat-dev:latest` | Web service |
| Meilisearch | `getmeili/meilisearch:v1.11.3` | Database |
| MongoDB | `mongo` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | VectorDB | railway | - |
| `POSTGRES_USER` | VectorDB | (secret) | - |
| `POSTGRES_PASSWORD` | VectorDB | (secret) | - |
| `PORT` | RAG API | 8000 | - |
| `DB_PORT` | RAG API | 5432 | - |
| `JWT_SECRET` | RAG API | (secret) | - |
| `DEBUG_RAG_API` | RAG API | false | - |
| `POSTGRES_USER` | RAG API | (secret) | - |
| `OPENAI_API_KEY` | RAG API | (secret) | set a random value if you want to setup RAG later otherwise checkout https://www.librechat.ai/docs/configuration/rag_api |
| `POSTGRES_PASSWORD` | RAG API | (secret) | - |
| `EMBEDDINGS_PROVIDER` | RAG API | openai | - |
| `HOST` | LibreChat | 0.0.0.0 | - |
| `PROXY` | LibreChat | - | PROXY is to be used by all endpoints |
| `SEARCH` | LibreChat | true | enables search in messages and conversations |
| `NO_INDEX` | LibreChat | true | - |
| `APP_TITLE` | LibreChat | LibreChat | - |
| `ENDPOINTS` | LibreChat | openAI,agents,assistants,azureOpenAI,google,anthropic,custom | customize the available endpoints in LibreChat |
| `LOGIN_MAX` | LibreChat | (secret) | The max amount of logins allowed per IP per LOGIN_WINDOW |
| `GOOGLE_KEY` | LibreChat | user_provided | - |
| `JWT_SECRET` | LibreChat | (secret) | - |
| `CONFIG_PATH` | LibreChat | https://raw.githubusercontent.com/LibreChat-AI/librechat-config-yaml/main/librechat-up-l.yaml | - |
| `TITLE_CONVO` | LibreChat | true | - |
| `BAN_DURATION` | LibreChat | 1000 * 60 * 60 * 2 | How long the user and associated IP are banned for (in milliseconds) |
| `BAN_INTERVAL` | LibreChat | 20 | The user will be banned everytime their score reaches/crosses over the interval threshold |
| `DEBUG_OPENAI` | LibreChat | false | Set to true to enable debug mode for the OpenAI endpoint |
| `GROQ_API_KEY` | LibreChat | (secret) | - |
| `LOGIN_WINDOW` | LibreChat | (secret) | In minutes, determines the window of time for LOGIN_MAX logins |
| `REGISTER_MAX` | LibreChat | 5 | In minutes, determines the window of time for REGISTER_MAX registrations |
| `AZURE_API_KEY` | LibreChat | (secret) | - |
| `CHECK_BALANCE` | LibreChat | false | - |
| `DEBUG_CONSOLE` | LibreChat | false | Enable verbose server output in the console with 'true' , though it's not recommended due to high verbosity. |
| `DEBUG_LOGGING` | LibreChat | true | - |
| `DEBUG_PLUGINS` | LibreChat | true | Set to false to disable debug mode for plugins |
| `GOOGLE_MODELS` | LibreChat | gemini-2.5-pro,gemini-2.5-pro-preview-06-05,gemini-2.5-pro-preview-05-06,gemini-2.5-pro-preview-03-25,gemini-2.5-flash,gemini-2.5-flash-preview-05-20,gemini-2.5-flash-lite-preview-06-17,gemini-2.0-flash,gemini-2.0-flash-exp,gemini-2.0-flash-lite-preview-02-05,gemini-2.0-flash-thinking-exp,gemini-2.0-flash-thinking-exp-1219,gemini-2.0-pro-exp-02-05,gemini-exp-1206,gemini-1.5-flash-001,gemini-1.5-flash-002,gemini-1.5-flash-latest,gemini-1.5-pro-001,gemini-1.5-pro-002,gemini-1.5-pro-latest | - |
| `OPENAI_MODELS` | LibreChat | gpt-3.5-turbo,gpt-3.5-turbo-0125,gpt-3.5-turbo-1106,gpt-3.5-turbo-16k,gpt-3.5-turbo-instruct,gpt-3.5-turbo-instruct-0914,gpt-4,gpt-4-0125-preview,gpt-4-0613,gpt-4-1106-preview,gpt-4-turbo,gpt-4-turbo-2024-04-09,gpt-4-turbo-preview,gpt-4.1,gpt-4.1-2025-04-14,gpt-4.1-mini,gpt-4.1-mini-2025-04-14,gpt-4.1-nano,gpt-4.1-nano-2025-04-14,gpt-4.5-preview,gpt-4.5-preview-2025-02-27,gpt-4o,gpt-4o-2024-05-13,gpt-4o-2024-08-06,gpt-4o-2024-11-20,gpt-4o-mini,gpt-4o-mini-2024-07-18,gpt-4o-mini-realtime-preview,gpt-4o-mini-realtime-preview-2024-12-17,gpt-4o-mini-search-preview,gpt-4o-mini-search-preview-2025-03-11,gpt-4o-realtime-preview,gpt-4o-realtime-preview-2024-10-01,gpt-4o-realtime-preview-2024-12-17,gpt-4o-realtime-preview-2025-06-03,gpt-4o-search-preview,gpt-4o-search-preview-2025-03-11,gpt-4o-mini-tts,gpt-4o-mini-search-preview,gpt-4o-mini-search-preview-2025-03-11,gpt-5,gpt-5-2025-08-07,gpt-5-mini,gpt-5-mini-2025-08-07,gpt-5-nano,gpt-5-nano-2025-08-07,gpt-5-chat-latest,gpt-5-codex,gpt-5-pro,gpt-5-pro-2025-10-06,gpt-5-search-api,gpt-5-search-api-2025-10-14,gpt-realtime,gpt-realtime-2025-08-28,gpt-realtime-mini,gpt-realtime-mini-2025-10-06,gpt-image-1,gpt-image-1-mini,o1,o1-2024-12-17,o1-mini,o1-mini-2024-09-12,o1-preview,o1-preview-2024-09-12,o1-pro,o1-pro-2025-03-19,o3,o3-2025-04-16,o3-mini,o3-mini-2025-01-31,o4-mini,o4-mini-2025-04-16,o4-mini-deep-research,o4-mini-deep-research-2025-06-26,davinci-002,babbage-002,codex-mini-latest,chatgpt-4o-latest | - |
| `BAN_VIOLATIONS` | LibreChat | true | Whether or not to enable banning users for violations (they will still be logged) |
| `MESSAGE_IP_MAX` | LibreChat | 40 | The max amount of messages an IP can send per MESSAGE_IP_WINDOW |
| `OPENAI_API_KEY` | LibreChat | (secret) | - |
| `OPENROUTER_KEY` | LibreChat | user_provided | - |
| `SESSION_EXPIRY` | LibreChat | 1000 * 60 * 15 | - |
| `MISTRAL_API_KEY` | LibreChat | (secret) | - |
| `REGISTER_WINDOW` | LibreChat | 60 | In minutes, determines the window of time for REGISTER_MAX registrations |
| `ANYSCALE_API_KEY` | LibreChat | (secret) | - |
| `LIMIT_MESSAGE_IP` | LibreChat | true | Whether to limit the amount of messages an IP can send per MESSAGE_IP_WINDOW |
| `MESSAGE_USER_MAX` | LibreChat | 40 | The max amount of messages an IP can send per MESSAGE_USER_WINDOW |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) | Email login. Set to true or false to enable or disable ONLY email login |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) | - |
| `FIREWORKS_API_KEY` | LibreChat | (secret) | - |
| `MESSAGE_IP_WINDOW` | LibreChat | 1 | In minutes, determines the window of time for MESSAGE_IP_MAX messages |
| `OPENAI_MODERATION` | LibreChat | false | Set to true or false, Whether or not to enable OpenAI moderation on the OpenAI and Plugins endpoints |
| `ALLOW_REGISTRATION` | LibreChat | true | Email registration of new users. Set to true or false to enable or disable Email registration |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) | Allow users to connect to LibreChat with various social networks, see below. Set to true or false to enable or disable |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) | - |
| `LIMIT_MESSAGE_USER` | LibreChat | (secret) | Whether to limit the amount of messages an IP can send per MESSAGE_USER_WINDOW |
| `MEILI_NO_ANALYTICS` | LibreChat | true | disable anonymized telemetry analytics for MeiliSearch for absolute privacy |
| `OPENROUTER_API_KEY` | LibreChat | (secret) | - |
| `PERPLEXITY_API_KEY` | LibreChat | (secret) | - |
| `TOGETHERAI_API_KEY` | LibreChat | (secret) | - |
| `GITHUB_CALLBACK_URL` | LibreChat | /oauth/github/callback | - |
| `GOOGLE_CALLBACK_URL` | LibreChat | /oauth/google/callback | - |
| `MESSAGE_USER_WINDOW` | LibreChat | 1 | In minutes, determines the window of time for MESSAGE_USER_MAX messages |
| `DISCORD_CALLBACK_URL` | LibreChat | /oauth/discord/callback | - |
| `GITHUB_CLIENT_SECRET` | LibreChat | (secret) | - |
| `GOOGLE_CLIENT_SECRET` | LibreChat | (secret) | - |
| `REFRESH_TOKEN_EXPIRY` | LibreChat | (secret) | - |
| `DISCORD_CLIENT_SECRET` | LibreChat | (secret) | - |
| `FACEBOOK_CALLBACK_URL` | LibreChat | /oauth/facebook/callback | - |
| `LOGIN_VIOLATION_SCORE` | LibreChat | (secret) | - |
| `CONCURRENT_MESSAGE_MAX` | LibreChat | 2 | The max amount of messages a user can send per request |
| `FACEBOOK_CLIENT_SECRET` | LibreChat | (secret) | - |
| `MESSAGE_VIOLATION_SCORE` | LibreChat | 1 | - |
| `ALLOW_SOCIAL_REGISTRATION` | LibreChat | false | Enable or disable registration of new user using various social network. Set to true or false to enable or disable |
| `LIMIT_CONCURRENT_MESSAGES` | LibreChat | true | Whether to limit the amount of messages a user can send per request |
| `CONCURRENT_VIOLATION_SCORE` | LibreChat | 1 | - |
| `NON_BROWSER_VIOLATION_SCORE` | LibreChat | 20 | - |
| `REGISTRATION_VIOLATION_SCORE` | LibreChat | 1 | - |
| `MEILI_ENV` | Meilisearch | production | - |
| `MEILI_DB_PATH` | Meilisearch | /meili_data/data.ms | - |
| `MEILI_HTTP_ADDR` | Meilisearch | :::7700 | - |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | - |
| `MONGOPORT` | MongoDB | 27017 | - |
| `MONGOPASSWORD` | MongoDB | (secret) | - |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | - |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`

**Category:** AI/ML · **Verified:** Yes

[View on Railway →](https://railway.com/deploy/b5k2mn)
