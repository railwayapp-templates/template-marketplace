# Deploy OpenCode vs Claude Code on Railway

Open-source Claude Code alternative you run in a browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-opencode-claude-code-alternative)

## About

Runs OpenCode as a persistent browser UI on Railway. Open-source Claude Code alternative: model-agnostic, plan and build modes, shell access, /data volume. For developers who want agent workflows without Anthropic's terminal.

This template runs OpenCode 1.19.3 as a persistent server on your Railway domain, with the web UI behind basic auth and workspace, sessions, provider logins, and git config on a /data volume you control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode | `ghcr.io/onepush-dev/opencode:1.19.3@sha256:9a248429018cfcec9e51416ae5e85c78c45bb6c4b9e61141d7f18e435bedd6a3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOME` | /data/home | Home directory on the volume; holds config, provider logins, sessions and git/ssh setup. |
| `PORT` | 4096 | Port OpenCode listens on and Railway routes the public domain to (4096). |
| `GEMINI_API_KEY` | (secret) | Optional Google Gemini key for Gemini models. |
| `OPENAI_API_KEY` | (secret) | Optional OpenAI key for GPT models. |
| `ANTHROPIC_API_KEY` | (secret) | Optional Anthropic key for Claude models. Free models work without it. |
| `OPENCODE_HOSTNAME` | 0.0.0.0 | Interface to bind; 0.0.0.0 so Railway's proxy can reach it. |
| `OPENCODE_WORKSPACE` | /data/workspace | Project folder on the volume where OpenCode starts; clone repos here. |
| `OPENROUTER_API_KEY` | (secret) | Optional OpenRouter key for many models behind one key. |
| `OPENCODE_SERVER_PASSWORD` | (secret) | Generated password for the web UI and API. Copy it from here to sign in. |
| `OPENCODE_SERVER_USERNAME` | (secret) | Username for the browser login (HTTP basic auth). |
| `OPENCODE_DISABLE_AUTOUPDATE` | true | Keep the pinned OpenCode version; upgrade by changing the image. |

## Configuration

- **Healthcheck:** `/site.webmanifest`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deploy-opencode-claude-code-alternative)
