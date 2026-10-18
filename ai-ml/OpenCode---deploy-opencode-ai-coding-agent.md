# Deploy OpenCode on Railway

Open-source AI coding agent in your browser, persistent workspace

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-opencode-ai-coding-agent)

## About

This template deploys OpenCode 1.19.3 as a web AI coding agent on Railway, with a persistent workspace on a volume. The image adds git, bash, Node, Python, and SSH for cloning, building, and testing code. Password login is enforced, and free Zen models need no API key.

Hosting OpenCode on Railway keeps your code, prompts, and model keys on a volume you own, not in a third-party cloud. Railway handles the container lifecycle, HTTPS, health checks, and volume persistence. You bring the repo and pick a model; Railway keeps it running.

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

[View on Railway →](https://railway.com/deploy/deploy-opencode-ai-coding-agent)
