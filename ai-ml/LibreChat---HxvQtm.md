# Deploy LibreChat on Railway

LibreChat is a free, open source AI chat platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/HxvQtm)

## About

LibreChat is an open-source AI chat platform that replicates the ChatGPT experience while supporting multiple AI providers. It features a familiar interface with advanced capabilities like multimodal chat, code artifacts, conversation branching, and comprehensive multi-user management.

Hosting LibreChat provides a comprehensive AI chat platform that combines the familiar ChatGPT interface with extensive customization and multi-provider support. Built for both individual and enterprise use, it supports OpenAI, Anthropic, Google, local AI services like Ollama, and many others through a unified interface. With features like conversation branching, custom presets, file uploads, generative UI with code artifacts, and robust multi-user authentication, LibreChat offers a complete solution for organizations wanting control over their AI chat infrastructure while maintaining security and flexibility.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo` | Database |
| LibreChat | `ghcr.io/danny-avila/librechat-dev:latest` | Web service |
| Meilisearch | `getmeili/meilisearch:v1.9` | Database |
| RAG-API | `ghcr.io/danny-avila/librechat-rag-api-dev-lite:latest` | Web service |
| pgvector | `pgvector/pgvector:pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Hostname for MongoDB, using Railway's private domain |
| `MONGOPORT` | MongoDB | 27017 | Default port for MongoDB connections |
| `MONGOUSER` | MongoDB | - | Username for MongoDB connections, referencing the root username |
| `MONGO_URL` | MongoDB | - | Public MongoDB connection URL using root credentials and Railway's TCP proxy |
| `MONGOPASSWORD` | MongoDB | (secret) | Password for MongoDB connections, referencing the root password |
| `MONGO_PRIVATE_URL` | MongoDB | - | Private MongoDB connection URL using root credentials and Railway's private domain |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Randomly generated 32-character secret for the MongoDB root password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root username for MongoDB initialization |
| `HOST` | LibreChat | 0.0.0.0 | Host address to bind the server to |
| `Proxy` | LibreChat | - | PROXY is to be used by all endpoints |
| `SEARCH` | LibreChat | true | enables search in messages and conversations |
| `CREDS_IV` | LibreChat | - | Initialization vector for credential encryption |
| `NO_INDEX` | LibreChat | true | https://docs.librechat.ai/install/configuration/dotenv.html#meilisearch-current-default-search- |
| `APP_TITLE` | LibreChat | LibreChat | https://docs.librechat.ai/install/configuration/dotenv.html#customization |
| `CREDS_KEY` | LibreChat | - | Key for credential encryption |
| `ENDPOINTS` | LibreChat | openAI,azureOpenAI,bingAI,chatGPTBrowser,google,gptPlugins,anthropic | customize the available endpoints in LibreChat |
| `LOGIN_MAX` | LibreChat | (secret) | The max amount of logins allowed per LOGIN_WINDOW |
| `MONGO_URI` | LibreChat | - | MongoDB connection URI |
| `GOOGLE_KEY` | LibreChat | user_provided | API key for Google services |
| `JWT_SECRET` | LibreChat | (secret) | Secret for JWT tokens |
| `MEILI_HOST` | LibreChat | - | Host address for Meilisearch |
| `CONFIG_PATH` | LibreChat | https://raw.githubusercontent.com/fuegovic/lc-config-yaml/main/librechat-rw.yaml | Here you can add a local path of a config file or a URL, The best way to use this is to upload the file on GitHub and paste here the link of the file |
| `RAG_API_URL` | LibreChat | - | URL for the RAG (Retrieval-Augmented Generation) API |
| `TITLE_CONVO` | LibreChat | true | Whether to enable conversation titles |
| `BAN_DURATION` | LibreChat | 1000 * 60 * 60 * 2 | How long the user will be banned when their score reaches/exceeds the threshold |
| `BAN_INTERVAL` | LibreChat | 20 | The user will be banned every time their score reaches/exceeds over this interval threshold |
| `BINGAI_TOKEN` | LibreChat | (secret) | https://docs.librechat.ai/install/configuration/dotenv.html#bing |
| `DEBUG_OPENAI` | LibreChat | false | Set to true to enable debug mode for the OpenAI endpoint |
| `GROQ_API_KEY` | LibreChat | (secret) | API key for Groq service |
| `LOGIN_WINDOW` | LibreChat | (secret) | In minutes, determines the window of time for LOGIN_MAX logins |
| `REGISTER_MAX` | LibreChat | 5 | In minutes, determines the window of time for REGISTER_MAX registrations |
| `AZURE_API_KEY` | LibreChat | (secret) | https://docs.librechat.ai/install/configuration/dotenv.html#azure |
| `CHATGPT_TOKEN` | LibreChat | (secret) | https://docs.librechat.ai/install/configuration/dotenv.html#chatgpt |
| `CHECK_BALANCE` | LibreChat | false | https://docs.librechat.ai/install/configuration/dotenv.html#balance |
| `CUSTOM_FOOTER` | LibreChat | - | change the default "All AI conversations in one place" |
| `DEBUG_CONSOLE` | LibreChat | false | Enable verbose server output in the console with 'true', though it's not recommended due to high verbosity |
| `DEBUG_LOGGING` | LibreChat | true | https://docs.librechat.ai/install/configuration/dotenv.html#logging |
| `DEBUG_PLUGINS` | LibreChat | true | Set to true to disable debug mode for plugins |
| `BAN_VIOLATIONS` | LibreChat | true | Whether or not to enable banning users for violations (they will still be logged) |
| `MESSAGE_IP_MAX` | LibreChat | 40 | The max amount of messages an IP can send per MESSAGE_IP_WINDOW |
| `OPENAI_API_KEY` | LibreChat | (secret) | API key for OpenAI service |
| `OPENROUTER_KEY` | LibreChat | user_provided | API key for OpenRouter service |
| `SESSION_EXPIRY` | LibreChat | 1000 * 60 * 15 | Session expiry time in milliseconds |
| `MISTRAL_API_KEY` | LibreChat | (secret) | API key for Mistral AI service |
| `REGISTER_WINDOW` | LibreChat | 60 | The max amount of registrations allowed per REGISTER_WINDOW |
| `ANYSCALE_API_KEY` | LibreChat | (secret) | API key for Anyscale service |
| `GITHUB_CLIENT_ID` | LibreChat | - | https://docs.librechat.ai/install/configuration/dotenv.html#github-authentication |
| `GOOGLE_CLIENT_ID` | LibreChat | - | https://docs.librechat.ai/install/configuration/dotenv.html#google-authentication |
| `LIMIT_MESSAGE_IP` | LibreChat | true | Whether to limit the amount of messages an IP can send per MESSAGE_IP_WINDOW |
| `MEILI_MASTER_KEY` | LibreChat | - | Master key for Meilisearch |
| `MESSAGE_USER_MAX` | LibreChat | The max amount of messages an IP can send per MESSAGE_USER_WINDOW | - |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) | Email login. Set to true or false to enable or disable Only email login |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) | https://docs.librechat.ai/install/configuration/dotenv.html#anthropic |
| `DISCORD_CLIENT_ID` | LibreChat | - | https://docs.librechat.ai/install/configuration/dotenv.html#discord-authentication |
| `FIREWORKS_API_KEY` | LibreChat | (secret) | API key for Fireworks AI service |
| `MESSAGE_IP_WINDOW` | LibreChat | 1 | In minutes, determines the window of time for MESSAGE_IP_MAX messages |
| `OPENAI_MODERATION` | LibreChat | false | Set to true or false. Whether or not to enable OpenAI moderation on the OpenAI API endpoint |
| `ALLOW_REGISTRATION` | LibreChat | true | Email registration of new users. Set to true or false to enable or disable |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) | Allow users to connect to LibreChat with various social networks, see below, set to true or false to enable or disable |
| `FACEBOOK_CLIENT_ID` | LibreChat | - | https://docs.librechat.ai/install/configuration/dotenv.html#facebook-authentication |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) | Secret for JWT refresh tokens |
| `LIMIT_MESSAGE_USER` | LibreChat | (secret) | Whether to limit the amount of messages an IP can send per MESSAGE_USER_WINDOW |
| `MEILI_NO_ANALYTICS` | LibreChat | true | disable anonymized telemetry analytics for MeiliSearch for absolute privacy |
| `OPENAI_TITLE_MODEL` | LibreChat | gpt-3.5-turbo | OpenAI model used for generating conversation titles |
| `OPENROUTER_API_KEY` | LibreChat | (secret) | https://docs.librechat.ai/install/configuration/dotenv.html#openrouter |
| `PERPLEXITY_API_KEY` | LibreChat | (secret) | API key for Perplexity AI service |
| `TOGETHERAI_API_KEY` | LibreChat | (secret) | API key for Together AI service |
| `AZURE_OPENAI_MODELS` | LibreChat | gpt-3.5-turbo,gpt-4 | Comma-separated list of available Azure OpenAI models |
| `GITHUB_CALLBACK_URL` | LibreChat | /oauth/github/callback | Callback URL for GitHub OAuth |
| `GOOGLE_CALLBACK_URL` | LibreChat | /oauth/google/callback | Callback URL for Google OAuth |
| `MESSAGE_USER_WINDOW` | LibreChat | 1 | In minutes, determines the window of time for MESSAGE_USER_MAX messages |
| `OPENAI_FORCE_PROMPT` | LibreChat | - | For Local LLM APIs, sometimes use prompt payload (not messages) to mimic /v1/completions instead of /v1/chat/completions for specific LocalAI models |
| `OPENAI_ORGANIZATION` | LibreChat | - | Organization ID for OpenAI API |
| `DISCORD_CALLBACK_URL` | LibreChat | /oauth/discord/callback | Callback URL for Discord OAuth |
| `GITHUB_CLIENT_SECRET` | LibreChat | (secret) | https://docs.librechat.ai/install/configuration/dotenv.html#github-authentication |
| `GOOGLE_CLIENT_SECRET` | LibreChat | (secret) | https://docs.librechat.ai/install/configuration/dotenv.html#google-authentication |
| `REFRESH_TOKEN_EXPIRY` | LibreChat | (secret) | Expiry time for refresh tokens in milliseconds |
| `CHATGPT_REVERSE_PROXY` | LibreChat | - | https://docs.librechat.ai/install/configuration/dotenv.html#chatgpt |
| `DISCORD_CLIENT_SECRET` | LibreChat | (secret) | https://docs.librechat.ai/install/configuration/dotenv.html#discord-authentication |
| `FACEBOOK_CALLBACK_URL` | LibreChat | /oauth/facebook/callback | Callback URL for Facebook OAuth |
| `LOGIN_VIOLATION_SCORE` | LibreChat | (secret) | Score added for login violations |
| `CONCURRENT_MESSAGE_MAX` | LibreChat | 2 | The max amount of messages a user can send per request |
| `FACEBOOK_CLIENT_SECRET` | LibreChat | (secret) | https://docs.librechat.ai/install/configuration/dotenv.html#facebook-authentication |
| `AZURE_AI_SEARCH_API_KEY` | LibreChat | (secret) | API key for Azure AI Search |
| `MESSAGE_VIOLATION_SCORE` | LibreChat | 1 | Score added for message violations |
| `ALLOW_SOCIAL_REGISTRATION` | LibreChat | false | Enable or disable registration of new user using various social network. Set to true or false to enable or disable |
| `LIMIT_CONCURRENT_MESSAGES` | LibreChat | true | Whether to limit the amount of messages a user can send per request |
| `AZURE_AI_SEARCH_INDEX_NAME` | LibreChat | - | Index name for Azure AI Search |
| `AZURE_OPENAI_DEFAULT_MODEL` | LibreChat | - | Default model for Azure OpenAI |
| `CONCURRENT_VIOLATION_SCORE` | LibreChat | 1 | Score added for concurrent message violations |
| `AZURE_AI_SEARCH_API_VERSION` | LibreChat | - | API version for Azure AI Search |
| `NON_BROWSER_VIOLATION_SCORE` | LibreChat | 20 | Score added for non-browser violations |
| `REGISTRATION_VIOLATION_SCORE` | LibreChat | 1 | Score added for registration violations |
| `AZURE_AI_SEARCH_SERVICE_ENDPOINT` | LibreChat | - | Service endpoint for Azure AI Search |
| `AZURE_AI_SEARCH_SEARCH_OPTION_TOP` | LibreChat | - | Top option for Azure AI Search |
| `AZURE_USE_MODEL_AS_DEPLOYMENT_NAME` | LibreChat | - | Whether to use the model name as the deployment name |
| `AZURE_AI_SEARCH_SEARCH_OPTION_SELECT` | LibreChat | - | Select option for Azure AI Search |
| `AZURE_AI_SEARCH_SEARCH_OPTION_QUERY_TYPE` | LibreChat | - | Query type for Azure AI Search |
| `MEILI_ENV` | Meilisearch | production | Set Meilisearch environment to production mode |
| `MEILI_DB_PATH` | Meilisearch | /meili_data/data.ms | File path for Meilisearch database storage |
| `MEILI_HTTP_ADDR` | Meilisearch | :::7700 | HTTP address and port for Meilisearch to listen on, allowing connections from any IP |
| `MEILI_MASTER_KEY` | Meilisearch | - | Master key for Meilisearch, referencing the key set in LibreChat configuration |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | Disable anonymized telemetry analytics for Meilisearch for absolute privacy |
| `PORT` | RAG-API | 8000 | Port on which the RAG API server will run |
| `DB_HOST` | RAG-API | - | Hostname for the vector database, using Railway's private domain |
| `DB_PORT` | RAG-API | 5432 | Default port for PostgreSQL database connections |
| `JWT_SECRET` | RAG-API | (secret) | Secret key for JWT token generation/validation, shared with LibreChat |
| `POSTGRES_DB` | RAG-API | - | Name of the PostgreSQL database, fetched from VectorDB service |
| `DEBUG_RAG_API` | RAG-API | false | Disables debug mode for the Retrieval-Augmented Generation (RAG) API |
| `POSTGRES_USER` | RAG-API | (secret) | Username for PostgreSQL database access, fetched from VectorDB service |
| `OPENAI_API_KEY` | RAG-API | (secret) | API key for OpenAI services, left blank to be provided by the user or fetched from another source |
| `POSTGRES_PASSWORD` | RAG-API | (secret) | Password for PostgreSQL database access, fetched from VectorDB service |
| `EMBEDDINGS_PROVIDER` | RAG-API | openai | Specifies OpenAI as the provider for generating embeddings |
| `POSTGRES_DB` | pgvector | railway | Name of the default database to be created upon PostgreSQL initialization |
| `POSTGRES_USER` | pgvector | (secret) | Default superuser name for PostgreSQL database |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Randomly generated 16-character password for the PostgreSQL superuser, using uppercase letters and numbers |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/HxvQtm)
