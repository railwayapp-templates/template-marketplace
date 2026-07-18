# Deploy Railway and Github MCP for Claude Connector on Railway

Connector for Claude (or ChatGPT) that manages Railway and GitHub repos

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-and-github-mcp-for-claude-connec)

## About

A self-hosted MCP server that gives Claude or ChatGPT the ability to build and ship real applications. It exposes Railway tools (projects, services, deploys, variables, domains, logs, Postgres, volumes) and GitHub tools (repos, files, branches, pull requests, code search) behind a single connector, so you can describe what you want in plain English and have it built, committed, and deployed without leaving the conversation.

You deploy your own private copy — nothing is shared or multi-tenant. The service runs Node and Express behind a single `/mcp` endpoint, auto-derives its public URL from Railway, and persists OAuth and GitHub state on an attached volume at `/app/data`. Authentication is Login with Railway (OAuth 2.1 with PKCE and dynamic client registration), so there is no API token to paste — the server calls the Railway API as you, scoped to the workspace you consent to. Access is locked to the email you specify at deploy time. GitHub is connected separately and optionally via a device flow, again with no token to copy. Once deployed, open the service's public URL for setup instructions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-claude-mcp-combined | [samaybar/railway-claude-mcp](https://github.com/samaybar/railway-claude-mcp) (root: combined) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GITHUB_TOKEN` | (secret) |  Repository access: All (or selected) · Permissions: Metadata: Read, Contents: Read/Write, Pull requests: Read/Write, Administration: Read/Write |
| `ALLOWED_RAILWAY_EMAILS` | - | railway account email to be used with this connector |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/railway-and-github-mcp-for-claude-connec)
