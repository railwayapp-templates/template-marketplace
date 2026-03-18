# Deploy Multiplayer-Web-Lobby on Railway

A complete real-time multiplayer lobby system with WebSockets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/multiplayer-web-lobby)

## About

A complete real-time multiplayer lobby system with WebSocket communication, 2D player visualization, and live chat functionality. Built with Socket.IO, Phaser.js, and Redis for instant player interaction and seamless scaling across multiple concurrent users.

Hosting Multiplayer-Web-Lobby involves deploying two containerized services: a Node.js WebSocket server for real-time communication and an Nginx-served client with Phaser.js game engine. The system uses Redis for player state persistence and horizontal scaling, enabling multiple server instances to share lobby data. Railway automatically handles service discovery, SSL certificates, and environment configuration, making deployment seamless for both development and production environments.

**Important:** Configure Public Networking ports in Railway:
- **Server Service**: Set port to `3000`
- **Client Service**: Set port to `80`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| multiplayer-server | [Oko-Tester/multiplayer-lobby-railway](https://github.com/Oko-Tester/multiplayer-lobby-railway) (root: /server/) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| multiplayer-client | [Oko-Tester/multiplayer-lobby-railway](https://github.com/Oko-Tester/multiplayer-lobby-railway) (root: /client/) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | multiplayer-server | 3000 | - |
| `MULTIPLAYER_SERVER` | multiplayer-server | - | The public service or customer domain. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `PORT` | multiplayer-client | 80 | - |
| `MULTIPLAYER_SERVER` | multiplayer-client | - | Server URL for WebSocket connection from multiplayer server |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** JavaScript, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/template/multiplayer-web-lobby)
