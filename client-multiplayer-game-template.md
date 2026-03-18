# Deploy client-multiplayer-game-template on Railway

Deploy and Host client-multiplayer-game-template with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/client-multiplayer-game-template)

## About

A responsive React-based client for multiplayer games with dynamic component loading, game-specific UI components, and real-time communication with the server. Part of a complete multiplayer game framework.

This client template provides the frontend for real-time multiplayer games with a responsive UI, dynamic game component registry, and Socket.IO client integration. It features a modular architecture that makes it easy to add new game interfaces without modifying the core components. For the complete experience, deploy the companion server template: [Multiplayer Game Server](https://railway.com/deploy/F78M6F?referralCode=s2TnWc).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| client-multiplayer-game-template | [ajejey/multiplayer-game-template](https://github.com/ajejey/multiplayer-game-template) (root: /client) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REACT_APP_SERVER_URL` | http://localhost:8080 | replace with server prod url |

## Configuration

- **Start command:** `npm install && npm run build && npx serve -s build`

**Category:** Starters · **Languages:** JavaScript, CSS, HTML

[View on Railway →](https://railway.com/template/client-multiplayer-game-template)
