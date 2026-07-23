# Deploy Excalidraw + Live Collaboration [Self-Hosted] on Railway

Self-hosted whiteboard with real-time collab that actually works

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/excalidraw-collab-whiteboard)

## About

Excalidraw is an open-source virtual whiteboard for sketching hand-drawn-style diagrams — a free alternative to Miro and FigJam. This template deploys the Excalidraw client **plus a working `excalidraw-room` collaboration server**, wired together so the Live Collaboration button connects to your instance instead of Excalidraw's public servers.

That wiring is the hard part of self-hosting Excalidraw, and it's done for you here.

---

Self-hosting Excalidraw looks trivial — it's a static site — until you click Live Collaboration and discover it isn't working. The published Docker image is a Vite build with the WebSocket server URL **inlined at build time**, hardcoded to `oss-collab.excalidraw.com`. Setting `VITE_APP_WS_SERVER_URL` on the running container has no effect, so a naive self-hosted deployment silently routes your team's collaboration sessions through Excalidraw's public infrastructure.

This template patches the built bundle at container startup so the client connects to the `excalidraw-room` service deployed alongside it. The patch reapplies on every start, so image updates pick up cleanly rather than reverting the fix.

The second requirement is HTTPS. Excalidraw uses the WebCrypto API to encrypt collaboration sessions, and WebCrypto only works in secure contexts — over plain HTTP you get a `generateKey` error and collaboration fails outright. Railway terminates TLS automatically, so this is handled with no reverse proxy or certificate setup.

Excalidraw is architecturally unusual in one important way: **drawings live in your browser**, in localStorage and IndexedDB. The server only delivers static files, and the room server is stateless — it relays updates between peers without storing them. There is genuinely nothing server-side to back up, and no database in this stack.

Typical cost: **~$5/month** on Railway's Hobby plan for both services. Miro charges around $8–16/user/month and FigJam around $3–5/user/month, so a team of any size pays for this many times over.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Excalidraw | `excalidraw/excalidraw` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/excalidraw-collab-whiteboard)
