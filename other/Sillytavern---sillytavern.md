# Deploy Sillytavern on Railway

Chat and roleplay with AI characters using your own API key

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sillytavern)

## About

SillyTavern is an open-source frontend for large language models, built for people who want control over the conversation rather than a chat box. Characters are portable character cards, lore lives in World Info entries, several characters can share a group chat, and the sampler, prompt template and context budget are editable. It ships no model of its own — connect OpenAI, Anthropic, OpenRouter, NovelAI, AI Horde or your own Ollama server — so chats, prompts and API keys stay on infrastructure you control.

Deploy SillyTavern on Railway and the awkward part is already done. Running it publicly means putting a login in front of it, and SillyTavern's own startup check refuses to serve a non-loopback address while an admin account has a blank password. This template builds from [gridalpha/sillytavern-railway](https://github.com/gridalpha/sillytavern-railway) on top of the official `ghcr.io/sillytavern/sillytavern` image and sets that password before the server starts, from one variable you pick at deploy time. One service, one volume, HTTPS and a domain — no compose file, no reverse proxy.

![Diagram of the single SillyTavern service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787183846/sillytavern-architecture.png)

Hosted chat products keep your prompts, characters and stories on someone else's server, under their content rules and retention policy, and hide the prompt actually sent. Self-host SillyTavern and the prompt path is yours to inspect and edit, while the model stays a backend you swap and pay for directly.

Key features:

- **Character cards** — portable `.png` files carrying a character's description, greeting and example dialogue
- **World Info / lorebooks** — keyword-triggered entries injected only when relevant, so a long setting survives a small context window
- **Prompt control** — instruct and context templates, system prompts and sampler settings, saveable as presets
- **Group chats and multi-user accounts** — several characters per conversation; separate handles with separate data
- **Extensions** — image generation, text-to-speech, translation, vector memory and web search, added from the UI
- **Broad backend support** — OpenAI, Anthropic, Google, Mistral, DeepSeek, OpenRouter, NovelAI, AI Horde, KoboldCpp, Ollama and any OpenAI-compatible endpoint

One Node service serves the web app and relays requests to whichever provider you configured. There is no database, queue or worker: all state is files on one Railway volume at the data root, holding every user's chats, characters, personas, presets, assets, extensions and backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sillytavern | [gridalpha/sillytavern-railway](https://github.com/gridalpha/sillytavern-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | HTTP listening port |
| `ST_ADMIN_PASSWORD` | (secret) | Password for the default-user admin |
| `SILLYTAVERN_SESSIONTIMEOUT` | 604800 | Session inactivity timeout, seconds |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/app/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/sillytavern)
