# Deploy wa-slash-commands on Railway

Slash commands for WhatsApp — answers land in your private Me chat.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wa-slash-commands)

## About

Mosaic is a WhatsApp chief-of-staff: type `/sotu`, `/pending`, `/stats`, `/recap`, `/eli5` in **any** group and the answer is delivered privately to your own "Message yourself" chat — the group you typed in is never written to.

One Docker container (Go WhatsApp bridge + Python command engine) and one Railway volume mounted at `/data` — attached automatically by this template — which holds your WhatsApp pairing and message history across redeploys. Keep the service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mosaic | [sameer-hoda/wa-slash-commands](https://github.com/sameer-hoda/wa-slash-commands) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GEMINI_API_KEY` | (secret) |
| `SETUP_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Go, Shell, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/wa-slash-commands)
