# Deploy pgvector-pg17 on Railway

PostgreSQL 17 with powerful vector search support.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qcuy_M)

## About

## PostgreSQL v17 with pgvector

**TL;DR:** This template is like the existing pgvector template, but with PostgreSQL v17 instead of PostgreSQL v16.

### What is PGVector?

PGVector is an extension for PostgreSQL that enables efficient storage and retrieval of vector embeddings, making it ideal for machine learning and AI applications like similarity search. It adds support for vector data types and indexing methods to facilitate quick querying on high-dimensional vectors.

### How to Use the Template

This template provides PostgreSQL v17 with the pgvector extension pre-installed. You’ll need to enable the `pgvector` extension in each database where you intend to use it.

1. **Connection Setup:**
   - Find the appropriate connection string under the service variables tab:
     - `DATABASE_URL`: Used for connecting from other Railway services.
     - `DATABASE_PUBLIC_URL`: Used for connecting from external services/tools.
   - Reference these URLs in your other services variables as needed (For instance, `${{ pgvector.DATABASE_URL }}`)

2. **Enabling PGVector Extension:**
   Before using pgvector, you must enable the extension in your database:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

### Example Usage Script

Here’s a simple example to verify that the pgvector extension is set up and working as expected:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   
   -- Create a table with an embedding vector
   CREATE TABLE items (
       id bigserial PRIMARY KEY,
       embedding vector(3)
   );
   
   -- Insert some example data
   INSERT INTO items (embedding) VALUES 
   ('[1,2,3]'), 
   ('[4,5,6]');
   
   -- Perform a vector similarity search
   SELECT * FROM items 
   ORDER BY embedding &lt;-&gt; '[3,1,2]' 
   LIMIT 5;
   ```

This SQL snippet sets up the pgvector extension, creates a table, inserts data, and runs a basic similarity query using the `&lt;-&gt;` operator to measure vector distance.

### Further Information

For more details on PGVector, visit the official GitHub repository: https://github.com/pgvector/pgvector

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg17` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/qcuy_M)
