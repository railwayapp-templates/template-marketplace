# Deploy OpenHands on Railway

OpenHands coding agents in the browser, plus Claude Code and Codex

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhands-1)

## About

[OpenHands](https://github.com/OpenHands/OpenHands) is an open-source platform for AI coding agents. Its web app, Agent Canvas, runs conversations with the OpenHands agent or with Claude Code, Codex or Gemini CLI, schedules automations, and opens a VS Code editor on the agent's files. This template runs Agent Canvas 1.26.0 on Railway with its own login key, a volume, and the Claude Code and Codex CLIs installed.

The agent edits files and runs shell commands inside the container, so the API and the UI need a key before anything works. `LOCAL_BACKEND_API_KEY` is generated at deploy; Canvas asks for it the first time you open `CANVAS_URL`. The start step refuses to run without it and passes it to the agent server itself. In my test the API answered 401 without the key and the key never appeared in the page.

The agent runs in the container, with no Docker sandbox, because Railway has no Docker socket. That's the "without a sandbox" mode from OpenHands' README: the agent has the whole container, and the container is all it has.

The home directory (`/home/openhands`) is a volume. Settings, saved API keys, conversations, automations, CLI logins and your projects (`/projects` points into it) survive redeploys.

Claude Code and Codex run as Agent Canvas agents through ACP. Give them an API key in Canvas's onboarding or as `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` on the service. To use a Claude or ChatGPT subscription instead, open a conversation's VS Code editor (served under `/vscode` on the same domain), run `claude` or `codex` in its terminal and sign in. OpenHands' ACP docs say Canvas reuses a CLI login it finds in the home directory, and here that login stays on the volume.

Before publishing I tested it on Railway. I saved an LLM (gpt-5-mini through OpenRouter) in the settings the way onboarding does, started a conversation in `/projects`, and asked the OpenHands agent to create `railway-test/hello.txt` containing "Railway 42". The conversation finished, the agent answered "DONE." and the file held exactly that text. The conversation's VS Code editor opened through the same domain. After a restart the saved model and key, the conversation and the file were all still there. I didn't run the Claude Code or Codex agents end to end; I checked that both CLIs are installed (Claude Code 2.1.295, Codex 0.162.0).

Memory is the tradeoff. Agent Canvas runs an agent server, an automation server, a web server and the editor in one container: 0.63 GB after a fresh start and a first task, 0.9 GB later. That fits under the trial's 1 GB with little room; the Hobby plan is the comfortable one. At 0.9 GB it's about $9 a month in RAM, plus your LLM usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenHands | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /openhands) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Port Railway routes to |
| `CANVAS_URL` | - | Open this and paste LOCAL_BACKEND_API_KEY when it asks for the backend key |
| `OH_SECRET_KEY` | (secret) | Encrypts saved settings and secrets (generated) |
| `OPENAI_API_KEY` | (secret) | Optional: for the Codex agent (or sign in with ChatGPT in the editor's terminal) |
| `ANTHROPIC_API_KEY` | (secret) | Optional: for the Claude Code agent (or sign in with your Claude account in the editor's terminal) |
| `AUTOMATION_BASE_URL` | - | Public URL used in automation callbacks |
| `LOCAL_BACKEND_API_KEY` | (secret) | Key for the UI and API (generated). Anyone with it controls the agent and its container |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/openhands`

**Category:** AI/ML · **Tags:** openhands, agent-canvas, coding-agent, claude-code, codex, ai-agent · **Languages:** JavaScript, Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/openhands-1)
