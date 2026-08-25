# Deploy OpenCode on Railway

AI coding agent that writes and runs code in your project

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-ai)

## About

opencode is an open-source AI coding agent that reads, writes and runs code in a real
project directory. Built by the team behind SST, it carries roughly 200,000 GitHub
stars under an MIT licence and is not tied to one model vendor — it speaks to
Anthropic, OpenAI, Google, Groq, Bedrock, OpenRouter and local runtimes like Ollama
through one interface. Most people meet it as a terminal tool, but it also ships a
full web interface, and that is what makes it worth hosting: a coding agent on a
server keeps working when your laptop sleeps, holds its sessions and workspace between
visits, and is reachable from any browser.

This template runs `opencode web` as a single Railway service with a persistent volume
and HTTP basic authentication in front. A Caddy front-end listens on the public port
and passes traffic to opencode on loopback, so the agent is never directly exposed.
Everything it owns — configuration, sessions, provider credentials and the workspace
at `/data/workspace` — lives on one volume at `/data`, so a redeploy never loses your
work. The container also carries a toolchain (Node.js 22, Python 3, `git`, `ripgrep`
and a C/C++ build chain), so the agent can install dependencies and run your tests.

![Diagram of the single opencode service and its data volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1787335465/opencode-architecture.png)

opencode is an agent, not an autocomplete plugin. You describe an outcome and it plans
the work, edits files, runs commands, reads the output and iterates. Self-hosting it
makes sense when that loop should run somewhere other than a laptop: a machine that
can be left working, that a team can reach, or that sits close to the services it
operates on.

Key capabilities:

- **Provider-agnostic** — 75+ providers, plus a built-in default model that needs no
  API key, so the deployment is useful the moment it is live
- **Web, terminal and IDE clients** on one server, plus an OpenAPI 3.1 REST API
- **Sessions that persist**, with token and cost accounting
- **Real tool use** — file edits, shell commands, LSP integration and MCP servers
- **Sub-agents and modes**, including a read-only `plan` agent

The Railway architecture is deliberately small. One service runs two processes: Caddy
on the public port, and opencode bound to `127.0.0.1`. Caddy exists for a reason —
opencode requires authentication on every route, so an anonymous health probe would be
rejected and a healthy deployment would look broken. Caddy answers `/healthz` by
replaying it as an authenticated request to opencode's health endpoint, so a passing
check proves the agent is up and accepting its credential. There is no database:
opencode keeps state in files, which is why the volume matters here.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode | [gridalpha/opencode-railway](https://github.com/gridalpha/opencode-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Public Caddy listener, health checked |
| `GIT_AUTHOR_NAME` | opencode | Git identity for agent commits |
| `GIT_AUTHOR_EMAIL` | opencode@localhost | Git identity for agent commits |
| `OPENCODE_WORKSPACE` | /data/workspace | Agent working directory on the volume |
| `OPENCODE_INTERNAL_PORT` | 4096 | opencode loopback port behind Caddy |
| `OPENCODE_SERVER_PASSWORD` | (secret) | Basic auth password, required to boot |
| `OPENCODE_SERVER_USERNAME` | (secret) | Basic auth username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/opencode-ai)
