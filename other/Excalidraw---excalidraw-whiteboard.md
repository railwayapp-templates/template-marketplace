# Deploy Excalidraw on Railway

Miro Alternative. Open-source whiteboard with real-time collaboration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/excalidraw-whiteboard)

## About

Excalidraw is an open-source virtual whiteboard for sketching diagrams that look hand-drawn. Engineers use it for architecture sketches, product teams for user flows, teachers for live explanations — anything faster to draw than to describe. The style keeps a diagram looking like a draft, so people keep editing it. The hosted excalidraw.com is free but stores your scenes on infrastructure you do not control, which is why teams self-host Excalidraw on their own domain.

Deploy Excalidraw on Railway and you get the whole product, not just the drawing canvas. This template runs four services: the Excalidraw frontend, a storage backend holding shared scenes, rooms and uploaded images, a Socket.IO collaboration server relaying live edits, and a PostgreSQL database behind the storage backend. Everything sent to storage is encrypted in the browser first, and the key lives only in the URL fragment after `#`, which browsers never transmit — so your server holds ciphertext it cannot read. Nothing reaches Excalidraw's cloud, Firebase or third-party analytics.

![Excalidraw Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787183464/aaa41a7d-41fc-4860-bf9f-763cd23e8abb.png)

Excalidraw's frontend is a static single-page app, which is why many self-hosted installs stop at "the canvas works but sharing doesn't". Anything leaving your browser — a share link, a room, an image pasted into a shared scene — needs somewhere to go, and the public build points at Excalidraw's hosted services. This template replaces all of them with services in your own project.

Key features:

- Hand-drawn shapes, arrows, freedraw, text, images and embedded links
- Real-time collaboration with live cursors and a participant list
- End-to-end encryption for scenes and rooms; the key stays in the URL fragment
- Export to PNG, SVG or a `.excalidraw` file, plus a shareable read-only link

How they fit together: the **frontend** is configured at container start, so storage and collaboration URLs are environment variables rather than values baked into a build. The **storage backend** exposes an HTTP API under `/api/v2` for scenes, rooms and files, writing each encrypted blob to **PostgreSQL**. The **collaboration server** speaks Socket.IO and relays drawing operations between clients in a room; it holds no state and never sees a key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storage | `ghcr.io/kitsteam/excalidraw-storage-backend:latest` | Web service |
| excalidraw | `alswl/excalidraw:latest` | Web service |
| room | `ghcr.io/kitsteam/excalidraw-room:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | storage | 8080 | HTTP server listening port |
| `LOG_LEVEL` | storage | log | Application log verbosity |
| `BODY_LIMIT` | storage | 50mb | Max scene or image upload size |
| `STORAGE_TTL` | storage | 315360000000 | Entry lifetime, ms (~10 years) |
| `STORAGE_URI` | storage | - | PostgreSQL connection string |
| `NODE_OPTIONS` | storage | --max-old-space-size=1024 | Node heap ceiling in MB |
| `GLOBAL_PREFIX` | storage | /api/v2 | Route prefix for every endpoint |
| `ENABLE_POSTGRES_TTL_SERVICE` | storage | true | Daily cleanup of expired rows |
| `PORT` | excalidraw | 80 | nginx listen port, used by health check |
| `VITE_APP_AI_BACKEND` | excalidraw | https://oss-ai.excalidraw.com | Optional text-to-diagram endpoint |
| `VITE_APP_WS_SERVER_URL` | excalidraw | - | Collaboration server URL |
| `VITE_APP_DISABLE_SENTRY` | excalidraw | true | No error reporting upstream |
| `VITE_APP_ENABLE_TRACKING` | excalidraw | false | No analytics from the app |
| `VITE_APP_FIREBASE_CONFIG` | excalidraw | {} | Disables Excalidraw's hosted Firebase |
| `VITE_APP_STORAGE_BACKEND` | excalidraw | http | Use HTTP storage, not Firebase |
| `VITE_APP_DISABLE_TRACKING` | excalidraw | true | No analytics from the app |
| `VITE_APP_BACKEND_V2_GET_URL` | excalidraw | - | Share link read endpoint |
| `VITE_APP_BACKEND_V2_POST_URL` | excalidraw | - | Share link write endpoint |
| `VITE_APP_HTTP_STORAGE_BACKEND_URL` | excalidraw | - | Rooms and files API |
| `PORT` | room | 8090 | Port the bundled process manager binds |
| `CORS_ORIGIN` | room | - | Allowed Socket.IO origin |
| `NODE_OPTIONS` | room | --max-old-space-size=1024 | Node heap ceiling in MB |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/api/v2/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/excalidraw-whiteboard)
