# Deploy SillyTavern | (Just Updated) AI Character Chat, No Stranger Can Claim Your Admin on Railway

SillyTavern AI chat frontend, admin password-protected from first boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sillytavern-or-just-updated-ai-character)

## About

SillyTavern is the open-source AI chat and roleplay frontend with **25k+ GitHub stars** and 300+
contributors — the power-user standard for AI character interaction, creative writing, and
storytelling. Connect Claude, GPT, Gemini, DeepSeek, Ollama, KoboldAI, or any OpenAI-compatible
backend. Character cards, World Info lorebooks, group chats with multiple AI characters, user
personas, RAG document support, TTS, and a full extensions system.

Running SillyTavern normally means installing Node.js v20+, Git, and 15–30 minutes of local setup —
and it only runs while your computer is on. This template deploys it as an always-on cloud service
reachable from any browser, on any device. One click. No installs.

**This template ships with the one fix every other SillyTavern deploy is missing: a
password-protected admin account from the very first request.**

SillyTavern is not an AI — it is a highly configurable frontend that formats prompts, manages memory
and sampling, and connects to whatever backend you point it at. It stores everything on a persistent
volume: character cards, chat history, lorebooks, personas, settings, and your saved connection
profiles.

Here is the detail that matters, and that the other Railway listings get wrong. The standard
SillyTavern Docker image enables user accounts and creates a default administrator with **no
password**. On a normal deploy, the first person to find your public URL can log in as that
administrator with an empty password — read every chat, use whatever LLM backend you configured (on
your API credits), and even set a password to lock you, the owner, out for good. This template closes
that hole before it can ever be used: the administrator password is generated and written to the
volume **before the web server starts listening**, so the first request your URL ever answers is
already protected. The template also refuses to deploy with an empty password rather than putting an
open admin panel on the internet, and it leaves any password you later set in the UI untouched across
redeploys. The image is pinned to a specific SillyTavern release, so a redeploy is never a surprise
upgrade.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SillyTavern | `ghcr.io/bon5co/sillytavern-railway:1.18.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ST_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/app/persist`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sillytavern-or-just-updated-ai-character)
