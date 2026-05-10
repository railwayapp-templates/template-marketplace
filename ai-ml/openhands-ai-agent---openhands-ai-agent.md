# Deploy openhands-ai-agent on Railway

Self-host the OpenHands AI software engineer agent on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhands-ai-agent)

## About

OpenHands (formerly OpenDevin) is an open-source AI software engineering agent that writes code, runs commands, browses the web, and ships pull requests on your behalf — like a team member you can task in plain English. Self-host OpenHands on Railway when you want a private, single-tenant agent that uses your own LLM API keys instead of a hosted SaaS.

This Railway template deploys OpenHands as a single service with `RUNTIME=local` (no Docker socket needed), an nginx HTTP basic-auth front, and a persistent volume for sessions and settings. Pick your LLM provider (Anthropic, OpenAI, OpenRouter, Bedrock, or any litellm-compatible endpoint) once, and the agent is ready to work.

OpenHands is a permissively licensed (MIT) AI agent framework backed by All Hands AI and a research community at the University of Illinois Urbana-Champaign. It scores at the top of the SWE-bench Verified leaderboard and is used by engineering teams that want a code-native agent they can audit and run on their own infrastructure.

Key features:
- Plug-in any LLM (Anthropic, OpenAI, Google, AWS Bedrock, OpenRouter, local Ollama, etc.) via litellm
- Built-in tools: shell, file editor, web fetch, git, GitHub PR creation
- Multi-conversation workspace with persistent chat history
- Browse-and-attach GitHub repos directly from the UI
- Headless / API mode for programmatic agent runs

This template runs the agent in **local-runtime** mode — the agent process executes inside the Railway container itself rather than spinning up a per-conversation Docker sandbox (Railway does not expose a Docker socket). That means it boots fast and is fine for trusted single-user / small-team use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenHands | [praveen-ks-2001/openhands-railway](https://github.com/praveen-ks-2001/openhands-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Public port nginx listens on |
| `RUNTIME` | local | Run agent in-process (Railway has no Docker socket) |
| `LLM_MODEL` | - | Optional: pre-fill default model name (e.g. claude-sonnet-4-6) |
| `FILE_STORE` | local | File-based session storage |
| `LLM_API_KEY` | (secret) | Optional: pre-fill LLM provider API key |
| `LLM_BASE_URL` | - | Optional: pre-fill custom LLM endpoint URL |
| `INTERNAL_PORT` | 3001 | Loopback port uvicorn binds to |
| `ENABLE_BROWSER` | false | No X server in Railway containers |
| `SERVE_FRONTEND` | true | Serve UI from same uvicorn process |
| `BASIC_AUTH_USER` | (secret) | Username for nginx basic-auth gate |
| `FILE_STORE_PATH` | /.openhands | Volume mount path for sessions/settings |
| `SANDBOX_USER_ID` | 0 | Run upstream entrypoint as root |
| `PYTHONUNBUFFERED` | 1 | Stream Python logs without buffering |
| `RUN_AS_OPENHANDS` | false | Match SANDBOX_USER_ID=0 branch in entrypoint |
| `BASIC_AUTH_PASSWORD` | (secret) | Password for nginx basic-auth gate |
| `SKIP_DEPENDENCY_CHECK` | 1 | Tmux baked into image, skip cold-start probe |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/.openhands`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openhands-ai-agent)
