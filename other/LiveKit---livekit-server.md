# Deploy LiveKit on Railway

Realtime audio and video server for apps, calls and voice agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/livekit-server)

## About

LiveKit is an open-source WebRTC server that moves live audio, video and data between people, browsers and programs in real time. It is a Selective Forwarding Unit: each participant sends one stream up and LiveKit fans it out to the rest, so a room stays cheap on the client as it grows. Written in Go on the Pion WebRTC stack and released under Apache 2.0, it powers video conferencing, live streaming, remote collaboration, robotics teleoperation, and realtime AI voice agents needing sub-second round trips between a microphone and a model. Teams self-host it to keep media on infrastructure they control and escape per-minute hosted pricing.

Self-host LiveKit on Railway and this template deploys the full production shape rather than one container: the media server, a **Redis** instance so rooms route through a shared store instead of one process's memory, a **LiveKit Egress** worker that records and streams rooms out, and a **managed object storage bucket** for recordings. Browsers reach the server over a public HTTPS domain for signalling and a Railway TCP proxy for media. Both images come from the [gridalpha/livekit-railway](https://github.com/gridalpha/livekit-railway) repository, thin wrappers over the official builds that configure themselves at boot.

![Diagram of the LiveKit, Egress and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787375692/livekit-architecture.png)

LiveKit sits between your application and your users' browsers. Your backend issues a signed JSON Web Token saying who a participant is and what they may do; the client SDK connects with it, publishes tracks and subscribes to the others. The server forwards media rather than storing it, so its state is small and lives in Redis, not on disk.

Key capabilities:

- Simulcast, selective subscription and adaptive bandwidth management
- Client SDKs for JavaScript, React, Swift, Kotlin, Flutter, Unity, Go, Rust and Python
- Server APIs for creating rooms, moderating participants and issuing tokens
- Realtime data channels for chat, cursors and state sync
- End-to-end encryption, speaker detection and SVC codecs including VP9 and AV1
- Recording and live streaming through Egress, plus lifecycle webhooks

The architecture has three moving parts. **LiveKit** is the media server and the only service with a public address. **Redis** lets multiple LiveKit nodes share room state so the media tier can scale out, and is the message bus the server and Egress talk over. **Egress** is a headless worker running Chrome and GStreamer; it joins a room like any participant, composites what it sees and writes MP4, HLS or RTMP, uploading finished files to object storage and returning a signed URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Egress | [gridalpha/livekit-railway](https://github.com/gridalpha/livekit-railway) | Worker |
| LiveKit | [gridalpha/livekit-railway](https://github.com/gridalpha/livekit-railway) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | Egress | 8080 | Health check port, serves / |
| `LIVEKIT_WS_URL` | Egress | - | Media server WebSocket URL |
| `LIVEKIT_API_KEY` | Egress | (secret) | Must match the media server |
| `EGRESS_S3_BUCKET` | Egress | - | Bucket recordings upload to |
| `EGRESS_S3_REGION` | Egress | - | Bucket placement region |
| `EGRESS_S3_SECRET` | Egress | (secret) | Bucket secret access key |
| `EGRESS_REDIS_HOST` | Egress | - | Same Redis as the media server |
| `EGRESS_REDIS_PORT` | Egress | - | Redis port |
| `EGRESS_S3_ENDPOINT` | Egress | - | Object storage endpoint URL |
| `LIVEKIT_API_SECRET` | Egress | (secret) | Must match the media server |
| `EGRESS_S3_ACCESS_KEY` | Egress | - | Bucket access key id |
| `EGRESS_REDIS_PASSWORD` | Egress | (secret) | Redis password |
| `EGRESS_REDIS_USERNAME` | Egress | (secret) | Redis ACL username |
| `PORT` | LiveKit | 7880 | HTTP and WebSocket signalling port |
| `LIVEKIT_API_KEY` | LiveKit | (secret) | API key clients sign tokens with |
| `LIVEKIT_LOG_LEVEL` | LiveKit | info | Server log verbosity |
| `LIVEKIT_API_SECRET` | LiveKit | (secret) | Token signing secret, 32+ chars |
| `LIVEKIT_REDIS_HOST` | LiveKit | - | Enables distributed room routing |
| `LIVEKIT_REDIS_PORT` | LiveKit | - | Redis port |
| `LIVEKIT_REDIS_PASSWORD` | LiveKit | (secret) | Redis password |
| `LIVEKIT_REDIS_USERNAME` | LiveKit | (secret) | Redis ACL username |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 7881

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/livekit-server)
