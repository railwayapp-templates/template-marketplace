# Deploy Redis Stack on Railway

Redis Stack is an enhanced version of Redis. Updated template.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/VTDMG5)

## About

Redis Stack is an enhanced version of Redis, designed to provide additional features and modules to meet modern application needs. It extends the core Redis functionalities, such as caching, key-value storage, and message brokering, by including built-in modules and capabilities for real-time analytics, search, and more.

Key Features of Redis Stack:

Search and Query with RediSearch: Offers full-text search capabilities. Supports secondary indexing, complex querying, and querying JSON documents. Makes Redis suitable for use cases that require fast and powerful search.

JSON Support with RedisJSON: Allows efficient storage and manipulation of JSON data structures. Enables document-oriented use cases, such as storing and querying complex data objects. Directly integrates with RediSearch for advanced querying.

Time-Series Data with RedisTimeSeries: Specialized module for time-series data. Optimized for storing and analyzing time-stamped data (e.g., metrics, IoT data, financial data). Provides built-in aggregation, down-sampling, and querying functionalities.

Graph Queries with RedisGraph: Supports graph database queries using Cypher query language. Ideal for relationship-heavy data use cases, such as social networks, recommendation engines, and fraud detection.

Streams and Pub/Sub: Native support for data streams and publish-subscribe mechanisms. Helps in building real-time applications like chat systems, notifications, and event processing.

AI/ML Integration with RedisAI: Enables running AI/ML inference directly in Redis using models trained in popular frameworks like TensorFlow, PyTorch, and ONNX. Reduces latency by bringing AI processing closer to the data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis Stack | `redis/redis-stack-server:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REDISPORT` | 6379 |
| `REDISUSER` | default |
| `REDISPASSWORD` | (secret) |
| `REDIS_PASSWORD` | (secret) |
| `REDIS_RDB_POLICY` | 3600#1 300#100 60#10000 |

## Configuration

- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/VTDMG5)
