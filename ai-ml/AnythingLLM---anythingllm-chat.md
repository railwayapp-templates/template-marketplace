# Deploy AnythingLLM on Railway

Chat with your own documents using the AI model you choose

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anythingllm-chat)

## About

AnythingLLM is an open-source AI application that turns a collection of documents into a private chatbot you can question in plain language. Built by Mintplex Labs and MIT licensed, it wraps the whole retrieval-augmented generation stack — parsing, chunking, embedding, vector search and chat — into one interface, so a team can drop in PDFs, spreadsheets or a website and start asking questions minutes later. Its defining idea is the workspace: an isolated set of documents with its own vector namespace, prompt and retrieval settings, so two teams can share an instance without their material mixing. You choose the model — OpenAI, Anthropic, Groq, OpenRouter, a local Ollama server, or any OpenAI-compatible endpoint — and the documents stay on infrastructure you control.

This template runs AnythingLLM in its production shape rather than its laptop one. Three services are wired together: the application, which serves the web interface and runs the built-in document collector; a PostgreSQL database holding workspaces, users, chat history and document metadata; and a Qdrant vector database for the embeddings. Upstream's PostgreSQL build replaces the default SQLite one, so application data lives in a managed database rather than a file on a disk. A persistent volume holds uploaded documents and the embedding model cache. Self-host AnythingLLM on Railway and all of it is provisioned for you.

![Diagram of the AnythingLLM, Postgres and Qdrant services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787233694/anythingllm-architecture.png)

Teams reach for AnythingLLM when they want ChatGPT-style answers over internal material that must not leave their control. Commercial tools solve this by uploading your corpus to someone else's cloud; self-hosting keeps documents and vectors on your own infrastructure while still letting you point at whichever model answers best.

Key features:

- **Workspaces** with isolated document sets, vector namespaces and prompts
- **A built-in document collector** for PDFs, Word files, spreadsheets, audio transcription, OCR, websites and GitHub or Confluence connectors
- **Model-agnostic chat** across major commercial APIs and any OpenAI-compatible or local endpoint
- **Embeddable chat widgets** and a developer API for putting a workspace in your own product

The architecture is deliberately split. The application container runs two processes: the web server, and the document collector that does the heavy parsing, which is why uploads do not block the interface. PostgreSQL is the system of record for everything structured; Qdrant stores one collection per workspace and runs the similarity search behind every answer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qdrant | `qdrant/qdrant:v1` | Database |
| anythingllm | [gridalpha/anythingllm-railway](https://github.com/gridalpha/anythingllm-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | qdrant | 6333 | Port Railway health-checks |
| `QDRANT__SERVICE__HOST` | qdrant | :: | Bind dual-stack for private networking |
| `QDRANT__SERVICE__API_KEY` | qdrant | (secret) | API key required on every request |
| `QDRANT__STORAGE__STORAGE_PATH` | qdrant | /qdrant/storage | Storage location on the volume |
| `PORT` | anythingllm | 3001 | Port Railway health-checks |
| `SIG_KEY` | anythingllm | - | At-rest encryption key, never change |
| `SIG_SALT` | anythingllm | - | At-rest encryption salt, never change |
| `VECTOR_DB` | anythingllm | qdrant | Use the Qdrant service for embeddings |
| `AUTH_TOKEN` | anythingllm | (secret) | Instance password; without it the app is open |
| `JWT_SECRET` | anythingllm | (secret) | Session signing key |
| `SERVER_PORT` | anythingllm | 3001 | Port the web server binds |
| `STORAGE_DIR` | anythingllm | /storage | Data directory, matches the volume |
| `DATABASE_URL` | anythingllm | - | Postgres connection, pool capped |
| `QDRANT_API_KEY` | anythingllm | (secret) | Qdrant authentication |
| `QDRANT_ENDPOINT` | anythingllm | - | Private Qdrant address |
| `EMBEDDING_ENGINE` | anythingllm | native | In-process embedder, no API key needed |
| `DISABLE_TELEMETRY` | anythingllm | true | Opt out of usage reporting |
| `DISABLE_SWAGGER_DOCS` | anythingllm | true | Close the public API docs endpoint |
| `EMBED_REQUIRE_ALLOWLIST` | anythingllm | true | Embed widgets need a domain allowlist |
| `ANYTHINGLLM_CHROMIUM_ARGS` | anythingllm | --no-sandbox,--disable-setuid-sandbox | Collector browser flags |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/qdrant/storage`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/storage`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/anythingllm-chat)
