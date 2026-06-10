# Deploy Mastra Server With Studio on Railway

Mastra server with Studio UI - build, test, and manage AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastra-server-with-studio)

## About

[Mastra](https://mastra.ai) is the open-source TypeScript framework for building AI agents and workflows. This template deploys a complete Mastra server with [Mastra Studio](https://mastra.ai/docs/studio/overview) — the interactive UI for building, testing, and managing your agents — served from the same service. It ships with a starter agent (with conversation memory) you can chat with immediately.

Hosting Mastra in production involves more than `mastra dev`: the server must be built with the `--studio` flag (Studio is not bundled by default), serve the Studio SPA via `MASTRA_STUDIO_PATH`, auto-detect its public URL so the UI doesn't call `localhost`, bind `0.0.0.0` inside the container, and persist agent memory across deploys. This template handles all of that: a multi-stage Docker build runs `mastra build --studio`, the runtime serves API + Studio on one port, LibSQL storage lives on a Railway volume, and access is protected out of the box with a generated key (Mastra Simple Auth) so your agents aren't publicly exposed. Bring an LLM provider API key, deploy, and log in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastra Studio | [Sjotie/mastra-studio-railway](https://github.com/Sjotie/mastra-studio-railway) (root: server-with-studio) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MODEL` | openai/gpt-5.4-mini | Model for the starter agent in provider/model format, e.g. openai/gpt-5.4-mini or anthropic/claude-sonnet-4-6 (set the matching provider API key variable). |
| `DATABASE_URL` | file:/data/mastra.db | LibSQL storage URL. Default file:/data/mastra.db is backed by the attached volume so agent memory and Studio data persist across deploys. |
| `OPENAI_API_KEY` | (secret) | Your OpenAI API key, used by the default openai/... model. If you switch MODEL to another provider, add that provider's key variable instead (e.g. ANTHROPIC_API_KEY). |
| `STUDIO_AUTH_KEY` | (secret) | Auto-generated login key for Studio. Open your deployed URL and sign in with this key; API routes accept it as a Bearer token. Remove the variable to disable auth (not recommended). |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/mastra-server-with-studio)
