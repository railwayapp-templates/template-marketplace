# Deploy Pipely Ai on Railway

Task Automation with whatsapp

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pipely-ai)

## About

Pipely AI is an open-source task management platform with pipeline automation via WhatsApp and AI agent. Build visual pipelines, connect team members, and let the AI handle task routing, messages, and follow-ups
  automatically.                                                                                                                                                                                                                  
   
  ## About Hosting Pipely AI                                                                                                                                                                                                      
                                                            
  Pipely AI runs as a single container with nginx, Express API, and an AI agent. It connects to PostgreSQL for data storage and Evolution Go for WhatsApp messaging. The Railway template provisions everything automatically —
  database, environment variables, and security keys — so you can start managing pipelines in minutes without any manual configuration.

  ## Common Use Cases

  - Automate task assignment and follow-up via WhatsApp
  - Build visual pipelines for project management with conditional routing
  - Manage teams with AI-powered notifications and response handling

  ## Dependencies for Pipely AI Hosting

  - PostgreSQL (included in template)
  - Evolution Go (deploy separately using its own Railway template for WhatsApp integration)

  ### Deployment Dependencies

  - [Evolution Go Railway Template](https://railway.com) — WhatsApp API service
  - [OpenAI API Key](https://platform.openai.com/) — Required for AI agent (configured after deploy)

  ## Why Deploy Pipely AI on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying Pipely AI on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.


Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying Pipely Ai on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pipely-ai | [Pedro-Furtado/pipely-ai](https://github.com/Pedro-Furtado/pipely-ai) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | pipely-ai | production | - |
| `JWT_SECRET` | pipely-ai | (secret) | - |
| `BACKEND_URL` | pipely-ai | http://127.0.0.1:3333 | - |
| `POLL_INTERVAL_MS` | pipely-ai | 60000 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** TypeScript, JavaScript, Shell, PowerShell, Dockerfile, CSS, HTML

[View on Railway →](https://railway.com/deploy/pipely-ai)
