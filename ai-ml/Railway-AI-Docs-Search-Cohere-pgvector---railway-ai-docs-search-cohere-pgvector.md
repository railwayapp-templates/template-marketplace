# Deploy Railway AI Docs Search (Cohere + pgvector) on Railway

Semantic search engine for your documents, using Cohere embeddings

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-ai-docs-search-cohere-pgvector)

## About

## Deploy and Host Railway AI Docs Search (Cohere + pgvector) on Railway

Railway AI Docs Search is a full-stack semantic search engine that lets you query your documents by meaning instead of exact keywords. It uses Cohere embeddings with pgvector for lightning-fast similarity search, all deployed seamlessly on Railway.

*GitHub Repository:* [https://github.com/Sanjeev-Kumar78/railway-ai-search-template](https://github.com/Sanjeev-Kumar78/railway-ai-search-template)

### About Hosting Railway AI Docs Search (Cohere + pgvector)

Hosting this project on Railway gives you a ready-to-use infrastructure for AI-powered document search.  
The template includes:
- A **Next.js frontend** for an intuitive UI.
- A **Node.js backend** to handle API requests.
- A **worker service** to process and store embeddings.
- A **PostgreSQL database with pgvector** to store vector representations.  

Once deployed, you can upload documents, index them into embeddings via Cohere, and instantly run semantic searches in your browser.

### Common Use Cases

- Internal documentation search for engineering teams.
- AI-powered knowledge base for customer support.
- Academic research paper retrieval by meaning.

### Dependencies for Railway AI Docs Search (Cohere + pgvector) Hosting

- **Cohere API Key** – [Get it here](https://dashboard.cohere.com/) for generating embeddings.
- Add the Cohere API Key to the backend service variables.
- **pgvector PostgreSQL Extension** – for storing and searching high-dimensional vectors.

### Deployment Dependencies

- [Cohere API Documentation](https://docs.cohere.com/)
- [pgvector GitHub Repository](https://github.com/pgvector/pgvector)

### Implementation Details 

Example SQL for creating the table if not present:

*CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding VECTOR(1024)
);*


#### Why Deploy Railway AI Docs Search (Cohere + pgvector) on Railway?
Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying Railway AI Docs Search (Cohere + pgvector) on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | [Sanjeev-Kumar78/railway-ai-search-template](https://github.com/Sanjeev-Kumar78/railway-ai-search-template) (root: /worker) | Worker |
| backend | [Sanjeev-Kumar78/railway-ai-search-template](https://github.com/Sanjeev-Kumar78/railway-ai-search-template) (root: /backend/) | Web service |
| frontend | [Sanjeev-Kumar78/railway-ai-search-template](https://github.com/Sanjeev-Kumar78/railway-ai-search-template) (root: /frontend/) | Web service |
| pgvector | `pgvector/pgvector:pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BATCH_SIZE` | worker | 16 | 	Processes 16 chunks per API call; small enough to avoid timeouts, large enough for speed |
| `CHUNK_SIZE` | worker | 500 | ~500 characters per chunk; good for semantic search accuracy without excessive token usage |
| `CHUNK_OVERLAP` | worker | 50 | 50 characters overlap prevents cutting important context mid-sentence |
| `POSTGRES_USER` | worker | (secret) | - |
| `COHERE_API_KEY` | worker | (secret) | Cohere_Trial_API: https://dashboard.cohere.com/api-keys |
| `POSTGRES_PASSWORD` | worker | (secret) | - |
| `NODE_ENV` | backend | production | production or development |
| `DATABASE_URL` | backend | - | Postgres connection string for pgvector (private URL, SSL disabled for internal Railway network) |
| `FRONTEND_URL` | backend | - | CORS and redirects |
| `POSTGRES_USER` | backend | (secret) | - |
| `COHERE_API_KEY` | backend | (secret) | Cohere_Trial_API: https://dashboard.cohere.com/api-keys |
| `POSTGRES_PASSWORD` | backend | (secret) | - |
| `PORT` | frontend | 3000 | PORT for the frontend |
| `NEXT_PUBLIC_API_URL` | frontend | - | Public URL of backend service |
| `POSTGRES_DB` | pgvector | railway | Postgres Database Name |
| `POSTGRES_USER` | pgvector | (secret) | Postgres Username |
| `PGPORT_PRIVATE` | pgvector | 5432 | Private port for Postgres is always the default 5432 inside Railway’s private network |
| `POSTGRES_PASSWORD` | pgvector | (secret) | - |

## Configuration

- **Start command:** `npm run start`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/railway-ai-docs-search-cohere-pgvector)
