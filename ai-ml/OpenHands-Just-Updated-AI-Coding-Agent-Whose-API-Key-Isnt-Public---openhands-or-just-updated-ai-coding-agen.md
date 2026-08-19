# Deploy OpenHands | (Just Updated) AI Coding Agent Whose API Key Isn't Public on Railway

Current Agent Canvas 1.14.0. Session key never baked into the page.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhands-or-just-updated-ai-coding-agen)

## About

OpenHands is an open-source AI software-development agent — the self-hosted alternative to
Devin. It writes code, runs commands, edits files and browses the web on your behalf, from a
browser UI. This template deploys **Agent Canvas 1.14.0**, the current OpenHands application
server, as a single Railway service with a persistent volume.

Agent Canvas ships as one image containing the agent server, the automation server and the
web UI behind a single port. This template runs that image with three Railway-specific
changes:

1. **The session API key is never written into the served page.** Stock Agent Canvas embeds
   its key in the HTML at `/canvas/` so that a browser on the same machine can pick it up
   automatically. On a public URL that hands the key — and therefore arbitrary shell access
   inside the container — to anyone who opens the page. This build starts the server in
   `--auth-required` mode instead, so the UI asks you for the key and the API rejects every
   unauthenticated request.
2. **The volume is made writable before the app starts.** Railway mounts volumes owned by
   uid 0, while the image runs as uid 10001. Without a repair the automation database fails
   to open and the container exits during startup.
3. **Telemetry is off.** `DO_NOT_TRACK=1` is baked into the image.

The image is prebuilt and pinned to 1.14.0, so a deploy is an image pull rather than a
source build, and a later redeploy does not silently upgrade the agent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openhands | `ghcr.io/bon5co/openhands-railway:1.14.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OH_SECRET_KEY` | (secret) |
| `OH_SESSION_API_KEYS_0` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/openhands/.openhands`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openhands-or-just-updated-ai-coding-agen)
