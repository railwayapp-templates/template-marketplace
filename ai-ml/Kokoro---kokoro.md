# Deploy Kokoro on Railway

Fast CPU text-to-speech API and web interface powered by Kokoro.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kokoro)

## About

Kokoro is a compact, open-weight text-to-speech model served here through Kokoro-FastAPI. It turns text into natural, expressive audio through an OpenAI-compatible API and a browser-based interface. With only 82 million parameters and multilingual voices, it gives developers a practical way to add efficient speech synthesis to applications.

Hosting Kokoro runs a stateless, CPU-only FastAPI service that exposes both the speech API and web interface on port 8880. The container already includes the application and model assets, so it needs neither a database nor persistent storage. CPU inference keeps the deployment simple, but Railway compute usage determines operating cost: more memory and faster CPUs can improve throughput while increasing spend. Expect model initialization to make early requests slower, and expect long passages or concurrent synthesis jobs to increase latency. For production workloads, monitor request duration and resource consumption, then scale service resources or replicas to match expected traffic and response-time requirements.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/remsky/kokoro-fastapi-cpu:v0.6.0@sha256:d2c63627e80e32df7fab7f1e969c2b6b26272439d837ef195f40d4a82eca195e` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/kokoro)
