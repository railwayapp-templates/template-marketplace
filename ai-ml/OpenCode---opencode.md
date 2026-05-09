# Deploy OpenCode on Railway

always-on autonomous AI coding agent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode)

## About

# Deploy and Self-Host OpenCode on Railway

[OpenCode](https://opencode.ai) is an open-source AI coding agent that can read, edit, and navigate your codebase with full project context. This template makes it easy to run OpenCode on Railway with a browser UI, remote CLI access, persistent workspace storage, and production-friendly auth.

## Why Use This Template

This template is not just a basic OpenCode container. It adds the pieces needed for a practical hosted setup:

- **Pinned frontend + backend from the same source ref** — avoids version mismatch between the OpenCode core and web UI
- **Browser-friendly authentication** — secure cookie-based login for Chrome and Safari, while still supporting HTTP Basic Auth for CLI and automation
- **Persistent state on `/data`** — workspace, config, and runtime state survive redeploys and restarts
- **Optional memory monitor** — can automatically restart the service when it has been idle for long enough and memory usage grows too high
- **Railway Serverless support** — lets the service sleep when idle to reduce cost
- **Auto-installed `oh-my-openagent@latest`** — refreshed automatically on new deployments

## Common Use Cases

- **Self-hosted AI coding workspace** — keep OpenCode available from anywhere without depending on a local machine
- **Remote pair programming** — open the same coding environment from a browser or CLI on any device
- **Persistent autonomous agent** — let OpenCode keep its workspace and state across sessions
- **Internal engineering tooling** — run OpenCode inside your own Railway project with your own credentials and storage

## Requirements

- **Persistent volume mounted at `/data`** — required for workspace, config, and state persistence

## Key Environment Variables

- `OPENCODE_SERVER_PASSWORD` — required password for browser and CLI access
- `SOURCE_MODE` — build from source for pinned frontend/backend parity; enabled by default
- `OPENCODE_REF` — OpenCode git ref to build when `SOURCE_MODE=true`
- `OPENCODE_MODEL` — optional default model
- `ENABLE_MONITOR` — enable idle high-memory auto-restart
- `RAILWAY_API_TOKEN` — required if the monitor should trigger Railway restart/redeploy automatically

## How It Works

This template runs OpenCode behind a lightweight Node.js wrapper instead of exposing the upstream server directly. The wrapper:

- serves the locally built web app when using source mode
- issues secure browser session cookies
- preserves HTTP Basic Auth for CLI clients
- proxies requests to the internal OpenCode server
- refreshes plugin cache on new Railway deployments
- helps diagnose what keeps a Serverless service awake

That makes the deployment more reliable for real browser usage, remote access, and long-running hosted sessions than a minimal `opencode serve` setup.


## Why Deploy OpenCode on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying OpenCode on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode | [LaceLetho/opencode-railway-template](https://github.com/LaceLetho/opencode-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_LEVEL` | INFO | - |
| `SOURCE_MODE` | true | if build from source |
| `OPENCODE_REF` | v1.14.41 | version of opencode |
| `ENABLE_MONITOR` | true | - |
| `OPENCODE_SERVER_PASSWORD` | (secret) | default username: opencode |
| `OPENCODE_SERVER_USERNAME` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencode)
