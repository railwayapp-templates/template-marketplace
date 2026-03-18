# Deploy server-multiplayer-game-template on Railway

Deploy and Host server-multiplayer-game-template with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/server-multiplayer-game-template)

## About

A production-ready multiplayer game server that handles game logic, room management, and real-time communication using Node.js and Socket.IO. Part of a complete multiplayer game framework.

This server template provides the backend for real-time multiplayer games with modular game engines, room management, and Socket.IO communication. It features an extensible architecture that makes it easy to add new games without modifying the core infrastructure. For the complete experience, deploy the companion client template: [Multiplayer Game Client](https://railway.com/deploy/SCInTA?referralCode=s2TnWc).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server-multiplayer-game-template | [ajejey/multiplayer-game-template](https://github.com/ajejey/multiplayer-game-template) (root: /server) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `NODE_ENV` | production | Client URL for CORS |
| `CLIENT_URL` | http://localhost:3000 | Replace with live url in production |

## Configuration

- **Start command:** `npm install && npm start`
- **Healthcheck:** `/health`

**Category:** Starters · **Languages:** JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/server-multiplayer-game-template)
