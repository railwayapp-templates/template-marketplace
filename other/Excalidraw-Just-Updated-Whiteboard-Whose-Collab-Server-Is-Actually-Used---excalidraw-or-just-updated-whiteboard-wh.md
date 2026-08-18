# Deploy Excalidraw | (Just Updated) Whiteboard Whose Collab Server Is Actually Used on Railway

Whiteboard whose live collaboration runs on your server, not Excalidraw's

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/excalidraw-or-just-updated-whiteboard-wh)

## About

Excalidraw is the open-source virtual whiteboard: hand-drawn-style diagrams, wireframes and
sketches in the browser, with shapes, arrows, freehand drawing, images, libraries and real-time
collaboration. There is no account, no tracking and no paywall — the whole editor is a static app
you can host on your own domain.

This template deploys Excalidraw **with the collaboration server it actually uses**. Excalidraw's
frontend is a Vite build, so the collaboration server address is substituted into the JavaScript
bundle at *build* time — an environment variable set on the running container changes nothing.
Templates that deploy the editor next to an `excalidraw-room` service and wire them with a
variable therefore ship a bundle that still talks to Excalidraw's own public server at
`oss-collab.excalidraw.com`, while the deployer pays for a room service that receives no traffic.
This template rewrites the built bundle at boot, verifies the rewrite, and refuses to start if a
single reference to the public server survives.

Two services deploy together. The editor is a small nginx image serving the prebuilt Excalidraw
app; its entrypoint restores a pristine copy of the bundle on every boot, rewrites the baked
collaboration URL to this deployment's own room service, and rewrites nginx's listener to the
port the platform injects. The room service is `excalidraw-room`, the official Socket.IO relay
that forwards end-to-end-encrypted scene updates between the people in a session.

Neither service needs a database or a volume: Excalidraw keeps your scene in the browser's own
local storage, and the room server only relays encrypted messages it cannot read. Both images are
pinned by digest rather than tracking a moving tag, so a redeploy gives you the build you tested.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| excalidraw | `ghcr.io/bon5co/excalidraw-railway:2026.08.18` | Web service |
| excalidraw-room | `excalidraw/excalidraw-room@sha256:2fe999f9be4379e3ee282fc45d75d84a691a6383dde33544514cc395287c7a70` | Web service |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/excalidraw-or-just-updated-whiteboard-wh)
