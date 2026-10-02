# Deploy Whoop MCP Server on Railway

Ask Claude, ChatGPT or another MCP app about your WHOOP data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whoop-mcp-server)

## About

Whoop MCP Server is an open-source MCP server that lets Claude, ChatGPT and other MCP apps answer questions about your WHOOP recovery, sleep, strain and workouts, from your own WHOOP account. Independent project, not affiliated with WHOOP.

One click gives you a private server with a volume, auto updates and generated secrets, there's nothing to fill in. 
Then click the service card: its address is at the top of the **Deployments** tab. Open it, and the page walks you through the rest, ticking steps as you go: create a WHOOP developer app (every field shown, with Copy buttons), paste its two keys over the placeholders in the service's variables, add the address to your AI app, and approve WHOOP once on your first question. New versions install themselves from the `:1` image tag.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Whoop MCP Server | `ghcr.io/yuridivonis/whoop-mcp-server:1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Leave as 3000: it matches the port the domain forwards to. |
| `WHOOP_CLIENT_ID` | replace-with-your-client-id | From your WHOOP developer app. Deploy first: the server's page shows what to paste where. |
| `ENCRYPTION_SECRET` | (secret) | Encrypts your stored WHOOP tokens. Generated for you - leave it. |
| `MCP_AUTH_PASSWORD` | (secret) | The password your AI app asks for when you connect it. Find it here when you need it. |
| `WHOOP_CLIENT_SECRET` | (secret) | From your WHOOP developer app. Deploy first: the server's page shows what to paste where. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/whoop-mcp-server)
