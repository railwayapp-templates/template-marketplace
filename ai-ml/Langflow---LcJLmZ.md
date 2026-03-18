# Deploy Langflow on Railway

Drag-and-drop interface for building AI-powered agents and workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/LcJLmZ)

## About

##Template
This template deploys a drag-and-drop web interface for [LangChain](https://python.langchain.com/en/latest/index.html), an open-source framework for integrating applications with large language models (LLMs).

##Overview
[LangFlow](https://github.com/logspace-ai/langflow) is a GUI for LangChain, designed with react-flow to provide an effortless way to experiment and prototype flows with drag-and-drop components and a chat box. Drag sidebar components onto the canvas and connect them together to create your pipeline. LangFlow provides a range of LangChain components to choose from, including LLMs, prompt serializers, agents, and chains.

##Learn More
* [Prototype LangChain Flows Visually with LangFlow](https://alphasec.io/prototype-langchain-flows-visually-with-langflow/)
* [langflow](https://github.com/logspace-ai/langflow) GitHub repo

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langflow | `langflowai/langflow:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Langflow | 7860 | - |
| `LANGFLOW_LOG_LEVEL` | Langflow | debug | - |
| `LANGFLOW_SECRET_KEY` | Langflow | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/LcJLmZ)
