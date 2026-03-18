# Deploy OpenAI Voice Assistant on Railway

Extensible voice assistant template built with the Realtime API and FastAPI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pCNq15)

## About

A template for building real-time voice assistants using OpenAI's realtime API. This project provides a foundation for creating web-based voice interfaces that can process speech in real-time and respond with both voice and text.

It uses the new WebRTC API from OpenAI and a FastAPI server to authenticate the client and handle tool calls. An example tool call to retrieve the current weather is included.

It uses a JavaScript helper library that simplifies the usage in the frontend and pulls tool signatures directly from the OpenAPI definition.

Works best in Chrome, Edge and Safari. Firefox WebRTC performance is not great at the moment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | [pietz/openai-voice-assistant](https://github.com/pietz/openai-voice-assistant) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | Your secret OpenAI API key |

## Configuration

- **Start command:** `uvicorn app:app --host "0.0.0.0" --port $PORT`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, Python, HTML

[View on Railway →](https://railway.com/template/pCNq15)
