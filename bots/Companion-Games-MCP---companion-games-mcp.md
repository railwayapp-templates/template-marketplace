# Deploy Companion Games MCP on Railway

Play eight conversational games with your AI companion through MCP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/companion-games-mcp)

## About

Companion Games MCP is a self-hosted Model Context Protocol server that lets ChatGPT and other MCP clients play eight conversational games: Hangman, Tic-Tac-Toe, Quiz, Word Quest, Hidden Fleet, Hidden Fleet Short, Who is it?, and the persistent Enchanted Forest graphic adventure.

This template deploys the TypeScript MCP server as a public HTTPS service while keeping the MCP endpoint behind an automatically generated private URL path. Railway builds the repository, starts the production server, checks /health, exposes port 3000, and mounts persistent storage at /data so Enchanted Forest sessions survive redeploys. No third-party API key or external database is required.

After deployment, open the service variables and copy the generated MCP_PATH_SECRET value. Your connector URL is:

https://YOUR-RAILWAY-DOMAIN/GENERATED-MCP_PATH_SECRET/mcp

Add that URL as a remote MCP connector in your compatible AI client.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| companion-game | [lauramarmun-prog/companion-game](https://github.com/lauramarmun-prog/companion-game) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `FRONTEND_ORIGIN` | https://companiongames.netlify.app | - |
| `MCP_PATH_SECRET` | (secret) | Automatically generated private URL path for the MCP endpoint. |
| `COMPANION_GAMES_STATE_FILE` | /data/graphic-adventure-state.json | Persistent storage file for Enchanted Forest adventure sessions. |

## Configuration

- **Start command:** `npm start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/companion-games-mcp)
