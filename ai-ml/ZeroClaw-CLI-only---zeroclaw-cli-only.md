# Deploy ZeroClaw (CLI-only) on Railway

Manage your zeroclaw directly in terminal with railway-cli ssh

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zeroclaw-cli-only)

## About

ZeroClaw is a lightweight, terminal-based AI agent runtime written in Rust. Designed for efficiency, it runs autonomously with minimal resource usage, handling AI conversations, scheduled tasks, and multi-channel integrations (Telegram, Discord, etc.) through a simple command-line interface. Perfect for developers who prefer SSH access over web UIs.

Deploying ZeroClaw on Railway involves building the Rust binary from source in a Docker container, configuring it via SSH terminal, and running it as a persistent daemon. The setup uses a multi-stage Dockerfile that compiles ZeroClaw and runs it on a minimal Debian image. A persistent volume at `/data` ensures your configuration, API keys, and chat history survive redeploys. Once deployed, you access the container through Railway's web terminal to run initial setup commands like `zeroclaw onboard`, then the daemon auto-starts on subsequent boots. The container exposes port 8080 for webhook integrations and handles all channel polling internally.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zeroclaw-railway-template | [razrinn/zeroclaw-railway-template](https://github.com/razrinn/zeroclaw-railway-template) | Worker |

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/zeroclaw-cli-only)
