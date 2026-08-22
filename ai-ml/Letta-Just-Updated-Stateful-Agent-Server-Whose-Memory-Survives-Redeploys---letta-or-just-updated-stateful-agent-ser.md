# Deploy Letta | (Just Updated) Stateful Agent Server Whose Memory Survives Redeploys on Railway

Agent memory that survives redeploys, on a password-protected agent API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/letta-or-just-updated-stateful-agent-ser)

## About

Letta (formerly MemGPT) is an open-source server for stateful LLM agents. Unlike a chat wrapper
that replays a transcript, a Letta agent owns an editable memory: core memory blocks it rewrites
about you and about itself, plus an archival store it searches with vector recall. Agents live
behind a REST API and the ADE, so the same agent is reachable from a script, a bot or the browser,
and it keeps learning between sessions.

The whole point of Letta is that the agent remembers. That makes storage the thing a hosted
deployment has to get right, and it is the thing most packagings get wrong.

**Memory that survives a redeploy.** The `letta/letta` image runs its own PostgreSQL inside the
container, and its data directory is `/var/lib/postgresql/data` — every agent, every core memory
block, every archival passage and every embedding lives there. A template that attaches its volume
anywhere else leaves all of it on the container filesystem, which Railway replaces on each deploy:
the server comes back healthy, the API answers, and every agent you built is gone. This template
mounts the volume on the real data directory, with `PGDATA` pointed at a subdirectory of the mount
so PostgreSQL can still initialise it — a volume mounted directly on the data directory fails
`initdb` with `directory exists but is not empty` because of `lost+found`, which is the failure
mode behind a Letta deploy that never becomes healthy.

**An agent API that is not open to the internet.** Letta serves without authentication unless
`SECURE` is set, and the deployed URL is public. An unauthenticated Letta server lets anyone who
finds it create agents and send messages that are billed to *your* OpenAI or Anthropic key, and
read the memory of the agents already there. This template sets `SECURE=true` and generates a
server password per deployment, so the API answers `401` until you send your own token.

The image is pinned by digest, and `deploy.healthcheckPath` points at `/v1/health/`, so Railway
waits for PostgreSQL, Redis and the server to come up rather than routing traffic into a boot
sequence and serving 502s for the first minute.

**Memory footprint:** measured at 762 MB steady state with the bundled PostgreSQL and Redis, so it
runs inside Railway's 1 GB Trial cap. It does not fit the 0.5 GB Free plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| letta | `letta/letta@sha256:aa66c3eeee13d2dfc40c650d709b550237ee31bfc91942a52fa488a13fa8c102` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |
| `LETTA_SERVER_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/v1/health/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/letta-or-just-updated-stateful-agent-ser)
