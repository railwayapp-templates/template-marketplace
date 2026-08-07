# Deploy Google Drive CRUD on Railway

Your own private Google Drive, Docs, Sheets and Slides connector for Claude

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/google-drive-crud)

## About

Google Drive CRUD is a remote Model Context Protocol (MCP) server that gives Claude full read-write access to Google Drive, Docs, Sheets, and Slides. CRUD stands for create, read, update, delete - the four things the standard read-only connector cannot do to existing files. It runs on a server you own, with Google credentials you create, so your files stay between you, Google, and your own deployment.

The template deploys a single Python service (FastMCP, streamable HTTP transport, OAuth 2.1 multi-user auth) from a public Dockerfile. The redirect address and external URL fill themselves in from the domain Railway generates, so the only values you supply are a Google OAuth client ID and secret - and those can be added after the first deploy. A guided setup at [atlanticlabs.ai/mcp-google-drive](https://atlanticlabs.ai/mcp-google-drive) walks through the Google Cloud side with a copy-paste prompt that has Claude do the walking. Once deployed, the connector URL for claude.ai is `https:///mcp`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| google-drive-crud | [adampaulwalker/claude-gdrive-mcp](https://github.com/adampaulwalker/claude-gdrive-mcp) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MCP_ENABLE_OAUTH21` | true | Leave as is. |
| `WORKSPACE_MCP_HOST` | 0.0.0.0 | Leave as is. |
| `GOOGLE_OAUTH_CLIENT_ID` | - | Your Google OAuth client ID (ends in .apps.googleusercontent.com). Leave empty on the first deploy - the guided setup creates it, then you paste it here. |
| `WORKSPACE_EXTERNAL_URL` | - | Filled in automatically from this service domain. Leave as is. |
| `WORKSPACE_MCP_TRANSPORT` | streamable-http | Leave as is. |
| `GOOGLE_OAUTH_REDIRECT_URI` | - | Filled in automatically from this service domain. Leave as is. |
| `GOOGLE_OAUTH_CLIENT_SECRET` | (secret) | Your Google OAuth client secret (starts with GOCSPX-). Leave empty on the first deploy - added after the Google setup. |
| `WORKSPACE_MCP_STATELESS_MODE` | true | Leave as is. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/google-drive-crud)
