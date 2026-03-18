# Deploy PostgreSQL with pgvectorscale on Railway

PostgreSQL 16 with pgvector and pgvectorscale extensions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-with-pgvectorscale)

## About

PostgreSQL 16 with pgvector and pgvectorscale extensions for high-performance vector similarity search. Built from source with StreamingDiskANN indexing, providing superior performance for AI/ML applications requiring embeddings storage and semantic
  search capabilities.

  ## About Hosting PostgreSQL with pgvectorscale

  pgvectorscale extends pgvector with advanced indexing algorithms like StreamingDiskANN, offering better performance and scalability for vector similarity search. This template provides a production-ready PostgreSQL 16 database with both extensions
  pre-installed and configured. The container is built from source using multi-stage builds for optimal size, includes automatic extension initialization, and persistent volume storage. Perfect for RAG applications, semantic search, recommendation systems,
   and any AI application requiring efficient vector operations at scale.

  ## Common Use Cases

  - **RAG (Retrieval Augmented Generation)**: Store and retrieve document embeddings for AI chatbots and question-answering systems
  - **Semantic Search**: Build intelligent search engines that understand context and meaning beyond keyword matching
  - **Recommendation Systems**: Power personalized recommendations using vector similarity between user preferences and content
  - **Image & Video Search**: Enable visual similarity search for media libraries and content discovery platforms
  - **Anomaly Detection**: Identify outliers in high-dimensional data for fraud detection and monitoring systems

  ## Dependencies for PostgreSQL with pgvectorscale Hosting

  - **Docker**: Container runtime for building and running the PostgreSQL image

  ### Deployment Dependencies

  - [pgvector Documentation](https://github.com/pgvector/pgvector) - Core vector extension
  - [pgvectorscale Documentation](https://github.com/timescale/pgvectorscale) - Performance enhancements and StreamingDiskANN
  - [PostgreSQL Documentation](https://www.postgresql.org/docs/16/) - Database reference

  ### Implementation Details

  **Connecting to your database:**
  ```python
  import psycopg2
  from pgvector.psycopg2 import register_vector

  conn = psycopg2.connect(DATABASE_PUBLIC_URL)
  register_vector(conn)

  # Create a table with vector column
  cur = conn.cursor()
  cur.execute("""
      CREATE TABLE items (
          id SERIAL PRIMARY KEY,
          embedding vector(1536)
      )
  """)

  # Create StreamingDiskANN index
  cur.execute("""
      CREATE INDEX ON items
      USING diskann (embedding)
      WITH (num_neighbors=50)
  """)
```

  ## Environment Variables:
  - POSTGRES_PASSWORD: Database password (required)
  - POSTGRES_USER: Database username (default: postgres)
  - POSTGRES_DB: Database name (default: postgres)
  - PGDATA: Data directory (default: /var/lib/postgresql/data)

  Volume Configuration:
  Mount a volume at /var/lib/postgresql/data for persistent storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| joeychilson/railway-pgvectorscale:sha-252c4c3 | `ghcr.io/joeychilson/railway-pgvectorscale:sha-252c4c3` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql-with-pgvectorscale)
