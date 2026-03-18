# Deploy Kortix SUNA AI on Railway

Deploy and Host Kortix SUNA AI with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kortix-suna-ai)

## About

Suna is an open-source AI assistant designed to simplify real-world tasks through natural conversation. It acts as a digital companion for research, data analysis, and daily challenges by combining powerful capabilities with an intuitive interface that understands user needs and delivers results.

***Feel free to discuss any deployment issues.***

- [Daytona](https://daytona.io/) - Secure agent execution environment
- [Supabase](https://supabase.com/) - Database and authentication
- [Playwright](https://playwright.dev/) - Browser automation
- [OpenAI](https://openai.com/) - LLM provider
- [Anthropic](https://www.anthropic.com/) - LLM provider
- [Tavily](https://tavily.com/) - Search capabilities
- [Firecrawl](https://firecrawl.dev/) - Web scraping capabilities
- [QStash](https://upstash.com/qstash) - Background job processing and workflows
- [RapidAPI](https://rapidapi.com/) - API services
- [Smithery](https://smithery.ai/) - Custom agent development

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| suna-frontend | [iqbalexperience/suna-frontend](https://github.com/iqbalexperience/suna-frontend) | Web service |
| suna-backend | [iqbalexperience/suna-backend](https://github.com/iqbalexperience/suna-backend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXT_PUBLIC_ENV_MODE` | suna-frontend | PRODUCTION | - |
| `NEXT_PUBLIC_BACKEND_URL` | suna-frontend | - | Public url of backend |
| `NEXT_PUBLIC_SUPABASE_URL` | suna-frontend | - | RESTful endpoint for querying and managing your supabase database. Project Setting > Data Api |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | suna-frontend | - | ANON key of supabase. Project Setting > Api Keys |
| `ENV_MODE` | suna-backend | local | - |
| `QSTASH_URL` | suna-backend | https://qstash.upstash.io | - |
| `REDIS_HOST` | suna-backend | redis | - |
| `REDIS_PORT` | suna-backend | 6379 | - |
| `MODEL_TO_USE` | suna-backend | openai/gpt-4o | - |
| `QSTASH_TOKEN` | suna-backend | (secret) | Create an account at Upstash Console and Get your QStash token |
| `SUPABASE_URL` | suna-backend | - | RESTful endpoint for querying and managing your supabase database. Project Setting > Data Api |
| `FIRECRAWL_URL` | suna-backend | - | Needed only if you self-host firecrawl |
| `RABBITMQ_HOST` | suna-backend | rabbitmq | - |
| `RABBITMQ_PORT` | suna-backend | 5672 | - |
| `RAPID_API_KEY` | suna-backend | (secret) | For accessing additional API services (enables LinkedIn scraping and other tools) |
| `DAYTONA_TARGET` | suna-backend | us | - |
| `OPENAI_API_KEY` | suna-backend | (secret) | You can get api from https://platform.openai.com/api-keys |
| `TAVILY_API_KEY` | suna-backend | (secret) | https://tavily.com/ |
| `DAYTONA_API_KEY` | suna-backend | (secret) | Create a Daytona account and Generate an API key.  Create a Snapshot: Name: kortix/suna:0.1.3 and Image name: kortix/suna:0.1.3 and Entrypoint: /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf |
| `SMITHERY_API_KEY` | suna-backend | (secret) | For custom agents and workflows. https://smithery.ai/ |
| `ANTHROPIC_API_KEY` | suna-backend | (secret) | https://console.anthropic.com/ |
| `FIRECRAWL_API_KEY` | suna-backend | (secret) | https://firecrawl.dev/ |
| `SUPABASE_ANON_KEY` | suna-backend | - | ANON key of supabase. Project Setting > Api Keys |
| `DAYTONA_SERVER_URL` | suna-backend | https://app.daytona.io/api | - |
| `OPENROUTER_API_KEY` | suna-backend | (secret) | https://openrouter.ai/ |
| `QSTASH_NEXT_SIGNING_KEY` | suna-backend | - | Create an account at Upstash Console and Get your signing keys |
| `SUPABASE_SERVICE_ROLE_KEY` | suna-backend | - | Service role key of supabase. Project Setting > Api Keys |
| `QSTASH_CURRENT_SIGNING_KEY` | suna-backend | - | Create an account at Upstash Console and Get your signing keys |
| `MCP_CREDENTIAL_ENCRYPTION_KEY` | suna-backend | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript, Python, PLpgSQL, Dockerfile, HTML, Shell

[View on Railway →](https://railway.com/template/kortix-suna-ai)
