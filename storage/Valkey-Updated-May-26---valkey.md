# Deploy Valkey [Updated May ’26] on Railway

Valkey [May ’26] (Fast Caching & Real-Time Data Platform) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/valkey)

## About

Valkey is a high-performance, open-source key-value database designed to handle caching, message brokering, and in-memory data storage with lightning speed. It’s an open alternative to Redis, developed by the Linux Foundation community after Redis became source-available. Valkey focuses on being 100% open-source, reliable, and high-speed - ideal for developers who want a modern, fully free in-memory data store for real-time applications.

Hosting Valkey on **Railway** gives you a fully managed, serverless experience with complete flexibility and scalability. You can self-host Valkey easily while maintaining full control over your data and configurations - all without dealing with complex infrastructure or manual deployments..

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valkey/valkey:latest | `valkey/valkey:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `VALKEY_PORT` | 6379 |
| `VALKEY_USER` | (secret) |
| `VALKEY_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/valkey)
