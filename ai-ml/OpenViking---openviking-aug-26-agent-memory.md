# Deploy OpenViking on Railway

Persistent memory and RAG for AI agents. Store context across sessions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openviking-aug-26-agent-memory)

## About

OpenViking stores memory, knowledge, and skills for AI agents. Your coding tools forget everything when they restart. This fixes that. Point your agent at this server and it reads and writes context over HTTP.

One service from the upstream repo. Builds from the Dockerfile. Data persists on a Railway volume. Railway handles HTTPS so the bundled Caddy proxy is not needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenViking | [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | Worker |

**Category:** AI/ML · **Languages:** Python, Rust, TypeScript, C++, Shell, HTML, Go, JavaScript, Tree-sitter Query, Dockerfile, CMake, CSS, Makefile, Go Template, C

[View on Railway →](https://railway.com/deploy/openviking-aug-26-agent-memory)
