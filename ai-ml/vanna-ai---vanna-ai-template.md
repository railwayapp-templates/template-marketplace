# Deploy vanna ai on Railway

Deploy and Host vanna ai with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vanna-ai-template)

## About

Vanna AI is an open-source Python framework that enables natural language querying of SQL databases using RAG
  (Retrieval-Augmented Generation). It trains on your database schema, documentation, and SQL queries to generate
  accurate SQL from plain English questions.

  ## About Hosting Vanna AI

  Hosting Vanna AI involves deploying a FastAPI server that connects to your LLM provider (OpenAI or Anthropic Claude)
   and vector database (ChromaDB, Qdrant, or PostgreSQL pgvector). The service uses retrieval-augmented generation to
  understand your database schema and generate SQL queries from natural language. This template includes automatic
  startup scripts, health checks, and configurable vector storage options. It's production-ready with error handling,
  logging, and Railway's auto-scaling capabilities.

  ## Common Use Cases

  - **Business Intelligence Dashboards** - Enable non-technical users to query databases using natural language
  - **Data Analytics Tools** - Build conversational interfaces for data exploration and reporting
  - **Internal Admin Panels** - Let support teams query databases without knowing SQL
  - **Customer-Facing Analytics** - Provide end users with natural language database access
  - **Data Documentation** - Auto-generate SQL queries as documentation for database operations

  ## Dependencies for Vanna AI Hosting

  - **LLM Provider**: OpenAI API or Anthropic Claude API (for natural language understanding)
  - **Vector Database**: ChromaDB (local), Qdrant Cloud, or PostgreSQL with pgvector extension (for RAG)
  - **Python 3.11+**: Runtime environment with FastAPI and uvicorn

  ### Deployment Dependencies

  - [Vanna AI Documentation](https://vanna.ai/docs/)
  - [OpenAI API Keys](https://platform.openai.com/api-keys)
  - [Anthropic API Keys](https://console.anthropic.com/)
  - [Qdrant Cloud](https://cloud.qdrant.io/) (optional, for managed vector storage)
  - [Railway PostgreSQL](https://railway.app/new/postgres) (optional, for pgvector)

  ## Why Deploy Vanna AI on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you
  don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying Vanna AI on Railway, you are one step closer to supporting a complete full-stack application with
  minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vanna-railway-template | [aymensakka/vanna-railway-template](https://github.com/aymensakka/vanna-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `QDRANT_URL` | Qdrant Cloud cluster URL (required if using Qdrant). Get one at https://cloud.qdrant.io/ |
| `LLM_PROVIDER` | openai or anthropic |
| `OPENAI_MODEL` | gpt-4 |
| `DATABASE_PATH` | ./data.db |
| `OPENAI_API_KEY` | (secret) |
| `QDRANT_API_KEY` | (secret) |
| `ANTHROPIC_MODEL` | claude-haiku-4-5-20250529 |
| `ANTHROPIC_API_KEY` | (secret) |
| `CHROMA_COLLECTION` |  vanna_context |
| `QDRANT_COLLECTION` | Qdrant collection name for embeddings |
| `VECTOR_STORE_TYPE` | Vector database: chromadb (local), qdrant-cloud (managed), or pgvector (PostgreSQL) |
| `CHROMA_PERSIST_DIR` | ./chroma_data |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/vanna-ai-template)
