# Deploy AnythingLLM on Railway

An all-in-one application for RAG, AI Agents, multi-user management & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/HNSCS1)

## About

AnythingLLM is a full-stack application that enables you to turn any document, resource, or piece of content into context that any LLM can use as references during chatting. AnythingLLM works with _any_ LLM, _any_ embedding model, and _any_ vector database. Use what you want and get all of the tools and benefits of AnythingLLM for your organization right out of the box.

⭐ Star on Github: https://github.com/Mintplex-Labs/anything-llm

Hosting AnythingLLM on Railway is simple and straightforward. Just click the deploy and that is it! During onboarding you will be asked what LLM you wish to use and then you can start using AnythingLLM right away.

From there, start uploading documents, sending messages, building agents and much more.

[See all the cool features](https://github.com/Mintplex-Labs/anything-llm?tab=readme-ov-file#cool-features-of-anythingllm)

See supported [LLMs](https://github.com/Mintplex-Labs/anything-llm?tab=readme-ov-file#supported-llms-embedder-models-speech-models-and-vector-databases), [Embedding Models](https://github.com/Mintplex-Labs/anything-llm?tab=readme-ov-file#supported-llms-embedder-models-speech-models-and-vector-databases), and [Vector Databases](https://github.com/Mintplex-Labs/anything-llm?tab=readme-ov-file#supported-llms-embedder-models-speech-models-and-vector-databases) you can use with AnythingLLM.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AnythingLLM | `mintplexlabs/anythingllm:railway` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | Direct Railway to bind HTTP port 80 to 3001 |
| `SERVER_PORT` | 3001 | Port the server will bind to |
| `STORAGE_DIR` | /storage | Do not modify. Mount location to storage - hardcoded to /storage for support on build systems like Render and Railway |

## Configuration

- **Healthcheck:** `/api/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/HNSCS1)
