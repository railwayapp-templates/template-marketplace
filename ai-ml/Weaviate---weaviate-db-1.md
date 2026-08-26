# Deploy Weaviate on Railway

Open-source vector database for semantic search, RAG, and AI apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/weaviate-db-1)

## About

Weaviate is an open-source, AI-native vector database designed for semantic search, embeddings, Retrieval-Augmented Generation (RAG), recommendation systems, and other AI-powered applications. It provides both REST and gRPC interfaces, persistent vector storage, filtering, authentication, and flexible vectorizer integrations.

Hosting Weaviate on Railway gives you a self-hosted vector database that can run alongside AI agents, backend services, embedding pipelines, and RAG applications.

This template deploys Weaviate as a single persistent service using a Railway volume for database storage. The HTTP REST API is available on port `8080`, while Weaviate clients can also use the gRPC interface on port `50051`.

API-key authentication is enabled while anonymous access is disabled, providing a safer baseline for deployments exposed through a Railway public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| weaviate | `semitechnologies/weaviate` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP REST API port used by Weaviate |
| `GRPC_PORT` | 50051 | gRPC API port used by Weaviate clients |
| `CLUSTER_HOSTNAME` | node1 | Hostname used by this single-node Weaviate instance |
| `QUERY_DEFAULTS_LIMIT` | 25 | Default maximum number of objects returned per query |
| `PERSISTENCE_DATA_PATH` | /var/lib/weaviate | Persistent Weaviate data directory |
| `DEFAULT_VECTORIZER_MODULE` | none | Disable built-in vectorizer modules by default |
| `AUTHENTICATION_APIKEY_USERS` | admin | User identity associated with the API key |
| `AUTHENTICATION_APIKEY_ENABLED` | true | Enable API key authentication |
| `AUTHENTICATION_APIKEY_ALLOWED_KEYS` | - | API key allowed to access Weaviate |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | false | Disable unauthenticated access |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/weaviate`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/weaviate-db-1)
