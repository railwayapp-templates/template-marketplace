# Deploy Weaviate | (Just Updated) Vectors Survive Redeploys, Locked Behind A Key on Railway

Vector DB with a volume, a generated API key, and no anonymous access

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/weaviate-vector-da-1)

## About

Weaviate is an open-source vector database for semantic search, hybrid (vector + keyword) search, and retrieval-augmented generation. It stores your objects together with their embeddings and answers nearest-neighbour queries over HTTP and GraphQL. This template deploys a single, lean Weaviate node — no sidecars, no inference container — locked behind a generated API key, with its index on a persistent volume.

The two things that decide whether a self-hosted vector database is usable are where the index lives and who can reach it, and both are set correctly here. Weaviate's `PERSISTENCE_DATA_PATH` points at a Railway volume mounted on `/var/lib/weaviate`, so your collections, objects and vectors survive every redeploy — verified by writing an object, redeploying, and reading it back. Anonymous access is disabled and API-key authentication is on, with the admin key generated per deployment rather than shipped as a shared literal, and RBAC enabled with that key's user as root. Weaviate refuses to start at all if the key is empty, so there is no window in which the database is public. The image is pinned by digest, the healthcheck points at `/v1` so Railway does not route traffic before the API is answering, and `DEFAULT_VECTORIZER_MODULE` is `none` — you bring your own embeddings, so no deployment can quietly spend an embedding API key. Idle memory measured at roughly 45 MB, so this fits every Railway plan including Free.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| weaviate | `semitechnologies/weaviate@sha256:d2a1b884d45844a012b4282081dfa896879a6ded7ea9d9e274e0b9e1d9920f86` | Web service |

## Configuration

- **Healthcheck:** `/v1`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/weaviate`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/weaviate-vector-da-1)
