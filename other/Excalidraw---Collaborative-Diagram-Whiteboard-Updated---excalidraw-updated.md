# Deploy Excalidraw - Collaborative Diagram Whiteboard [Updated] on Railway

Collaborative virtual whiteboard for sketching hand-drawn style diagrams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/excalidraw-updated)

## About

Excalidraw is an open-source virtual whiteboard that lets you easily sketch diagrams with a hand-drawn feel. It supports real-time, end-to-end encrypted collaboration, customizable shape libraries, dark mode, image support, localization, and exporting to PNG, SVG, or a JSON file.

![Excalidraw](https://raw.githubusercontent.com/kaviarahul123/Icons/refs/heads/main/Excalidraw/2.png)

Deploying Excalidraw on Railway enables you to self-host both the whiteboard web client and the real-time collaboration server (excalidraw-room). With Railway, you can deploy both services in a single project, link them automatically, and scale them seamlessly.

By self-hosting Excalidraw with its collaboration server, you retain control of your workspace without depending on external infrastructure. This setup unlocks full real-time collaboration, allowing multiple users to connect to the same session via WebSockets, edit diagrams simultaneously, and see live cursor movements and canvas updates. Railway handles static builds for the client, manages WebSocket connections for the collaboration room, and automatically provisions SSL/HTTPS.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| excalidraw-room | `excalidraw/excalidraw-room:latest` | Web service |
| excalidraw/excalidraw:latest | `excalidraw/excalidraw:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | excalidraw-room | 3002 |
| `CORS_ORIGIN` | excalidraw-room | * |
| `PORT` | excalidraw/excalidraw:latest | 80 |
| `NODE_ENV` | excalidraw/excalidraw:latest | production |
| `VITE_APP_PLUS_LP` | excalidraw/excalidraw:latest | https://plus.excalidraw.com |
| `VITE_APP_PLUS_APP` | excalidraw/excalidraw:latest | https://app.excalidraw.com |
| `VITE_APP_AI_BACKEND` | excalidraw/excalidraw:latest | https://oss-ai.excalidraw.com |
| `VITE_APP_LIBRARY_URL` | excalidraw/excalidraw:latest | https://libraries.excalidraw.com |
| `VITE_APP_LIBRARY_BACKEND` | excalidraw/excalidraw:latest | https://us-central1-excalidraw-room-persistence.cloudfunctions.net/libraries |
| `VITE_APP_BACKEND_V2_GET_URL` | excalidraw/excalidraw:latest | https://json.excalidraw.com/api/v2/ |
| `VITE_APP_BACKEND_V2_POST_URL` | excalidraw/excalidraw:latest | https://json.excalidraw.com/api/v2/post/ |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/excalidraw-updated)
