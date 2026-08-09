# Deploy hermes on Railway

A WhatsApp-native personal assistant with slash commands

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-2)

## About

Hermes is a WhatsApp-native personal AI assistant powered by Gemini. It connects to your WhatsApp as a linked device and lets you search across all your group chats, get daily sitreps, schedule recurring summaries, and run slash commands like `/sotu`, `/pending`, and `/recap` — all from within WhatsApp.

Hermes runs as a single container with a Go WhatsApp bridge and a Python backend. On deployment, a browser-based wizard walks you through three setup steps: enter a Gemini API key, scan a QR code to link your WhatsApp account, and send a pairing code in any chat to designate it as your assistant chat. The whole process takes under 5 minutes. A persistent volume at `/data` preserves your WhatsApp session and message history across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | [sameer-hoda/hermes](https://github.com/sameer-hoda/hermes) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Go, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-2)
