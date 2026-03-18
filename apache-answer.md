# Deploy Apache Answer on Railway

Community‑driven Q&A/knowledge‑base platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/apache-answer)

## About

**Apache Answer** is an open-source Q&amp;A platform built as a modern alternative to Stack Overflow. It enables teams and communities to create self-hosted question-and-answer sites with features such as reputation systems, moderation tools, tagging, and plugin-based extensibility.

Hosting Apache Answer requires running a single web application backed by a database and persistent storage. This Railway template is configured specifically for **SQLite**, removing the need for an external database service. A single Railway volume is mounted to persist the SQLite database and application data. During the initial setup through the Apache Answer UI, you must specify the SQLite database path as `/data` so it points to the mounted volume and ensures data is retained across restarts and deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| answer | `apache/answer:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/apache-answer)
