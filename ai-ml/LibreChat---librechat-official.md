# Deploy LibreChat on Railway

Open-source ChatGPT clone: multi-model, agents, search, multi-user auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-official)

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
| `POSTGRES_PASSWORD` | RAG API | (secret) | - |
| `RAG_OPENAI_API_KEY` | RAG API | (secret) | OpenAI API key for embeddings. Required if using openai provider. Overrides OPENAI_API_KEY to avoid conflicts with LibreChat. |
| `EMBEDDINGS_PROVIDER` | RAG API | openai | - |
| `HOST` | LibreChat | 0.0.0.0 | - |
| `PROXY` | LibreChat | - | Proxy URL used by all endpoints (leave empty if not needed) |
| `SEARCH` | LibreChat | true | Enable search in messages and conversations via Meilisearch |
| `NO_INDEX` | LibreChat | true | - |
| `APP_TITLE` | LibreChat | LibreChat | - |
| `ENDPOINTS` | LibreChat | openAI,agents,assistants,azureOpenAI,google,anthropic,custom | Comma-separated list of available endpoints |
| `LOGIN_MAX` | LibreChat | (secret) | Max logins allowed per IP per LOGIN_WINDOW |
| `GOOGLE_KEY` | LibreChat | user_provided | - |
| `JWT_SECRET` | LibreChat | (secret) | - |
| `CONFIG_PATH` | LibreChat | https://raw.githubusercontent.com/LibreChat-AI/librechat-config-yaml/main/librechat-up-l.yaml | - |
| `TITLE_CONVO` | LibreChat | true | - |
| `TRUST_PROXY` | LibreChat | 1 | - |
| `BAN_DURATION` | LibreChat | 7200000 | Ban duration in milliseconds (default: 2 hours) |
| `BAN_INTERVAL` | LibreChat | 20 | Ban triggers when violation score reaches this threshold |
| `GROQ_API_KEY` | LibreChat | (secret) | - |
| `LOGIN_WINDOW` | LibreChat | (secret) | Login rate limit window in minutes |
| `REGISTER_MAX` | LibreChat | 5 | Max registrations allowed per IP per REGISTER_WINDOW |
| `CHECK_BALANCE` | LibreChat | false | - |
| `CUSTOM_FOOTER` | LibreChat | - | Custom footer text displayed in the UI |
| `DEBUG_CONSOLE` | LibreChat | false | Enable verbose server output in the console (not recommended for production) |
| `DEBUG_LOGGING` | LibreChat | true | - |
| `GOOGLE_MODELS` | LibreChat | gemini-3.1-pro-preview,gemini-3.1-pro-preview-customtools,gemini-3-flash-preview,gemini-3.1-flash-lite-preview,gemini-2.5-pro,gemini-2.5-flash,gemini-2.5-flash-lite,gemini-2.0-flash,gemini-2.0-flash-lite | - |
| `OPENAI_MODELS` | LibreChat | gpt-5.4,gpt-5.4-pro,gpt-5.4-mini,gpt-5.4-nano,gpt-5.2,gpt-5,gpt-5-mini,gpt-5-nano,gpt-4o,gpt-4o-mini,o3,o4-mini,gpt-image-1,chatgpt-4o-latest | - |
| `BAN_VIOLATIONS` | LibreChat | true | Enable banning users for violations |
| `MESSAGE_IP_MAX` | LibreChat | 40 | Max messages per IP per MESSAGE_IP_WINDOW |
| `OPENAI_API_KEY` | LibreChat | (secret) | - |
| `OPENROUTER_KEY` | LibreChat | user_provided | - |
| `SESSION_EXPIRY` | LibreChat | 900000 | - |
| `MISTRAL_API_KEY` | LibreChat | (secret) | - |
| `REGISTER_WINDOW` | LibreChat | 60 | Registration rate limit window in minutes |
| `DEEPSEEK_API_KEY` | LibreChat | (secret) | API key for DeepSeek |
| `LIMIT_MESSAGE_IP` | LibreChat | true | Enable IP-based message rate limiting |
| `MESSAGE_USER_MAX` | LibreChat | 40 | Max messages per user per MESSAGE_USER_WINDOW |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) | Enable or disable email/password login |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) | - |
| `FIREWORKS_API_KEY` | LibreChat | (secret) | - |
| `MESSAGE_IP_WINDOW` | LibreChat | 1 | IP message rate limit window in minutes |
| `ALLOW_REGISTRATION` | LibreChat | true | Enable or disable email registration of new users |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) | Enable social login (configure provider client IDs/secrets below) |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) | - |
| `LIMIT_MESSAGE_USER` | LibreChat | (secret) | Enable user-based message rate limiting |
| `MEILI_NO_ANALYTICS` | LibreChat | true | Disable anonymized telemetry analytics for Meilisearch |
| `PERPLEXITY_API_KEY` | LibreChat | (secret) | - |
| `TOGETHERAI_API_KEY` | LibreChat | (secret) | - |
| `GITHUB_CALLBACK_URL` | LibreChat | /oauth/github/callback | - |
| `GOOGLE_CALLBACK_URL` | LibreChat | /oauth/google/callback | - |
| `MESSAGE_USER_WINDOW` | LibreChat | 1 | User message rate limit window in minutes |
| `DISCORD_CALLBACK_URL` | LibreChat | /oauth/discord/callback | - |
| `GITHUB_CLIENT_SECRET` | LibreChat | (secret) | - |
| `GOOGLE_CLIENT_SECRET` | LibreChat | (secret) | - |
| `REFRESH_TOKEN_EXPIRY` | LibreChat | (secret) | - |
| `DISCORD_CLIENT_SECRET` | LibreChat | (secret) | - |
| `LOGIN_VIOLATION_SCORE` | LibreChat | (secret) | - |
| `CONCURRENT_MESSAGE_MAX` | LibreChat | 2 | Max concurrent messages per user |
| `MESSAGE_VIOLATION_SCORE` | LibreChat | 1 | - |
| `ALLOW_SOCIAL_REGISTRATION` | LibreChat | false | Allow new users to register via social login |
| `LIMIT_CONCURRENT_MESSAGES` | LibreChat | true | Limit concurrent messages per user |
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

[View on Railway →](https://railway.com/deploy/librechat-official)
