# Deploy Flask WebSocket Chat on Railway

Single file, realtime multi-user websocket chat using flask-socketio

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/flask-websocket-chat)

## About

A real-time chat application built with Flask and Flask-SocketIO. It uses WebSockets (with polling fallback) to broadcast messages instantly between all connected clients. Features automatic reconnection, online user counting, and a clean dark-themed UI—all in a single Python file.

Hosting Flask WebSocket Chat requires a platform that supports persistent WebSocket connections alongside standard HTTP traffic. The app runs on Gunicorn with an Eventlet async worker, which handles concurrent WebSocket connections efficiently in a single process. Railway provisions the PORT environment variable automatically, and the app binds to it on startup. No database or external storage is needed—messages are relayed in real time and chat state lives in memory. The deployment consists of just two files: `main.py` and `requirements.txt`, making it straightforward to deploy and maintain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flask-websocket-chat | [Oclemy/flask-websocket-chat](https://github.com/Oclemy/flask-websocket-chat) | Worker |

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/template/flask-websocket-chat)
