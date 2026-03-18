# Deploy LiveKit - Voice Agent on Railway

Deploy and Host LiveKit with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/livekit)

## About

LiveKit is an open-source WebRTC platform for building real-time audio and video applications. It handles media routing, room management, and participant coordination — letting you build voice agents, video calls, and live streaming without managing low-level WebRTC infrastructure.

Hosting LiveKit requires running a media server with WebRTC connectivity, a Redis instance for room state coordination, and typically one or more backend workers that process media streams. On most cloud platforms, this means configuring UDP ports, TURN/STUN servers, and TLS termination — all of which add operational complexity. This template packages the entire stack — LiveKit server, a Python voice agent powered by OpenAI, a web frontend, and Redis — into a single Railway project with pre-configured networking, so you can go from zero to a working voice AI demo in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| voice-agent | [yuting1214/LiveKit-Template](https://github.com/yuting1214/LiveKit-Template) (root: voice-agent/) | Worker |
| Redis | `redis:8.2.1` | Database |
| livekit-server | [yuting1214/LiveKit-Template](https://github.com/yuting1214/LiveKit-Template) (root: livekit-server/) | TCP service |
| web-frontend | [yuting1214/LiveKit-Template](https://github.com/yuting1214/LiveKit-Template) (root: web-frontend/) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AGENT_MODE` | voice-agent | pipeline | controls which agent mode runs |
| `OPENAI_API_KEY` | voice-agent | (secret) | Your OpenAI API key |
| `LIVEKIT_API_KEY` | voice-agent | (secret) | - |
| `LIVEKIT_API_SECRET` | voice-agent | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | livekit-server | 8080 | - |
| `LIVEKIT_API_KEY` | livekit-server | (secret) | - |
| `LIVEKIT_API_SECRET` | livekit-server | (secret) | - |
| `LIVEKIT_NODE_IP_MODE` | livekit-server | auto | - |
| `LIVEKIT_API_KEY` | web-frontend | (secret) | - |
| `LIVEKIT_API_SECRET` | web-frontend | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 7882

**Category:** AI/ML · **Languages:** TypeScript, Shell, Python, Dockerfile, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/template/livekit)
