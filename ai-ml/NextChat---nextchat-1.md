# Deploy NextChat on Railway

NextChat with strict access-code protection and a required server-side provider key.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextchat-1)

## About

A thin security wrapper around official NextChat v2.16.1, pinned to `sha256:eaaa469ddeeb5fa58fb35f8767e9e096a2f1c8468c54b6703323624bf3071c5a`. No full application rebuild is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nextchat | [leoisadev1/railway-template-nextchat](https://github.com/leoisadev1/railway-template-nextchat) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CODE` | - | Access password prompted by NextChat. Generated on deploy; copy it from service variables. |
| `PORT` | 3000 | HTTP listen port for the public domain. |
| `BASE_URL` | - | Optional OpenAI-compatible origin, without trailing /v1 (NextChat appends /v1/chat/completions). Empty uses https://api.openai.com. |
| `HOSTNAME` | 0.0.0.0 | Bind address inside the container. |
| `OPENAI_API_KEY` | (secret) | Required server-side OpenAI or OpenAI-compatible provider key. No default; startup refuses to run without it. Browser BYOK is disabled. |
| `HIDE_USER_API_KEY` | (secret) | Forced strict CODE mode by security wrapper; browser BYOK is disabled. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/nextchat-1)
