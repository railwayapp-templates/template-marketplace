# Deploy PgVector [Updated Mar ’26] on Railway

PgVector [Mar ’26] (Embeddings & Vector Search for Postgres DBs) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgvector-latest)

## About

PgVector is an open-source PostgreSQL extension that brings **vector similarity search** capabilities to your database, making it a powerful tool for **AI, machine learning, and recommendation systems**. By integrating PgVector into PostgreSQL, you can store, query, and compare high-dimensional vectors directly in SQL - without the need for a separate vector database.
This allows developers to easily build intelligent applications such as semantic search engines, product recommenders, and chatbots with embeddings from models like OpenAI, Cohere, or Hugging Face.

You can self-host PgVector on Railway to retain **full control over your embeddings, similarity queries, and vector search logic**, ensuring your data remains private and secure. Railway simplifies the hosting process by managing the infrastructure, networking, and deployment for you.
PgVector on Railway runs within a managed PostgreSQL environment, allowing you to perform vector operations like **cosine similarity**, **L2 distance**, and **inner product** seamlessly through SQL queries.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgVector-Railway | [Shinyduo/pgVector-Railway](https://github.com/Shinyduo/pgVector-Railway) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/pgvector-latest)
