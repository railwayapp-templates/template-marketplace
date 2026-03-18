# Deploy Sanic WebSocket Chat on Railway

Single-file Sanic app with the  WebSocket + full chat frontend embedded.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sanic-websocket-chat)

## About

Hello, this is a real-time multi-user chat application built with Python's Sanic framework and native WebSockets. App's features include color-coded usernames, typing indicators, auto-reconnect, chat history persistence, and a responsive dark-themed UI — all in a single file.

Hosting a WebSocket chat app requires a platform that supports persistent, long-lived connections rather than just traditional HTTP request-response cycles. Sanic's async architecture handles thousands of concurrent WebSocket connections efficiently on a single process. Railway simplifies deployment by auto-detecting the Python runtime, injecting the `PORT` environment variable, and providing a public HTTPS domain with automatic WSS (secure WebSocket) upgrade support — no reverse proxy or TLS configuration needed. Push your repo, and Railway handles the rest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sanic-websocket-chat | [Oclemy/sanic-websocket-chat](https://github.com/Oclemy/sanic-websocket-chat) | Worker |

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/sanic-websocket-chat)
