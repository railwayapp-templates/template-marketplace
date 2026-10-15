# Deploy OpenCode on Railway

Persistent, password-protected OpenCode 2 server with a web UI and API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-for-railway)

## About

OpenCode is an open-source AI coding agent. This template runs an OpenCode 2
server you can use from a browser, from the OpenCode TUI on your own machine,
or through its API. It keeps your workspace, sessions, and credentials on a
volume and comes with the runtimes and tools an agent needs to build and ship
code.

The template runs one OpenCode service from a tested image for amd64 and arm64,
with a volume at `/var/lib/opencode` and a public domain. A generated password
protects the web UI and the API, and the server refuses to start without one.
Node.js, Python, Go, Bun, pnpm, uv, the GitHub CLI, the Railway CLI, and
headless Chromium are preinstalled, along with skills for Railway, browser
automation, and frontend design. The agent can install more tools with mise,
and they persist on the volume. Patch releases of the image install
automatically during Railway's nightly update window.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode | `ghcr.io/joeychilson/railway-opencode:4.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4096 | Port the OpenCode server listens on. |
| `GITHUB_TOKEN` | (secret) | GitHub token for the GitHub CLI and git over HTTPS. |
| `GIT_USER_NAME` | - | Name on commits the agent makes. |
| `GIT_USER_EMAIL` | - | Email on commits the agent makes. |
| `OPENAI_API_KEY` | (secret) | OpenAI API key. |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API key. Set at least one provider key, or sign in to a provider from the web UI. |
| `OPENCODE_PASSWORD` | (secret) | Password for the web UI, the API, and remote clients. The username is opencode. |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/opencode`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/opencode-for-railway)
