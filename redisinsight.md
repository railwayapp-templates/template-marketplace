# Deploy RedisInsight | Official Redis GUI on Railway on Railway

Self-host the Redis GUI. Browse keys, profile memory, run commands

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/redisinsight)

## About

RedisInsight is the official, free GUI for Redis — built by Redis (formerly Redis Labs) to help developers visually browse keys, run commands, analyze memory, and debug performance across any Redis deployment, from local instances to Redis Cloud and Amazon ElastiCache. 

Self-hosting RedisInsight on Railway takes seconds: this one-click deploy runs `redis/redisinsight:latest`, pre-configures port 5540, and auto-accepts the terms of service so you land straight in the dashboard with no manual setup.

RedisInsight is a web-based Redis management GUI that works with any Redis deployment — open-source Redis, Redis Cluster, Redis Sentinel, Redis Enterprise, Redis Cloud, and AWS ElastiCache. It supports all Redis data types and modules including RedisJSON, RedisSearch, RedisTimeSeries, and RedisGraph.

Key features:
- **Key browser** — full CRUD and batch operations across strings, hashes, lists, sets, sorted sets, and streams
- **Workbench** — built-in CLI with Monaco editor, syntax highlighting, and command auto-completion
- **Database analyzer** — memory profiler and slow log inspector to identify bottlenecks
- **Redis Copilot** — AI assistant for constructing search queries in natural language
- **Real-time metrics** — CPU, memory, connected clients, and command stats
- **Multi-connection support** — manage several Redis instances from one UI
- **Redis Data Integration (RDI)** — pipeline builder for syncing relational DB data into Redis

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RedisInsight | `redis/redisinsight:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5540 | HTTP server listening port |
| `RI_ACCEPT_TERMS_AND_CONDITIONS` | true | Accept RedisInsight terms and conditions |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/redisinsight)
