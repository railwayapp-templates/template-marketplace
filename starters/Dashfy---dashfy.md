# Deploy Dashfy on Railway

Dashboards for developers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dashfy)

## About

**Dashfy** is an open-source framework for building dashboards as code. Instead of clicking through a UI, you define dashboards in TypeScript, JSON, or YAML, connect any API through extensions, and Dashfy renders real-time interfaces over WebSockets. This template deploys the official Dashfy demo in one click.

Dashfy runs as a server–client app. The Dashfy server (Node.js, Fastify, and Socket.IO) loads your dashboard configuration, connects to APIs and data sources, and streams data to the client in real time. This template deploys the official demo as a single Railway service: the build step compiles the Vite + React client into `build/`, and the server serves that UI and handles the WebSocket connection on the same port. No database or extra services are required for the minimal demo. Railway assigns an HTTPS domain automatically, and you can add your own custom domain any time under Networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashfy-demo | [dashfy/dashfy-demo](https://github.com/dashfy/dashfy-demo) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/dashfy)
