# Deploy Agentmemory | (Just Updated) Agent Memory Whose Recall Stays Scoped on Railway

Agent memory service whose recall stays scoped to the agent that wrote it

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentmemory-v0928-or-agent-memory-whose-)

## About

Agentmemory is a persistent memory server for AI coding agents. It keeps what your agents
learn about a project — decisions, file layouts, failed approaches, conventions — across
sessions and across tools, and serves it back over both a REST API and MCP, so Claude Code,
OpenAI Codex CLI, Cursor, Cline, Goose and anything else that speaks MCP share one long-term
memory instead of each starting from nothing.

This template deploys it as **one service on a volume**, running agentmemory 0.9.28 with the
matching `iii` engine, with the API and the real-time viewer both published on the single
Railway domain and both behind credentials.

**Recall that crosses agents.** Agentmemory supports isolating memory per agent with
`AGENTMEMORY_AGENT_SCOPE=isolated` plus an `AGENT_ID`, which is what you want when several
agents or several people share one server. Releases before 0.9.27 applied that filter to
smart-search but not to the plain BM25 recall path, so the standard `memory_recall` tool
returned another agent's memories (upstream issue #817). Reproduced on a build pinned to
0.9.16: an instance booted with `AGENT_ID=alpha` saved "rotate the production database
password on Friday"; the same instance rebooted as `AGENT_ID=beta` recalled that exact
sentence. On the 0.9.28 image this template ships, the same query returns no results —
the filter now fails closed. Version 0.9.28 also closes the matching leak on
`POST /agentmemory/context` (issue #1057).

**The viewer authenticates nobody by itself.** Agentmemory's live viewer is useful — sessions,
tool calls, timelines, health — and it is also a proxy that adds `Authorization: Bearer
$AGENTMEMORY_SECRET` to every call it forwards. Upstream only requires inbound credentials
when the viewer is bound to a non-loopback address; bound to loopback, which is the mode that
works behind a gateway, it hands full memory read and write to whoever reaches it. Here the
in-container gateway publishes it behind HTTP basic auth (`admin`, password
`AGENTMEMORY_SECRET`), on the same service and the same port as the API — no second billed
service to protect one page.

**An empty secret is not a weaker deployment, it is a public one.** Agentmemory's auth check
is `if (!secret) return null`: with `AGENTMEMORY_SECRET` unset, every REST and MCP endpoint
answers anonymously, and anyone with the URL can read and write your project's memory. This
image refuses to boot with an empty secret rather than starting an open instance. The
template generates a 32-character secret for you.

**Pinned, and built here rather than on your build minutes.** This deploys the prebuilt
`ghcr.io/bon5co/agentmemory-railway` image. Two things are pinned together on purpose:
agentmemory registers as a worker against the `iii` engine, and `npm install -g` ignores the
`overrides` field agentmemory uses to hold `iii-sdk` at the engine's version — a global
install resolves it up to 0.11.6, the release that moved to a worker model agentmemory has
not been refactored for. The image installs into a local prefix with an explicit override and
asserts the resolved versions at build time.

**State on the volume, and only on the volume.** The engine's key-value store, BM25 index and
stream backlog are written to absolute paths under the mount — the npm-bundled config uses a
relative `./data` path, which on Railway lands on the ephemeral overlay. Railway mounts
volumes as uid 0 and the app runs as `node`, so the entrypoint repairs ownership before
dropping privileges. Verified across a redeploy: memories saved before the redeploy are
recalled after it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agentmemory | `ghcr.io/bon5co/agentmemory-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AGENTMEMORY_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/agentmemory/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/agentmemory-v0928-or-agent-memory-whose-)
