# Deploy FastRTC on Railway

Deploy and Host FastRTC with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastrtc)

## About

FastRTC is a Python library for building real-time audio/video streaming applications using WebRTC. It integrates seamlessly with FastAPI and enables low-latency voice interactions with AI models like OpenAI's Realtime API.

FastRTC requires a persistent server to handle WebRTC connections—serverless functions like AWS Lambda won't work due to WebRTC's stateful nature. Deployment involves running a FastAPI server that manages WebRTC signaling, audio streaming, and AI model connections. The server needs to handle concurrent WebSocket connections and maintain session state for real-time bidirectional audio.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FastRTC-Template | [yuting1214/FastRTC-Template](https://github.com/yuting1214/FastRTC-Template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/fastrtc)
