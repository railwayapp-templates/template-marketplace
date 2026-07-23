# Deploy tldraw-railway on Railway

Self-host a private, multiplayer tldraw whiteboard on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tldraw-railway)

## About

**tldraw-railway** is a production-ready, self-hosted multiplayer backend for the [tldraw](https://tldraw.dev) infinite canvas. It packages a Fastify sync server, WebSocket rooms, SQLite persistence, and a Vite-built React client into a single Railway-deployable service.

Deploying tldraw-railway on Railway gives you a private, persistent whiteboard server in minutes. The template builds the service from a Dockerfile, mounts a Railway volume at `/data` so rooms and uploaded assets survive redeploys, and exposes a public HTTPS endpoint with an auto-generated domain. You only need to provide a free tldraw SDK license key to unlock the editor in production.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tldraw-railway | [callmechristian/tldraw-railway](https://github.com/callmechristian/tldraw-railway) (root: templates/railway-server-example/) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `VITE_TLDRAW_LICENSE_KEY` | The tldraw license key. Must be provisioned from https://tldraw.dev/pricing |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, MDX, CSS, JavaScript, HTML, Shell, PLpgSQL, GLSL, Dockerfile, Vue

[View on Railway →](https://railway.com/deploy/tldraw-railway)
