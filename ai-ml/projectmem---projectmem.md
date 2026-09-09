# Deploy projectmem on Railway

Open-source coding agent memory as a hosted MCP server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/projectmem)

## About

projectmem is the open-source memory and judgment layer for AI coding agents. It records what happened while building a project as typed events, issues, attempts, fixes, decisions and notes, and feeds that history back to the agent through a native MCP server, so the agent stops repeating approaches that already failed. This template runs projectmem 0.3.2 as a hosted MCP server with a persistent volume, for agents that do not share a filesystem with you.

Hosting projectmem on Railway means one small service and one volume. The service runs upstream projectmem from PyPI behind a thin HTTP front that exposes the MCP server over Streamable HTTP at `/mcp`, protected by a bearer token generated at deploy time. Memory lives as plain text files on the volume: an append-only event log, a distilled summary, and a plan file per project, plus a registry and cross-project gotchas. There is no database, no LLM key, and no telemetry; projectmem answers with deterministic lookups. On every start the service creates and registers the projects you name in a variable, so adding a project is a one-line change.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| projectmem | [RockinPaul/projectmem_railway_template](https://github.com/RockinPaul/projectmem_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Port the MCP server liste public domain to it. |
| `MCP_TOKEN` | (secret) | Bearer token every MCP request must send as "Authorization: Bearer <token>". Generated on deploy; keep to rotate. |
| `PROJECTMEM_HOME` | /data/home | Registry and cross-projecon the /data volume. |
| `PROJECTMEM_PROJECTS` | default | Comma-separated project ner on start (letters,digits, - and _). The first one is the active project for tool calls that name no project. |
| `PROJECTMEM_PROJECTS_DIR` | /data/projects | Folder where project memofolder per project. Keep it on the /data volume. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/projectmem)
