# Deploy Excalidraw (with collaboration) on Railway

virtual hand-drawn style whiteboard. Collaborative and end-to-end encrypted

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/f7vLxp)

## About

1-Click Excalidraw with Collaboration

Overview:

Deploy Excalidraw with real-time collaboration powered by excalidraw-room in one click. This setup includes both the Excalidraw frontend and the excalidraw-room server, fully configured and ready for secure, private sketching sessions with end-to-end encryption.

Components:
	•	Excalidraw Frontend: A web-based drawing application for sketches and diagrams.
	•	Excalidraw-Room Server: Enables collaborative sessions by relaying encrypted messages between users.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| excalidraw-room | [excalidraw/excalidraw-room](https://github.com/excalidraw/excalidraw-room) | Web service |
| excalidraw | `excalidraw/excalidraw:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | excalidraw-room | 3002 |
| `CORS_ORIGIN` | excalidraw-room | * |
| `PORT` | excalidraw | 80 |
| `NODE_ENV` | excalidraw | production |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/f7vLxp)
