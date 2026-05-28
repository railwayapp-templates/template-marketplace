# Deploy LiveKit Voice Agent — Self-Hosted WebRTC AI on Railway on Railway

Self-host LiveKit: OpenAI voice agent with WebRTC. No per-minute fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/livekit-voice-agent)

## About

LiveKit is the open-source WebRTC infrastructure behind OpenAI's ChatGPT voice mode —
**12k+ GitHub stars**, $100M raised, $1B valuation, and the most widely used real-time voice
AI platform in production. This template deploys a complete self-hosted LiveKit stack: voice
agent, media server, Redis coordinator, and web frontend — pre-wired on Railway with TCP-mode
WebRTC configured out of the box.

Build a conversational AI voice agent powered by OpenAI Whisper, GPT-4o, and TTS — or swap
to the Realtime API for sub-500ms speech-to-speech latency. One API key. No WebRTC
infrastructure expertise required.

---

Running LiveKit in production requires coordinating a WebRTC media server, a Redis instance for
room state, backend agent workers for AI pipeline processing, and a frontend that connects over
WebRTC — all behind proper TLS with ICE transport configured for your network environment.
Most cloud platforms require manual UDP port forwarding, TURN server setup, and firewall rules
just to get a WebRTC connection established.

Railway does not support UDP natively — this template pre-configures a TCP proxy at port
`7882` with automatic iptables forwarding so WebRTC ICE transport works without any network
configuration on your part.

Typical cost: **~$10–20/month** on Railway's Hobby plan. LiveKit Cloud charges $0.01–$0.02
per participant minute — at 1,000 minutes that's $10–20 in per-minute billing before agent
compute costs.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Voice Agent | [sahilrupani/LiveKit-Template](https://github.com/sahilrupani/LiveKit-Template) (root: voice-agent) | Worker |
| LiveKit Server | [sahilrupani/LiveKit-Template](https://github.com/sahilrupani/LiveKit-Template) (root: livekit-server) | Web service |
| web-frontend | [sahilrupani/LiveKit-Template](https://github.com/sahilrupani/LiveKit-Template) (root: web-frontend) | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OPENAI_API_KEY` | Voice Agent | (secret) | Your OpenAI API key |
| `LIVEKIT_API_KEY` | Voice Agent | (secret) | - |
| `LIVEKIT_API_SECRET` | Voice Agent | (secret) | - |
| `PORT` | LiveKit Server | 8080 | - |
| `LIVEKIT_API_KEY` | LiveKit Server | (secret) | - |
| `LIVEKIT_API_SECRET` | LiveKit Server | (secret) | - |
| `LIVEKIT_NODE_IP_MODE` | LiveKit Server | auto | - |
| `LIVEKIT_API_KEY` | web-frontend | (secret) | - |
| `LIVEKIT_API_SECRET` | web-frontend | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Python, Shell, Dockerfile, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/livekit-voice-agent)
