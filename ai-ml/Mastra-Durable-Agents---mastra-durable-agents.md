# Deploy Mastra Durable Agents on Railway

Durable AI agents with resumable streams via Redis and Inngest.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastra-durable-agents)

## About

[Mastra](https://mastra.ai) is the open-source TypeScript framework for building AI agents and workflows. This template deploys a Mastra server that runs one research agent in four durability modes side by side: a plain `Agent`, a `createDurableAgent` with Redis-backed resumable streams, a `createEventedAgent` that adds fire-and-forget execution, and a `createInngestAgent` with full Inngest durable execution. Disconnect mid-stream, reconnect with the same `runId` and offset, and the stream resumes where it stopped.

The template provisions three services: the Mastra server, a Redis instance for the resumable stream cache, and an Inngest server for durable workflow execution. The Mastra server connects to Redis and Inngest over Railway's private network. Agent state and history persist in LibSQL on an attached volume. The Inngest service runs in dev mode and keeps its run state in the container, so a restart of that service drops runs that have not finished. Generate a public domain on the Mastra server and that URL serves both the REST API and Mastra Studio. Set one variable — your OpenAI API key — and deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastra Server | [leoisadev1/mastra-template-durable-agents](https://github.com/leoisadev1/mastra-template-durable-agents) | Web service |
| Redis | `redis:8.2.1` | Database |
| Inngest | `inngest/inngest:v1.34.0` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `OPENAI_API_KEY` | Mastra Server | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Start command:** `/bin/sh -c "inngest dev -p 8288 -u $MASTRA_INNGEST_URL --poll-interval=1"`

**Category:** AI/ML · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/mastra-durable-agents)
