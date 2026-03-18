# Deploy DeerFlow on Railway

AI powered Deep Research - Open Source

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deerflow)

## About

DeerFlow (Deep Exploration and Efficient Research Flow) is a community-driven deep research framework that integrates language models with web search, retrieval, code execution, and collaborative tools. It enables users to perform AI-powered investigations, generate structured research reports, and even create podcasts or presentations from findings, all in one streamlined workflow.

Hosting DeerFlow on Railway provides a one-click way to set up and run the complete deep research system without manual installation. This template includes a Python backend, a Node.js web UI, and a managed Postgres database for storing research results. With built-in support for Google AI Studio (Gemini models) and Tavily Search APIs, you only need to set your API keys—Railway takes care of infrastructure, scaling, and persistence. Within minutes, you’ll have a fully operational research assistant that can search the web, integrate with external tools, and generate AI-enhanced reports, audio, or presentations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Python-backend | [rpuls/deer-flow-quickstart](https://github.com/rpuls/deer-flow-quickstart) | Web service |
| Web Interface | [rpuls/deer-flow-quickstart](https://github.com/rpuls/deer-flow-quickstart) (root: /web) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Python-backend | 8000 | - |
| `SEARCH_API` | Python-backend | tavily | - |
| `TAVILY_API_KEY` | Python-backend | (secret) | Tavily web search API key: https://app.tavily.com/home |
| `RESEARCH_DB_USER` | Python-backend | (secret) | - |
| `BASIC_MODEL__model` | Python-backend | gemini-1.5-pro | - |
| `BASIC_MODEL__api_key` | Python-backend | (secret) | Google aistudio API key: https://aistudio.google.com/app/apikey |
| `RESEARCH_DB_PASSWORD` | Python-backend | (secret) | - |
| `BASIC_MODEL__platform` | Python-backend | google_aistudio | - |
| `BASIC_MODEL__max_retries` | Python-backend | 3 | - |
| `PORT` | Web Interface | 8080 | - |
| `GITHUB_OAUTH_TOKEN` | Web Interface | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, TypeScript, CSS, JavaScript, Dockerfile, Makefile, Shell, Batchfile

[View on Railway →](https://railway.com/deploy/deerflow)
