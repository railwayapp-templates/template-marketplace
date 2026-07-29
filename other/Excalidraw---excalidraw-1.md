# Deploy Excalidraw on Railway

Persistent collaborative whiteboard with a hand-drawn visual style.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/excalidraw-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/excalidraw-1)

**Published on the Railway marketplace:** https://railway.com/deploy/excalidraw-1

Excalidraw is an open-source virtual whiteboard for sketching diagrams, workflows, and ideas with a hand-drawn visual style. This deployment uses Excalidraw Persist to add server-side SQLite storage, multiple boards, images, libraries, archive handling, and shareable edit or read-only board links.

This Railway deployment runs one pinned Excalidraw Persist container. Nginx serves the browser interface on port 80 and proxies `/api` to the bundled Node.js server on port 4000. A Railway volume mounted at `/app/data` retains the SQLite database across restarts and redeployments. No external database, collaboration server, or environment-variable input is required. Version `0.18.0-persist.7` supports shareable edit and read-only board links, but upstream does not provide a separate real-time collaboration service in this image. The application also has no built-in authentication or rate limiting, so exposing it publicly allows anonymous access to its board-management and write APIs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Excalidraw | `ghcr.io/ozencb/excalidraw-persist:0.18.0-persist.7@sha256:8c86a50d299cdcd27e178e80e7567479bf9b6c5eb62d08abbbfcd5ddba60bc26` | Web service |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/excalidraw-1)
