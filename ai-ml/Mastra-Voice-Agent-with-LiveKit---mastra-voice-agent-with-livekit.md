# Deploy Mastra Voice Agent with LiveKit on Railway

Call-center voice agent on LiveKit with Mastra memory and replies.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastra-voice-agent-with-livekit)

## About

[Mastra](https://mastra.ai) is the open-source TypeScript framework for building AI agents and workflows. This template deploys "Jordan", a call-center voice agent for a fictional trades contractor, built on `@mastra/livekit`. LiveKit runs the WebRTC audio, speech-to-text, semantic turn detection, barge-in, and text-to-speech; Mastra generates every reply with three memory layers (working, semantic recall, observational), a mock CRM, a service-area gate, and end-of-call intake reconciliation.

One Railway service runs both processes: the Mastra HTTP server (which issues LiveKit room tokens) and the LiveKit agent worker that joins calls. Both share a LibSQL database on an attached volume, and the public domain serves Mastra Studio, so you can read call memory and transcripts in the browser. Bring LiveKit Cloud credentials (or your own LiveKit server) and an OpenAI API key, deploy, then open Studio on the public domain and press the phone button in the Meridian Trades Front Desk agent chat. Your own frontend calls `POST /voice/livekit/connection-details` for a token instead. The worker uses explicit dispatch, so a plain LiveKit client token does not reach the agent. The token route ships unauthenticated so the demo works out of the box. Anyone with the URL can start a call against your LiveKit project, so put the route behind auth before you share the deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastra Voice Agent | [leoisadev1/mastra-template-voice-agent](https://github.com/leoisadev1/mastra-template-voice-agent) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |
| `LIVEKIT_API_KEY` | (secret) |
| `LIVEKIT_API_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/mastra-voice-agent-with-livekit)
