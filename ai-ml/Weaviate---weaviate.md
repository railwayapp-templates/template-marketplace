# Deploy Weaviate on Railway

Weaviate DB with secure, password-protected default configuration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/weaviate)

## About

Weaviate is an open-source vector database built for AI and machine learning workloads. It stores data objects and vector embeddings side by side, enabling semantic search, recommendation systems, and Retrieval-Augmented Generation (RAG) without complex integrations.

Running Weaviate typically requires managing dependencies like authentication, persistence, and configuration. This template simplifies deployment by providing a ready-to-use setup with password protection enabled by default. On Railway, Weaviate runs in a managed container with persistent storage, so you can scale quickly and avoid low-level ops while still having full control of your schema and modules.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Weaviate DB | `semitechnologies/weaviate` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Railway exposed port |
| `ENABLE_MODULES` | text2vec-cohere,text2vec-huggingface,text2vec-palm,text2vec-openai,generative-openai,generative-cohere,generative-palm,ref2vec-centroid,reranker-cohere,qna-openai | Specify Weaviate modules to enable (string - comma separated names) |
| `CLUSTER_HOSTNAME` | node001 | Hostname of a node. Always set this value if the default OS hostname might change over time. |
| `QUERY_DEFAULTS_LIMIT` | 10 | Sets the default number of objects to be returned in a query. |
| `PERSISTENCE_DATA_PATH` | /var/lib/weaviate | Where to safe the data |
| `DEFAULT_VECTORIZER_MODULE` | none | Default vectorizer module - will be overridden by any class-level value defined in the schema |
| `AUTHENTICATION_APIKEY_USERS` | admin | API key-based identities.  Each identity corresponds to a specific key above. (string - comma-separated list) |
| `AUTHENTICATION_APIKEY_ENABLED` | true | Enable API key-based authentication |
| `AUTHORIZATION_ADMINLIST_USERS` | admin | Users with admin permission when AdminList scheme used |
| `AUTHORIZATION_ADMINLIST_ENABLED` | true | 	Enable AdminList authorization scheme (mutually exclusive with AUTHORIZATION_RBAC_ENABLED) |
| `AUTHENTICATION_APIKEY_ALLOWED_KEYS` | mysecretapikey | Allowed API keys.  Each key corresponds to a specific user identity below. (string - comma-separated list) |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | false | Allow users to interact with weaviate without auth |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/weaviate`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/weaviate)
