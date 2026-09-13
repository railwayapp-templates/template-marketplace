# Deploy momentum on Railway

WhatsApp Mission Control — threads, Atlas, digests, AI drafts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/momentum)

## About

Click Deploy. Set `APP_EMAIL` + `APP_PASSWORD` when prompted (or create them
on the sign-in page at first visit). Scan the QR shown on the loading screen
with WhatsApp → Linked devices, then watch sync → analyze → ready.

One Railway service, one container: a Go WhatsApp bridge plus a Python API/UI.
Chat history lives on the `/data` volume so restarts never lose the session.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| momentum | [sameer-hoda/momentum](https://github.com/sameer-hoda/momentum) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `APP_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots · **Languages:** HTML, Python, Go, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/momentum)
