# Deploy YouTube Transcript MCP on Railway

Connect YouTube to Claude and ChatGPT with cited transcripts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/youtube-transcript-mcp)

## About

Give Claude, ChatGPT, or another MCP client a way to search YouTube and read its captions. YouTube Transcript MCP turns short caption fragments into readable, timestamped paragraphs with chapter headings and deep links back to the video. Ask about a whole talk, one section, or a specific topic, and get an answer you can verify.

This template deploys the public [GitHub repository](https://github.com/scandolo/youtube-transcript-mcp) as an HTTP MCP service. It provides a public HTTPS domain and a persistent volume for sign-in state. The server starts in a safe setup mode while credentials are missing; visit `/healthz` to see what remains. Railway's cloud IP is often blocked when fetching YouTube captions, so add a rotating residential proxy. GitHub sign-in keeps strangers from using your public endpoint and proxy bandwidth. After Railway gives you a domain, create a GitHub OAuth app, add your credentials, then connect `https://YOUR-DOMAIN/mcp` to your AI app. Railway hosting and the proxy may cost money. Running locally via stdio needs no proxy or GitHub OAuth app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| youtube-transcript-mcp | [scandolo/youtube-transcript-mcp](https://github.com/scandolo/youtube-transcript-mcp) | Web service |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/youtube-transcript-mcp)
