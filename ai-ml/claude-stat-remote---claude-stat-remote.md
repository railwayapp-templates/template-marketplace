# Deploy claude-stat-remote on Railway

Monitor sesi Claude Code real-time di Android, di mana saja lewat Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claude-stat-remote)

## About

claude-code-remote is a real-time monitoring system for Claude Code sessions. A lightweight Go server runs on your PC, captures Claude Code hook events (tools, sub-agents, questions, completions), and streams live status to an Android app. Deploying its relay on Railway extends monitoring beyond your home Wi-Fi — to anywhere your phone is.

This template deploys the **relay** — a tiny, stateless Go WebSocket hub (~10 MB RAM, single container, no database, no volume). Your desktop server (a single EXE/binary for Windows, macOS, or Linux) dials **out** to the relay over `wss://` using your secret token, so you need no port forwarding, public IP, or firewall changes. The Android APK connects to the same relay URL with the same token, and the relay forwards status frames between the two. Railway provides the public TLS domain and keeps the relay always-on; the Hobby tier is more than enough. Deploy, generate a domain, verify `/health` — done in about a minute.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| claude-code-remote | [alipbudiman/claude-code-remote](https://github.com/alipbudiman/claude-code-remote) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Go, TypeScript, Kotlin, HTML, PowerShell, Batchfile, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/claude-stat-remote)
