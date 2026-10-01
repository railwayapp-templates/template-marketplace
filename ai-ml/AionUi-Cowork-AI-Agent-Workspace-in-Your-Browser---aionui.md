# Deploy AionUi | Cowork AI Agent Workspace in Your Browser on Railway

AionUi WebUI: chat, files, scheduled tasks, teams of AI agents, any model.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aionui)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/aionui?utm_medium=integration&utm_source=button&utm_campaign=aionui)

[AionUi](https://github.com/iOfficeAI/AionUi) is a free, open-source (Apache-2.0) "cowork" app for AI agents. You chat with an agent that can run commands, write files and work on projects, then review what it did in a files and changes panel. It can also run scheduled tasks and teams of agents. This template runs AionUi's WebUI as an always-on, password-protected web app on Railway, with all data kept on a volume.

One service, one volume at `/data`.

The image runs the upstream AionUi web runtime and its Rust backend (AionCore), built from the upstream release tag. AionUi's own remote mode starts the backend with authentication switched off. This build turns authentication on and adds the CSRF handling the web client does not send yet. The changes are in `build/remote-auth.patch`. Every API call and WebSocket needs a login session, and requests from other sites are rejected.

The admin password comes from a Railway variable and is applied on every boot. Claude Code, Codex, Gemini CLI and OpenCode are installed on the volume and updated to their latest versions on every boot, so AionUi can use them as agents. Conversations, settings, provider keys (encrypted at rest), skills and agent workspaces live on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aionui | [nomideusz/aionui-railway](https://github.com/nomideusz/aionui-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 25808 | Port of the AionUi web server. Do not change. |
| `AIONUI_AGENTS` | claude,codex,gemini,opencode | Agent CLIs to install on the volume and update on every boot: any of claude, codex, gemini, opencode, qwen, or npm package names, comma-separated. Set to none for none. |
| `GEMINI_API_KEY` | (secret) | Optional. Google AI Studio key for Gemini CLI (free tier available). |
| `OPENAI_API_KEY` | (secret) | Optional. OpenAI API key for Codex CLI. |
| `AIONUI_ADMIN_PASSWORD` | (secret) | Password for the `admin` login. Applied on every boot, so change it here and redeploy to rotate it. |
| `CLAUDE_CODE_OAUTH_TOKEN` | (secret) | Optional. Use Claude Code with your Claude Pro/Max plan: run `claude setup-token` on your own computer and paste the token here. |

## Configuration

- **Healthcheck:** `/api/auth/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/aionui)
