# Deploy SillyTavern (Official Image) on Railway

SillyTavern on the official image, password-protected, chats on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sillytavern-official-image)

## About

[SillyTavern](https://github.com/SillyTavern/SillyTavern) is an open-source (AGPL-3.0) chat interface for LLMs, built around characters, roleplay and long conversations. You bring the model: it connects to OpenAI, Claude, Gemini, OpenRouter, KoboldCpp, Ollama and many other APIs.

Most SillyTavern templates on Railway run a repackaged third-party image. This one runs the official `ghcr.io/sillytavern/sillytavern` image and configures it only through SillyTavern's own `SILLYTAVERN_*` variables, so there's nothing custom between you and upstream.

When the deploy finishes, open `SILLYTAVERN_URL` from the Variables tab and log in. The username is `user` and the password is `SILLYTAVERN_BASICAUTHUSER_PASSWORD`, generated for your deploy. Then open the API Connections panel and add a key for the model provider you use. Keys are saved on the volume with everything else.

Before publishing I deployed it and checked that the page returns 401 without the password and the SillyTavern app with it. I then created a character through SillyTavern's own API, restarted the service, and the character was still there. On SillyTavern 1.19.0 it used 172 MB of RAM at idle, about $1.70 a month.

A detail you'd hit on your own: SillyTavern rate-limits wrong passwords, five per minute. Behind Railway's proxy every visitor arrives from the proxy's address, so by default five typos from anyone would lock you out too. The template sets `SILLYTAVERN_RATELIMITING_PREFERREALIPHEADER` so the limit applies per real visitor.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sillytavern | `ghcr.io/sillytavern/sillytavern:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SILLYTAVERN_URL` | - | Open this and log in with the username and password above |
| `SILLYTAVERN_PORT` | 8000 | Port SillyTavern listens on |
| `SILLYTAVERN_LISTEN` | true | Accept connections from outside the container (needed on Railway) |
| `SILLYTAVERN_BASICAUTHMODE` | true | Ask for a username and password on every visit |
| `SILLYTAVERN_WHITELISTMODE` | false | IP whitelist off: Railway's proxy IPs change. The password protects the app instead |
| `SILLYTAVERN_HOSTWHITELIST_SCAN` | false | Don't log a warning for every request to the Railway domain |
| `SILLYTAVERN_BROWSERLAUNCH_ENABLED` | false | No browser inside the container |
| `SILLYTAVERN_BASICAUTHUSER_PASSWORD` | (secret) | Login password (generated) |
| `SILLYTAVERN_BASICAUTHUSER_USERNAME` | (secret) | Login username |
| `SILLYTAVERN_RATELIMITING_PREFERREALIPHEADER` | true | Rate-limit logins per visitor IP (from Railway's proxy headers), not per proxy |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/app/data`

**Category:** AI/ML · **Tags:** sillytavern, llm, chat, roleplay, ai

[View on Railway →](https://railway.com/deploy/sillytavern-official-image)
