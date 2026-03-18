# Deploy LibreChat - Lite on Railway

lite version LibreChat without RAG

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_fTxzh)

## About

# ✨ Features

- 🖥️ **UI & Experience** inspired by ChatGPT with enhanced design and features

- 🤖 **AI Model Selection**:  
  - Anthropic (Claude), AWS Bedrock, OpenAI, Azure OpenAI, Google, Vertex AI, OpenAI Assistants API (incl. Azure)
  - [Custom Endpoints](https://www.librechat.ai/docs/quick_start/custom_endpoints): Use any OpenAI-compatible API with LibreChat, no proxy required
  - Compatible with [Local & Remote AI Providers](https://www.librechat.ai/docs/configuration/librechat_yaml/ai_endpoints):
    - Ollama, groq, Cohere, Mistral AI, Apple MLX, koboldcpp, together.ai,
    - OpenRouter, Perplexity, ShuttleAI, Deepseek, Qwen, and more

- 🔧 **[Code Interpreter API](https://www.librechat.ai/docs/features/code_interpreter)**: 
  - Secure, Sandboxed Execution in Python, Node.js (JS/TS), Go, C/C++, Java, PHP, Rust, and Fortran
  - Seamless File Handling: Upload, process, and download files directly
  - No Privacy Concerns: Fully isolated and secure execution

- 🔦 **Agents & Tools Integration**:  
  - **[LibreChat Agents](https://www.librechat.ai/docs/features/agents)**:
    - No-Code Custom Assistants: Build specialized, AI-driven helpers without coding  
    - Flexible & Extensible: Attach tools like DALL-E-3, file search, code execution, and more  
    - Compatible with Custom Endpoints, OpenAI, Azure, Anthropic, AWS Bedrock, and more
    - [Model Context Protocol (MCP) Support](https://modelcontextprotocol.io/clients#librechat) for Tools
  - Use LibreChat Agents and OpenAI Assistants with Files, Code Interpreter, Tools, and API Actions

- 🪄 **Generative UI with Code Artifacts**:  
  - [Code Artifacts](https://youtu.be/GfTj7O4gmd0?si=WJbdnemZpJzBrJo3) allow creation of React, HTML, and Mermaid diagrams directly in chat

- 💾 **Presets & Context Management**:  
  - Create, Save, & Share Custom Presets  
  - Switch between AI Endpoints and Presets mid-chat
  - Edit, Resubmit, and Continue Messages with Conversation branching  
  - [Fork Messages & Conversations](https://www.librechat.ai/docs/features/fork) for Advanced Context control

- 💬 **Multimodal & File Interactions**:  
  - Upload and analyze images with Claude 3, GPT-4o, o1, Llama-Vision, and Gemini 📸  
  - Chat with Files using Custom Endpoints, OpenAI, Azure, Anthropic, AWS Bedrock, & Google 🗃️

- 🌎 **Multilingual UI**:  
  - English, 中文, Deutsch, Español, Français, Italiano, Polski, Português Brasileiro
  - Русский, 日本語, Svenska, 한국어, Tiếng Việt, 繁體中文, العربية, Türkçe, Nederlands, עברית

- 🎨 **Customizable Interface**:  
  - Customizable Dropdown & Interface that adapts to both power users and newcomers

- 🗣️ **Speech & Audio**:  
  - Chat hands-free with Speech-to-Text and Text-to-Speech  
  - Automatically send and play Audio  
  - Supports OpenAI, Azure OpenAI, and Elevenlabs

- 📥 **Import & Export Conversations**:  
  - Import Conversations from LibreChat, ChatGPT, Chatbot UI  
  - Export conversations as screenshots, markdown, text, json

- 🔍 **Search & Discovery**:  
  - Search all messages/conversations

- 👥 **Multi-User & Secure Access**:
  - Multi-User, Secure Authentication with OAuth2, LDAP, & Email Login Support
  - Built-in Moderation, and Token spend tools

- ⚙️ **Configuration & Deployment**:  
  - Configure Proxy, Reverse Proxy, Docker, & many Deployment options  
  - Use completely local or deploy on the cloud

- 📖 **Open-Source & Community**:  
  - Completely Open-Source & Built in Public  
  - Community-driven development, support, and feedback

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Meilisearch 🔍 | `getmeili/meilisearch:v1.11.3` | Database |
| LibreChat 🪶 | `ghcr.io/danny-avila/librechat-dev:latest` | Web service |
| MongoDB 🍃 | `mongo` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MEILI_ENV` | Meilisearch 🔍 | production |
| `MEILI_DB_PATH` | Meilisearch 🔍 | /meili_data/data.ms |
| `MEILI_HTTP_ADDR` | Meilisearch 🔍 | :::7700 |
| `MEILI_NO_ANALYTICS` | Meilisearch 🔍 | true |
| `HOST` | LibreChat 🪶 | 0.0.0.0 |
| `SEARCH` | LibreChat 🪶 | true |
| `NO_INDEX` | LibreChat 🪶 | true |
| `APP_TITLE` | LibreChat 🪶 | LibreChat |
| `ENDPOINTS` | LibreChat 🪶 | openAI,azureOpenAI,bingAI,chatGPTBrowser,google,gptPlugins,anthropic |
| `LOGIN_MAX` | LibreChat 🪶 | (secret) |
| `GOOGLE_KEY` | LibreChat 🪶 | user_provided |
| `JWT_SECRET` | LibreChat 🪶 | (secret) |
| `CONFIG_PATH` | LibreChat 🪶 | https://raw.githubusercontent.com/fuegovic/lc-config-yaml/main/librechat-rw.yaml |
| `TITLE_CONVO` | LibreChat 🪶 | true |
| `BAN_DURATION` | LibreChat 🪶 | 1000 * 60 * 60 * 2 |
| `BAN_INTERVAL` | LibreChat 🪶 | 20 |
| `BINGAI_TOKEN` | LibreChat 🪶 | (secret) |
| `DEBUG_OPENAI` | LibreChat 🪶 | false |
| `GROQ_API_KEY` | LibreChat 🪶 | (secret) |
| `LOGIN_WINDOW` | LibreChat 🪶 | (secret) |
| `REGISTER_MAX` | LibreChat 🪶 | 5 |
| `CHECK_BALANCE` | LibreChat 🪶 | false |
| `DEBUG_CONSOLE` | LibreChat 🪶 | false |
| `DEBUG_LOGGING` | LibreChat 🪶 | true |
| `DEBUG_PLUGINS` | LibreChat 🪶 | true |
| `BAN_VIOLATIONS` | LibreChat 🪶 | true |
| `MESSAGE_IP_MAX` | LibreChat 🪶 | 40 |
| `OPENAI_API_KEY` | LibreChat 🪶 | (secret) |
| `OPENROUTER_KEY` | LibreChat 🪶 | user_provided |
| `SESSION_EXPIRY` | LibreChat 🪶 | 1000 * 60 * 15 |
| `MISTRAL_API_KEY` | LibreChat 🪶 | (secret) |
| `REGISTER_WINDOW` | LibreChat 🪶 | 60 |
| `ANYSCALE_API_KEY` | LibreChat 🪶 | (secret) |
| `LIMIT_MESSAGE_IP` | LibreChat 🪶 | true |
| `MESSAGE_USER_MAX` | LibreChat 🪶 | The max amount of messages an IP can send per MESSAGE_USER_WINDOW |
| `ALLOW_EMAIL_LOGIN` | LibreChat 🪶 | (secret) |
| `ANTHROPIC_API_KEY` | LibreChat 🪶 | (secret) |
| `FIREWORKS_API_KEY` | LibreChat 🪶 | (secret) |
| `MESSAGE_IP_WINDOW` | LibreChat 🪶 | 1 |
| `OPENAI_MODERATION` | LibreChat 🪶 | false |
| `ALLOW_REGISTRATION` | LibreChat 🪶 | true |
| `ALLOW_SOCIAL_LOGIN` | LibreChat 🪶 | (secret) |
| `JWT_REFRESH_SECRET` | LibreChat 🪶 | (secret) |
| `LIMIT_MESSAGE_USER` | LibreChat 🪶 | (secret) |
| `MEILI_NO_ANALYTICS` | LibreChat 🪶 | true |
| `OPENAI_TITLE_MODEL` | LibreChat 🪶 | gpt-3.5-turbo |
| `PERPLEXITY_API_KEY` | LibreChat 🪶 | (secret) |
| `TOGETHERAI_API_KEY` | LibreChat 🪶 | (secret) |
| `AZURE_OPENAI_MODELS` | LibreChat 🪶 | gpt-3.5-turbo,gpt-4 |
| `GITHUB_CALLBACK_URL` | LibreChat 🪶 | /oauth/github/callback |
| `GOOGLE_CALLBACK_URL` | LibreChat 🪶 | /oauth/google/callback |
| `MESSAGE_USER_WINDOW` | LibreChat 🪶 | 1 |
| `DISCORD_CALLBACK_URL` | LibreChat 🪶 | /oauth/discord/callback |
| `REFRESH_TOKEN_EXPIRY` | LibreChat 🪶 | (secret) |
| `FACEBOOK_CALLBACK_URL` | LibreChat 🪶 | /oauth/facebook/callback |
| `LOGIN_VIOLATION_SCORE` | LibreChat 🪶 | (secret) |
| `CONCURRENT_MESSAGE_MAX` | LibreChat 🪶 | 2 |
| `MESSAGE_VIOLATION_SCORE` | LibreChat 🪶 | 1 |
| `ALLOW_SOCIAL_REGISTRATION` | LibreChat 🪶 | false |
| `LIMIT_CONCURRENT_MESSAGES` | LibreChat 🪶 | true |
| `CONCURRENT_VIOLATION_SCORE` | LibreChat 🪶 | 1 |
| `NON_BROWSER_VIOLATION_SCORE` | LibreChat 🪶 | 20 |
| `REGISTRATION_VIOLATION_SCORE` | LibreChat 🪶 | 1 |
| `MONGOPORT` | MongoDB 🍃 | 27017 |
| `MONGOPASSWORD` | MongoDB 🍃 | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB 🍃 | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB 🍃 | (secret) |

## Configuration

- **Volume:** `/meili_data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/_fTxzh)
