# Deploy SillyTavern in the Cloud — No Node.js Install. Any Device, Always-On. on Railway

Run SillyTavern in the cloud — no Node.js, no install, any device.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sillytavern-cloud)

## About

SillyTavern is the open-source AI chat and roleplay frontend with **25k+ GitHub stars** and
300+ contributors — the power-user standard for AI character interaction, creative writing,
and storytelling. Connect Claude, GPT-4o, Gemini, DeepSeek, Ollama, KoboldAI, or any
OpenAI-compatible backend. Character cards, World Info lorebooks, group chats with multiple
AI characters, user personas, RAG document support, TTS, and a full extensions system.

Normal SillyTavern requires Node.js v20+, Git, and 15–30 minutes of local setup — and only
runs while your computer is on. This Railway template deploys SillyTavern as an always-on
cloud service accessible from any browser, any device, anywhere. One click. No installs.

---

SillyTavern is not an AI — it is a highly configurable frontend that manages prompt
formatting, memory injection, sampling parameters, and interface behaviour while connecting
to the AI backend of your choice. Running it locally means managing Node.js versions,
dependency conflicts, startup scripts, and only having access while your machine is awake.

Railway turns SillyTavern into a persistent cloud service. Deploy once, get a permanent
HTTPS URL, and access your characters, chats, and lorebooks from any device — desktop,
mobile, or tablet — without touching a terminal.

Typical cost: **~$2–5/month** on Railway's Hobby plan. Character.AI and Janitor AI are
free but impose content filters and don't allow custom models. SillyTavern on Railway gives
you full model choice — Claude, GPT-4o, Gemini, or any local model via OpenRouter — with
zero platform restrictions and full ownership of your character cards and chat history.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SillyTavern | `null2264/st-railway:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SILLYTAVERN_LOG_LEVEL` | 3 | Minimum log level to display (DEBUG = 0, INFO = 1, WARN = 2, ERROR = 3) |
| `SILLYTAVERN_ENABLE_IPV6` | false | - |
| `SILLYTAVERN_PREFER_IPV6` | false | - |
| `SILLYTAVERN_DISCREET_LOGIN` | (secret) | - |

## Configuration

- **Volume:** `/home/node/app/persist/`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sillytavern-cloud)
