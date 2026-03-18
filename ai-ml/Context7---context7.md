# Deploy Context7 on Railway

Up-to-date code documentation for LLMs and AI code editors

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/context7)

## About

Context7 is an open-source Model Context Protocol (MCP) server that delivers real-time, version-specific documentation and code examples directly from official sources to AI coding assistants. By injecting up-to-date information into LLM prompts on demand, Context7 ensures generated code aligns with current APIs and best practices—minimizing hallucinations and deprecated syntax.

Hosting context7 on Railway lets you run the MCP server as a Docker container, providing a consistent endpoint for developers and AI agents to retrieve dynamic documentation and code references for major frameworks like Next.js, TailwindCSS, or Zod. With deployment handled by Railway, TypingMind and other MCP-compatible clients can connect via URL and instantly leverage context7’s grounding for queries. This setup supports CI pipelines, dev environments, or cloud-based coding assistants, while Railway manages networking, scaling, and uptime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Context7 | `mcp/context7` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/context7)
