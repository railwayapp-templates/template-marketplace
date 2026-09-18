# Deploy MemPalace on Railway

Self-hosted AI memory server (MCP) with a private Qdrant, for agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mempalace)

## About

MemPalace is an open-source AI memory system: a persistent, self-hosted "palace" your AI coding agents write to and
recall from over the Model Context Protocol (MCP). This template runs MemPalace as a **remote team server** — one
shared memory that Claude Code, Codex and other MCP clients across your team connect to over HTTPS. It is a
community-maintained template and is not affiliated with the MemPalace project.

MemPalace's team server speaks MCP over HTTP and stores its vectors in Qdrant, producing embeddings locally so your
memory text and vectors never leave the deployment. Exposed naively it is a plaintext endpoint whose bearer token is
the only thing standing between the internet and full read/write access to your memory, and it exits after a few
idle hours by default.

This template runs MemPalace on Railway with a bundled private Qdrant, generates a strong bearer token and requires
it on every route except the liveness probe, keeps Qdrant off the public internet, disables the idle-exit watchdog
so the server stays up, and wires the port, health check and volumes correctly (including the IPv6 private-network
bind and the non-root volume permission). Both services run from their official images, pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mempalace | `ghcr.io/youssefsiam38/mempalace-railway:1.0.0` | Web service |
| qdrant | `qdrant/qdrant:v1.19.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mempalace | 8765 | Port Railway routes traffic and health checks to; keep it equal to the server's listen port (8765). |
| `MEMPALACE_QDRANT_URL` | mempalace | - | Internal URL of the bundled Qdrant vector store. |
| `MEMPALACE_MCP_HTTP_TOKEN` | mempalace | (secret) | Bearer token for the MCP endpoint, generated. Copy it to connect your clients. |
| `MEMPALACE_MCP_IDLE_HOURS` | mempalace | 0 | 0 disables the idle-exit watchdog so the server stays up on Railway. |
| `QDRANT__SERVICE__HOST` | qdrant | :: | Bind address; :: makes Qdrant reachable over Railway's IPv6 private network. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/qdrant/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mempalace)
