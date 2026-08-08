# Deploy Pakistan-Legal-Assistant-RAG on Railway

Multi-Agent RAG based AI Legal Assistant for Pakistan Law

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pakistan-legal-assistant-rag)

## About

Pakistan-Legal-Assistant-RAG is a full-stack AI legal assistant designed to answer questions about Pakistani law using Retrieval-Augmented Generation (RAG). It combines a FastAPI backend, LangGraph multi-agent workflow, Qdrant vector search, PostgreSQL conversation persistence, and a Next.js frontend. The system retrieves relevant legal passages from sources such as the Constitution of Pakistan, Pakistan Penal Code (PPC), and Criminal Procedure Code (CrPC), then generates grounded answers with legal citations. It also includes conversation memory, voice interaction, monitoring with LangSmith, and evaluation capabilities.

Hosting Pakistan-Legal-Assistant-RAG on Railway involves deploying the application as a full-stack service with separate frontend and backend services. The backend runs FastAPI, LangGraph, the RAG pipeline, legal-agent workflow, and voice functionality, while the Next.js application provides the user interface. PostgreSQL can be deployed directly on Railway for persistent chat and application data. Qdrant Cloud remains an external managed vector database containing the legal document embeddings. The application also connects to external AI services such as Groq and Hugging Face, while LangSmith can be configured for tracing and monitoring. Railway manages the application deployments, networking, environment variables, and scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | [arloodots/Pakistan-Legal-Assistant-RAG](https://github.com/arloodots/Pakistan-Legal-Assistant-RAG) (root: /) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Frontend | [arloodots/Pakistan-Legal-Assistant-RAG](https://github.com/arloodots/Pakistan-Legal-Assistant-RAG) (root: /frontend) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `HOST` | Backend | 0.0.0.0 |
| `PORT` | Backend | 8000 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, TypeScript, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/pakistan-legal-assistant-rag)
