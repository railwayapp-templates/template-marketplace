# Deploy OpenBot Lite on Railway

OpenBot Lite: persistent AI coworker bots (AG-UI) with vault + audit log

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openbot-lite-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/openbot-lite-1)

**OpenBot Lite** — [OpenBot](https://github.com/CopilotKit/OpenBot) by CopilotKit — is an open-source AI-coworker runtime that speaks the [AG-UI protocol](https://github.com/agent-protocol): persistent coworker bots with a policy gateway, a credential vault, and an append-only audit log — with any agent harness (built-in bots, or external LangGraph / Mastra / CrewAI agents over AG-UI).

This Lite template ships the whole runtime in **one container** (the official `ghcr.io/copilotkit/openbot:v0.0.15` image): AG-UI server + web UI + up to 3 built-in bots + an embedded Chromium "computer" for browser-using bots + **embedded Postgres 16 (pgvector)** for the audit trail and policy store — no companion database service required, and every bot's state survives redeploys on a persistent volume.

- Web app: **/agents**, **/audit**, **/credentials**, **/settings**, SSO provider management (**/sso/providers**)
- Single-user mode by default (every visitor is the admin, no passwords, no registration) — flip to SSO (Google / Microsoft Entra / Okta) when the domain is shared
- Credential vault encrypted with **KEY_ENCRYPTION_KEY**, auto-generated once and persisted on the volume — redeploys never lock you out of stored secrets
- Durable threads & bot memory via **CopilotKit Intelligence** (managed `api.intelligence.copilotkit.ai` — the Pro plan)
- Point `OPENAI_API_KEY` / `OPENAI_BASE_URL` at OpenAI or any OpenAI-compatible gateway (vLLM, Ollama, LiteLLM)
- Optional external harness: `MANAGED_AGENT_AG_UI_URL` + `MANAGED_AGENT_TOKEN` for LangGraph / Mastra / CrewAI agents

Single service, Dockerfile build from the pinned upstream image, plus a small entrypoint shim that does the things a fresh Railway deployment needs that the base image won't do by itself:

1. **Stable KEY_ENCRYPTION_KEY** — auto-generated once, persisted on the volume, re-exported every boot. A key rotated out from under the vault would corrupt stored secrets.
2. **Sign-in gate** — detects whether an SSO provider is configured and puts the app into the matching posture, anchoring `BETTER_AUTH_URL`/`TRUSTED_ORIGINS` to the public domain so the app's "no public origin while single-user" and "no sign-in configured" boot guards are always satisfied.
3. **Embedded Postgres on** — the base image ships `EMBEDDED_POSTGRES=off` (multi-container shape); we set it `on` so the whole stack runs in one container.
4. **Bot state on the one volume** — the base image keeps `/workspace` (bot dirs) and `/profiles` (Chromium logins) in ephemeral baked dirs. The shim re-points both onto the persistent volume via symlinks so every bot's files and browser logins survive a redeploy.

One Railway volume (Railway allows exactly **one volume per service**), mounted at the parent directory exactly as the image's own `postgres-init.sh` requires — a volume mounted directly on the data dir arrives with `lost+found` and `initdb` refuses it. Everything durable lives under it:

| Path on the volume | Purpose |
|---|---|
| `/var/lib/postgresql/data` | Postgres cluster — bots, credential vault, policy store, append-only audit trail |
| `/var/lib/postgresql/.openbot.key` | The persisted `KEY_ENCRYPTION_KEY` |
| `/var/lib/postgresql/workspace` | Bot working directories (symlinked as `/workspace`) |
| `/var/lib/postgresql/profiles` | Per-bot Chromium profile state — logins, cookies (symlinked as `/profiles`) |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openbot-lite | [mc9max/openbot-lite](https://github.com/mc9max/openbot-lite) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | HTTP listen port. Must match the EXPOSE and Railway domain port. |
| `BOT_MODEL` | - | Optional. Override the built-in bots' model. Empty = provider defaults (gpt-5.5 / claude-sonnet-4-5 / gemini-2.5-flash). |
| `OPENAI_API_KEY` | (secret) | OpenAI (or any OpenAI-compatible gateway) API key that the built-in bots use. Replace with a real key. |
| `OPENAI_BASE_URL` | - | Optional. Empty = call OpenAI directly. Set to point at any OpenAI-compatible endpoint (vLLM, Ollama, LiteLLM). |
| `MANAGED_AGENT_TOKEN` | (secret) | Bearer token the external AG-UI harness presents when this server calls tools back. Only needed with MANAGED_AGENT_AG_UI_URL. |
| `INTELLIGENCE_API_KEY` | (secret) | CopilotKit Intelligence project runtime key (cpk-...). Create one at https://intelligence.copilotkit.ai (API Keys) or via the CopilotKit CLI. |
| `INTELLIGENCE_API_URL` | https://api.intelligence.copilotkit.ai | CopilotKit Intelligence platform API (durable threads, memory, history). |
| `MANAGED_AGENT_AG_UI_URL` | - | Optional. Endpoint of an external AG-UI harness (LangGraph / Mastra / CrewAI) to mount alongside the built-in bots. |
| `INTELLIGENCE_GATEWAY_WS_URL` | wss://realtime.intelligence.copilotkit.ai | CopilotKit Intelligence realtime gateway (WebSocket) for live agent events. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Bots · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openbot-lite-1)
