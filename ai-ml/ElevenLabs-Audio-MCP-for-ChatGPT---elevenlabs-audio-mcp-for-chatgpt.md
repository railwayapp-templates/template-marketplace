# Deploy ElevenLabs Audio MCP for ChatGPT on Railway

Self-hosted ElevenLabs speech MCP. Bring your own API key and voice ID.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elevenlabs-audio-mcp-for-chatgpt)

## About

ElevenLabs Audio MCP for ChatGPT is a self-hosted Model Context Protocol server that turns text into playable ElevenLabs speech inside ChatGPT. Every deployment uses its owner's ElevenLabs API key and preferred voice ID, keeps the key on Railway, and provides tools for discovering voices, remembering a preferred voice, and generating temporary MP3 audio.

This template deploys one private connector instance for its owner. Railway asks for an ElevenLabs API key and a preferred voice ID, generates a secret MCP path automatically, exposes the service over HTTPS, and attaches persistent storage for the saved voice preference. Generated audio is stored temporarily in memory and served through short-lived signed URLs. The template includes a health check, conservative generation limits, and a compact audio player for ChatGPT. It has no shared user database, analytics, or central account.

After deployment, connect ChatGPT to:

`https://YOUR-RAILWAY-DOMAIN/YOUR-MCP_PATH_SECRET/mcp`

Keep the complete MCP URL private because anyone who has it could use the ElevenLabs credits associated with the deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Elevenlabs-chatGPT | [lauramarmun-prog/Elevenlabs-chatGPT](https://github.com/lauramarmun-prog/Elevenlabs-chatGPT) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MCP_PATH_SECRET` | (secret) | Automatically generated private path protecting the MCP endpoint and ElevenLabs credits. |
| `ELEVENLABS_API_KEY` | (secret) | Your ElevenLabs API key with Text to Speech and Voices read access. |
| `ELEVENLABS_VOICE_ID` | - | Your ElevenLabs voice ID. Copy it from your ElevenLabs voice library. |

## Configuration

- **Start command:** `npm start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/elevenlabs-audio-mcp-for-chatgpt)
