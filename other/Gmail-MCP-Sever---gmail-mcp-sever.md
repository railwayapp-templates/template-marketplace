# Deploy Gmail MCP Sever on Railway

Send emails directly from ChatGPT, Claude, Cursor & any AI assistant!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gmail-mcp-sever)

## About

The Gmail MCP (Model Context Protocol) Server is a powerful bridge that allows AI assistants like ChatGPT and Claude to securely interact with your Gmail account. It enables AI-driven email drafting, searching, and inbox management directly within your chat interface, transforming your email productivity through natural language.

Hosting the Gmail MCP Server on Railway transforms it from a local script into a permanent 24/7 cloud utility. By utilizing the Server-Sent Events (SSE) protocol, your server stays accessible to external AI platforms without requiring your computer to be online. Deployment involves setting up a secure OAuth 2.0 connection with Google Cloud to authorize access. Once live, the server provides a dedicated endpoint for ChatGPT Plus or the Claude Desktop App. Railway’s Nixpacks builder manages the environment automatically, ensuring your Node.js server runs with high reliability and zero manual maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GmailMcp | [jigs1188/GmailMcp](https://github.com/jigs1188/GmailMcp) | Web service |
| gmail-mcp | [jigs1188/GmailMcp](https://github.com/jigs1188/GmailMcp) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | GmailMcp | 3000 | - |
| `GMAIL_CLIENT_ID` | GmailMcp | 1087636205797-s7rnfmfntjckrmkn7l2qgdgmmvo8oos2.apps.googleusercontent.com | - |
| `GMAIL_USER_EMAIL` | GmailMcp | parmarjigs1188@gmail.com | Rate limiting configuration |
| `MAX_EMAILS_PER_DAY` | GmailMcp | 50 | Server configuration |
| `GMAIL_CLIENT_SECRET` | GmailMcp | (secret) | - |
| `GMAIL_REFRESH_TOKEN` | GmailMcp | (secret) | - |
| `MAX_EMAILS_PER_HOUR` | GmailMcp | 20 | - |
| `PORT` | gmail-mcp | 3000 | - |
| `NODE_ENV` | gmail-mcp | Production | Gmail OAuth Credentials |
| `GMAIL_CLIENT_ID` | gmail-mcp | 1087636205797-s7rnfmfntjckrmkn7l2qgdgmmvo8oos2.apps.googleusercontent.com | - |
| `GMAIL_USER_EMAIL` | gmail-mcp | parmarjigs1188@gmail.com | Rate limiting configuration |
| `MAX_EMAILS_PER_DAY` | gmail-mcp | 50 | Server configuration |
| `GMAIL_CLIENT_SECRET` | gmail-mcp | (secret) | - |
| `GMAIL_REFRESH_TOKEN` | gmail-mcp | (secret) | - |
| `MAX_EMAILS_PER_HOUR` | gmail-mcp | 20 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `npm start`

**Category:** Other · **Languages:** TypeScript, JavaScript, Dockerfile, Procfile

[View on Railway →](https://railway.com/template/gmail-mcp-sever)
