# Deploy Qdrant on Railway

High-Performance Vector Database for Scalable AI Applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/i1tz3T)

## About

**Qdrant** is an open-source, high-performance vector database and similarity search engine built in Rust. It is designed to handle high-dimensional vector data, making it ideal for AI and machine learning applications that require efficient and scalable vector search capabilities.

Hosting Qdrant provides a robust solution for applications that demand fast and accurate vector similarity search. Whether you choose to self-host or deploy in the cloud, Qdrant offers flexibility and control over your vector data infrastructure. Deploying on Railway simplifies the process, offering managed infrastructure that ensures scalability, reliability, and ease of maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Qdrant | `qdrant/qdrant` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 6333 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/i1tz3T)
