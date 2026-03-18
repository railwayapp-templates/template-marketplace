# Deploy Langflow | Production Ready Visual AI Workflow Builder on Railway

Self-host Langflow on Railway - build LLM apps with drag-and-drop UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/langflow-or-production-ready-visual-ai-w)

## About

Deploy Langflow on Railway in under 60 seconds. This template provisions a production-ready visual AI workflow builder with PostgreSQL persistence, automatic SSL, and zero Kubernetes complexity. Click deploy, and start building LLM applications through Langflow's drag-and-drop canvas.

Langflow is an open-source, Python-based visual programming platform for building AI applications with large language models. Instead of writing complex LangChain code, you connect pre-built components—LLMs, vector databases, prompt templates, agents—on a visual canvas to create production workflows in minutes.

**Key features:**
- **Visual flow builder**: Drag-and-drop interface for designing LLM pipelines without code
- **Component library**: 100+ pre-built integrations (OpenAI, Anthropic, Pinecone, Weaviate, ChromaDB)
- **RAG support**: Built-in vector database connectors and document loaders for retrieval-augmented generation
- **Agent framework**: Create autonomous AI agents with tool access and memory
- **Real-time testing**: Run and debug flows directly in the editor before deployment
- **API-first**: Every flow auto-generates REST endpoints for integration
- **MCP protocol**: Full Model Context Protocol support for advanced agent architectures

This Railway template deploys `langflowai/langflow:latest` with a dedicated PostgreSQL 17 instance for persistent flow storage, replacing the default SQLite setup with production-grade data durability.

![Langflow example flow](https://blogs.nvidia.com/wp-content/uploads/2025/07/Langflow-UI-scaled.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Langflow | `langflowai/langflow:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres admin username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated Postgres user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |
| `PORT` | Langflow | 7860 | HTTP server listening port |
| `DO_NOT_TRACK` | Langflow | true | Disable telemetry and usage tracking |
| `LANGFLOW_PORT` | Langflow | - | Port Langflow service runs on |
| `LANGFLOW_SUPERUSER` | Langflow | admin | Default admin username for dashboard |
| `LANGFLOW_AUTO_LOGIN` | Langflow | (secret) | Disable automatic admin login - need the SUPERUSER creds to login |
| `LANGFLOW_SECRET_KEY` | Langflow | (secret) | Secret key for session security |
| `LANGFLOW_DATABASE_URL` | Langflow | - | Postgres connection string for Langflow |
| `LANGFLOW_NEW_USER_IS_ACTIVE` | Langflow | false | New users require manual activation |
| `LANGFLOW_SUPERUSER_PASSWORD` | Langflow | (secret) | Password for default admin user |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/langflow-or-production-ready-visual-ai-w)
