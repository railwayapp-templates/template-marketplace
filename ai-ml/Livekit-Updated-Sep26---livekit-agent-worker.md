# Deploy Livekit [Updated Sep'26] on Railway

Run a LiveKit voice agent worker — STT, LLM, TTS, sub-second replies

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/livekit-agent-worker)

## About

LiveKit Agents is the open-source framework behind production voice AI — the same stack powering ChatGPT's voice mode. An agent joins a room as a participant, listens, thinks and speaks back, with turn detection and barge-in handled for you. This template deploys the agent worker itself: a long-lived process that dials out to your LiveKit server or LiveKit Cloud, with speech models baked in at build time so the first call doesn't stall waiting on a download.

A voice agent is judged on one number: the gap between someone finishing a sentence and hearing a reply. Almost everything below is a way that number quietly gets worse.

**Keep media off Railway.** Railway does not route UDP, so self-hosting the media server here forces WebRTC over TCP: head-of-line blocking and retransmission on a real-time audio stream, where a late packet is worse than a dropped one. Workable for a demo, a real latency tax on production voice. This template runs only the agent and points it at a LiveKit server on UDP-capable infrastructure.

**The agent is a worker, not a web service.** It opens an outbound connection and waits for dispatch; it never listens for HTTP. Attach a public domain and the health check fails against a port nothing is serving — a broken deploy by appearance, a healthy worker in fact.

**Models must be fetched at build time.** Turn detection and VAD load local weights. Skip the download step in your build and the worker fetches them on first job — the caller sits in silence during a cold start, or it fails outright. Run the framework's `download-files` step at build so the weights ship in the image.

**Start the worker in production mode.** The framework's development command enables hot reload and single-job debugging, and the console command is terminal-only. Either one deployed as your start command produces a worker that restarts constantly or never registers at all, with no obvious error.

**Never let the worker sleep.** Registration is a held connection. Scale-to-zero or app sleeping drops it, and LiveKit has nowhere to dispatch — the room opens and no agent joins. Keep the service always-on.

**Your bill is API calls, not compute.** Three metered providers sit in the pipeline — STT, the model, TTS — and a speech-to-speech model replaces all three with one meter that usually costs more per minute. Compute is the small number.

Typical cost: **~$8–15/month** for one always-on worker at $10/GB/month RAM and $20/vCPU/month, plus whatever your STT, LLM and TTS providers charge per minute of conversation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web-frontend | [yuting1214/LiveKit-Template](https://github.com/yuting1214/LiveKit-Template) | Worker |
| voice-agent | [yuting1214/LiveKit-Template](https://github.com/yuting1214/LiveKit-Template) | Worker |
| Redis | `redis:8.2` | Database |
| livekit-server | [yuting1214/LiveKit-Template](https://github.com/yuting1214/LiveKit-Template) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LIVEKIT_URL` | web-frontend | - | LIVEKIT URL |
| `LIVEKIT_API_KEY` | web-frontend | (secret) | LIVEKIT API KEY |
| `LIVEKIT_API_SECRET` | web-frontend | (secret) | LIVEKIT API SECRET |
| `LIVEKIT_URL` | voice-agent | - | LIVEKIT_URL |
| `OPENAI_API_KEY` | voice-agent | (secret) | Your OpenAI API key |
| `LIVEKIT_API_KEY` | voice-agent | (secret) | LIVEKIT_API_KEY |
| `LIVEKIT_API_SECRET` | voice-agent | (secret) | LIVEKIT_API_SECRET |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | livekit-server | 8080 | PORT |
| `REDIS_URL` | livekit-server | - | Redis URL |
| `LIVEKIT_API_KEY` | livekit-server | (secret) | LIVEKIT_API_KEY |
| `LIVEKIT_API_SECRET` | livekit-server | (secret) | LIVEKIT_API_SECRET |
| `LIVEKIT_NODE_IP_MODE` | livekit-server | auto | LIVEKIT_NODE_IP_MODE |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Python, Shell, Dockerfile, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/livekit-agent-worker)
