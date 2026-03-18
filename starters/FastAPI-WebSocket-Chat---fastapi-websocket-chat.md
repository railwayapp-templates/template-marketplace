# Deploy FastAPI WebSocket Chat on Railway

Beautiful, FastAPI realtime multi-user websocket chat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fastapi-websocket-chat)

## About

A real-time chat application built with FastAPI and WebSockets. Users pick a username and join a shared chat room with instant messaging, typing indicators, online user counts, and join/leave notifications — all served from a single Python file with a dark-themed embedded UI.

Hosting a WebSocket chat app requires a platform that supports persistent, long-lived connections — not just standard HTTP request-response cycles. Railway handles this seamlessly. The app is a single `app.py` file with the HTML/CSS/JS frontend embedded inline, so there's no build step or static file configuration needed. Railway auto-detects the Python runtime, installs dependencies from `requirements.txt`, and exposes the app on a public URL. The `PORT` environment variable is read automatically, making deployment zero-config. Push to GitHub and Railway takes care of the rest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fastapi-websocket-chat | [Oclemy/fastapi-websocket-chat](https://github.com/Oclemy/fastapi-websocket-chat) | Worker |

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/template/fastapi-websocket-chat)
