# Deploy greenlight-dash on Railway

GreenLight Dash Server — one-click template source

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/greenlight-dash)

## About

The private creative workspace your AI agents can work in. Moodboards, mockups and a full video editor, on your server, with your own cloud and your own keys. It includes a social media parser, agentic workflows, a motion-design video editor, a mockup builder, AI actions such as making shorts, captions, reframes and a transcribe editor, and media generation through WaveSpeed, Pika or any custom model. Every part has a full API for agents and can be synced with your desktop boards.

GreenLight Dash Server is one long-running Linux container with a persistent disk: a Python API, SQLite, your media, ffmpeg and headless Chromium for server-side rendering. This template deploys the official image `ghcr.io/wpsoul/greenlight-dash:latest` with a Volume mounted at `/data` for boards, media, renders and secrets, a public domain, a health check on `/health` and restart on failure. The owner password is generated for you as `GL_AUTH_PASSWORD`; read it in the service's Variables or type your own and redeploy, the server stores it hashed. The instance URL follows the service's public domain. Enlarge the volume before uploading real media. One owner per installation; your data stays on your volume unless you configure an AI provider.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| greenlight | `ghcr.io/wpsoul/greenlight-dash:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GL_INSTANCE_URL` | - | Public HTTPS address of this server, used for login cookies and links. Pre-filled from the Railway domain; replace it with your own domain if you attach one (https://boards.example.com). |
| `GL_AUTH_PASSWORD` | (secret) | Owner password for signing in (8+ characters). A random one is generated on deploy; read it back in this Variables tab, or type your own. The server stores it hashed. Change it and redeploy to change the password. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/greenlight-dash)
