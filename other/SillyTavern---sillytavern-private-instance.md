# Deploy SillyTavern on Railway

Self-host SillyTavern [Oct'26]— character chat, your keys, basic auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sillytavern-private-instance)

## About

SillyTavern is the power-user frontend for large language models — character cards, lorebooks, group chats, personas and granular prompt control, pointed at whichever backend you already pay for. Normally it runs on a PC you have to leave switched on. This template puts it on an always-on URL with your data on a volume and auth configured before the domain resolves, so it reaches your phone without leaving your provider keys on an open door.

SillyTavern was built to run on localhost. Giving it a public URL is the right move for convenience and the wrong one for every default it ships with.

**Basic auth is the only lock, and the project says so itself.** SillyTavern's documentation states plainly that HTTP basic authentication is not strong security and has no rate limiting against brute force. Every hosted guide reaches for it anyway, because it is what the app offers. Treat it accordingly: a long random password, never reused, because your protection is password entropy alone.

**Your provider keys live on the server, not just in your browser.** SillyTavern writes backend secrets into its data directory — the `allowKeysExposure` setting exists precisely because those keys are stored server-side. Anyone past basic auth gets your OpenAI, Anthropic or OpenRouter keys, not merely your chat history. That is what you are defending.

**The IP whitelist locks you out before it protects you.** SillyTavern ships with whitelist access control on and only loopback permitted. Railway assigns dynamic IPs with no stable gateway to add, so the whitelist can only block you. Disable it and lean on basic auth — but see the first point, because that trade is real rather than free.

**It is a frontend, and it brings no model.** Nothing here generates text. You supply an API key for a hosted provider or a URL for a backend you run. Whatever you route through it stays governed by that provider's terms, which a self-hosted frontend does not alter.

**One instance is one user unless you say otherwise.** Multi-user accounts are off by default, so a shared URL means a shared persona, chat list and settings. Enable user accounts before handing the link to anyone, or expect people to overwrite each other.

Typical cost: **~$5–10/month** for one small service and a volume at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. SillyTavern is AGPL-3.0 and free; inference is billed by whichever provider you point it at.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sillytavern | [gridalpha/sillytavern-railway](https://github.com/gridalpha/sillytavern-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | HTTP listening port |
| `ST_ADMIN_PASSWORD` | (secret) | Password for the default-user admin |
| `SILLYTAVERN_SESSIONTIMEOUT` | 604800 | Session inactivity timeout, seconds |

## Configuration

- **Volume:** `/home/node/app/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/sillytavern-private-instance)
