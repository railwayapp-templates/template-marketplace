# Deploy Weaviate on Railway

Weaviate is an open source vector database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/uWRHq5)

## About

Weaviate is an open source vector database that stores both objects and vectors, allowing for combining vector search with structured filtering with the fault-tolerance and scalability of a cloud-native database, all accessible through GraphQL, REST, and various language clients.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Weaviate | `semitechnologies/weaviate:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `ENABLE_MODULES` | text2vec-cohere,text2vec-huggingface,text2vec-palm,text2vec-openai,generative-openai,generative-cohere,generative-palm,ref2vec-centroid,reranker-cohere,qna-openai | Which modules you like to enable, read more here: https://weaviate.io/developers/weaviate/configuration/modules |
| `CLUSTER_HOSTNAME` | node1 | - |
| `QUERY_DEFAULTS_LIMIT` | 25 | - |
| `PERSISTENCE_DATA_PATH` | /var/lib/weaviate | - |
| `DEFAULT_VECTORIZER_MODULE` | none | - |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/weaviate`

**Category:** Storage

[View on Railway →](https://railway.com/template/uWRHq5)
