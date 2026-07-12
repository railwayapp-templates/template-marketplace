# Deploy Rocket Chromadb on Railway

Self-host ChromaDB on Railway with persistent storage and an HTTP API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chromadb-template)

## About

ChromaDB is an open-source vector database designed for AI applications that use embeddings for semantic search, retrieval-augmented generation (RAG), recommendations, and similarity search. This template deploys a persistent ChromaDB server on Railway with built-in storage, allowing any application to connect over HTTP.

This template deploys ChromaDB as a standalone HTTP service with persistent storage using Railway Volumes. Once deployed, your vector database remains available across restarts and redeployments while exposing a REST API that can be accessed from applications written in Node.js, Python, Go, Java, Rust, PHP, or any language capable of making HTTP requests.

The template is ideal for AI applications that need a self-hosted vector database without managing infrastructure. Simply deploy the template, attach a persistent volume, and connect your application using the generated Railway domain or private network URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-chromadb-template | [DhiWisePvtLtd/railway-chromadb-template](https://github.com/DhiWisePvtLtd/railway-chromadb-template) | Database |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/chromadb-template)
